/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";

import ProgressTracker from "../ProgressTracker";

/**
 * @title Completed ProgressTracker
 * @description When shipment is at its final destination.
 */
export default function ProgressTrackerCompleted() {
  return <ProgressTracker progressIcon="ship" progress={1} />;
}
