/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import Group from "../../Group";
import Toast from "../Toast";

/**
 * @title Intent
 * @description The toast intent reinforces the message and help to convey meaning to the user.
 */
export default function ToastIntent() {
  return (
    <Group flexDirection="column">
      <Toast message="Cargo ready date has been updated" />
      <Toast message="Email has been sent" intent="success" />
      <Toast message="Flex-456634 has been deleted" intent="danger" />
    </Group>
  );
}
