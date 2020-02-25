/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow strict
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";

export default function StaticCell({
  data,
  children,
}: {
  +data: *,
  +children: (*) => React.Node | string,
}) {
  return <div className={css(styles.wrapper)}>{children(data)}</div>;
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 12px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
  },
});
