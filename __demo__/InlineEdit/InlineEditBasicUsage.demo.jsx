/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";

import InlineEdit from "../../InlineEdit";
import Label from "../../Label";
import TextInput from "../../TextInput";

/**
 * @title Basic Usage
 * @description Have a value be editable directly in on the page using Inline Edit. When the `edit` button is pressed, the user will be prompted to edit the value.
 */
export default function InlineEditBasicUsage() {
  const [val, setVal] = useState("Theseus");

  return (
    <div style={{width: 240}}>
      <Label value="Ship Name" indicateRequired={true}>
        <InlineEdit value={val} onChange={setVal}>
          {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
          {props => <TextInput {...props} />}
        </InlineEdit>
      </Label>
    </div>
  );
}
