/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import type {DemoFile} from "../../demoTypes";
import FormSectionBasic from "./FormSectionBasic.demo";
import FormSectionColumnWidth from "./FormSectionColumnWidth.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: FormSectionBasic,
    },
    {
      type: "live",
      example: FormSectionColumnWidth,
    },
  ],
};

export default demos;
