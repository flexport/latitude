/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import IconButton from "../IconButton";

/**
 * @title Bare icon button
 * @description Bare buttons retain normal button padding but have no button styles besides hover and focus states.
 */
export default function IconButtonBare() {
  return (
    <IconButton kind="bare" iconName="cog" type="button" onClick={() => null} />
  );
}
