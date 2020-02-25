/**
 * TEAM: marketplace
 *
 * @flow
 */

/* eslint-disable react/forbid-elements */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs, boolean, select} from "@storybook/addon-knobs";
import sections from "../sections";
import {ThemeProvider, type Theme} from "../../context/ThemeNameContext";
import Group from "../../Group";
import Checkbox from "../../Checkbox";
import CheckboxList from "../../CheckboxList";

storiesOf(`${sections.dataEntry}/Checkbox`, module)
  .addDecorator(withKnobs)
  .add("basic usage", () => <CheckboxLauncher {...getKnobs()} />);

const getKnobs = () => ({
  disabled: boolean("Disabled", false),
  theme: select("Theme", ["Base", "Transmission"], "Base"),
  showSelectAllOption: boolean("Show Select All Option", true),
});

type Props = {|
  +disabled: boolean,
  +theme: Theme,
  +showSelectAllOption: boolean,
|};

const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum pretium eleifend. Curabitur dapibus hendrerit urna nec fermentum. Phasellus blandit sodales odio. Aliquam at tortor.";

const meatOptions = [
  {
    label: "Carne Asada",
    value: "carneAsadaValue",
  },
  {
    label: "Chicken",
    value: "chickenValue",
  },
  {
    label: "Carnitas",
    value: "carnitasValue",
  },
  {
    label: "Al Pastor",
    value: "alPastorValue",
  },
];

function CheckboxLauncher({disabled, theme, showSelectAllOption}: Props) {
  const [checked, setChecked] = React.useState(Array(5).fill(false));
  const [checkboxListValues, setCheckboxListValues] = React.useState([]);

  const handleCheck = (i: number) => {
    const newChecked = [
      ...checked.slice(0, i),
      !checked[i],
      ...checked.slice(i + 1),
    ];
    setChecked(newChecked);
  };

  return (
    <ThemeProvider theme={theme}>
      <Group flexDirection="column">
        <Checkbox
          label="Checkbox"
          checked={checked[0]}
          disabled={disabled}
          onChange={() => handleCheck(0)}
        />
        <Checkbox
          label="Checkbox 2"
          checked={checked[1]}
          disabled={disabled}
          onChange={() => handleCheck(1)}
        />
        <Checkbox
          label="Indeterminate, checked will override indeterminate state"
          checked={checked[2]}
          indeterminate={true}
          disabled={disabled}
          onChange={() => handleCheck(2)}
        />
        <Checkbox
          label="Indeterminate and disabled"
          checked={checked[2]}
          indeterminate={true}
          disabled={true}
          onChange={() => handleCheck(2)}
        />
        <Checkbox
          label="Not checked, disabled"
          checked={false}
          disabled={true}
          onChange={() => {}}
        />
        <Checkbox
          label="Checked and disabled"
          checked={true}
          disabled={true}
          onChange={() => {}}
        />
        <Checkbox
          label="Invalid and checked"
          isInvalid={true}
          checked={true}
          disabled={disabled}
          onChange={() => {}}
        />
        <Checkbox
          label="Checkbox"
          isInvalid={true}
          checked={checked[3]}
          disabled={disabled}
          onChange={() => handleCheck(3)}
        />
      </Group>
      <br />
      <h2>Lots of text</h2>
      <Group>
        <Checkbox
          label={longText}
          checked={checked[4]}
          disabled={disabled}
          onChange={() => handleCheck(4)}
        />
      </Group>
      <h2>Checkbox List</h2>
      <Group>
        <CheckboxList
          options={meatOptions}
          values={checkboxListValues}
          onChange={setCheckboxListValues}
          showSelectAllOption={showSelectAllOption}
        />
      </Group>
      <div>Selected values: {JSON.stringify(checkboxListValues)}</div>
    </ThemeProvider>
  );
}
