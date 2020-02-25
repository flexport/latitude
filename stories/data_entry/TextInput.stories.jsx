/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {boolean, select, text, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import Group from "../../Group";
import TextInput from "../../TextInput";
import Label from "../../Label";
import InputError from "../../InputError";

const stories = storiesOf(`${sections.dataEntry}/Text Input`, module);
stories.addDecorator(withKnobs);
stories.add("TextInput", () => <TextInputHoist {...getTextInputKnobs()} />);

export const getTextInputKnobs = () => ({
  disabled: boolean("disabled", false),
  readOnly: boolean("readOnly", false),
  size: select("size", ["s", "m", "l"], "m"),
  isInvalid: boolean("isInvalid", false),
  placeholder: text("placeholder", "Starting value..."),
});

function TextInputHoist(props: *) {
  const [inputTexts, setInputTexts] = React.useState([
    "",
    "another input",
    "one more",
    "just one more",
    "yet another",
    "despite everything, another",
  ]);

  const handleTextChange = (i, newText) => {
    const clonedInputTexts = inputTexts.slice(0);
    clonedInputTexts[i] = newText;
    setInputTexts(clonedInputTexts);
  };

  return (
    <Group flexDirection="column">
      <Label value="Text input is">
        <InputError errorText="Error: first name is required" showError={true}>
          <TextInput
            textAlign="right"
            value={inputTexts[0]}
            onChange={newText => {
              handleTextChange(0, newText);
            }}
            suffix={{iconName: "airport"}}
            {...props}
          />
        </InputError>
      </Label>
      <Label value="another text input">
        <TextInput
          value={inputTexts[1]}
          onChange={newText => {
            handleTextChange(1, newText);
          }}
          suffix="kg"
        />
      </Label>
      <Label value="one more text input">
        <TextInput
          value={inputTexts[2]}
          onChange={newText => {
            handleTextChange(2, newText);
          }}
          prefix={{iconName: "check"}}
        />
      </Label>
      <Label value="one more text input">
        <TextInput
          value={inputTexts[3]}
          onChange={newText => {
            handleTextChange(3, newText);
          }}
          suffix={{iconName: "check"}}
        />
      </Label>
      <Label value="yet another text input">
        <TextInput
          value={inputTexts[4]}
          onChange={newText => {
            handleTextChange(4, newText);
          }}
          disabled={true}
          suffix={{iconName: "check"}}
        />
      </Label>
      <Label value="despite everything, another text input">
        <TextInput
          value={inputTexts[5]}
          onChange={newText => {
            handleTextChange(5, newText);
          }}
          disabled={true}
          suffix={{
            iconName: "cancel",
            onClick: () => handleTextChange(5, "not allowed!"),
          }}
        />
      </Label>
    </Group>
  );
}
