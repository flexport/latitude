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
 * @title Alignment
 * @description Using flexbox alignment rules, `Group` is able to layout content in powerful ways.
 */
export default function GroupAlignment() {
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
      <Group gap={12} alignItems="flex-end">
        <Label value="Example">
          <TextInput value="" onChange={() => undefined} />
        </Label>
        <Button intent="basic" kind="hollow">
          Submit
        </Button>
      </Group>
    </div>
  );
}
