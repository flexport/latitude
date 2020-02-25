/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import AnchorIconButton from "../AnchorIconButton";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";

/**
 * @title Disabled
 */
export default function AnchorIconButtonDisabled() {
  return (
    <DeprecatedHorizontalGroup spacing="m">
      <AnchorIconButton
        href="/design"
        size="m"
        iconName="download"
        label="Download attachment"
      />
      <AnchorIconButton
        href="/design"
        disabled={true}
        size="m"
        iconName="download"
        label="Download attachment"
      />
    </DeprecatedHorizontalGroup>
  );
}
