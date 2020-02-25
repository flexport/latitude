/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import AnchorButton from "../AnchorButton";

/**
 * @title Basic Usage
 * @description Solid buttons should be the singular and primary action on a page. Choose an intent that represents the goal and priority of the action.
 */
export default function AnchorButtonBasicUsage() {
  return (
    <AnchorButton
      href="/design"
      intent="basic"
      kind="hollow"
      label="Open in NetCHB"
    />
  );
}
