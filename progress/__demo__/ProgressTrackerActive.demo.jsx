/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";

import ProgressTracker from "../ProgressTracker";

/**
 * @title Active
 * @description A shipment is in transit.
 */
export default function ProgressTrackerActive() {
  return <ProgressTracker progressIcon="ship" progress={0.25} />;
}
