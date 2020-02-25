/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import {StyleSheet, css} from "aphrodite";
import Group from "../../Group";
import Label from "../../Label";
import TextInput from "../../TextInput";
import Button from "../../button/Button";
import colors from "../../colors";

/**
 * @title Nesting
 * @description `Group` components may be infinitely nested to allow for easy grouping. Combining `Group` components can enable complex layouts with little code.
 */
export default function GroupNesting() {
  const styles = StyleSheet.create({
    demoContainer: {
      display: "flex",
      border: `1px dotted ${colors.grey40}`,
      width: "400px",
      marginLeft: "3px",
    },
  });
  return (
    <div className={css(styles.demoContainer)}>
      <Group gap={24} flexDirection="column">
        <Label value="Example">
          <TextInput value="" onChange={() => undefined} />
        </Label>
        <Group justifyContent="space-between">
          <Button kind="hollow" intent="danger">
            Delete
          </Button>
          <Group gap={16} alignItems="flex-end">
            <Button kind="hollow" intent="none">
              Cancel
            </Button>
            <Button kind="hollow" intent="basic">
              Save
            </Button>
          </Group>
        </Group>
      </Group>
    </div>
  );
}
