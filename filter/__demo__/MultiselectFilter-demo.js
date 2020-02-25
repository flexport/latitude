/**
 * TEAM: frontend_infra
 * @flow
 */

import {type DemoFile} from "../../demoTypes";
import MultiselectFilterBasic from "./MultiselectFilterBasicUsage.demo";
import MultiselectFilterWithSearch from "./MultiselectFilterWithSearch.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      fullWidth: true,
      example: MultiselectFilterBasic,
    },
    {
      type: "live",
      fullWidth: true,
      example: MultiselectFilterWithSearch,
    },
  ],
};

export default demos;
