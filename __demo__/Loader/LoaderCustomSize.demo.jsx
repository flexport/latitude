/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Loader from "../../Loader";

/**
 * @title Custom Size
 * @description Loaders are 50px square by default, but this size can be overridden using the size prop.
 */
export default function LoaderCustomSize() {
  return <Loader loaded={false} size={36} />;
}
