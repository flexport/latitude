/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import HelpTooltip from "../../HelpTooltip";
import Text from "../../Text";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";

/**
 * @title Help Tooltip next to Text
 */
export default function HelpTooltipText() {
  return (
    <DeprecatedHorizontalGroup>
      <Text>Check me out</Text>
      <HelpTooltip text="This is a tooltip" />
    </DeprecatedHorizontalGroup>
  );
}
