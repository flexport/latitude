/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Text from "../../Text";

/**
 * @title Nested Text
 */
export default function TextNested() {
  return (
    <Text>
      Cool story, <Text weight="bold">bro</Text>.
    </Text>
  );
}
