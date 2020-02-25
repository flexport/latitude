/**
 * TEAM: frontend_infra
 * @flow
 */

/* eslint-disable flexport/no-unknown-styles */
/* eslint-disable flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {uniqueId} from "lodash";
import colors from "../colors";
import {type Size} from "../sizes";

type Props<T> = {|
  /** whether the radio button is currently checked */
  +checked: boolean,
  /** the value associated with the radio button */
  +value: T,
  /** the name associated with the button */
  +name: string,
  /** the label for the radio button */
  +label?: string | React.Node,
  /** whether the radio button is disabled */
  +disabled?: boolean,
  /** whether the radio button is invalid */
  +isInvalid?: boolean,
  /** the size of the radio */
  +size?: Size,
  /** this function is invoked when the radio button is changed */
  +onChange: (value: T) => void,
|};

/**
 * @short Radio collects a single option from the user. Please refer to RadioGroup to implement a basic group radio input.
 * @brandStatus V2
 * @status Stable
 * @category Data Entry
 */
export default function Radio<T>({
  checked,
  value,
  name,
  label,
  disabled = false,
  size = "s",
  isInvalid = false,
  onChange,
}: Props<T>) {
  const radioId = React.useRef(uniqueId("radio_")).current;

  const handleChange = () => {
    onChange(value);
  };

  return (
    <label
      htmlFor={radioId}
      className={css(
        styles.radio,
        styles[size],
        isInvalid && styles.invalidRadio,
        disabled && styles.disabledRadio
      )}
    >
      <input
        id={radioId}
        type="radio"
        disabled={disabled}
        className={css(
          styles.hiddenInput,
          isInvalid && styles.invalidInput,
          disabled && styles.disabledInput
        )}
        value={value}
        name={name}
        checked={checked}
        readOnly={true}
        onChange={handleChange}
      />
      <div className={css(styles.radioContainerLabel)}>
        <div
          className={css(
            styles.radioContainerLabel,
            styles.radioHead,
            isInvalid && styles.invalidRadioHead,
            disabled && styles.disabledRadioHead
          )}
        >
          <div className={css(styles.radioHeadCenter)} />
        </div>
        <div className={css(styles.radioLabel)}>{label}</div>
      </div>
    </label>
  );
}

const hoverOuterCircle = ":hover > div > :first-child";
const hoverCheckedOuterCircle = ":hover > input:checked ~ div > :first-child";
const activeOuterCircle = ":active > div > :first-child";
const activeInnerCircle = ":active > div > :first-child > div";
const activeCheckedOuterCircle = ":active > input:checked ~ div > :first-child";
const activeCheckedInnerCircle =
  ":active > input:checked ~ div > :first-child > div";
const invalidRadioChildrenWrapper = ":active > input:checked ~ div";
const inputCheckedOuterCircle = ":checked ~ div > :first-child";
const inputCheckedInnerCircle = ":checked ~ div > :first-child div";
const inputFocusOuterCircle = ":focus ~ div > :first-child";
const inputFocusCheckedOuterCircle = ":focus:checked ~ div > :first-child";
const inputHoverCheckedInnerCircle = ":hover:checked ~ div > :first-child div";

const inputColors = {
  selected: colors.grey60,
  unselected: colors.grey30,
  hover: colors.grey40,
  focus: colors.grey30,
  disabled: colors.grey20,
};
const errorColors = {
  selected: colors.red40,
  unselected: colors.red30,
  hover: colors.red40,
  focus: colors.red20,
  disabled: colors.grey20,
};

