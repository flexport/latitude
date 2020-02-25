/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";
import TextInput from "../TextInput";
import InputGroup from "../InputGroup";
import SelectInput from "../select/SelectInput";

/**
 * @title Input groups smush inputs
 * @description If you'd like to group your inputs, for things like a date AND time field, use InputGroup.
 */
export default function InputGroupSmushInputs() {
  const [state1, setState1] = useState("Left");
  const [state2, setState2] = useState("Center");
  const [state3, setState3] = useState("Option A");
  const [state4, setState4] = useState("Right");

  return (
    <div style={{maxWidth: 400}}>
      <InputGroup
        customWidthSettings={[{flex: 1}, {flex: 1}, {flex: 3}, {flex: 1}]}
      >
        <TextInput value={state1} textAlign="right" onChange={setState1} />
        <TextInput value={state2} textAlign="right" onChange={setState2} />
        <SelectInput
          value={state3}
          onChange={setState3}
          options={[
            {value: "Option A", label: "Option A"},
            {value: "Option B", label: "Option B"},
            {value: "Option C", label: "Option C"},
          ]}
          isNullable={true}
        />
        <TextInput value={state4} textAlign="right" onChange={setState4} />
      </InputGroup>
    </div>
  );
}
