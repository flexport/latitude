/**
 * TEAM: frontend_infra
 * @flow
 */

import {type DemoFile} from "../../demoTypes";

import ToastBasicUsage from "./ToastBasicUsage.demo";
import ToastAnatomy from "./ToastAnatomy.demo";
import ToastIntent from "./ToastIntent.demo";
import ToastActions from "./ToastActions.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      fullWidth: true,
      example: ToastBasicUsage,
    },
    {
      type: "live",
      example: ToastAnatomy,
    },
    {
      type: "live",
      example: ToastIntent,
    },
    {
      type: "live",
      example: ToastActions,
    },
  ],
};

export default demos;
