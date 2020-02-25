/**
 * TEAM: frontend_infra
 * @flow
 */

import type {DemoFile} from "../demoTypes";
import MultiInputBasicUsage from "./MultiInput/MultiInputBasicUsage.demo";
import MultiInputComma from "./MultiInput/MultiInputComma.demo";
import MultiInputSizes from "./MultiInput/MultiInputSizes.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: MultiInputBasicUsage,
    },
    {
      type: "live",
      example: MultiInputComma,
    },
    {
      type: "live",
      example: MultiInputSizes,
    },
  ],
};

export default demos;
