/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Group from "../../Group";
import Banner from "../../Banner";
import Button from "../../button/Button";

/**
 * @title Banner without close button
 * @description Ommitting the closeButton callback will cause the close button to be omitted.
 */
export default function BannerWithoutCloseButton() {
  return (
    <Group flexDirection="column" gap={40}>
      <Banner
        iconName="attention"
        intent="warning"
        message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
        ctaButton={
          <Button label="Create a new log" kind="blank" intent="basic" />
        }
      />
    </Group>
  );
}
