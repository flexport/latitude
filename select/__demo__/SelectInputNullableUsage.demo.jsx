/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import SelectInput from "../SelectInput";
import {characters} from "../../tools/demo";

/**
 * @title Nullabe Usage
 * @description Set `isNullable` to true to allow the user to reset the input to null.
 */
export default function SelectInputNullableUsage() {
  const [value, setValue] = React.useState();

  return (
    <SelectInput
      value={value}
      options={characters.map(character => ({
        label: `${character.name} - ${character.team}`,
        value: character.name,
      }))}
      isNullable={true}
      onChange={value => setValue(value)}
    />
  );
}
