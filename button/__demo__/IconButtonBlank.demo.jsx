/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import IconButton from "../IconButton";

/**
 * @title Blank Buttons
 * @description Blank buttons abandon all button styles except hover and focus states.
 */
export default function IconButtonBare() {
  return (
    <IconButton
      kind="blank"
      iconName="rocket"
      size="l"
      type="button"
      onClick={() => null}
    />
  );
}
