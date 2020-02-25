/**
 * TEAM: frontend_infra
 * @flow strict
 */

/* eslint-disable flexport/no-unknown-styles */
/* eslint-disable flexport/no-unused-aphrodite-styles */

import {memoize} from "lodash";
import {StyleSheet, type SheetEntry} from "aphrodite";
import {TRANSMISSION, type Theme} from "../context/ThemeNameContext";
import type {ButtonKind, ButtonIntent, ButtonSize, ButtonWidth} from "./Button";
import colors, {transmissionColors} from "../colors";
import {include, padding, margin, typeScale, fontWeights} from "../styles";
import {deprecatedPaddingSizeConstants} from "../styles/deprecatedWhitespace";

type Optionals = {|
  +isLoading?: boolean,
|};

type ButtonStyles = {|
  button: $ReadOnlyArray<?SheetEntry>,
  label: $ReadOnlyArray<?SheetEntry>,
|};

export const getButtonStyle = (
  theme: Theme,
  kind: ButtonKind | "blank",
  intent: ButtonIntent,
  size: ButtonSize,
  width: ButtonWidth,
  disabled: boolean,
  optionals: ?Optionals
): ButtonStyles => {
  const isLoading = optionals ? optionals.isLoading || false : false;

  const styleSheet = styles(theme, intent);

  const buttonStyles = [
    styleSheet.button.base,
    styleSheet.button[size],
    styleSheet.button[kind],
    styleSheet.button[width],
    disabled ? styleSheet.disabledButton.base : null,
    disabled ? styleSheet.disabledButton[kind] : null,
    isLoading ? styleSheet.button.isLoading : null,
  ];

  const labelStyles = [
    styleSheet.label.base,
    styleSheet.label[kind],
    disabled ? styleSheet.disabledLabel[kind] : null,
    isLoading ? styleSheet.label.isLoading : null,
  ];

  return {
    button: buttonStyles,
    label: labelStyles,
  };
};

type ColorSwatch = {|
  +primary1: string,
  +primary2: string,
  +primary3: string,
  +highlight: string,
  +shadow: string,
|};

const getColors = (theme, intent): ColorSwatch => {
  let colorSwatch = {
    primary1: colors.indigo30,
    primary2: colors.indigo30,
    primary3: colors.indigo50,
    highlight: colors.indigo20,
    shadow: "rgba(39, 44, 52, 0.12)",
  };

  if (theme === TRANSMISSION) {
    colorSwatch = {
      primary1: transmissionColors.green40,
      primary2: transmissionColors.green40,
      primary3: transmissionColors.green60,
      highlight: transmissionColors.green20,
      shadow: "rgba(39, 44, 52, 0.12)",
    };
  }

  if (intent === "danger") {
    colorSwatch = {
      primary1: colors.red40,
      primary2: colors.red40,
      primary3: colors.red50,
      highlight: colors.red20,
      shadow: "rgba(39, 44, 52, 0.12)",
    };
  } else if (intent === "none") {
    colorSwatch = {
      primary1: colors.black,
      primary2: colors.grey40,
      primary3: colors.black,
      highlight: colors.grey20,
      shadow: "rgba(39, 44, 52, 0.12)",
    };
  }

  return colorSwatch;
};

