/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import colors from "../colors";

type Props = {|
  /** body of the popover */
  +children: React.Node,
|};

/**
 * @category Overlay
 * @short Popovers are small overlays used to display additional options or content. Avoid using CustomPopover unless the content of your popover will not work with GeneralPopover.
 * @brandStatus V2
 * @status Beta
 */
function CustomPopover({children}: Props) {
  return <div className={css(styles.container)}>{children}</div>;
}

const styles = StyleSheet.create({
  container: {
    minWidth: "310px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    boxShadow: "0px 0px 20px rgba(57, 65, 77, 0.15)",
    margin: "4px 0",
  },
});

export default CustomPopover;
