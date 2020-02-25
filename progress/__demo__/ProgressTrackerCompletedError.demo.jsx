/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";

import ProgressTracker from "../ProgressTracker";

/**
 * @title Completed with Error
 * @description A shipment is at its destination but there are exceptions.
 */
export default function ProgressTrackerCompletedError() {
  return <ProgressTracker progressIcon="ship" progress={1} error={true} />;
}
