/**
 * TEAM: frontend_infra
 * @flow
 */

import {type DemoFile} from "../../demoTypes";
import NotificationModalBasic from "./NotificationModalBasic.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      fullWidth: true,
      example: NotificationModalBasic,
    },
  ],
};

export default demos;
