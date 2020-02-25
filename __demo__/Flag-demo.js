/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import type {DemoFile} from "../demoTypes";
import FlagBasicUsage from "./Flag/FlagBasicUsage.demo";
import FlagInPractice from "./Flag/FlagInPractice.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "text",
      title: "Information",
      description:
        "This component implements ~250 [ISO 3166-1 alpha 2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) flags. The flags have been standardized on a square grid, but the majority are rectangular which leads to vertical padding _built-in_ to the component (because most flags are rectangular). ",
    },
    {
      type: "live",
      example: FlagBasicUsage,
    },
    {
      type: "live",
      example: FlagInPractice,
    },
  ],
};

export default demos;
