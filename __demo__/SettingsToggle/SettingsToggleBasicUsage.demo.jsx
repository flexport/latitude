/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";
import {css, StyleSheet} from "aphrodite";
import SettingsToggle from "../../SettingsToggle";
import colors from "../../colors";
import {whitespaceSizeConstants} from "../../styles/whitespace";

/**
 * @title Basic usage
 * @description If given a label, the toggle will be aligned to the right edge of its container, and the label will be aligned to the left.
 */
export default function SettingsToggleBasicUsage() {
  const [value, setValue] = useState(false);

  return (
    <div className={css(styles.wrapper)}>
      <SettingsToggle
        checked={value}
        onChange={setValue}
        label="Show labels on map"
      />
    </div>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    padding: whitespaceSizeConstants.m,
    width: "320px",
  },
});
