/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import type {DemoFile} from "../demoTypes";

import IconBasicUsage from "./Icon/IconBasicUsage.demo";
import IconAdjustments from "./Icon/IconAdjustments.demo";
import IconCustomColor from "./Icon/IconCustomColor.demo";
import IconAlignment from "./Icon/IconAlignment.demo";
import IconCustomSize from "./Icon/IconCustomSize.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: IconBasicUsage,
    },
    {
      type: "live",
      example: IconAdjustments,
    },
    {
      type: "live",
      example: IconCustomColor,
    },
    {
      type: "live",
      example: IconAlignment,
    },
    {
      type: "live",
      example: IconCustomSize,
    },
  ],
};

export default demos;
