/**
 * TEAM: frontend_infra
 * @flow strict
 */

const colors = Object.freeze({
  black: "#272C34",
  white: "#FFFFFF",
  grey10: "#F7F9FD",
  grey20: "#DAE3F3",
  grey30: "#C5D2E7",
  grey40: "#67768D",
  grey50: "#4B5564",
  grey60: "#39414D",
  red10: "#FFF5F5",
  red20: "#FDA6A6",
  red30: "#FA5959",
  red40: "#D92736",
  red50: "#BA0202",
  red60: "#800000",
  orange10: "#FFF7F0",
  orange20: "#FAC69D",
  orange30: "#F5954D",
  orange40: "#DA5A00",
  orange50: "#A64300",
  orange60: "#5C2500",
  blue10: "#F5FCFF",
  blue20: "#C2E0EF",
  blue30: "#94C1DF",
  blue40: "#6294BE",
  blue50: "#326089",
  blue60: "#0F2943",
  green10: "#F5FFFC",
  green20: "#BAF8EA",
  green30: "#82F2DA",
  green40: "#45DABE",
  green50: "#1DB595",
  green60: "#008062",
  purple10: "#F9F5FF",
  purple20: "#CEA1FA",
  purple30: "#AF50F5",
  purple40: "#9200DA",
  purple50: "#7700A6",
  purple60: "#43005C",
  indigo10: "#F5F6FF",
  indigo20: "#A2ACF2",
  indigo30: "#566AE5",
  indigo40: "#0723D8",
  indigo50: "#031ABA",
  indigo60: "#00108C",
});

export default colors;

export const transmissionColors = Object.freeze({
  green10: "#EBFFF1",
  green20: "#B0EBC3",
  green30: "#66CC86",
  green40: "#12B873",
  green50: "#2DA854",
  green60: "#124D25",
});

export type ColorPalette = typeof colors;
export type Color = $Keys<ColorPalette>;
export type ColorValue = $Values<ColorPalette>;
