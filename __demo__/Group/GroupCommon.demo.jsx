/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import {StyleSheet, css} from "aphrodite";
import Group from "../../Group";
import Text from "../../Text";
import colors from "../../colors";

/**
 * @title Common use-case
 */
export default function GroupCommon() {
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
      <Group flexDirection="column">
        <Text scale="title" weight="bold">
          FLEX-1701
        </Text>
        <Text>This is a simple example.</Text>
      </Group>
    </div>
  );
}
