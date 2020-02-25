/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import colors from "../colors";
import Group from "../Group";
import Icon, {type IconNames} from "../Icon";
import Text from "../Text";

const statusColorMap = {
  active: "blue40",
  activeWithError: "red30",
  completed: "blue20",
  completedWithError: "red20",
  pending: "grey20",
};

const iconSize = 18;
const gapSize = 4;

type Props = {|
  /** The primary icon to show as the progress node while state is `active`. */
  +progressIcon: IconNames,
  /** The decimal from 0 to 1 representing the progress of the shipment. */
  +progress: number,
  /** An optional icon to show as the progress node when state is `pending`.
   * If not provided, `progressIcon` will be used instead. */
  +startIcon?: IconNames,
  /** An optional icon to show as the progress node when state is `completed`.
   * If not provided, `progressIcon` will be used instead. */
  +endIcon?: IconNames,
  /** The actual text to use as the label. */
  +label?: string,
  /** Whether to represent status with an error state. */
  +error?: boolean,
|};

/**
 * @short A progress bar for displaying the progress of a particular process
 * @brandStatus V2
 * @status Beta
 * @category Data Display
 *
 * For use in a scanning capacity, providing progress status at a glance. The
 * light progress bar is designed to be embedded in side a larger element, like
 * a cell inside of a table row or as a button inside a card.
 *
 * The state of the process is derived implicitly from the `progress` value:
 * <br>1. `pending` at `progress = 0`
 * <br>2. `active` at `0 < progress < 1`
 * <br>3. `completed` at `progress = 1`
 *
 * Icons can be supplied separately for each of the above states if desired.
 * The appearance of the component is intentionally distinct at each state to
 * provide increased visual contrast between states.
 */
export default function ProgressTracker({
  startIcon,
  progressIcon,
  endIcon,
  progress,
  label = null,
  error = false,
}: Props) {
  const percentComplete = 100 * Math.min(Math.max(progress, 0), 1);

  let iconNameNormalized;
  let iconPadding;

  let leadingLineWidth = 0;
  let trailingLineWidth = 0;
  let lineMinWidth = 0;

  let statusColor;

  // pending
  if (percentComplete === 0) {
    iconNameNormalized = startIcon || progressIcon;
    iconPadding = `0 ${gapSize}px 0 0`;
    trailingLineWidth = `calc(100% - ${iconSize + gapSize}px)`;
    statusColor = statusColorMap.pending;
  }
  // active
  else if (percentComplete === 100) {
    iconNameNormalized = endIcon || progressIcon;
    iconPadding = `0 0 0 ${gapSize}px`;
    leadingLineWidth = `calc(100% - ${iconSize + gapSize}px)`;
    statusColor = error
      ? statusColorMap.completedWithError
      : statusColorMap.completed;
  }
  // completed
  else {
    iconNameNormalized = progressIcon;
    iconPadding = `0 ${gapSize}px 0 ${gapSize}px`;
    leadingLineWidth = `calc(${percentComplete}% - ${iconSize / 2 +
      gapSize}px)`;
    trailingLineWidth = `calc(${100 - percentComplete}% - ${iconSize / 2 +
      gapSize}px)`;
    lineMinWidth = gapSize;
    statusColor = error
      ? statusColorMap.activeWithError
      : statusColorMap.active;
  }

  return (
    <Group flexDirection="column" gap={4}>
      <div className={css(styles.progressBar)} style={{height: iconSize}}>
        <div
          className={css(styles.line)}
          style={{
            width: leadingLineWidth,
            minWidth: lineMinWidth,
            backgroundColor: colors[statusColor],
          }}
        />
        <div style={{padding: iconPadding}}>
          <Icon
            iconName={iconNameNormalized}
            customSize={iconSize}
            color={statusColor}
            deprecatedAllowColorInheritance={false}
          />
        </div>
        <div
          className={css(styles.line)}
          style={{
            width: trailingLineWidth,
            minWidth: lineMinWidth,
            backgroundColor: colors[statusColorMap.pending],
          }}
        />
      </div>

      {label ? (
        <Text
          scale="subtext"
          color="grey50"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {label}
        </Text>
      ) : null}
    </Group>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    display: "flex",
    alignItems: "center",
  },
  line: {
    height: "4px",
  },
});
