/**
 * TEAM: frontend_infra
 * @flow strict
 */

import {StyleSheet, type SheetEntry} from "aphrodite";
import {typeScale} from "./index";
import borders from "./borders";
import latitudeColors from "../colors";
import sizes, {type Size} from "../sizes";

export const focusedStyle = {
  transitionProperty: "border-color, box-shadow, background",
  borderColor: latitudeColors.grey60,
  outline: 0,
  boxShadow: `0 0 0 3px ${latitudeColors.grey30}`,
};

export const HORIZONTAL_INPUT_PADDING_SMALL_PX = 6;
export const HORIZONTAL_INPUT_PADDING_BASE_PX = 10;
export const HORIZONTAL_INPUT_PADDING_LARGE_PX = 12;

const sharedStyles = {
  transitionProperty: "box-shadow, background",
  transitionDuration: "150ms",
  transitionTimingFunction: "ease-in-out",
  backgroundColor: latitudeColors.white,
  ...borders.a.m,
  borderRadius: 0,
  borderColor: latitudeColors.grey20,
  color: latitudeColors.black,
  width: "100%",
  cursor: "text",
  "::placeHolder": {
    color: latitudeColors.grey40,
  },
  ":hover": {
    boxShadow: "0px 2px 4px rgba(39, 44, 52, 0.12)",
  },
  ":focus": focusedStyle,
  ":focus-within": focusedStyle,
};

const inputNoSidePaddingStyles = {
  base: {
    ...sharedStyles,
    ...typeScale.base,
    height: sizes.m,
  },

  small: {
    ...sharedStyles,
    ...typeScale.subtext,
    height: sizes.s,
  },
  large: {
    ...sharedStyles,
    height: sizes.l,
    fontSize: "16px",
    lineHeight: "18px",
  },
};

export const inputStyles = StyleSheet.create({
  isPrefilled: {
    backgroundColor: latitudeColors.orange10,
  },
  isInvalid: {
    borderColor: latitudeColors.red40,
    ":focus": {
      boxShadow: `0 0 0 3px ${latitudeColors.red20}`,
      borderColor: latitudeColors.red40,
    },
    ":focus-within": {
      boxShadow: `0 0 0 3px ${latitudeColors.red20}`,
      borderColor: latitudeColors.red40,
    },
  },
  readOnly: {
    backgroundColor: latitudeColors.grey20,
    borderColor: latitudeColors.grey20,
    color: latitudeColors.black,
    ":focus": {
      ...focusedStyle,
      borderColor: "transparent",
    },
    ":focus-within": {
      ...focusedStyle,
      borderColor: "transparent",
    },
    ":hover": {
      boxShadow: 0,
    },
  },
  disabled: {
    backgroundColor: latitudeColors.grey20,
    borderColor: latitudeColors.grey20,
    color: latitudeColors.grey40,
    cursor: "not-allowed",
    ":hover": {boxShadow: 0},
  },
  applyEllipsis: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  base: {
    ...inputNoSidePaddingStyles.base,
    paddingLeft: HORIZONTAL_INPUT_PADDING_BASE_PX,
    paddingRight: HORIZONTAL_INPUT_PADDING_BASE_PX,
  },
  baseNoPadding: inputNoSidePaddingStyles.base,
  focused: {
    ...focusedStyle,
  },
  small: {
    ...inputNoSidePaddingStyles.small,
    paddingLeft: HORIZONTAL_INPUT_PADDING_SMALL_PX,
    paddingRight: HORIZONTAL_INPUT_PADDING_SMALL_PX,
  },
  smallNoPadding: inputNoSidePaddingStyles.small,
  large: {
    ...inputNoSidePaddingStyles.large,
    paddingLeft: HORIZONTAL_INPUT_PADDING_LARGE_PX,
    paddingRight: HORIZONTAL_INPUT_PADDING_LARGE_PX,
    paddingBottom: 5,
    paddingTop: 5,
  },
  largeNoPadding: inputNoSidePaddingStyles.large,
});

type InputStyleOptions = {
  size: Size,
  readOnly?: boolean,
  disabled?: boolean,
  isInvalid?: boolean,
  isPrefilled?: boolean,
  noPadding?: boolean,
  applyEllipsis?: boolean,
};

export const getInputStyles = ({
  size,
  readOnly = false,
  disabled = false,
  isInvalid = false,
  isPrefilled = false,
  noPadding = false,
  applyEllipsis = false,
}: InputStyleOptions): $ReadOnlyArray<?SheetEntry> => {
  const sizeToStyleMapping = {
    s: inputStyles.small,
    m: inputStyles.base,
    l: inputStyles.large,
  };

  const noPaddingSizeToStyleMapping = {
    s: inputStyles.smallNoPadding,
    m: inputStyles.baseNoPadding,
    l: inputStyles.largeNoPadding,
  };

  const sizeStyle = noPadding
    ? noPaddingSizeToStyleMapping[size]
    : sizeToStyleMapping[size];

  return [
    sizeStyle,
    readOnly ? inputStyles.readOnly : null,
    disabled ? inputStyles.disabled : null,
    isInvalid ? inputStyles.isInvalid : null,
    isPrefilled ? inputStyles.isPrefilled : null,
    applyEllipsis ? inputStyles.applyEllipsis : null,
  ];
};
