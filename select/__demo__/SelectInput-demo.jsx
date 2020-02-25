/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import {type DemoFile} from "../../demoTypes";
import SelectInputBasicUsage from "./SelectInputBasicUsage.demo";
import SelectInputNullableUsage from "./SelectInputNullableUsage.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: SelectInputBasicUsage,
    },
    {
      type: "live",
      example: SelectInputNullableUsage,
    },
  ],
};

export default demos;
