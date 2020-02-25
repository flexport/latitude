/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import type {DemoFile} from "../demoTypes";
import TextScale from "./Text/TextScale.demo";
import TextWeight from "./Text/TextWeight.demo";
import TextNested from "./Text/TextNested.demo";
import TextItalicized from "./Text/TextItalicized.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: TextScale,
    },
    {
      type: "live",
      example: TextWeight,
    },
    {
      type: "live",
      example: TextNested,
    },
    {
      type: "live",
      example: TextItalicized,
    },
  ],
};

export default demos;
