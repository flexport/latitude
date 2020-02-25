/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */
import * as React from "react";
import {storiesOf} from "@storybook/react";
import {select, withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import {ThemeProvider} from "../../context/ThemeNameContext";
import Group from "../../Group";
import Text from "../../Text";
import TextLink from "../../TextLink";

const stories = storiesOf(`${sections.interaction}/Link`, module);
stories.addDecorator(withKnobs);
const txt = "The freight forwarder for modern logistics teams";
const scaleOptions = {
  subtext: "subtext",
  base: "base",
  title: "title",
};
const weightOptions = {
  regular: "regular",
  bold: "bold",
};
stories.add("Text Link", () => {
  const scale = select("scale", scaleOptions, "base");
  const weight = select("weight", weightOptions, "regular");
  const theme = select("Theme", ["Base", "Transmission"], "Base");

  return (
    <ThemeProvider theme={theme}>
      <Group flexDirection="column" gap={20}>
        <Text scale="headline">Default</Text>

        <TextLink href="#" scale={scale} weight={weight}>
          {txt}
        </TextLink>

        <Text scale="headline">Emphasized</Text>

        <TextLink href="#" linkStyle="emphasized" scale={scale} weight={weight}>
          {txt}
        </TextLink>

        <Text scale="headline">Inverse</Text>

        <div style={{padding: "24px", background: "#000"}}>
          <TextLink href="#" linkStyle="inverse" scale={scale} weight={weight}>
            {txt}
          </TextLink>
        </div>

        <Text scale="headline">Subtle</Text>

        <TextLink href="#" linkStyle="subtle" scale={scale} weight={weight}>
          {txt}
        </TextLink>
      </Group>
    </ThemeProvider>
  );
});
