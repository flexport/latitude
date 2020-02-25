/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Badge from "../../Badge";
import Group from "../../Group";
/**
 * @title Intent
 * @description The Intent prop can be used to create badges of different colors, conveying different meanings
 */
export default function BadgeIntent() {
  return (
    <Group>
      <Badge intent="ready" count={12} />
      <Badge intent="ready-green" count={30} />
      <Badge intent="pending" count={54} />
      <Badge intent="error" count={8} />
      <Badge intent="complete" count={231} />
    </Group>
  );
}
