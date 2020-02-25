/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Group from "../../Group";
import Badge from "../../Badge";
import Text from "../../Text";
/**
 * @title Standalone
 * @description When the badge is not wrapping anything, it is standalone. It can then be positioned and used like a normal inline element
 */
export default function BadgeStandalone() {
  return (
    <Group>
      <Text>Notifications</Text>
      <Badge intent="pending" count={54} />
    </Group>
  );
}
