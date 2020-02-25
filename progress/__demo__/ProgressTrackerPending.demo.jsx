/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";

import ProgressTracker from "../ProgressTracker";

/**
 * @title Pending
 * @description A shipment is at its origin location but has not yet departed.
 */
export default function ProgressTrackerPending() {
  return <ProgressTracker progressIcon="ship" progress={0} />;
}
