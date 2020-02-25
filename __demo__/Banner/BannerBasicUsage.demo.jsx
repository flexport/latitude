/**
 * TEAM: frontend_infra
 * @flow
 */
import React from "react";
import Group from "../../Group";
import Banner from "../../Banner";

/**
 * @title Basic usage
 * @description Banners can use different intents for different use cases.
 */
export default function BannerBasicUsage() {
  return (
    <Group flexDirection="column" gap={40}>
      <Group flexDirection="column">
        {'Intent "Default":'}
        <Banner
          iconName="attention"
          message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
          onClose={() => {}}
        />
      </Group>
      <Group flexDirection="column">
        {'Intent "Warning":'}
        <Banner
          iconName="attention"
          message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
          intent="warning"
          onClose={() => {}}
        />
      </Group>
      <Group flexDirection="column">
        {'Intent "Danger":'}
        <Banner
          iconName="attention"
          message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
          intent="danger"
          onClose={() => {}}
        />
      </Group>
    </Group>
  );
}
