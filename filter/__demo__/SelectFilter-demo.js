/**
 * TEAM: frontend_infra
 * @flow
 */

import type {DemoFile} from "../../demoTypes";
import SelectFilterBasic from "./SelectFilterBasicUsage.demo";
import SelectFilterNullable from "./SelectFilterNullable.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      fullWidth: true,
      example: SelectFilterBasic,
    },
    {
      type: "live",
      fullWidth: true,
      example: SelectFilterNullable,
    },
  ],
};

export default demos;
