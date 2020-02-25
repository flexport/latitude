/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import SearchableSelectInput from "../SearchableSelectInput";
import {characters} from "../../tools/demo";
import Text from "../../Text";

/**
 * @title Custom Rendered Options Usage
 * @description Set `customView` when defining `options` for custom render.
 */
export default function SearchableSelectInputCustomViewUsage() {
  const [selected, setSelected] = React.useState(null);
  const options = characters.map(character => ({
    label: `${character.name} - ${character.team}`,
    value: character.name,
    customView: (
      <div style={{padding: "8px", width: "300px"}}>
        {character.name} <Text color="grey50"> -- {character.team}</Text>
      </div>
    ),
  }));

  return (
    <SearchableSelectInput
      placeholder="Select a character"
      value={selected}
      options={options}
      onChange={value => setSelected(value)}
    />
  );
}
