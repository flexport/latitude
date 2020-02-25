/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow strict
 */
import {
  css,
  StyleSheet,
  type SheetEntry,
  type SheetDefinition,
} from "aphrodite";
import {memoize} from "lodash";
import {type Theme, BASE} from "../context/ThemeNameContext";
import invariant from "../tools/invariant";
import {
  margin,
  padding,
  deprecatedPaddingSizeConstants,
} from "./deprecatedWhitespace";
import border from "./borders";
import {typeScale, fontWeights, fontStyles} from "./typography";
import themeColorMaps, {type ThemeColorMap} from "./themeColorMaps";
import getThemeColors, {type ThemeColors} from "./getThemeColors";

// quick styles
// our commly referenced base styles
export {margin, padding, deprecatedPaddingSizeConstants};
export {border};
export {typeScale, fontWeights, fontStyles};
export {css, StyleSheet};

/**
 * Use include(stylesheetRule) to merge a stylesheet rule into another
 * stylesheet rule. This is similar to @include in scss files.
 * For example if you want to create a table style that has a grey border:
 * const styles = StyleSheet.create({
 * table: {
 *  tableLayout: "fixed",
 *  ...border.a.s,
 *  ...include(borderColor.lightGrey),
 *  }
 * };
 */

export function include(style: SheetEntry): SheetDefinition {
  if (style == null) {
    return {};
  }
  invariant(style._definition != null, "Style must have a definition");
  return style._definition;
}

/**
 * At runtime, it is possible to determine what the CSS classname
 * of an aphrodite style sheet will be.
 *
 * This function wraps the internal method that reveals this information.
 *
 * You might use it like:
 * expect(element.find("input").props.className.
 *  indexOf(styleToClassname(styles.invalidStyles))).toBeGreaterThan(-1);
 *
 * @param {*} style
 */
export function styleToClassname(style: SheetEntry) {
  // $FlowFixMe(uforic)
  return style._name;
}

export type ThemeData = {|
  +themeName: Theme,
  +themeColors: ThemeColors,
  // only use to convert theme color, like primary, to a name, like blue40
  +colorMap: ThemeColorMap,
|};

export function getThemeData(theme: Theme = BASE): ThemeData {
  const colorMap = themeColorMaps[theme];
  const themeColors = getThemeColors(theme);
  const themeData: ThemeData = {
    colorMap,
    themeName: theme,
    themeColors,
  };
  return themeData;
}

/**
 * Utility function for writing stylesheets that are dependent on a theme.
 * This hides away the lodash memoize logic, as well as grabs the colors
 * that are required for a specific theme.
 */
export function createThemedStylesheet<T: {[name: string]: SheetDefinition}>(
  stylesheetFn: (themeColors: ThemeData) => T
): (theme: Theme) => $Call<typeof StyleSheet.create, T> {
  return memoize((theme: Theme) =>
    StyleSheet.create(stylesheetFn(getThemeData(theme)))
  );
}
