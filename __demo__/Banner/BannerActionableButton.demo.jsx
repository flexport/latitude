/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import Group from "../../Group";
import Banner from "../../Banner";
import Button from "../../button/Button";

/**
 * @title Banner With Actionable Button
 * @description Banners can become actionable with the addition of a button.
 */
export default function BannerActionableButton() {
  return (
    <Group flexDirection="column" gap={40}>
      <Banner
        iconName="attention"
        message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
        onClose={() => {}}
        ctaButton={
          <Button label="Create a new log" kind="blank" intent="basic" />
        }
      />
    </Group>
  );
}
