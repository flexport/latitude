/**
 * TEAM: frontend_infra
 * @flow
 */

/* eslint-disable react/no-array-index-key */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {storiesOf} from "@storybook/react";
import sections from "../sections";

import DeprecatedVerticalGroup from "../../DeprecatedVerticalGroup";
import Group from "../../Group";
import Button from "../../button/Button";
import Text from "../../Text";
import colors from "../../colors";

const stories = storiesOf(sections.buttons, module);

stories.add("Grouping CTA Buttons", () => (
  <DeprecatedVerticalGroup>
    <Text scale="title">Regular CTA buttons</Text>

    <div className={css(styles.container)}>
      <Group flexDirection="row-reverse">
        <Button kind="hollow" intent="basic">
          Submit
        </Button>
        <Button kind="hollow" intent="none">
          Edit
        </Button>
        <Button kind="bare" intent="none">
          Cancel
        </Button>
      </Group>
    </div>

    <Text scale="title">Buttons on Left and Right</Text>

    <div className={css(styles.container)}>
      <Group>
        <Button kind="bare" intent="none">
          Action1
        </Button>
        <Button kind="bare" intent="none">
          Action2
        </Button>
      </Group>
      <Group flexDirection="row-reverse">
        <Button kind="hollow" intent="basic">
          Submit
        </Button>
        <Button kind="hollow" intent="none">
          Edit
        </Button>
        <Button kind="bare" intent="none">
          Cancel
        </Button>
      </Group>
    </div>

    <Text scale="title">Wrapping Behavior</Text>

    <div className={css(styles.container)}>
      <Group>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <Button kind="hollow" intent="none" key={i}>
              Button{i}
            </Button>
          ))}
      </Group>
    </div>
  </DeprecatedVerticalGroup>
));

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    border: `1px dotted ${colors.grey60}`,
    width: "560px",
  },
});
