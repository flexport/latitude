/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import type {DemoFile} from "../../demoTypes";
import AnchorButtonBasicUsage from "./AnchorButtonBasicUsage.demo";
import AnchorButtonDisabled from "./AnchorButtonDisabled.demo";
import AnchorButtonKinds from "./AnchorButtonKinds.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: AnchorButtonBasicUsage,
    },
    {
      type: "live",
      example: AnchorButtonDisabled,
    },
    {
      type: "live",
      example: AnchorButtonKinds,
    },
  ],
};

export default demos;
