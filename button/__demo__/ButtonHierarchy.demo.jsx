/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import Button from "../Button";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";

/**
 * @title Hierarchy Example
 */
export default function ButtonNoIntent() {
  return (
    <DeprecatedHorizontalGroup mainAlign="end">
      <Button intent="danger" kind="bare" label="Archive" />
      <Button intent="none" kind="hollow" label="Cancel" />
      <Button intent="basic" kind="solid" label="Save" />
    </DeprecatedHorizontalGroup>
  );
}
