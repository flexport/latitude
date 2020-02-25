/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import IconButton from "../IconButton";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";

/**
 * @title Icon with label
 */
export default function IconButtonLabel() {
  return (
    <DeprecatedHorizontalGroup>
      <IconButton
        iconName="ship"
        kind="hollow"
        label="Shipments"
        type="button"
        onClick={() => null}
      />
      <IconButton
        iconName="truck"
        kind="bare"
        label="Deliveries"
        type="button"
        onClick={() => null}
      />
    </DeprecatedHorizontalGroup>
  );
}
