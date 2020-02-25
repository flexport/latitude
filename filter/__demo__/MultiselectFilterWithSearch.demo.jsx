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
 * @title Basic Multiselect Filter With Search
 * @description Make MultiselectFilter searchable by setting `filterSearchMode`
 */
export default function MultiselectFilterWithSearch() {
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
      filterSearchMode={{
        type: "filter",
      }}
    />
  );
}
