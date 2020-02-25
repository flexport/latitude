/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import CustomPopover from "./CustomPopover";
import Group from "../Group";
import Text from "../Text";

import typeof Button from "../button/Button";

type Props = {|
  /** main heading */
  +title: string,
  /** optional subheading underneath title */
  +subtitle?: string,
  /** body of the popover */
  +children: React.Node,
  /** a set of buttons corresponding to actions that can be taken in the popover body */
  +buttons: $ReadOnlyArray<React.Element<Button>>,
|};

/**
 * @short Popovers are small overlays used to display additional options or content. GeneralPopover should be used for most popovers unless custom content is necessary, in which case use CustomPopover
 * @brandStatus V2
 * @status In Review
 * @category Overlay
 */
function GeneralPopover({title, subtitle, children, buttons}: Props) {
  return (
    <CustomPopover>
      <div className={css(styles.container)}>
        <Text scale="title" weight="bold">
          {title}
        </Text>
        <Text scale="subtext" color="grey50">
          {subtitle}
        </Text>
        <div className={css(styles.bodyContainer)}>{children}</div>
        <Group flexDirection="row-reverse">{buttons.slice().reverse()}</Group>
      </div>
    </CustomPopover>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "310px",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  bodyContainer: {
    padding: "20px 0",
  },
});

export default GeneralPopover;
