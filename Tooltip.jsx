/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import CustomTooltip, {type TooltipPlacement} from "./CustomTooltip";

import colors from "./colors";

export type {TooltipPlacement};

const tooltipOffset = 8;

type Props = {|
  /** The placement of the tooltip */
  +placement?: "top" | "right" | "bottom" | "left",
  /** Content that shows up when the child is hovered */
  +overlay: ?React.Node,
  /** Seconds the user has to hover before the tooltip shows up */
  +mouseEnterDelay?: number,
  /** Seconds until the tooltip hides after the user unhovers the tooltip */
  +mouseExitDelay?: number,
  /** The maximum width of the tooltip */
  +maxWidth?: number,
  /** The content that triggers the tooltip on hover */
  +children: React.Node,
  /**
   * CustomTooltip wraps its content with a div for ref purpopses.
   * `triggerClassName` can be used to style this div.
   */
  +triggerClassName?: string,
|};

/**
 * @category Overlay
 * @short Tooltip can be used to create textful content that popups up on hover
 * @brandStatus V3
 * @status Beta
 */
export default function Tooltip({
  placement = "right",
  overlay,
  children,
  mouseEnterDelay = 0,
  mouseExitDelay = 0.15,
  maxWidth = null,
  triggerClassName = "",
}: Props) {
  const computedStyles = React.useMemo(() => computeStyles(maxWidth), [
    maxWidth,
  ]);

  const tooltip = ({arrowRef, getArrowProps}) => (
    <>
      <div
        {...getArrowProps({
          ref: arrowRef,
          className: css(styles.tooltipArrow, getPlacementStyles(placement)),
        })}
      />
      <div className={css(styles.tooltipContent)}>{overlay}</div>
    </>
  );

  return (
    <CustomTooltip
      placement={placement}
      overlay={tooltip}
      mouseEnterDelay={mouseEnterDelay}
      mouseExitDelay={mouseExitDelay}
      offset={tooltipOffset}
      tooltipClassName={css(computedStyles.tooltip)}
      triggerClassName={triggerClassName}
    >
      {children}
    </CustomTooltip>
  );
}

function getPlacementStyles(placement: string) {
  switch (placement) {
    case "top":
      return styles.downArrow;
    case "bottom":
      return styles.upArrow;
    case "left":
      return styles.rightArrow;
    case "right":
      return styles.leftArrow;
    default:
      return null;
  }
}

function computeStyles(maxWidth?: number) {
  const tooltipStyle = maxWidth !== null ? {maxWidth} : {};

  return StyleSheet.create({
    tooltip: tooltipStyle,
  });
}

const arrowVerticalOffset = "-14px";

const styles = StyleSheet.create({
  tooltipContent: {
    backgroundColor: colors.grey60,
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.17)",
    color: colors.white,
    padding: "12px",
    textAlign: "left",
    textDecoration: "none",
    wordBreak: "break-word",
  },
  tooltipArrow: {
    position: "absolute",
    width: 0,
    height: 0,
    borderColor: "transparent",
    borderStyle: "solid",
    borderWidth: "8px",
  },
  upArrow: {
    top: arrowVerticalOffset,
    borderBottomColor: colors.grey60,
  },
  downArrow: {
    bottom: arrowVerticalOffset,
    borderTopColor: colors.grey60,
  },
  leftArrow: {
    left: arrowVerticalOffset,
    borderRightColor: colors.grey60,
  },
  rightArrow: {
    right: arrowVerticalOffset,
    borderLeftColor: colors.grey60,
  },
});
