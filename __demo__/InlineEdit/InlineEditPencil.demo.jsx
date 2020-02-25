/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";

import InlineEdit from "../../InlineEdit";
import Label from "../../Label";
import TextInput from "../../TextInput";

/**
 * @title Pencil Inline Edit
 * @description InlineEdit also supports `pencil` style inline editting. In this mode, a pencil icon takes the place of the `Edit` Button.
 */
export default function InlineEditPencil() {
  const [val, setVal] = useState("FLEX001234");

  return (
    <div style={{width: 240}}>
      <Label value="Shipment ID" indicateRequired={true}>
        <InlineEdit
          editStyle="pencil"
          textWrap={true}
          value={val}
          onChange={setVal}
        >
          {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
          {props => <TextInput {...props} />}
        </InlineEdit>
      </Label>
    </div>
  );
}
