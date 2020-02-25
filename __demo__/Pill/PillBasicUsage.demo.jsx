/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Pill from "../../Pill";

/**
 * @title Basic Usage
 */
export default function PillBasicUsage() {
  return <Pill onDismiss={() => {}}>ETD: Jan 01, 2019 CST</Pill>;
}
