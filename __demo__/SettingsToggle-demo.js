/**
 * TEAM: frontend_infra
 * @flow
 */

import type {DemoFile} from "../demoTypes";
import SettingsToggleBasicUsage from "./SettingsToggle/SettingsToggleBasicUsage.demo";
import SettingsToggleTable from "./SettingsToggle/SettingsToggleTable.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      example: SettingsToggleBasicUsage,
    },
    {
      type: "live",
      example: SettingsToggleTable,
    },
  ],
};

export default demos;
