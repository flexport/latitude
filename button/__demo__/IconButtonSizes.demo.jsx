/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import IconButton from "../IconButton";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";

/**
 * @title Sizes
 */
export default function IconButtonSizes() {
  return (
    <DeprecatedHorizontalGroup>
      <IconButton
        iconName="rocket"
        kind="hollow"
        size="s"
        type="button"
        onClick={() => null}
      />
      <IconButton
        iconName="rocket"
        kind="hollow"
        type="button"
        onClick={() => null}
      />
      <IconButton
        iconName="rocket"
        kind="hollow"
        size="l"
        type="button"
        onClick={() => null}
      />
      <IconButton
        iconName="rocket"
        kind="hollow"
        size="l"
        type="button"
        onClick={() => null}
        height={{type: "customDontUse", height: 60}}
      />
    </DeprecatedHorizontalGroup>
  );
}
