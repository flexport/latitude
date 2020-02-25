/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import AnchorIconButton from "../AnchorIconButton";

/**
 * @title Open in new tab
 * @description Optionally specify that the link should open in a new tab.
 */
export default function AnchorIconButtonNewTab() {
  return (
    <AnchorIconButton
      kind="blank"
      iconName="rocket"
      href="https://google.com"
      disableSpaHijack={true}
      openInNewTab={true}
    />
  );
}
