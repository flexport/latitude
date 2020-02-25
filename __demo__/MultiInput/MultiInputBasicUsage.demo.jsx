/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";

import MultiInput from "../../MultiInput";
import Label from "../../Label";

/**
 * @title Basic Usage
 */
export default function MultiInputBasicUsage() {
  const [value, setValue] = useState(["HS0624"]);

  return (
    <div style={{width: 400}}>
      <Label value="Shipment Codes">
        <MultiInput value={value} onChange={setValue} />
      </Label>
    </div>
  );
}
