/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Loader from "../../Loader";

/**
 * @title Basic Usage
 * @description By default, Loader will span the full width of it's container and center the spinner.
 */
export default function LoaderBasicUsage() {
  return (
    <Loader loaded={false}>
      This content only appears once loaded is true
    </Loader>
  );
}
