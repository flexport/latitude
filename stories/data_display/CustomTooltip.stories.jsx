/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {storiesOf} from "@storybook/react";
import {withKnobs, select, number} from "@storybook/addon-knobs";
import sections from "../sections";

import CustomTooltip from "../../CustomTooltip";
import GeneralPopover from "../../popover/GeneralPopover";

const stories = storiesOf(`${sections.dataDisplay}/Custom Tooltip`, module);
stories.addDecorator(withKnobs);

const placementOptions = ["top", "bottom", "left", "right", "bottom-start"];

const Popup = (
  <GeneralPopover buttons={[]} title="I am a Popover">
    Hello World
  </GeneralPopover>
);

stories.add("with full knobs", () => (
  <CustomTooltip
    placement={select("Placement", placementOptions, "top")}
    overlay={Popup}
    mouseEnterDelay={number("Mouse enter delay (seconds)", 0)}
    mouseExitDelay={number("Mouse exit delay (seconds)", 0)}
  >
    <div className={css(styles.trigger)}>
      Hello, I am the tooltip trigger area for this demo. Hover or click me
      (depending on the trigger setting) to see your tooltip!
    </div>
  </CustomTooltip>
));

const styles = StyleSheet.create({
  trigger: {
    width: "200px",
    textAlign: "center",
    height: "110px",
    border: "1px solid red",
  },
});
