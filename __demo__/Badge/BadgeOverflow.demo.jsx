/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Badge from "../../Badge";
import Icon from "../../Icon";
/**
 * @title Overflow
 * @description The max property determines the maximum numerical value displayed. Anything higher will be rendered as the max value with a plus sign
 */
export default function BadgeOverflow() {
  return (
    <Badge count={54} max={10}>
      <Icon iconName="bell" size="xl" />
    </Badge>
  );
}
