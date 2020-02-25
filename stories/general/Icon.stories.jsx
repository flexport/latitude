/**
 * TEAM: customs
 *
 * @flow
 */
import * as React from "react";
import {storiesOf} from "@storybook/react";
import {text, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import Icon from "../../Icon";

const stories = storiesOf(`${sections.general}/Icon`, module);
stories.addDecorator(withKnobs);
stories
  .add("withKnobs", () => (
    <Icon iconName={text("iconName", "airport")} size={text("size", "m")} />
  ))
  .add("small", () => <Icon iconName="airport" size="s" />)
  .add("medium", () => <Icon iconName="airport" size="m" />)
  .add("large", () => <Icon iconName="airport" size="l" />)
  .add("green", () => <Icon iconName="check" size="xl" color="green30" />);
