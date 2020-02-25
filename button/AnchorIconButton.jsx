/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow strict
 */

/* eslint-disable react/forbid-elements */
/* eslint-disable flexport/no-disabled-anchors */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import colors from "../colors";
import Icon from "../Icon";
import type {IconNames} from "../tools/icons";
import invariant from "../tools/invariant";
import stringOrFalse from "../tools/stringOrFalse";
import {sharedStyles, getButtonStyle} from "../button/styles";
import ThemeNameContext from "../context/ThemeNameContext";
import Link from "../Link";

export type AnchorIconButtonKind = "solid" | "bare" | "hollow" | "blank";
export type AnchorIconButtonIntent = "basic" | "none" | "danger";
export type AnchorIconButtonSize = "s" | "m" | "l";

type Props<T: EventTarget = EventTarget> = {|
  /** The name of the icon meant to be used as the primary button label or meant to be placed next to the label text. */
  +iconName: IconNames,
  /** The position of the icon relative to the text. */
  +iconAlignment?: "left" | "right",
  /** The text that should appear next to the icon. */
  +label?: string,
  /** Three main intents are used in our UI; intents are styles that convey meaning and reinforce the action. */
  +intent?: AnchorIconButtonIntent,
  /** Defines the height of the button. Button sizes correspond to the main form sizes. */
  +size?: AnchorIconButtonSize,
  /** Hollow buttons have padding and border, bare has padding but no border, and blank has neither padding nor border */
  +kind?: AnchorIconButtonKind,
  /** Buttons should generally use auto width ("responsive"). Fixed widths are good for multiple buttons in a row. Full width buttons work great for tables. */
  +width?: "responsive" | "full",
  /** Give the button the disabled attribute, drop it's opacity, and remove pointer-events. */
  +disabled?: boolean,
  /** Path to be linked. */
  +href?: string,
  +download?: boolean,
  /** Function invoked when mouse down is triggered */
  +onMouseDown?: (event: SyntheticMouseEvent<T>) => void,
  /** Function invoked when mouse up is triggered */
  +onMouseUp?: (event: SyntheticMouseEvent<T>) => void,
  /** Function invoked when button action is triggered */
  +onClick?: (
    event: SyntheticMouseEvent<T> | SyntheticKeyboardEvent<T>
  ) => void,
  /** Applies target="_blank" so the link opens in a new tab */
  +openInNewTab?: boolean,
  /**
   * our single page app routing (called spaMixin) hijacks all clicks on
   * anchor tags. You might not want this, most often for switching between
   * applications (you want a full page reload). Set this to true to disable that
   * behavior.
   */
  +disableSpaHijack?: boolean,
|};

/**
 * @short An exact replica of IconButton but meant specifically for links.
 * @brandStatus V2
 * @status Stable
 * @category Interaction
 *
 * Our current icon list can be accessed from our [Icon Guidelines](/design/guidelines/iconography).
 */
function AnchorIconButton({
  iconName,
  iconAlignment = "left",
  label,
  intent = "none",
  size = "m",
  kind = "hollow",
  width = "responsive",
  disabled = false,
  href,
  download = false,
  onMouseDown,
  onMouseUp,
  onClick,
  openInNewTab = false,
  disableSpaHijack = false,
}: Props<>) {
  const theme = React.useContext(ThemeNameContext);

  invariant(
    !(kind === "solid" && intent === "none"),
    "Solid buttons must have an intent!"
  );

  const buttonStyles = getButtonStyle(
    theme,
    kind,
    intent,
    size,
    width,
    disabled
  );

  const labelOrFalse = stringOrFalse(label);

  const LabelComponent = labelOrFalse ? (
    <span
      className={css(
        sharedStyles.label,
        iconAlignment === "right" && sharedStyles.labelLeft,
        ...buttonStyles.label
      )}
    >
      {labelOrFalse}
    </span>
  ) : null;

  const IconComponent = (
    <Icon
      // $FlowFixMe(ctan) Missing iconName issue
      iconName={iconName}
      size={getIconSize(size)}
      alignment="center"
      deprecatedAllowColorInheritance={false}
    />
  );

  const [FirstComponent, SecondComponent] =
    iconAlignment === "left"
      ? [IconComponent, LabelComponent]
      : [LabelComponent, IconComponent];

  return (
    <Link
      className={css(
        ...buttonStyles.button,
        intent === "none" ? styles.none : null
      )}
      openInNewTab={openInNewTab}
      href={href}
      download={download}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={onClick}
      disableSpaHijack={disableSpaHijack}
    >
      {FirstComponent}
      {SecondComponent}
    </Link>
  );
}

export default AnchorIconButton;

const getIconSize = (size: AnchorIconButtonSize) => {
  switch (size) {
    case "s":
      return "xxs";
    case "m":
      return "xs";
    default:
      // case "l"
      return "s";
  }
};

const styles = StyleSheet.create({
  none: {
    fill: colors.grey50,
    ":hover span svg": {
      fill: colors.black,
    },
  },
});
