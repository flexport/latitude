/**
 * TEAM: frontend_infra
 * @flow strict
 */
import * as React from "react";
import {css} from "aphrodite";

import colors from "./colors";
import {createThemedStylesheet, type ThemeData} from "./styles";
import ThemeNameContext, {
  TRANSMISSION,
  type Theme,
} from "./context/ThemeNameContext";

type Props = {|
  /** Whether the toggle is on. */
  +checked?: boolean,
  /** Whether the toggle can be interacted with. */
  +disabled?: boolean,
  /** The string or react node that describes what the toggle will change. */
  +label?: string | React.Node,
  /** The function invoked when the input is clicked. */
  +onChange: (checked: boolean) => void,
  /** The function called when a user blurs off the input */
  +onBlur?: Event => void,
  /** Whether to allow the label text to wrap */
  +wrapLabel?: boolean,
|};

/**
 * @short Allows users to switch a setting on or off.
 * @brandStatus V2
 * @status Beta
 * @category Interaction
 *
 * **Differences between toggles, checkboxes, and radios**
 *
 * - Checkboxes and radios are placed to the left of their label, to indicate there’s a selection to be made from a list of related options.
 *
 * - Whereas toggles are placed to the right of their label, to indicate there’s a setting to be turned off or on.
 *
 *
 * **Usage**
 *
 * - If users must acknowledge something, use a single checkbox as opposed to a toggle.
 *
 * - Use radio groups and checkbox lists for data entry (usually inside forms), as opposed to toggles.
 *
 * - When a toggle is clicked on, there should be an immediate change to the view.
 *
 */
export default function SettingsToggle({
  checked = false,
  disabled = false,
  label = null,
  onBlur = null,
  onChange,
  wrapLabel = true,
}: Props) {
  const theme = React.useContext(ThemeNameContext);
  const styles = themedStyles(theme);
  const containsLabel = label !== "" && label !== null;
  const handleClick = () => onChange(!checked);
  return (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label
      className={css(
        styles.label,
        disabled && styles.disabled,
        containsLabel === false && styles.inlineToggle
      )}
      onBlur={event => onBlur && onBlur(event)}
    >
      <span
        className={css(
          styles.inputLabel,
          wrapLabel === false && styles.inputLabelNoWrap,
          containsLabel === false && styles.inlineToggleLabel
        )}
      >
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleClick}
        className={css(
          styles.input,
          disabled && styles.disabledInput,
          containsLabel === false && styles.inlineToggleInput
        )}
      />
    </label>
  );
  // }
}

type SettingsToggleColors = {|
  +primary1: string,
  +primary2: string,
  +primary3: string,
  +highlight: string,
  +shadow: string,
  +focusOutline: string,
|};

function getColors(theme: Theme): SettingsToggleColors {
  if (theme === TRANSMISSION) {
    return {
      primary1: colors.green30,
      primary2: colors.green40,
      primary3: colors.green50,
      highlight: colors.green20,
      shadow: `${colors.green40}33`,
      focusOutline: `${colors.green20}80`,
    };
  }

  return {
    primary1: colors.indigo30,
    primary2: colors.indigo40,
    primary3: colors.indigo50,
    highlight: colors.indigo20,
    shadow: "rgba(39, 44, 52, 0.25)",
    focusOutline: "rgba(162,172,242,0.5)",
  };
}

const themedStyles = createThemedStylesheet(({themeName}: ThemeData) => {
  const knobSize = 16;
  const trackHeight = 8;
  const trackWidth = 28;
  const offset = 4;

  const themedColors = getColors(themeName);

  return {
    label: {
      cursor: "pointer",
      display: "flex",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      alignContent: "space-between",
      lineHeight: "18px",
      ":hover input": {
        borderColor: "transparent",
        ":after": {
          boxShadow: `0px 2px 2px ${themedColors.shadow}`,
          border: `2px solid ${colors.grey40}`,
          backgroundColor: colors.white,
        },
      },
      ":active input": {
        ":after": {
          boxShadow: "none",
          backgroundColor: colors.grey40,
        },
      },
      ":hover input:checked": {
        borderColor: "transparent",
        ":after": {
          boxShadow: `0px 2px 2px ${themedColors.shadow}`,
          border: `2px solid ${themedColors.primary2}`,
          backgroundColor: themedColors.primary2,
        },
      },
      ":active input:checked": {
        ":after": {
          border: `2px solid ${themedColors.primary2}`,
          backgroundColor: themedColors.primary2,
        },
      },
    },
    input: {
      cursor: "pointer",
      verticalAlign: "center",
      position: "relative",
      appearance: "none",
      outline: "none",
      backgroundColor: colors.grey20,
      width: `${trackWidth}px`,
      height: `${trackHeight}px`,
      transitionProperty: "background, border, box-shadow",
      transitionDuration: "150ms",
      transform: "ease-in-out",
      margin: `0 ${offset}px 0 0`,
      flexShrink: 0,
      ":after": {
        content: '""',
        position: "absolute",
        top: `-${(knobSize - trackHeight) / 2}px`,
        left: `-${offset}px`,
        width: `${knobSize}px`,
        height: `${knobSize}px`,
        backgroundColor: colors.white,
        border: `2px solid ${colors.grey20}`,
        verticalAlign: "center",
        transitionProperty: "left, background, border, box-shadow",
        transitionDuration: "150ms",
        transform: "ease-in-out",
      },
      ":focus:after": {
        borderColor: themedColors.primary1,
        boxShadow: `0 0 0 4px ${themedColors.focusOutline}`,
      },
      ":checked": {
        backgroundColor: themedColors.highlight,
        ":after": {
          left: `${trackWidth + offset - knobSize}px`,
          borderColor: themedColors.primary1,
          backgroundColor: themedColors.primary1,
        },
        ":focus:after": {
          boxShadow: `0 0 0 4px ${themedColors.focusOutline}`,
        },
      },
    },
    inputLabel: {
      width: "100%",
      textOverflow: "ellipsis",
      overflow: "hidden",
      paddingRight: `${8 + offset}px`,
    },
    inlineToggle: {
      display: "inline-block",
      width: `${trackWidth + 2 * offset}px`,
      height: `${knobSize}px`,
      lineHeight: "inherit",
    },
    inlineToggleLabel: {
      paddingRight: 0,
    },
    inlineToggleInput: {
      marginLeft: `${offset}px`,
    },
    disabled: {
      pointerEvents: "none",
      cursor: "default",
      color: colors.grey40,
    },
    disabledInput: {
      cursor: "not-allowed",
      backgroundColor: colors.grey10,
      ":after": {
        backgroundColor: colors.white,
        borderColor: colors.grey20,
      },
      ":checked": {
        backgroundColor: colors.grey20,
        ":after": {
          backgroundColor: colors.grey30,
          borderColor: colors.grey30,
        },
      },
    },
    inputLabelNoWrap: {
      whiteSpace: "nowrap",
    },
  };
});
