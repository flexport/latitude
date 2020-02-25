/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import {StyleSheet, css} from "aphrodite";
import Text from "../Text";
import TextLink from "../TextLink";
import RowContext from "./RowContext";

type Props = {|
  +value: ?(string | number),
  +href: ?string,
  +openInNewTab?: boolean,
  +verticalAlign?: "start" | "center" | "end",
  +horizontalAlign?: "start" | "center" | "end",
|};

function handleClick(e: SyntheticEvent<HTMLDivElement>) {
  e.stopPropagation();
}

export default function TextCell({
  value,
  href,
  openInNewTab,
  verticalAlign = "center",
  horizontalAlign = "start",
}: Props) {
  const {isHighlighted} = React.useContext(RowContext);
  return (
    <div
      role="presentation"
      onClick={handleClick}
      className={css(
        styles.container,
        verticalAlign === "start" && styles.verticalAlignStart,
        verticalAlign === "center" && styles.verticalAlignCenter,
        verticalAlign === "end" && styles.verticalAlignEnd,
        horizontalAlign === "start" && styles.horizontalAlignStart,
        horizontalAlign === "center" && styles.horizontalAlignCenter,
        horizontalAlign === "end" && styles.horizontalAlignEnd
      )}
    >
      {value && href ? (
        <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {isHighlighted ? (
            <TextLink href={href} openInNewTab={openInNewTab}>
              {value.toString()}
            </TextLink>
          ) : (
            value
          )}
        </Text>
      ) : null}
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    minWidth: 0,
  },
  horizontalAlignStart: {
    textAlign: "left",
  },
  horizontalAlignCenter: {
    textAlign: "center",
  },
  horizontalAlignEnd: {
    textAlign: "right",
  },
  verticalAlignStart: {
    alignItems: "flex-start",
  },
  verticalAlignCenter: {
    alignItems: "center",
  },
  verticalAlignEnd: {
    alignItems: "flex-end",
  },
});
