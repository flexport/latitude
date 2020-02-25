/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import GraphicIcon from "../../GraphicIcon";
/**
 * @title Modifiers
 * @description Some graphic icons have plus signs or 0's to represent an action. This icon would be perfect for an emptystate on our invoices table.
 */
export default function GraphicIconModifiers() {
  return <GraphicIcon icon="invoices_none" />;
}
