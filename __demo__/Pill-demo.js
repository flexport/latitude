/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import {type DemoFile} from "../demoTypes";

import PillBasicUsage from "./Pill/PillBasicUsage.demo";
import PillInPractice from "./Pill/PillInPractice.demo";
import PillSizes from "./Pill/PillSizes.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: PillBasicUsage,
    },
    {
      type: "live",
      example: PillInPractice,
    },
    {
      type: "live",
      example: PillSizes,
    },
  ],
};

export default demos;
