/**
 * TEAM: frontend_infra
 * @flow
 */

import type {DemoFile} from "../demoTypes";
import BadgeBasicUsage from "./Badge/BadgeBasicUsage.demo";
import BadgeOnButton from "./Badge/BadgeOnButton.demo";
import BadgeOverflow from "./Badge/BadgeOverflow.demo";
import BadgeStandalone from "./Badge/BadgeStandalone.demo";
import BadgeBooleanCount from "./Badge/BadgeBooleanCount.demo";
import BadgeIntent from "./Badge/BadgeIntent.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: BadgeBasicUsage,
    },
    {
      type: "live",
      example: BadgeOnButton,
    },
    {
      type: "live",
      example: BadgeOverflow,
    },
    {
      type: "live",
      example: BadgeStandalone,
    },
    {
      type: "live",
      example: BadgeBooleanCount,
    },
    {
      type: "live",
      example: BadgeIntent,
    },
  ],
};

export default demos;
