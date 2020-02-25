/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {storiesOf} from "@storybook/react";
import {withKnobs, select, text, number} from "@storybook/addon-knobs";
import sections from "../sections";

import Tooltip from "../../Tooltip";

const stories = storiesOf(`${sections.dataDisplay}/Tooltip`, module);
stories.addDecorator(withKnobs);

const placementOptions = ["top", "bottom", "left", "right"];

stories.add("with full knobs", () => (
  <Tooltip
    placement={select("Placement", placementOptions, "top")}
    overlay={text("Tooltip Text", "I am a tooltip")}
    mouseEnterDelay={number("Mouse enter delay (seconds)", 0)}
    mouseExitDelay={number("Mouse exit delay (seconds)", 0)}
    maxWidth={number("Max width", null)}
  >
    <div className={css(styles.trigger)}>
      Hello, I am the tooltip trigger area for this demo. Hover or click me
      (depending on the trigger setting) to see your tooltip!
    </div>
  </Tooltip>
));

stories.add("Screen edge", () => (
  <div style={{position: "absolute", right: `0px`}}>
    <Tooltip
      placement={select("Placement", placementOptions, "top")}
      overlay={text("Tooltip Text", "I am a tooltip")}
    >
      <div className={css(styles.trigger)}>
        Hello, I am the tooltip trigger area for this demo. Hover me to see your
        tooltip!
      </div>
    </Tooltip>
  </div>
));

stories.add("with no content", () => (
  <Tooltip placement="top" overlay={null}>
    <div className={css(styles.trigger)}>
      Hello, I am the tooltip trigger area for this demo. No tooltip should
      appear as no tooltip content has been provided.
    </div>
  </Tooltip>
));

const styles = StyleSheet.create({
  trigger: {
    width: "200px",
    textAlign: "center",
    height: "110px",
    border: "1px solid red",
  },
});
