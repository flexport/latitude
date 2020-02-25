/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import type {DemoFile} from "../../demoTypes";

import AnchorIconButtonBasicUsage from "./AnchorIconButtonBasicUsage.demo";
import AnchorIconButtonDisabled from "./AnchorIconButtonDisabled.demo";
import AnchorIconButtonNewTab from "./AnchorIconButtonNewTab.demo";
import AnchorIconButtonSizes from "./AnchorIconButtonSizes.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: AnchorIconButtonBasicUsage,
    },
    {
      type: "live",
      example: AnchorIconButtonSizes,
    },
    {
      type: "live",
      example: AnchorIconButtonNewTab,
    },
    {
      type: "live",
      example: AnchorIconButtonDisabled,
    },
  ],
};

export default demos;
