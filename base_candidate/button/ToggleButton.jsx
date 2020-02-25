/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
/* eslint-disable react/forbid-elements */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {sharedStyles, getButtonStyle} from "../../button/styles";
import invariant from "../../tools/invariant";
import ThemeNameContext from "../../context/ThemeNameContext";
import Icon from "../../Icon";
import type {IconNames} from "../../tools/icons";
import colors from "../../colors";
import stringOrFalse from "../../tools/stringOrFalse";

type ButtonSize = "s" | "m" | "l";
type ButtonWidth = "responsive" | "full";

type Props = {|
  /** The text that should appear next to the icon. */
  +label?: string,
  /** The name of the icon meant to be used as the primary button label or meant to be placed next to the label text. */
  +iconName?: IconNames,
  /** Determines whether the button's toggle indicator is hidden or not */
  +hideToggleIcon?: boolean,
  /** Defines the height of the button. Button sizes correspond to the main form sizes. */
  +size?: ButtonSize,
  /** Buttons should generally use auto width ("responsive"). Fixed widths are good for multiple buttons in a row. Full width buttons work great for tables. */
  +width?: ButtonWidth,
  /** Give the button the disabled attribute, drop its opacity, and remove pointer-events. */
  +disabled?: boolean,
  /** Whether the button is invalid */
  +isInvalid?: boolean,
  /** Function invoked when the button is clicked. */
  +onClick?: (event: Event) => mixed,
|};

/**
 * @short A special button with a toggle carrot icon justified to the right
 * @category Interaction
 *
 * This button is to solely be used by Dropdowns
 */
export default function ToggleButton({
  label,
  iconName,
  hideToggleIcon = false,
  size = "m",
  width = "responsive",
  disabled = false,
  isInvalid = false,
  onClick,
}: Props) {
  invariant(iconName || label, "Must have either icon or label");
  invariant(
    !(iconName && typeof label !== "string" && !hideToggleIcon),
    "Cannot have an icon without a label with toggle icon enabled"
  );

  const theme = React.useContext(ThemeNameContext);

  const buttonStyles = getButtonStyle(
    theme,
    "hollow",
    "none",
    size,
    width,
    disabled
  );

  const iconOrFalse = stringOrFalse(iconName);
  const labelOrFalse = stringOrFalse(label);
  const LabelComponent =
    iconOrFalse && labelOrFalse ? (
      <span className={css(sharedStyles.label)}>{label}</span>
    ) : (
      label
    );

  const IconComponent = iconName && (
    <Icon
      // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
      iconName={iconName}
      color={isInvalid ? "red40" : "grey50"}
      size={getIconSize(size)}
      alignment="center"
      deprecatedAllowColorInheritance={true}
    />
  );

  return (
    <button
      className={css(
        ...buttonStyles.button,
        styles.button,
        !hideToggleIcon && styles.hasToggle,
        isInvalid && styles.invalid,
        isInvalid && !hideToggleIcon && styles.invalidHasToggle
      )}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {IconComponent}
      {LabelComponent}

      {!hideToggleIcon && (
        <div
          className={css(
            styles.toggleButton,
            isInvalid && styles.invalidToggleButton
          )}
        >
          <Icon iconName="downOpen" alignment="baseline" />
        </div>
      )}
    </button>
  );
}

const themedButton = ToggleButton;
export type ButtonType = typeof themedButton;

const getIconSize = (size: "s" | "m" | "l") => {
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
  button: {
    fill: colors.grey50,
    position: "relative",
    transition: "border-color,fill 150ms ease-in-out",
    ":hover div": {
      borderColor: colors.grey60,
    },
  },
  hasToggle: {
    paddingRight: "32px",
  },
  toggleButton: {
    boxSizing: "content-box",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    right: "9px",
    marginTop: "-1px",
  },
  invalid: {
    backgroundImage:
      "url(\"data:image/svg+xml,%0A%3Csvg width='16px' height='16px' viewBox='0 0 64 64' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cpath d='M32,2 C15.431,2 2,15.431 2,32 C2,48.569 15.431,62 32,62 C48.569,62 62,48.569 62,32 C62,15.431 48.569,2 32,2 Z M36,50.924 C35.9988979,51.5181916 35.5171924,51.9994498 34.923,52 L29.076,52 C28.4821981,51.9988993 28.0011007,51.5178019 28,50.924 L28,45.077 C28,44.483 28.482,44.001 29.076,44 L34.923,44 C35.518,44 35.999,44.482 36,45.077 L36,50.924 Z M36,38.977 C36,39.5292847 35.5522847,39.977 35,39.977 L29,39.977 C28.4477153,39.977 28,39.5292847 28,38.977 L28,12.977 C28,12.4247153 28.4477153,11.977 29,11.977 L35,11.977 C35.5522847,11.977 36,12.4247153 36,12.977 L36,38.977 Z' fill='%23ef3340' %3E%3C/path%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundColor: colors.red10,
    color: colors.red50,
    fill: colors.red40,
    borderColor: colors.red40,
    backgroundPosition: "right 10px center",
    paddingRight: "40px",
    ":focus": {
      boxShadow: `0 0 0 3px ${colors.red20}`,
    },
    ":hover": {
      boxShadow: "0 2px 2px hsla(355, 70%, 50%, 0.2)",
      borderColor: colors.red40,
      color: colors.red50,
    },
    ":hover span svg": {
      fill: colors.red40,
    },
    ":active": {
      borderColor: colors.red40,
      backgroundColor: colors.red10,
      color: colors.red50,
      background: " ",
    },
  },
  invalidHasToggle: {
    paddingRight: "60px",
    backgroundPosition: "right 30px center",
  },
  invalidToggleButton: {
    borderColor: colors.red40,
  },
});
