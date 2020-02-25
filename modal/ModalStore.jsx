/**
 * TEAM: shipment_data
 *
 * @flow
 */
import * as React from "react";
import EventEmitter from "events";
import {EventTypes as ModalEventTypes} from "./Constants";
import StaticModalLegacyContext from "./StaticModalLegacyContext";

const MAX_LISTENERS_PER_EVENT = 300;

let _count = 0;

type HideRecord = {
  id?: number | string,
};

type ModalRecord = {
  render: ({close: () => void, handleHidden: () => void}) => React.Node,
  _reactKey?: number,
  id?: number | string,
};

class _ModalStore extends EventEmitter {
  _stack: Array<ModalRecord>;
  constructor() {
    super();
    this._stack = [];
    this.setMaxListeners(MAX_LISTENERS_PER_EVENT);
  }

  init = () => {};

  getAll = () => this._stack;

  show = (record: ModalRecord) => {
    if (!record._reactKey) {
      // eslint-disable-next-line no-param-reassign,no-plusplus
      record._reactKey = ++_count;
    }
    this._stack = [record, ...this._stack];
    this.emit(ModalEventTypes.CHANGED);
  };

  hide = (record: HideRecord) => {
    this._stack = this._stack.filter(r => {
      const isMatch = r === record || (record.id && r.id === record.id);
      return !isMatch;
    });
    this.emit(ModalEventTypes.CHANGED);
  };

  renderAll = (): $ReadOnlyArray<React.Element<"div"> | null> | void => {
    if (this._stack.length > 0) {
      return [...this._stack].reverse().map(modal => this.renderModal(modal));
    }
  };

  renderModal = (record: ModalRecord) => {
    const isTop = record === this._stack[0];
    if (record.render) {
      const handleHiddenMethod = () => this.hide(record);
      return (
        <div key={record._reactKey} className={isTop ? "" : "hideFully"}>
          <StaticModalLegacyContext.Provider
            value={{
              legacyMode: true,
              legacyModeHandleHidden: handleHiddenMethod,
            }}
          >
            {record.render({
              close: () => this.hide(record),
              handleHidden: handleHiddenMethod,
            })}
          </StaticModalLegacyContext.Provider>
        </div>
      );
    }
    return null;
  };
}

export default new _ModalStore();
