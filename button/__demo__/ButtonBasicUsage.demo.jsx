/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import Button from "../Button";

/**
 * @title Basic Usage
 * @description Solid buttons should be the singular and primary action on a page. Choose an intent that represents the goal and priority of the action.
 */
export default function ButtonBasicUsage() {
  return <Button intent="basic" kind="solid" label="Dope" />;
}
