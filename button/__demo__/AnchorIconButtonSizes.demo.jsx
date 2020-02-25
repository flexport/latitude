/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import AnchorIconButton from "../AnchorIconButton";
import DeprecatedVerticalGroup from "../../DeprecatedVerticalGroup";

/**
 * @title Sizes
 */
export default function AnchorIconButtonBasicUsage() {
  return (
    <DeprecatedVerticalGroup spacing="m">
      <AnchorIconButton
        href="/design"
        size="s"
        iconName="download"
        label="Download attachment"
      />
      <AnchorIconButton
        href="/design"
        size="m"
        iconName="download"
        label="Download attachment"
      />
      <AnchorIconButton
        href="/design"
        size="l"
        iconName="download"
        label="Download attachment"
      />
    </DeprecatedVerticalGroup>
  );
}
