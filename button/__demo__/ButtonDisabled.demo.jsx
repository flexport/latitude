/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import Button from "../Button";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";

/**
 * @title Disabled Buttons
 */
export default function ButtonDisabled() {
  return (
    <DeprecatedHorizontalGroup mainAlign="end">
      <Button intent="basic" kind="solid" label="Submit" disabled={true} />
      <Button intent="basic" kind="hollow" label="Print" disabled={true} />
      <Button intent="basic" kind="bare" label="Add Report" disabled={true} />
    </DeprecatedHorizontalGroup>
  );
}
