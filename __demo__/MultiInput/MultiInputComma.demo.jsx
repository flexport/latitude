/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";

import MultiInput from "../../MultiInput";
import Label from "../../Label";

/**
 * @title Paste comma separated content
 * @description Paste me into the MultiInput: `HS001, HS002, HS003, HS004`
 */
export default function MultiInputComma() {
  const [value, setValue] = useState([]);

  return (
    <div style={{width: 400}}>
      <Label value="Shipment Codes">
        <MultiInput
          value={value}
          onChange={setValue}
          placeholder="place the items in the description text here"
        />
      </Label>
    </div>
  );
}
