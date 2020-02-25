/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import IconButton from "../IconButton";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";

/**
 * @title Intents
 */
export default function IconButtonIntents() {
  return (
    <DeprecatedHorizontalGroup>
      <IconButton
        kind="hollow"
        iconName="print"
        intent="basic"
        type="button"
        onClick={() => null}
      />
      <IconButton
        kind="hollow"
        iconName="add"
        type="button"
        onClick={() => null}
      />
      <IconButton
        kind="hollow"
        iconName="cancel"
        intent="danger"
        type="button"
        onClick={() => null}
      />
    </DeprecatedHorizontalGroup>
  );
}
