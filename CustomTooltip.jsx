/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import TooltipTrigger, {type TooltipArg} from "react-popper-tooltip";
import classnames from "classnames";

import {zIndices} from "./tools/zIndices";

// prettier-ignore
export type TooltipPlacement =
  | "auto"   | "auto-start"   | "auto-end"
  | "top"    | "top-start"    | "top-end"
  | "right"  | "right-start"  | "right-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left"   | "left-start"   | "left-end";

type Overlay = ?React.Node | ((tooltipArgs: TooltipArg) => ?React.Node);

type Props = {|
  /** The placement of the tooltip */
  +placement?: TooltipPlacement,
  /** Content that shows up when the child is hovered */
  +overlay: Overlay,
  /** Seconds the user has to hover before the tooltip shows up */
  +mouseEnterDelay?: number,
  /** Seconds until the tooltip hides after the user unhovers the tooltip */
  +mouseExitDelay?: number,
  /** The offset of the tooltip from the trigger */
  +offset?: number,
  /** The content that triggers the tooltip on hover */
  +children: React.Node,
  /**
   * CustomTooltip wraps its tooltip content with a div for ref purpopses.
   * `tooltipClassName` can be used to style this div.
   */
  +tooltipClassName?: string,
  /**
   * CustomTooltip wraps its content with a div for ref purpopses.
   * `triggerClassName` can be used to style this div.
   */
  +triggerClassName?: string,
|};

/**
 * @category Overlay
 * @short CustomTooltip can be used to create custom popups that occur on hover
 * @brandStatus V3
 * @status Beta
 */
export default function CustomTooltip({
  placement = "right",
  overlay,
  children,
  mouseEnterDelay = 0,
  mouseExitDelay = 0.15,
  offset = 0,
  tooltipClassName = "",
  triggerClassName = "",
}: Props) {
  return (
    <TooltipTrigger
      placement={placement}
      trigger="hover"
      tooltip={makeTooltip(overlay, tooltipClassName)}
      delayShow={mouseEnterDelay * 1000}
      delayHide={mouseExitDelay * 1000}
      modifiers={{
        offset: {
          offset: `0,${offset}px`,
        },
      }}
    >
      {makeTrigger(children, triggerClassName)}
    </TooltipTrigger>
  );
}

function makeTooltip(overlay: Overlay, tooltipClassName: ?string) {
  return tooltipArgs => (
    <div
      {...tooltipArgs.getTooltipProps({
        ref: tooltipArgs.tooltipRef,
        className: classnames(
          tooltipClassName,
          css(styles.tooltipContainer, overlay == null && styles.invisible)
        ),
      })}
    >
      {typeof overlay === "function" ? overlay(tooltipArgs) : overlay}
    </div>
  );
}

function makeTrigger(children: React.Node, className: string) {
  return ({getTriggerProps, triggerRef}) => (
    <div
      {...getTriggerProps({
        ref: triggerRef,
        className: className || css(styles.trigger),
      })}
    >
      {children}
    </div>
  );
}

const styles = StyleSheet.create({
  trigger: {
    display: "inline-block",
  },
  tooltipContainer: {
    zIndex: zIndices.zIndex1500AboveModal.value,
  },
  invisible: {
    display: "none",
  },
});
