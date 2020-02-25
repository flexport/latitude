/**
 * TEAM: frontend_infra
 * @flow strict
 */

import {createThemedStylesheet, type ThemeData} from "./";
import {TRANSMISSION} from "../context/ThemeNameContext";
import latitudeColors, {transmissionColors} from "../colors";

export type LinkStyle = "default" | "emphasized" | "inverse" | "subtle";

const linkStyles = createThemedStylesheet(({themeName}: ThemeData) => {
  const primary30 =
    themeName === TRANSMISSION
      ? transmissionColors.green40
      : latitudeColors.indigo30;
  const primary40 =
    themeName === TRANSMISSION
      ? transmissionColors.green50
      : latitudeColors.indigo40;

  return {
    default: {
      color: latitudeColors.black,
      fill: latitudeColors.black,
      textDecoration: "underline",
      textDecorationColor: latitudeColors.black,
    },
    emphasized: {
      color: primary30,
      fill: primary30,
      textDecoration: "underline",
      textDecorationColor: primary30,
      ":hover": {
        color: primary40,
        fill: primary40,
        textDecorationColor: primary40,
      },
      transitionProperty: "color, fill, textDecorationColor",
      transitionDuration: "0.125s",
      transitionTimingFunction: "ease",
    },
    inverse: {
      color: latitudeColors.white,
      fill: latitudeColors.white,
      textDecoration: "underline",
      textDecorationColor: latitudeColors.white,
      ":hover": {
        color: latitudeColors.grey20,
        fill: latitudeColors.grey20,
        textDecorationColor: latitudeColors.grey20,
      },
      transitionProperty: "color, fill, textDecorationColor",
      transitionDuration: "0.125s",
      transitionTimingFunction: "ease",
    },
    subtle: {
      color: latitudeColors.grey40,
      fill: latitudeColors.grey40,
      textDecoration: "underline",
      textDecorationColor: latitudeColors.grey40,
      ":hover": {
        color: latitudeColors.black,
        fill: latitudeColors.black,
        textDecorationColor: latitudeColors.black,
      },
      transitionProperty: "color, fill, textDecorationColor",
      transitionDuration: "0.125s",
      transitionTimingFunction: "ease",
    },
  };
});

export default linkStyles;
