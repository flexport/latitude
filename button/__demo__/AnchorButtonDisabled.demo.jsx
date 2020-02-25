/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import AnchorButton from "../AnchorButton";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";

/**
 * @title Disabled AnchorButton
 */
export default function AnchorButtonDisabled() {
  return (
    <DeprecatedHorizontalGroup>
      <AnchorButton
        href="/design"
        intent="basic"
        kind="solid"
        label="Download"
        download={true}
      />
      <AnchorButton
        href="/design"
        intent="basic"
        kind="solid"
        disabled={true}
        label="Download"
        download={true}
      />
    </DeprecatedHorizontalGroup>
  );
}
