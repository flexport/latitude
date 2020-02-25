/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import type {DemoFile} from "../demoTypes";
import HelpTooltipBasicUsage from "./HelpTooltip/HelpTooltipBasicUsage.demo";
import HelpTooltipText from "./HelpTooltip/HelpTooltipText.demo";
import HelpTooltipCustomIcon from "./HelpTooltip/HelpTooltipCustomIcon.demo";
import HelpTooltipCustomPosition from "./HelpTooltip/HelpTooltipCustomPosition.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: HelpTooltipBasicUsage,
    },
    {
      type: "live",
      example: HelpTooltipText,
    },
    {
      type: "live",
      example: HelpTooltipCustomIcon,
    },
    {
      type: "live",
      example: HelpTooltipCustomPosition,
    },
  ],
};
export default demos;
