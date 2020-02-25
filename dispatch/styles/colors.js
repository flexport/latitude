/**
 * TEAM: trucking
 *
 * @flow strict
 */

import {StyleSheet, css} from "aphrodite";
import deprecatedColors, {
  type DeprecatedColorScheme,
} from "../../styles/deprecatedColorConstants";
import type {Color} from "../../colors";

export type DeprecatedColor = $Keys<typeof deprecatedColors>;

//////////////////
// Color constants
//////////////////

const colors: DeprecatedColorScheme = {
  ...deprecatedColors,
  primary: "#12B873", // primary green, somewhat darker than success green
};

// ! from "latitude/colors": colors["green40"] = "#12B873"
export const primaryColor: Color = "green40";

export default colors;

export const transmissionBrandGrey = "#34404a"; // MARKETING ONLY

export const iconColor = (color: string) => ({
  ".svgIcon:not(.svgDetailed)": {
    ":not(.svgTwoTone)": {
      path: {
        fill: color,
      },
    },
    ".svgTwoTone": {
      ".lightFill": {
        fill: "#ffffff",
      },
      ".darkFill": {
        fill: color,
      },
    },
  },
});

export const styles = StyleSheet.create({
  colorPrimary: {
    color: colors.primary,
  },
  colorBackground: {
    color: colors.white,
  },
  iconColorPrimary: iconColor(colors.primary),
  iconColorBackground: iconColor(colors.white),
  backgroundColorPrimary: {
    backgroundColor: colors.primary,
  },
  borderPrimary: {
    border: `1px ${colors.primary} solid`,
  },
});

export function primaryColorCssClassname() {
  return css(styles.colorPrimary, styles.iconColorPrimary);
}
