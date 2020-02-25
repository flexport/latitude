/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Badge from "../../Badge";
import Icon from "../../Icon";
/**
 * @title Basic usage on an icon
 * @description When wrapping an icon with the badge, it is recommended that the icon size be no smaller than 'l'.
 */
export default function BadgeBasicUsage() {
  return (
    <Badge count={12}>
      <Icon iconName="bell" size="l" />
    </Badge>
  );
}
