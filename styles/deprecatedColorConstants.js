/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow strict
 */

/*
 *
 * DEPRECATED! Do not use these colors. Use the colors defined in latitude/colors.js
 *
 * Most colors should have an easily identifiable equivalent in the new palette. Reach
 * out to frontend_infra or your designer if you have trouble finding the right color.
 *
 * */

import colors from "../colors";

export type DeprecatedColorScheme = {|
  +primary: string, // primary action color
  +warning: string, // warnings, delays, attention
  +success: string, // success, completion
  +black: string, // primary font color
  // greys: three main shades
  +darkGrey: string,
  +grey: string,
  +lightGrey: string,
  +utilityGrey: string, // for borders
  +offWhite: string, // for backgrounds and zebra stripes
  +white: string,
  +danger: string, // use rarely, only for irreversible actions
|};

const deprecatedColors: DeprecatedColorScheme = {
  primary: colors.blue30, // blue
  warning: colors.orange50, // orange
  success: colors.green30, // bright green
  black: colors.grey60,
  darkGrey: colors.grey50,
  grey: colors.grey50,
  lightGrey: colors.grey30,
  utilityGrey: colors.grey20, // even lighter grey
  offWhite: colors.grey10, // lighter still
  white: colors.white,
  danger: colors.red40, // red
};

export default deprecatedColors;

export type DeprecatedColor = $Keys<typeof deprecatedColors>;
