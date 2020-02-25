/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";

import ProgressTracker from "../ProgressTracker";

/**
 * @title Basic usage of ProgressTracker
 * @description The ProgressTracker accepts an icon name for the progress node, and a decimal value of completion.
 */
export default function ProgressTrackerBasicUsage() {
  return (
    <ProgressTracker
      progressIcon="ship"
      progress={0.5}
      startIcon="warehouse"
      endIcon="home"
      label="In transit to arrival port"
      error={false}
    />
  );
}
