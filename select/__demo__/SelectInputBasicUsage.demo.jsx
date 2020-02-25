/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import SelectInput from "../SelectInput";
import {characters} from "../../tools/demo";

/**
 * @title Basic Usage
 * @description Shows a list of selectable items.
 */
export default function SelectInputBasicUsage() {
  const [value, setValue] = React.useState();

  return (
    <SelectInput
      value={value}
      options={characters.map(character => ({
        label: `${character.name} - ${character.team}`,
        value: character.name,
      }))}
      onChange={value => setValue(value)}
    />
  );
}
