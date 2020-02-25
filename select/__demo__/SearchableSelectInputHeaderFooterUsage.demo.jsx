/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import SearchableSelectInput from "../SearchableSelectInput";
import {characters} from "../../tools/demo";
import Text from "../../Text";

/**
 * @title Custom Header and Footer Usage
 * @description Set `header` or `footer` to add a sticky header/footer to the dropdown.
 */
export default function SearchableSelectInputHeaderFooterUsage() {
  const [selected, setSelected] = React.useState(null);

  return (
    <SearchableSelectInput
      placeholder="Select a character"
      value={selected}
      options={characters.map(character => ({
        label: `${character.name} - ${character.team}`,
        value: character.name,
      }))}
      onChange={value => setSelected(value)}
      header={
        <div style={{padding: "4px"}}>
          <Text color="grey50">Custom Sticky Header</Text>
        </div>
      }
      footer={
        <div style={{padding: "4px"}}>
          <Text color="grey50">Custom Sticky Header</Text>
        </div>
      }
    />
  );
}
