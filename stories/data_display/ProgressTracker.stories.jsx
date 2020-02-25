/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import {storiesOf} from "@storybook/react";
import {withKnobs, boolean, number, text} from "@storybook/addon-knobs";

import sections from "../sections";

import ProgressTracker from "../../progress/ProgressTracker";

const stories = storiesOf(sections.dataDisplay, module);
stories.addDecorator(withKnobs);

stories.add("Progress Tracker", () => (
  <div className={css(styles.fixedWidthContainer)}>
    <ProgressTracker
      progressIcon={text("Progress Icon", "ship")}
      progress={number("Progress", 0.5, {
        range: true,
        min: 0,
        max: 1,
        step: 0.05,
      })}
      startIcon={text("Start Icon", "warehouse")}
      endIcon={text("End Icon", "home")}
      label={text("Label", "In transit \u2022 4 updates")}
      error={boolean("Error", false)}
    />
  </div>
));

const styles = StyleSheet.create({
  fixedWidthContainer: {
    width: 256,
  },
});
