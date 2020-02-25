/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import {
  type DemoFile,
  bool,
  text,
  demoCommonStyles,
  disabledKnob,
  textInputSizeKnob,
} from "../../demoTypes";
import SearchableSelectInput from "../SearchableSelectInput";
import SearchableSelectInputNullableUsage from "./SearchableSelectInputNullableUsage.demo";
import SearchableSelectInputCustomViewUsage from "./SearchableSelectInputCustomViewUsage.demo";
import SearchableSelectInputHeaderFooterUsage from "./SearchableSelectInputHeaderFooterUsage.demo";
import Text from "../../Text";
import {characters} from "../../tools/demo";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <SearchableSelectInputShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs: {
        disabled: disabledKnob,
        isNullable: bool(false),
        customView: bool(false),
        size: textInputSizeKnob,
        isInvalid: bool(false),
        hasHeader: bool(false),
        hasFooter: bool(false),
        placeholder: text("Select a character"),
      },
    },
    {
      type: "live",
      fullWidth: true,
      example: SearchableSelectInputNullableUsage,
    },
    {
      type: "live",
      fullWidth: true,
      example: SearchableSelectInputCustomViewUsage,
    },
    {
      type: "live",
      fullWidth: true,
      example: SearchableSelectInputHeaderFooterUsage,
    },
  ],
};

type Props = {|
  +elementToCodeFn: React.Node => void,
  +demoProps: any,
|};

function SearchableSelectInputShim({elementToCodeFn, demoProps}: Props) {
  const [selected, setSelected] = React.useState(null);

  const handleChange = (value: string | null) => {
    setSelected(value);
  };

  const options = characters.map(character => ({
    label: `${character.name} - ${character.team}`,
    customView: demoProps.customView && (
      <CustomItem name={character.name} team={character.team} />
    ),
    value: character.name,
  }));

  const element = (
    <SearchableSelectInput
      {...demoProps}
      value={selected}
      options={options}
      onChange={handleChange}
      header={
        demoProps.hasHeader && (
          <div style={{padding: "4px"}}>
            <Text color="grey50">Custom Sticky Header</Text>
          </div>
        )
      }
      footer={
        demoProps.hasFooter && (
          <div style={{padding: "4px"}}>
            <Text color="grey50">Custom Sticky Header</Text>
          </div>
        )
      }
    />
  );

  elementToCodeFn(element);

  return <div className={css(demoCommonStyles.smallWrapper)}>{element}</div>;
}

type CustomItemProps = {|
  +name: string,
  +team: string,
|};

function CustomItem({name, team}: CustomItemProps) {
  return (
    <div style={{padding: "8px", width: "300px"}}>
      {name} <Text color="grey50"> -- {team}</Text>
    </div>
  );
}

export default demos;
