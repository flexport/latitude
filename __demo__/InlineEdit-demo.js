/**
 * TEAM: frontend_infra
 * @flow
 */

import type {DemoFile} from "../demoTypes";

import InlineEditBasicUsage from "./InlineEdit/InlineEditBasicUsage.demo";
import InlineEditPencil from "./InlineEdit/InlineEditPencil.demo";
import InlineEditMultipleTypes from "./InlineEdit/InlineEditMultipleTypes.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: InlineEditBasicUsage,
    },
    {
      type: "live",
      example: InlineEditPencil,
    },
    {
      type: "live",
      fullWidth: true,
      example: InlineEditMultipleTypes,
    },
  ],
};

export default demos;
