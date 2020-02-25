/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import {StyleSheet, css} from "aphrodite";
import Text from "../Text";
import Tooltip from "../Tooltip";
import colors from "../colors";

type Props = {|
  +value: ?(string | number),
  +secondaryValue?: ?(string | number),
  +tooltipText?: ?string,
  +verticalAlign?: "start" | "center" | "end",
  +horizontalAlign?: "start" | "center" | "end",
|};

export default function TextCell({
  value,
  secondaryValue,
  tooltipText,
  verticalAlign = "center",
  horizontalAlign = "start",
}: Props) {
  return tooltipText ? (
    <div
      className={css(styles.tooltipWrapper)}
      style={{
        alignItems: position[verticalAlign],
        justifyContent: position[horizontalAlign],
      }}
    >
      <Tooltip placement="bottom" overlay={<span>{tooltipText}</span>}>
        <TextContent
          {...{
            value,
            secondaryValue,
            tooltipText,
            verticalAlign,
            horizontalAlign,
          }}
        />
      </Tooltip>
    </div>
  ) : (
    <TextContent
      {...{value, secondaryValue, tooltipText, verticalAlign, horizontalAlign}}
    />
  );
}

function TextContent({
  value,
  secondaryValue,
  tooltipText,
  verticalAlign = "center",
  horizontalAlign = "start",
}: Props) {
  return (
    <div
      className={css(styles.container, !!tooltipText && styles.tooltipBorder)}
      style={{
        justifyContent: position[verticalAlign],
        textAlign: textAlign[horizontalAlign],
        flex: !tooltipText && 1,
      }}
    >
      {value ? (
        <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {value}
        </Text>
      ) : null}
      {secondaryValue ? (
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          color="grey50"
        >
          {secondaryValue}
        </Text>
      ) : null}
    </div>
  );
}

const position = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
};

const textAlign = {
  start: "left",
  center: "center",
  end: "right",
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  tooltipWrapper: {
    display: "flex",
    width: "100%",
  },
  tooltipBorder: {
    borderBottom: `1px dashed ${colors.grey40}`,
  },
});
