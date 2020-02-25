/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import type {DemoFile} from "../demoTypes";
import TextLinkBasicUsage from "./TextLink/TextLinkBasicUsage.demo";
import TextLinkStyles from "./TextLink/TextLinkStyles.demo";
import TextLinkInText from "./TextLink/TextLinkInText.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "text",
      title: "Why is this a component?",
      description:
        "We use links quite often and this component makes styling and adding links easy and consistent.",
    },
    {
      type: "live",
      example: TextLinkBasicUsage,
    },
    {
      type: "live",
      example: TextLinkStyles,
    },
    {
      type: "live",
      example: TextLinkInText,
    },
  ],
};
export default demos;
