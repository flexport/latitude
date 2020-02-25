/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";

import ProgressTracker from "../ProgressTracker";

/**
 * @title Active with Error
 * @description A shipment is in transit with exceptions.
 */
export default function ProgressTrackerActiveError() {
  return <ProgressTracker progressIcon="ship" progress={0.75} error={true} />;
}
