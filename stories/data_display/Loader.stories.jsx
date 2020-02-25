/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs, select} from "@storybook/addon-knobs";
import sections from "../sections";
import {ThemeProvider} from "../../context/ThemeNameContext";
import Group from "../../Group";
import Loader from "../../Loader";
import latitudeColors from "../../colors";

const stories = storiesOf(`${sections.interaction}/Loading`, module);
stories.addDecorator(withKnobs).add("Loader", () => (
  <ThemeProvider theme={select("Theme", ["Base", "Transmission"], "Base")}>
    <div
      style={{
        width: "400px",
        background: latitudeColors.white,
        padding: "20px",
      }}
    >
      <Group flexDirection="column" gap={36}>
        <Loader loaded={false} />
        <Loader loaded={false} />
      </Group>
    </div>
  </ThemeProvider>
));
