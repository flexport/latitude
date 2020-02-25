/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

import {memoize} from "lodash";
import colors from "../colors";
import getThemeColors from "../styles/getThemeColors";
import graphicIconsConstants, {
  graphicIconNames,
  type GraphicIcons as GIcons,
} from "./graphicIconsConstants";
import {TRANSMISSION, type Theme} from "../context/ThemeNameContext";

// TO-DO(notandrewkaye): We need to figure out what to do about this use-case
const getBrighterPrimary = (theme: Theme) =>
  theme === TRANSMISSION ? "#29D890" : "#6494ff";

const _getGraphicIcons = memoize((theme: Theme) => {
  const themeColors = getThemeColors(theme);
  const {primary} = themeColors;
  const brighterPrimary = getBrighterPrimary(theme);
  const icons = {};
  Object.keys(graphicIconsConstants).forEach((key: GIcons) => {
    icons[key] = graphicIconsConstants[key](colors[primary], brighterPrimary);
  });
  return icons;
});

export type GraphicIcons = GIcons;

export {graphicIconNames};

export const graphicIcons = _getGraphicIcons;
