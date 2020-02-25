/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import Flag from "../../Flag";
import Text from "../../Text";
import DeprecatedVerticalGroup from "../../DeprecatedVerticalGroup";

/**
 * @title In-practice example
 */
export default function FlagInPractice() {
  return (
    <DeprecatedVerticalGroup>
      <Flag countryCode="CA" maxWidth={32} />
      <Text weight="bold" scale="title">
        Canada
      </Text>
      <Text>Pretty great, eh?</Text>
    </DeprecatedVerticalGroup>
  );
}
