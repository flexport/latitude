/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Badge from "../../Badge";
import Button from "../../button/Button";
/**
 * @title Basic usage on a button
 */
export default function BadgeOnButton() {
  return (
    <Badge count={12}>
      <Button>Shipping Orders</Button>
    </Badge>
  );
}
