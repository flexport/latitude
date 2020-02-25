/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import ProgressBar from "../ProgressBar";

/**
 * @title Indefinite progress
 */
export default function ProgressBarIndefinite() {
  return (
    <ProgressBar loaded={false}>
      This content only appears once loaded is true
    </ProgressBar>
  );
}
