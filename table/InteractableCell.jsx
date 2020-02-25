/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";

type Props = {|
  +children: React.Node,
  +verticalAlign?: "start" | "center" | "end",
  +horizontalAlign?: "start" | "center" | "end",
|};

function handleClick(e: SyntheticEvent<HTMLDivElement>) {
  e.stopPropagation();
}

export default function InteractableCell({
  children,
  verticalAlign = "center",
  horizontalAlign = "start",
}: Props) {
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
      {children}
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
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
    justifyContent: "flex-start",
  },
  verticalAlignCenter: {
    justifyContent: "center",
  },
  verticalAlignEnd: {
    justifyContent: "flex-end",
  },
});
