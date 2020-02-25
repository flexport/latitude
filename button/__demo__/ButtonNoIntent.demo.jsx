/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import Button from "../Button";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";

/**
 * @title No Intent
 * @description Hollow and bare buttons have the option to specify no intent. For a set of actions or an action that does not have special significance you can use intent='none'.
 */
export default function ButtonNoIntent() {
  return (
    <DeprecatedHorizontalGroup>
      <Button kind="hollow" intent="none" label="Cancel" />
      <Button kind="bare" intent="none" label="Cancel" />
    </DeprecatedHorizontalGroup>
  );
}
