/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";

import Group from "../../Group";
import MultiInput from "../../MultiInput";
import Label from "../../Label";

/**
 * @title MultiInput Sizes
 */
export default function MultiInputSizes() {
  const [value, setValue] = useState([
    "first pill",
    "another pill",
    "one more pill",
    "another another",
    "final pill",
  ]);

  return (
    <Group flexDirection="column">
      <div style={{width: 400}}>
        <Label value="MultiInput">
          <MultiInput
            value={value}
            onChange={setValue}
            placeholder="you can type whatever here"
          />
        </Label>
      </div>
      <div style={{width: 400}}>
        <Label value="MultiInput small">
          <MultiInput
            value={value}
            onChange={setValue}
            size="s"
            placeholder="you can type whatever here"
          />
        </Label>
      </div>
      <div style={{width: 400}}>
        <Label value="MultiInput large">
          <MultiInput
            value={value}
            onChange={setValue}
            size="l"
            placeholder="you can type whatever here"
          />
        </Label>
      </div>
    </Group>
  );
}
