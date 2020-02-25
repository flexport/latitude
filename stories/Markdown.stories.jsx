/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs, text, boolean} from "@storybook/addon-knobs";
import sections from "./sections";

import Markdown from "../Markdown";

const stories = storiesOf(sections.general, module);
stories.addDecorator(withKnobs);

stories.add("Markdown", () => {
  const props = knobs();
  const {source, enableHtml, breaks} = props;

  return <Markdown source={source} enableHtml={enableHtml} breaks={breaks} />;
});

const knobs = () => ({
  source: text(
    "Source",
    "# Heading 1\nSome text\n# Heading 2\nEven more text..."
  ),
  enableHtml: boolean("Enable HTML", true),
  breaks: boolean("Breaks", true),
});
