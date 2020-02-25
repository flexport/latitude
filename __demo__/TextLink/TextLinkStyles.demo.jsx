/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import TextLink from "../../TextLink";

/**
 * @title Styles
 */
export default function TextLinkStyles() {
  return (
    <TextLink
      linkStyle="subtle"
      href="/careers/department/engineering"
      disableSpaHijack={true}
    >
      Subtle links aren&apos;t blue.
    </TextLink>
  );
}
