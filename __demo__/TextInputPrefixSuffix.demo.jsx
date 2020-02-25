/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";

import Group from "../Group";
import TextInput from "../TextInput";

/**
 * @title Add a Prefix / Suffix
 * @description provide a `prefix` and/or `suffix` to have a sigil appear within the Input's field
 */
export default function TextInputPrefixSuffix() {
  const [airport, setAirport] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <Group flexDirection="column">
      <div style={{maxWidth: 200}}>
        <TextInput
          prefix={{iconName: "airport"}}
          value={airport}
          onChange={setAirport}
        />
      </div>
      <div style={{maxWidth: 200}}>
        <TextInput suffix="kg" value={weight} onChange={setWeight} />
      </div>
    </Group>
  );
}