const styles = StyleSheet.create({
  radio: {
    position: "relative",
    lineHeight: "24px",
    marginRight: "24px",
    cursor: "pointer",
    display: "inline-block",
    [hoverOuterCircle]: {
      borderColor: inputColors.hover,
    },
    [hoverCheckedOuterCircle]: {
      borderColor: inputColors.hover,
      boxShadow: `0 2px 2px ${inputColors.focus}`,
    },
    [activeOuterCircle]: {
      borderColor: inputColors.selected,
    },
    [activeInnerCircle]: {
      backgroundColor: inputColors.selected,
      transform: "translate(-50%, -50%) scale(1)",
    },
    [activeCheckedOuterCircle]: {
      borderColor: inputColors.selected,
    },
    [activeCheckedInnerCircle]: {
      backgroundColor: inputColors.selected,
    },
  },
  hiddenInput: {
    opacity: "0",
    position: "absolute",
    [inputCheckedOuterCircle]: {
      borderColor: inputColors.selected,
    },
    [inputCheckedInnerCircle]: {
      backgroundColor: inputColors.selected,
      transform: "translate(-50%, -50%) scale(1)",
    },
    [inputHoverCheckedInnerCircle]: {
      backgroundColor: inputColors.hover,
    },
    [inputFocusOuterCircle]: {
      boxShadow: `0 0 0 3px ${inputColors.focus}`,
      borderColor: inputColors.hover,
    },
    [inputFocusCheckedOuterCircle]: {
      borderColor: inputColors.selected,
    },
  },
  radioContainerLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: "0",
  },
  radioHead: {
    width: "20px",
    height: "20px",
    position: "relative",
    display: "inline-block",
    border: `2px solid ${inputColors.unselected}`,
    borderRadius: "50%",
    verticalAlign: "middle",
    transition: "border-color 150ms ease-in-out, box-shadow 150ms ease-in-out",
  },
  radioHeadCenter: {
    width: "12px",
    height: "12px",
    background: inputColors.unselected,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(0)",
    borderRadius: "50%",
    transition:
      "transform 150ms ease-in-out, background-color 150ms ease-in-out",
  },
  radioLabel: {
    marginLeft: "8px",
    verticalAlign: "middle",
    flex: 1,
  },
  invalidRadio: {
    color: colors.red40,
    [hoverOuterCircle]: {
      borderColor: colors.red40,
      boxShadow: "0 2px 2px hsla(355, 70%, 55%, 0.2)",
    },
    [hoverCheckedOuterCircle]: {
      borderColor: colors.red40,
      boxShadow: `0 2px 2px ${errorColors.focus}`,
    },
    [activeOuterCircle]: {
      borderColor: colors.red50,
    },
    [activeInnerCircle]: {
      backgroundColor: errorColors.selected,
    },
    [invalidRadioChildrenWrapper]: {
      color: colors.red50,
    },
    [activeCheckedOuterCircle]: {
      borderColor: colors.red50,
    },
    [activeCheckedInnerCircle]: {
      backgroundColor: colors.red50,
    },
  },
  invalidInput: {
    [inputCheckedOuterCircle]: {
      borderColor: colors.red40,
    },
    [inputCheckedInnerCircle]: {
      backgroundColor: colors.red40,
    },
    [inputHoverCheckedInnerCircle]: {
      backgroundColor: errorColors.hover,
    },
    [inputFocusOuterCircle]: {
      boxShadow: `0 0 0 3px ${errorColors.focus}`,
      borderColor: errorColors.hover,
    },
    [inputFocusCheckedOuterCircle]: {
      borderColor: errorColors.selected,
    },
  },
  invalidRadioHead: {
    borderColor: colors.red40,
  },
  disabledRadio: {
    pointerEvents: "none",
    cursor: "pointer",
    color: inputColors.disabled,
  },
  disabledInput: {
    [inputCheckedOuterCircle]: {
      borderColor: inputColors.disabled,
    },
    [inputCheckedInnerCircle]: {
      backgroundColor: inputColors.disabled,
    },
  },
  disabledRadioHead: {
    borderColor: inputColors.disabled,
  },
  s: {
    lineHeight: "24px",
  },
  m: {
    lineHeight: "30px",
  },
  l: {
    lineHeight: "40px",
  },
});
