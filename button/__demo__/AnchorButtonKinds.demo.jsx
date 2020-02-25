/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import AnchorButton from "../AnchorButton";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";

/**
 * @title AnchorButton kinds
 */
export default function AnchorButtonBasicUsage() {
  return (
    <DeprecatedHorizontalGroup>
      <AnchorButton href="/design" intent="basic" kind="solid" label="Open" />
      <AnchorButton href="/design" intent="basic" kind="hollow" label="Open" />
      <AnchorButton href="/design" intent="basic" kind="blank" label="Open" />
    </DeprecatedHorizontalGroup>
  );
}
