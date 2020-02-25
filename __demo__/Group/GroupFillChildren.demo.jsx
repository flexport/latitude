/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";

import {StyleSheet, css} from "aphrodite";
import Group from "../../Group";
import colors from "../../colors";

/**
 * @title Fill children
 * @description Sometimes it is desirable to have children fill equal portions of a container. Setting `fillChildren={true}` will apply `flex: 1` to every child. Custom `flexBasis` values are *not* possible with this component. If your layout requires anything more complex please write a custom Aphrodite stylesheet. *Warning*: if children have a `minWidth` applied and wrap to a new row the flexbox context is reset and will cause children on different rows to fill unevenly.
 */
export default function GroupFillChildren() {
  const styles = StyleSheet.create({
    demoContainer: {
      display: "flex",
      border: `1px dotted ${colors.grey40}`,
      width: "400px",
      marginLeft: "3px",
    },
    example: {
      display: "flex",
      flex: 1,
      background: colors.grey30,
      borderRadius: "3px",
      padding: "8px",
      minWidth: "80px",
    },
  });
  return (
    <div className={css(styles.demoContainer)}>
      <Group gap={16} fillChildren={true}>
        <div className={css(styles.example)} />
        <div className={css(styles.example)} />
        <div className={css(styles.example)} />
      </Group>
    </div>
  );
}
