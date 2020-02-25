/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import BaseReactSelect from "../BaseReactSelect";
import {characters} from "../../tools/demo";
import {demoCommonStyles} from "../../demoTypes";

/**
 * @title Nullable Usage
 * @description Set `isNullable` to true to allow the user to reset the input to null.
 */
export default function BaseReactSelectNullableUsage() {
  const [value, setValue] = React.useState(null);
  const options = characters.map(character => ({
    option: character,
    label: character.name,
  }));

  return (
    <div className={css(demoCommonStyles.v2wrapper)}>
      <BaseReactSelect
        value={value}
        options={options}
        onChange={setValue}
        keyFn={character => character.id.toString()}
        valueRenderer={character => (character ? character.name : false)}
        renderOptions={{
          type: "valueRenderOnly",
        }}
      />
    </div>
  );
}
