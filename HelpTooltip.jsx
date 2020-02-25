/**
 * TEAM: frontend_infra
 * @flow strict
 */
/* eslint-disable react/prefer-stateless-function */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import Tooltip from "./Tooltip";
import Icon from "./Icon";
import iconSizes from "./iconSizes";
import type {StandardIconSizes} from "./Icon";
import type {IconNames} from "./tools/icons";
import type {Color} from "./colors";

type Props = {|
  /** The actual text that should be displayed in the tooltip. */
  +text: string,
  /** Where the tooltip is placed relative to the hoverable trigger element. */
  +position: "left" | "right" | "top" | "bottom",
  /** The size of the tooltip trigger icon. */
  +size: StandardIconSizes,
  /** The icon selected as the tooltip trigger. */
  +iconName: IconNames,
  /** The color of the tooltip icon trigger (see latitude/colors for a full list of usable colors) */
  +iconColor?: Color,
  /** maxWidth of the overlay, strings added to support input like 100%, 50%, em, etc. */
  +maxWidth?: number | string,
  /** Alignment can be used to either align the `HelpTooltip` to text baseline or to its `center` */
  +alignment: "baseline" | "center",
  /** Whether to allow css inheritance of the icon color. See the description in `Icon` **/
  +deprecatedAllowColorInheritance: boolean,
|};

/**
 * @short A simple icon-triggered message that provides auxilliary information that might be too verbose to always expose.
 * @brandStatus V2
 * @status Stable
 * @category Data Display
 *
 * Tooltips often provide additional information that doesn't fit in the standard layout. HelpTooltip, a thin wrapper around `Tooltip`, provides easy access to a simple icon-triggered tooltip. Icons are a great way to indicate tooltips while saving crucial space. The icon selected should, in some way, correlate to the information provided (ie. if it is a warnining, attention would be a good choice).
 *
 * @extends React.Component */
export default class HelpTooltip extends React.PureComponent<Props> {
  static defaultProps = {
    position: "right",
    size: "m",
    iconName: "question",
    maxWidth: 150,
    alignment: "baseline",
    deprecatedAllowColorInheritance: true,
  };

  render() {
    const {
      text,
      position,
      size,
      iconName,
      iconColor,
      maxWidth,
      alignment,
      deprecatedAllowColorInheritance,
    } = this.props;

    const tooltip = (
      <Tooltip
        overlay={
          <div style={{maxWidth}}>
            {text.split("\n").map(t => (
              <div key={t}>{t}</div>
            ))}
          </div>
        }
        placement={position}
        triggerClassName={css(styles.tooltipTrigger)}
      >
        <div className={css(styles.iconContainer)}>
          <Icon
            iconName={iconName}
            size={size}
            color={iconColor}
            deprecatedAllowColorInheritance={deprecatedAllowColorInheritance}
            alignment="center"
          />
        </div>
      </Tooltip>
    );

    if (alignment === "center") {
      return tooltip;
    }

    const offsetBottom = iconSizes[size] / 2 - 1;

    return (
      <span
        className={css(styles.wrapper)}
        style={{
          width: `${iconSizes[size]}px`,
          height: `${iconSizes[size]}px`,
        }}
      >
        <div
          className={css(styles.icon)}
          style={{bottom: `-${offsetBottom}px`}}
        >
          {tooltip}
        </div>
      </span>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    display: "inline-block",
    lineHeight: 0,
    marginLeft: "4px",
    marginRight: "4px",
  },
  wrapper: {
    display: "inline-block",
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 0,
  },
  tooltipTrigger: {
    display: "inline-flex",
  },
});
