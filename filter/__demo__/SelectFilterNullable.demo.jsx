/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import SelectFilter from "../SelectFilter";
import {characters} from "../../tools/demo";

/**
 * @title Nullable SelectFilter
 * @description Set isNullable to true to allow the user to reset the input to null
 */
export default function SelectFilterNullable() {
  const [value, setValue] = React.useState(null);
  const options = characters.map(character => ({
    label: `${character.name} - ${character.team}`,
    value: character,
  }));

  return (
    <SelectFilter
      label="Favorite Starwars Character"
      value={value}
      onChange={setValue}
      options={options}
      shyLabel={true}
      isNullable={true}
    />
  );
}
