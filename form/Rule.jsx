/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import colors from "../colors";

export default function Rule() {
  return <div className={css(hrStyles.rule)} />;
}

const hrStyles = StyleSheet.create({
  rule: {
    width: "100%",
    borderTop: `1px solid ${colors.grey30}`,
    marginBottom: "36px",
  },
});
