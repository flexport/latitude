/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

import type {Theme} from "../context/ThemeNameContext";
import themeColorMaps from "./themeColorMaps";
import {type Color} from "../colors";

export type ThemeColors = {|
  +primary: Color,
  +brand: Color,
|};

export default function getThemeColors(theme: Theme): ThemeColors {
  return themeColorMaps[theme];
}
