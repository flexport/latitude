/**
 * TEAM: frontend_infra
 * @flow
 */

import type {DemoFile} from "../demoTypes";
import GroupBasicUsage from "./Group/GroupBasicUsage.demo";
import GroupCommon from "./Group/GroupCommon.demo";
import GroupAlignment from "./Group/GroupAlignment.demo";
import GroupNesting from "./Group/GroupNesting.demo";
import GroupFillChildren from "./Group/GroupFillChildren.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: GroupBasicUsage,
    },
    {
      type: "live",
      example: GroupCommon,
    },
    {
      type: "live",
      example: GroupAlignment,
    },
    {
      type: "live",
      example: GroupNesting,
    },
    {
      type: "live",
      example: GroupFillChildren,
    },
  ],
};

export default demos;
