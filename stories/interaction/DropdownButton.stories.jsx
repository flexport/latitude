/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {boolean, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import DropdownButton from "../../DropdownButton";
import ToggleButton from "../../base_candidate/button/ToggleButton";

const stories = storiesOf(`${sections.interaction}/Dropdown Button`, module);
stories.addDecorator(withKnobs);
stories.add("DropdownButton", () => (
  <DropdownButtonHoist {...getTextInputKnobs()} />
));

export const getTextInputKnobs = () => ({
  disabled: boolean("disabled", false),
});

// eslint-disable-next-line react/prefer-stateless-function
function DropdownButtonHoist(props: any) {
  // eslint-disable-next-line
  const optionArray = [1, 2, 3, 4].map(optionNo => ({
    label: `Option ${optionNo}`,
    iconName: "ship",
    labelTitle: "title",
    handleClick: () => {
      // eslint-disable-next-line
      console.error("This was clicked");
    },
  }));
  return (
    <div>
      <DropdownButton
        {...props}
        button={<ToggleButton label="Text Dropdown Button" />}
        options={optionArray}
        menuAlignRight={true}
      />
    </div>
  );
}
