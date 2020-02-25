/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import SearchableSelectInput from "../SearchableSelectInput";
import {characters} from "../../tools/demo";

/**
 * @title Nullable Usage
 * @description Set `isNullable` to true to allow the user to reset the input to null.
 */
export default function SearchableSelectInputNullableUsage() {
  const [selected, setSelected] = React.useState(null);

  return (
    <SearchableSelectInput
      isNullable={true}
      placeholder="Select a character"
      value={selected}
      options={characters.map(character => ({
        label: `${character.name} - ${character.team}`,
        value: character.name,
      }))}
      onChange={value => setSelected(value)}
    />
  );
}
