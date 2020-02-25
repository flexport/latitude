/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import MultiselectFilter, {
  getValueArrayFromFilterValue,
  getFilterValueFromArray,
} from "../MultiselectFilter";
import {characters} from "../../tools/demo";

/**
 * @title Basic Multiselect Filter Usage
 * @description Multiselect Filter can be used to filter on multiple options from a list
 */
export default function MultiselectFilterBasicUsage() {
  const [value, setValue] = React.useState([]);
  const options = characters.map(character => ({
    label: `${character.name} - ${character.team}`,
    value: character,
  }));

  return (
    <MultiselectFilter
      label="Favorite Starwars Character"
      value={getFilterValueFromArray(value, options)}
      onChange={newValue => {
        setValue(getValueArrayFromFilterValue(newValue));
      }}
      options={options}
      shyLabel={true}
    />
  );
}
