/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import {StyleSheet, css} from "aphrodite";
import Group from "../../Group";
import Button from "../../button/Button";
import colors from "../../colors";

/**
 * @title Basic Usage
 */
export default function GroupBasicUsage() {
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
      <Group>
        <Button kind="hollow" intent="basic">
          Save
        </Button>
        <Button kind="hollow" intent="none">
          Cancel
        </Button>
      </Group>
    </div>
  );
}
