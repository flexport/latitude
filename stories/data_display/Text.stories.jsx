/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */
import * as React from "react";
import {storiesOf} from "@storybook/react";
import sections from "../sections";
import Text from "../../Text";

const stories = storiesOf(`${sections.dataDisplay}/Text`, module);
const txt = "The freight forwarder for modern logistics teams";
stories
  .add("tiny", () => <Text scale="tiny">{txt}</Text>)
  .add("subtext", () => <Text scale="subtext">{txt}</Text>)
  .add("base", () => <Text scale="base">{txt}</Text>)
  .add("title", () => <Text scale="title">{txt}</Text>)
  .add("headline", () => <Text scale="headline">{txt}</Text>)
  .add("bold", () => <Text weight="bold">{txt}</Text>)
  .add("color", () => <Text color="orange50">{txt}</Text>)
  .add("number", () => <Text>42</Text>);
