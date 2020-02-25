/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Text from "../../Text";
import TextLink from "../../TextLink";

/**
 * @title Text and Link
 */
export default function TextLinkInText() {
  return (
    <Text>
      Wouldn&apos;t it be nice if everything were this{" "}
      <TextLink href="https://en.wikipedia.org/wiki/Freight_forwarder">
        easy
      </TextLink>
      .
    </Text>
  );
}
