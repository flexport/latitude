/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import IconButton from "../IconButton";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";

/**
 * @title Icon Alignment
 */
export default function IconButtonAlignment() {
  return (
    <DeprecatedHorizontalGroup>
      <IconButton
        iconName="search"
        label="Container Id"
        type="button"
        onClick={() => null}
      />
      <IconButton
        iconName="search"
        iconAlignment="right"
        label="Container Id"
        type="button"
        onClick={() => null}
      />
    </DeprecatedHorizontalGroup>
  );
}
