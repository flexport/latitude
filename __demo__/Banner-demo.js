/**
 * TEAM: frontend_infra
 * @flow
 */

import type {DemoFile} from "../demoTypes";
import BannerBasicUsage from "./Banner/BannerBasicUsage.demo";
import BannerActionableButton from "./Banner/BannerActionableButton.demo";
import BannerWithoutCloseButton from "./Banner/BannerWithoutCloseButton.demo";
import BannerDarkBackground from "./Banner/BannerDarkBackground.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      fullWidth: true,
      example: BannerBasicUsage,
    },
    {
      type: "live",
      fullWidth: true,
      example: BannerActionableButton,
    },
    {
      type: "live",
      fullWidth: true,
      example: BannerWithoutCloseButton,
    },
    {
      type: "live",
      fullWidth: true,
      example: BannerDarkBackground,
    },
  ],
};

export default demos;
