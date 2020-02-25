/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";

import Group from "../../Group";
import InlineEdit from "../../InlineEdit";
import Label from "../../Label";
import TextareaInput from "../../TextareaInput";
import FloatInput from "../../FloatInput";

/**
 * @title Supports multiple Input Types
 * @description InlineEdit supports inputs other than TextInput, so long as the value of the input can be stingified.
 */
export default function InlineEditPencil() {
  const [number, setNumber] = useState(1234);
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );

  return (
    <Group gap={20}>
      <div style={{width: 240}}>
        <Label value="Number Input" indicateRequired={true}>
          <InlineEdit value={number} onChange={setNumber}>
            {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
            {props => <FloatInput {...props} />}
          </InlineEdit>
        </Label>
      </div>

      <div style={{width: 240}}>
        <Label value="Text area Input" indicateRequired={true}>
          <InlineEdit
            editStyle="pencil"
            textWrap={true}
            value={text}
            onChange={setText}
          >
            {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
            {props => <TextareaInput {...props} rows={{min: 2, max: 10}} />}
          </InlineEdit>
        </Label>
      </div>
    </Group>
  );
}
