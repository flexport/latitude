/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import type {DemoFile} from "../../demoTypes";
import ButtonBasicUsage from "./ButtonBasicUsage.demo";
import ButtonDisabled from "./ButtonDisabled.demo";
import ButtonHierarchy from "./ButtonHierarchy.demo";
import ButtonIntents from "./ButtonIntents.demo";
import ButtonNoIntent from "./ButtonNoIntent.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: ButtonBasicUsage,
    },
    {
      type: "live",
      example: ButtonIntents,
    },
    {
      type: "live",
      example: ButtonNoIntent,
    },
    {
      type: "live",
      example: ButtonHierarchy,
    },
    {
      type: "live",
      example: ButtonDisabled,
    },
  ],
};

export default demos;
