/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Group from "../../Group";
import Badge from "../../Badge";
import Icon from "../../Icon";
import Button from "../../button/Button";

/**
 * @title Count is boolean
 * @description When the count is a boolean, the badge is rendered as a dot as long as count is true
 */
export default function BadgeBooleanCount() {
  return (
    <Group>
      <Badge count={true}>
        <Button>Shipping Orders</Button>
      </Badge>
      <Badge count={true}>
        <Icon iconName="bell" size="xl" />
      </Badge>
    </Group>
  );
}
