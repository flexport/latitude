/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";
import Checkbox from "../Checkbox";

/**
 * @title Basic usage
 */
export default function CheckboxBasicUsage() {
  const [value, setValue] = useState(false);

  return (
    <Checkbox
      checked={value}
      onChange={newValue => setValue(newValue)}
      label="Are these the droids you're looking for?"
    />
  );
}
