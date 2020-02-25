/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow strict
 */

import {type Theme, TRANSMISSION, BASE} from "../context/ThemeNameContext";
import type {Color} from "../colors";

export type ThemeColorMap = {|
  +primary: Color,
  +brand: Color,
|};

const themeColorMaps: {[Theme]: ThemeColorMap} = {
  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  [BASE]: Object.freeze({
    primary: "blue30",
    brand: "blue40",
  }),
  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  [TRANSMISSION]: Object.freeze({
    primary: "green40",
    brand: "green30",
  }),
};

export default themeColorMaps;
