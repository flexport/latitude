/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";

import {storiesOf} from "@storybook/react";
import {number, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import Label from "../../Label";
import TextareaInput from "../../TextareaInput";
import {getTextInputKnobs} from "./TextInput.stories";

const stories = storiesOf(`${sections.dataEntry}/Textarea Input`, module);
stories.addDecorator(withKnobs);
stories.add("basic usage", () => (
  <TextareaInputHoist
    {...getTextInputKnobs()}
    {...getMultlineTextInputKnobs()}
  />
));

const getMultlineTextInputKnobs = () => ({
  minRows: number("minRows", 2),
  maxRows: number("maxRows", 10),
});

function TextareaInputHoist(props: any) {
  const [value, setValue] = React.useState("Starting value....");
  const {minRows, maxRows, ...otherProps} = props;

  return (
    <div style={{width: "400px"}}>
      <Label value="TextareaInput text input is">
        <TextareaInput
          rows={{min: props.minRows, max: props.maxRows}}
          value={value}
          onChange={setValue}
          {...otherProps}
        />
      </Label>
    </div>
  );
}
