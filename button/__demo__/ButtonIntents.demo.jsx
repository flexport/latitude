/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import Button from "../Button";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";

/**
 * @title Button Intents
 */
export default function ButtonIntents() {
  return (
    <DeprecatedHorizontalGroup>
      <Button intent="basic" kind="solid" label="Basic" />
      <Button intent="danger" kind="solid" label="Danger" />
    </DeprecatedHorizontalGroup>
  );
}
