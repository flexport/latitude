/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import Group from "../../Group";
import Toast from "../Toast";

/**
 * @title Toast with an Action
 * @description The toast component can take in a action prop which if specified will cause an action button to appear on the Toast.
 */
export default function ToastActions() {
  return (
    <Group flexDirection="column">
      <Toast
        message="Email has been archived"
        action={{
          type: "undo",
          onClick: () => {},
        }}
      />
      <Toast
        message="Transaction FLEX-852635 Pending"
        intent="success"
        action={{
          type: "refresh",
          onClick: () => {},
        }}
      />
      <Toast
        message="Flex-950273 has been deleted"
        intent="danger"
        action={{
          type: "undo",
          onClick: () => {},
        }}
      />
    </Group>
  );
}