const styles = memoize(
  (theme: Theme, intent: ButtonIntent) => {
    const buttonColors = getColors(theme, intent);

    const transformationProperties = {
      transitionProperty:
        "background, box-shadow, color, fill, border, border-color",
      transitionDuration: "150ms",
      transitionTimingFunction: "ease-in-out",
    };

    const button = StyleSheet.create({
      base: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        borderRadius: "0",
        ...typeScale.base,
        fontWeight: fontWeights.bold,
        // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
        ...include(padding.h.m),
        ...include(padding.v.n),
        whiteSpace: "nowrap",
        outline: "none",
        maxWidth: "100%",
        ...transformationProperties,
        background: "none",
        ":hover span svg": transformationProperties,
        ":focus span svg": transformationProperties,
        ":active span svg": transformationProperties,
      },

      solid: {
        background: buttonColors.primary1,
        borderWidth: "0",
        color: colors.white,
        fill: colors.white,
        ":focus": {
          boxShadow: `0 0 0 3px ${buttonColors.highlight}`,
        },
        ":hover": {
          boxShadow: `0 2px 2px ${buttonColors.shadow}`,
        },
        ":active": {
          background: buttonColors.primary3,
          boxShadow: "none",
        },
      },
      hollow: {
        color: buttonColors.primary1,
        fill: buttonColors.primary1,
        background: colors.white,
        border: `2px solid ${colors.grey20}`,
        paddingWidth: `calc(${deprecatedPaddingSizeConstants.m} - 1px)`,
        ":focus": {
          boxShadow: `0 0 0 3px ${buttonColors.highlight}`,
          borderColor: buttonColors.primary2,
        },
        ":hover": {
          boxShadow: `0 2px 2px ${buttonColors.shadow}`,
        },
        ":active": {
          color: buttonColors.primary3,
          borderColor: buttonColors.primary2,
          background: colors.grey10,
          boxShadow: "none",
        },
        ":active span svg": {
          fill: buttonColors.primary3,
        },
      },
      bare: {
        color: buttonColors.primary1,
        fill: buttonColors.primary1,
        borderWidth: "0",
        boxShadow: "none",
        ":focus": {
          boxShadow: `0 0 0 3px ${buttonColors.highlight}`,
        },
        ":hover": {
          background: colors.grey10,
          boxShadow: "none",
        },
        ":active": {
          background: colors.grey20,
          color: buttonColors.primary3,
        },
        ":active span svg": {
          fill: buttonColors.primary3,
        },
      },
      blank: {
        position: "relative",
        color: buttonColors.primary1,
        fill: buttonColors.primary1,
        borderColor: "transparent",
        boxShadow: "none",
        border: "none",
        height: "100%",
        // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
        ...include(padding.a.n),
        ":after": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "calc(100% + 4px)",
          boxShadow: "none",
          pointerEvents: "none",
          ...transformationProperties,
        },
        ":focus": {
          ":after": {
            boxShadow: `0 0 0 3px ${buttonColors.highlight}`,
          },
        },
        ":active": {
          color: buttonColors.primary3,
        },
        ":active span svg": {
          fill: buttonColors.primary3,
        },
      },

      s: {
        height: "24px",
        maxHeight: "24px",
      },
      m: {
        height: "30px",
        maxHeight: "30px",
      },
      l: {
        height: "40px",
        maxHeight: "40px",
      },

      responsive: {
        width: "min-content",
      },
      full: {
        flexGrow: 1,
        flexShrink: 0,
        width: "100%",
      },

      isLoading: {
        color: "transparent",
        pointerEvents: "none",
        boxShadow: "none",
        borderColor: "transparent",
        backgroundColor: colors.grey10,
        ":disabled": {
          color: "transparent",
        },
        ":disabled :nth-child(2) svg path": {
          fill: "transparent",
        },
      },
    });

    const disabledButton = StyleSheet.create({
      base: {
        cursor: "not-allowed",
        pointerEvents: "none",
        boxShadow: "none",
      },
      solid: {
        background: colors.grey30,
        color: colors.grey40,
        fill: colors.grey40,
      },
      hollow: {
        borderColor: "transparent",
        background: colors.grey30,
        color: colors.grey40,
        fill: colors.grey40,
      },
      bare: {
        color: colors.grey30,
        ":nth-child(1n) span svg": {
          fill: colors.grey30,
        },
      },
      blank: {
        color: colors.grey30,
        ":nth-child(1n) span svg": {
          fill: colors.grey30,
        },
      },
    });

    const label = StyleSheet.create({
      base: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        ...typeScale.base,
        fontWeight: fontWeights.bold,
      },
      solid: {},
      hollow: {},
      bare: {
        position: "relative",
        paddingBottom: "1px",
        ":after": {
          content: '""',
          position: "absolute",
          background: buttonColors.primary1,
          width: "100%",
          height: "2px",
          bottom: "0px",
          left: "0",
          ...transformationProperties,
        },
        ":active": {
          ":after": {
            background: buttonColors.primary3,
          },
        },
      },
      blank: {
        position: "relative",
        paddingLeft: "1px",
        paddingRight: "1px",
        overflow: "visisble",
        ":after": {
          content: '""',
          position: "absolute",
          background: buttonColors.primary1,
          width: "calc(100% - 1px)",
          height: "2px",
          bottom: "-1px",
          left: "0",
          ...transformationProperties,
        },
        ":active": {
          ":after": {
            background: buttonColors.primary3,
          },
        },
      },

      isLoading: {
        ":after": {
          background: "transparent",
        },
      },
    });

    const disabledLabel = StyleSheet.create({
      solid: {},
      hollow: {},
      bare: {
        ":after": {
          background: colors.grey30,
        },
      },
      blank: {
        ":after": {
          background: colors.grey30,
        },
      },
    });

    return {
      button,
      disabledButton,
      label,
      disabledLabel,
    };
  },
  (...args) => JSON.stringify(args)
);

export const sharedStyles = StyleSheet.create({
  resetButton: {
    border: "none",
    margin: "0",
    padding: "0",
    width: "auto",
    overflow: "visible",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    lineHeight: "normal",
  },
  label: {
    ...typeScale.base,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...include(margin.l.s),
  },
  labelLeft: {
    ...include(margin.l.n),
    ...include(margin.r.s),
  },
  shadow: {
    boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.06)",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    animationName: {
      from: {
        opacity: "0",
      },
      to: {
        opacity: "1",
      },
    },
    animationDuration: "150ms",
  },
});
