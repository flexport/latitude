/**
 * TEAM: frontend_infra
 *
 * @flow
 */
import EventEmitter from "events";
import * as React from "react";
import FluxDispatcher from "../tools/FluxDispatcher";
import Toast from "./Toast";
import {ActionTypes, EventTypes} from "./Constants";
import PayloadSources from "../constants/PayloadSources";
import ToastActions from "./ToastActions";

type ToastProps = React.ElementConfig<typeof Toast>;

type ToastArg = ToastProps & {
  removeAfter?: ?number,
};

export type ToastRecord = ToastArg & {
  id: number,
};

type Action = {
  actionType: string,
  toast: ToastRecord,
  removeAfter?: ?number,
};

type Payload = {
  source: string,
  action: Action,
};

export class _ToastStore extends EventEmitter {
  _Actions = ToastActions;

  _records: Array<ToastRecord>;
  _counter: number;

  constructor() {
    super();
    this._counter = 0;
    this._records = [];

    FluxDispatcher.register(
      (payload: Payload): boolean => {
        const {action, source} = payload;

        if (source !== PayloadSources.TOAST) {
          return false;
        }

        // eslint-disable-next-line default-case
        switch (action.actionType) {
          case ActionTypes.SHOW:
            this._show(action.toast, action.removeAfter);
            return true;
          case ActionTypes.REMOVE:
            this._remove(action.toast);
            return true;
        }
        return false;
      }
    );
  }

  _show = (toast: ToastArg, removeAfter: ?number) => {
    const record = {...toast, id: this._counter};
    this._counter += 1;

    this._records = [record, ...this._records];
    if (removeAfter && removeAfter > 0) {
      window.setTimeout(() => {
        ToastActions.remove(record);
      }, removeAfter);
    }
    this.emit(EventTypes.CHANGED);
  };

  _remove = (toast: ToastRecord) => {
    this._records = this._records.filter(r => r.id !== toast.id);
    this.emit(EventTypes.CHANGED);
  };

  getAll = () => this._records;
}

export default new _ToastStore();
