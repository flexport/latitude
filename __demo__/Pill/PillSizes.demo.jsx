/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Group from "../../Group";
import Label from "../../Label";
import Pill from "../../Pill";

/**
 * @title Sizes
 */
export default function PillSizes() {
  return (
    <Group flexDirection="column">
      <Label value="Extra Small" />
      <Pill size="xs" onDismiss={() => {}}>
        ETD: Jan 01, 2019 CST
      </Pill>
      <Label value="Small" />
      <Pill size="s" onDismiss={() => {}}>
        ETD: Jan 01, 2019 CST
      </Pill>
      <Label value="Medium" />
      <Pill size="m" onDismiss={() => {}}>
        ETD: Jan 01, 2019 CST
      </Pill>
      <Label value="Large" />
      <Pill size="l" onDismiss={() => {}}>
        ETD: Jan 01, 2019 CST
      </Pill>
    </Group>
  );
}
