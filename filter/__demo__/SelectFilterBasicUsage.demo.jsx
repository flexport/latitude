/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import SelectFilter from "../SelectFilter";
import {characters} from "../../tools/demo";

/**
 * @title Basic usage of SelectFilter
 * @description A Select Filter can be used to filter on a list of options
 */
export default function SelectFilterBasicUsage() {
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
    />
  );
}
