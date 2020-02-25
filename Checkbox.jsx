/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow strict
 */

/* eslint-disable flexport/no-unknown-styles */
/* eslint-disable flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import latitudeColors from "./colors";
import Text from "./Text";
import ThemeNameContext from "./context/ThemeNameContext";

type Props = {|
  /** Whether the checkbox is checked. */
  +checked: boolean,
  /** Whether the checkbox is indeterminate. The indeterminate state is a visual change only — checkboxes can be checked or unchecked while also being indeterminate. If checked=true, the indeterminate state will not show. */
  +indeterminate: boolean,
  /** Whether the checkbox can be checked or unchecked. */
  +disabled: boolean,
  /** Whether the checkbox is invalid */
  +isInvalid: boolean,
  /** The string or react node that illustrates what the check represents. */
  +label?: string | React.Node,
  /** The function invoked when the input is clicked. */
  +onChange: (checked: boolean) => void,
  /** The function called when a user blurs off the input */
  +onBlur?: Event => void,
  /** Whether to allow the label text to wrap */
  +wrapLabel?: boolean,
|};

/**
 * @short Select options in a flexible way.
 * @brandStatus V2
 * @status Stable
 * @category Data Entry
 *
 * A Checkbox input for selecting options in a flexible way.
 * For managing lists of Checkboxes, consider using <a href="CheckboxList">CheckboxList</a>.
 *
 * @extends React.Component */
export default class Checkbox extends React.PureComponent<Props> {
  static contextType = ThemeNameContext;

  static defaultProps = {
    checked: false,
    indeterminate: false,
    disabled: false,
    isInvalid: false,
    wrapLabel: true,
  };

  handleClick = () => {
    this.props.onChange(!this.props.checked);
  };

  render() {
    const {
      checked,
      indeterminate,
      disabled,
      isInvalid,
      onBlur,
      wrapLabel,
    } = this.props;

    const WrapperTag = !!this.props.label === true ? "label" : "div";

    return (
      // eslint-disable-next-line jsx-a11y/label-has-for
      <WrapperTag
        className={css(
          styles.label,
          isInvalid ? styles.invalid : null,
          disabled ? styles.disabled : null
        )}
        onBlur={event => onBlur && onBlur(event)}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={this.handleClick}
          className={css(
            styles.input,
            indeterminate ? styles.indeterminate : null,
            isInvalid ? styles.invalidInput : null,
            disabled ? styles.disabledInput : null
          )}
        />
        {!!this.props.label === true ? (
          <span
            className={css(
              styles.radioLabel,
              wrapLabel === true ? null : styles.radioLabelNoWrap
            )}
          >
            <Text color={disabled ? "grey40" : "grey60"}>
              {this.props.label}
            </Text>
          </span>
        ) : null}
      </WrapperTag>
    );
  }
}

const checkedFill = latitudeColors.grey60;
const disabledEmptyFill = latitudeColors.grey10;
const disabledMarkedFill = latitudeColors.grey20;

const styles = StyleSheet.create({
  label: {
    cursor: "pointer",
    margin: "4px 0px 4px 0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    ":hover input": {
      borderColor: latitudeColors.grey50,
      boxShadow: "0 2px 2px rgba(0, 0, 0, 0.05)",
    },
    ":active input": {
      borderColor: latitudeColors.grey50,
      background: latitudeColors.grey50,
      boxShadow: "none",
    },
    ":hover input:checked": {
      borderColor: "transparent",
      backgroundColor: latitudeColors.grey60,
    },
    ":active input:checked": {
      borderColor: "transparent",
      background: latitudeColors.grey60,
      boxShadow: "none",
    },
  },
  input: {
    cursor: "pointer",
    boxSizing: "border-box",
    appearance: "none",
    backgroundColor: latitudeColors.white,
    outline: "none",
    border: `2px solid ${latitudeColors.grey30}`,
    width: "20px",
    height: "20px",
    minWidth: "20px",
    minHeight: "20px",
    margin: "0",
    transitionProperty: "background-color, border, box-shadow, color, fill",
    transitionDuration: "150ms",
    transform: "ease-in-out",
    ":focus": {
      borderColor: latitudeColors.grey50,
      boxShadow: `0 0 0 3px ${latitudeColors.grey30}`,
    },
    ":checked": {
      background: `${checkedFill} url("data:image/svg+xml,%3Csvg width='16px' height='16px' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cpath d='M61.964,16.52 L23.778,54.706 C23.3853277,55.0977362 22.7496723,55.0977362 22.357,54.706 L16.557,48.906 L2.294,34.641 C1.90226377,34.2483277 1.90226377,33.6126723 2.294,33.22 L7.979,27.536 C8.37167233,27.1442638 9.00732767,27.1442638 9.4,27.536 L22.948,41.084 L54.738,9.294 C55.1306723,8.90226377 55.7663277,8.90226377 56.159,9.294 L61.964,15.1 C62.3550716,15.4925567 62.3550716,16.1274433 61.964,16.52 Z' fill='%23fff' %3E%3C/path%3E%3C/svg%3E") no-repeat center`,
      backgroundSize: "80%",
      borderColor: "transparent",
    },
  },
  radioLabel: {
    marginLeft: "8px",
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  indeterminate: {
    background: `${checkedFill} url("data:image/svg+xml,%3Csvg width='14px' height='14px' padding='1px' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cpath d='M62 31c0 2.765-.24 5-3.006 5H5.006C2.246 36 2 33.764 2 31c0-2.766.244-5 3.006-5h53.991c2.76 0 3 2.234 3 5H62z' fill='%23fff' %3E%3C/path%3E%3C/svg%3E") no-repeat center`,
    backgroundSize: "80%",
    borderColor: "transparent",
    ":disabled": {
      backgroundColor: disabledMarkedFill,
    },
  },
  disabled: {
    pointerEvents: "none",
    color: latitudeColors.grey40,
  },
  disabledInput: {
    borderColor: latitudeColors.grey20,
    backgroundColor: disabledEmptyFill,
    ":checked": {
      borderColor: latitudeColors.grey20,
      backgroundColor: disabledMarkedFill,
    },
  },
  invalid: {
    color: latitudeColors.red40,
    ":hover input": {
      borderColor: latitudeColors.red40,
    },
    ":active input": {
      borderColor: latitudeColors.red40,
      backgroundColor: latitudeColors.red40,
      boxShadow: "none",
    },
    ":hover input:checked": {
      backgroundColor: latitudeColors.red40,
    },
  },
  invalidInput: {
    borderColor: latitudeColors.red40,
    ":checked": {
      backgroundColor: latitudeColors.red40,
    },
    ":focus": {
      boxShadow: `0 0 0 3px ${latitudeColors.red20}`,
      borderColor: latitudeColors.red40,
    },
  },
  radioLabelNoWrap: {
    whiteSpace: "nowrap",
  },
});
