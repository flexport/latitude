/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {getInputStyles} from "../styles/input";
import invariant from "../tools/invariant";
import Icon from "../Icon";
import {padding, include} from "../styles/index";
import {LabelContext} from "../Label";
import colors from "../colors";
import sizes from "../sizes";
import InputGroupContext, {
  CENTER_INPUT,
  LEFT_INPUT,
  RIGHT_INPUT,
} from "../context/InputGroupContext";
import {commonT as t} from "../config/I18n";

export type Option<K> = {|
  +label: string,
  +value: K,
  +disabled?: boolean,
|};

type SelectInputSize = "s" | "m" | "l";

export type SelectInputProps<T> = {|
  /** the currently selected value of the input */
  +value: ?T,
  /** the options that the select input contains */
  +options: $ReadOnlyArray<Option<T>>,
  /** the placeholder text that will be displayed when the input is empty */
  +placeholder?: string,
  /** the size of the select input */
  +size?: SelectInputSize,
  /** whether the input is invalid */
  +isInvalid?: boolean,
  /** whether the input is read only */
  +readOnly?: boolean,
  /** whether the input is disabled */
  +disabled?: boolean,
  /** called when the value of the select input is changed */
  +onChange: (?T) => void,
  /** called when the input is blurred */
  +onBlur?: Event => void,
  /** called when the input is focused */
  +onFocus?: Event => void,
  /** when true, this allows the user to select the empty element from the list. this calls onChange with `null`. */
  +isNullable?: boolean,
  /** specify this if the values you are providing are not strings. you need to provide a function that takes an object of type K and generates strings so we can dedupe / tell what's selected */
  +toKeyFn?: (val: T) => string,
|};

export function defaultKeyFn<K>(val: K): string {
  invariant(
    typeof val === "string",
    "if not providing a string value in options, provide a to key function."
  );
  return val.toString();
}

export const NULL_OPTION = "__null_option";

/**
 * @short Use SelectInput when constructing forms, if you need to select only one value from a _short_ (< 10 options) list.
 * @category Data Entry
 * @brandStatus V2
 * @status Stable */
function SelectInput<T>({
  value,
  options,
  placeholder = t("Select an option..."),
  size = "m",
  isInvalid = false,
  readOnly = false,
  disabled = false,
  onChange,
  onBlur,
  onFocus,
  isNullable = false,
  toKeyFn = defaultKeyFn,
}: SelectInputProps<T>) {
  const label = React.useContext(LabelContext);
  const inputGroup = React.useContext(InputGroupContext);

  const optionsWithNullable = [
    {
      value: NULL_OPTION,
      label: placeholder,
      disabled: !isNullable,
    },
    ...options.map(option => ({
      label: option.label,
      disabled: option.disabled,
      value: toKeyFn(option.value),
    })),
  ];

  const handleFocus = (e: Event) => {
    if (label.labelOnFocus) {
      label.labelOnFocus();
    }

    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: Event) => {
    if (label.labelOnBlur) {
      label.labelOnBlur();
    }

    if (onBlur) {
      onBlur(e);
    }
  };

  const handleChange = (e: SyntheticInputEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    if (newValue === NULL_OPTION) {
      onChange(null);
    } else {
      const option = options.find(option => toKeyFn(option.value) === newValue);

      onChange(option ? option.value : null);
    }
  };

  return (
    <span className={css(styles.wrapper)} style={{height: sizes[size]}}>
      <select
        className={css(
          ...getInputStyles({size, readOnly, disabled, isInvalid}),
          value === null && styles.placeholder,
          styles.base,
          readOnly && styles.readOnly,
          inputGroup === CENTER_INPUT && styles.noBorders,
          inputGroup === LEFT_INPUT && styles.noRightBorders,
          inputGroup === RIGHT_INPUT && styles.noLeftBorders
        )}
        disabled={disabled || readOnly}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value != null ? toKeyFn(value) : NULL_OPTION}
      >
        {optionsWithNullable.map(option => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled === true || false}
          >
            {option.label}
          </option>
        ))}
      </select>
      <span className={css(styles.arrow, disabled && styles.disabledArrow)}>
        <Icon
          color={disabled ? "grey50" : "grey60"}
          iconName="sort"
          size="xs"
          alignment="center"
        />
      </span>
    </span>
  );
}

const styles = StyleSheet.create({
  base: {
    "-moz-appearance": "none",
    "-webkit-appearance": "unset",
    ":-moz-focusring": {
      color: "transparent",
      textShadow: "0 0 0 #000",
    },
    "::-ms-expand": {
      display: "none",
    },
    ":focus::-ms-value": {
      color: colors.grey60,
      background: colors.white,
    },
  },
  wrapper: {
    display: "block",
    position: "relative",
  },
  arrow: {
    display: "flex",
    alignItems: "center",
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...include(padding.l.s),
    position: "absolute",
    top: "2px",
    right: "3px",
    bottom: "2px",
    pointerEvents: "none",
  },
  disabledArrow: {
    background: "transparent",
  },
  noBorders: {
    borderRadius: "0px 0px 0px 0px",
  },
  noLeftBorders: {
    borderRadius: "0px 3px 3px 0px",
  },
  noRightBorders: {
    borderRadius: "3px 0px 0px 3px",
  },
  readOnly: {
    "::-ms-expand": {
      display: "none",
    },
  },
  placeholder: {
    color: colors.grey40,
  },
});

export default SelectInput;

export const _test = {NULL_OPTION, defaultKeyFn, SelectInput};
