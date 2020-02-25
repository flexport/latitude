/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {uniqueId} from "lodash";
import {StyleSheet, css} from "aphrodite";
import {whitespaceSizeConstants} from "./../styles/whitespace";
import colors from "./../colors";

type Props = {|
  /** whether the button is currently selected */
  +selected: boolean,
  /** the value associated with the radio button */
  +value: string,
  /** the label for the radio button */
  +label: string,
  /** the height of the radio button */
  +size: "xs" | "s" | "m" | "l",
  /** where the button is located in a group of gapless adjacent buttons or "independent" if there are gaps, determines how borders are rendered */
  +type: "independent" | "first" | "middle" | "last",
  /** whether the button is disabled */
  +disabled?: boolean,
  /** invoked when selected or unselected */
  +onChange: (value: string) => void,
  /** id of parent SegmentedControl */
  +parentId: string,
  /** disables the highlighting effect when selected */
  +disableSelectionHighlightEffect?: boolean,
|};

/**
 * SegmentedControlButton is a button that can be selected or unselected. Used as part of SegmentedControl.
 */
const SegmentedControlButton = React.memo<Props, HTMLDivElement>(
  React.forwardRef(
    (
      {
        selected,
        value,
        label,
        size = "xs",
        disabled = false,
        onChange,
        type,
        parentId,
        disableSelectionHighlightEffect = false,
      }: Props,
      ref?:
        | {current: null | HTMLDivElement}
        | ((null | HTMLDivElement) => mixed)
    ) => {
      const id = React.useRef(uniqueId("segmentedcontrolbutton_")).current; // links label to radio input

      return (
        <div className={css(styles.button)} ref={ref}>
          <input
            type="radio"
            id={id}
            disabled={disabled}
            className={css(
              !disabled && styles.input,
              disableSelectionHighlightEffect &&
                (!disabled
                  ? styles.inputSelectionEffect
                  : styles.disabledInputSelectionEffect)
            )}
            value={value}
            name={parentId} // required for grouping a set of radio buttons
            checked={selected}
            readOnly={true}
            onChange={() => {
              onChange(value);
            }}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label
            htmlFor={id}
            className={css(
              styles.label,
              disabled && styles.disabledLabel,
              size === "xs" && styles.xsmall,
              size === "s" && styles.small,
              size === "m" && styles.medium,
              size === "l" && styles.large,
              type === "first" && styles.first,
              type === "middle" && styles.middle,
              type === "last" && styles.last
            )}
          >
            {label}
          </label>
        </div>
      );
    }
  )
);

// Workaround for React Docgen failing to recognize forwardRef
// https://github.com/reactjs/react-docgen/issues/267
SegmentedControlButton.displayName = "SegmentedControlButton";

export default SegmentedControlButton;

const styles = StyleSheet.create({
  button: {
    minWidth: "100%",
    minHeight: "100%",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    position: "relative",
  },
  input: {
    display: "none",
    background: "transparent",
  },
  inputSelectionEffect: {
    ":checked ~ label": {
      backgroundColor: colors.grey20,
    },
  },
  disabledInputSelectionEffect: {
    ":checked ~ label": {
      backgroundColor: colors.grey20,
      color: colors.grey40,
    },
  },
  label: {
    paddingLeft: whitespaceSizeConstants.l,
    paddingRight: whitespaceSizeConstants.l,
    flex: "1 0 auto",
    marginBottom: "0px",
    textAlign: "center",
    border: `2px solid ${colors.grey20}`,
    transition: "background 150ms ease-in-out, color 150ms ease-in-out",
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.grey10,
    },
  },
  disabledLabel: {
    pointerEvents: "none",
    cursor: "not-allowed",
    color: colors.grey40,
  },
  xsmall: {
    paddingTop: whitespaceSizeConstants.xs,
    paddingBottom: whitespaceSizeConstants.xs,
  },
  small: {
    paddingTop: whitespaceSizeConstants.s,
    paddingBottom: whitespaceSizeConstants.s,
  },
  medium: {
    paddingTop: whitespaceSizeConstants.m,
    paddingBottom: whitespaceSizeConstants.m,
  },
  large: {
    paddingTop: whitespaceSizeConstants.l,
    paddingBottom: whitespaceSizeConstants.l,
  },
  first: {
    borderRightWidth: "1px",
  },
  middle: {
    borderLeftWidth: "1px",
    borderRightWidth: "1px",
  },
  last: {
    borderLeftWidth: "1px",
  },
});
