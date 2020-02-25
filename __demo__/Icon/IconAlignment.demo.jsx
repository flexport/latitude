/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";
import Icon from "../../Icon";
import Text from "../../Text";

/**
 * @title Alignment
 */
export default function IconAlignment() {
  return (
    <DeprecatedHorizontalGroup>
      <Text scale="subtext">Up and to the right</Text>
      <Icon iconName="chartLine" alignment="center" />
    </DeprecatedHorizontalGroup>
  );
}
