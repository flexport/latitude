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
import ProgressBar from "../../ProgressBar";
import latitudeColors from "../../colors";

const stories = storiesOf(`${sections.interaction}/Loading`, module);
stories.addDecorator(withKnobs).add("Progress Bar", () => (
  <ThemeProvider theme={select("Theme", ["Base", "Transmission"], "Base")}>
    <div
      style={{
        width: "400px",
        background: latitudeColors.white,
        padding: "20px",
      }}
    >
      <Group flexDirection="column" gap={36}>
        <ProgressBar loaded={false} />
        <ProgressBar loaded={false} />
      </Group>
    </div>
  </ThemeProvider>
));
