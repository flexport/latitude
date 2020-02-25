/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Loader from "../../Loader";

/**
 * @title Inline
 * @description The isFullWidth prop will return an inline-block Loader when set to false. This can be useful for times when you need to apply special formatting to the loader.
 */
export default function LoaderInline() {
  return <Loader loaded={false} isFullWidth={false} />;
}
