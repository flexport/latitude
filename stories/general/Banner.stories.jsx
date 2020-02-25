/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 *
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {storiesOf} from "@storybook/react";
import {withKnobs} from "@storybook/addon-knobs";
import sections from "../sections";
import Group from "../../Group";
import Banner from "../../Banner";
import Button from "../../button/Button";
import Text from "../../Text";

const stories = storiesOf(`${sections.interaction}/Banner`, module);
stories.addDecorator(withKnobs);
stories.add("Banner Intents", () => (
  <div className={css(styles.container)}>
    <Group flexDirection="column" gap={36}>
      <Banner
        message={
          <Text>
            You cannot edit an automatic <Text weight="bold">On Duty Log.</Text>
          </Text>
        }
        additionalContent="Test"
        iconName="attention"
        intent="default"
        onClose={() => {}}
        ctaButton={
          <Button label="Create new log" intent="basic" kind="blank" />
        }
      />
      <Banner
        message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
        iconName="attention"
        intent="default-light"
        onClose={() => {}}
        ctaButton={
          <Button label="Create new log" intent="basic" kind="blank" />
        }
      />
      <Banner
        message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
        iconName="attention"
        intent="warning"
        onClose={() => {}}
        ctaButton={
          <Button label="Create new log" intent="basic" kind="blank" />
        }
      />
      <Banner
        message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
        iconName="attention"
        intent="danger"
        onClose={() => {}}
      />
    </Group>
  </div>
));

const styles = StyleSheet.create({
  container: {
    width: "600px",
  },
});
