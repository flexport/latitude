/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import colors from "../colors";

const defaultBorderColor = colors.grey20;

export const borderRadiusConstants = {
  standard: "3px",
  redesign: "0px",
};

export const borderWidthConstants = {
  zero: "0px",
  small: "1px",
  medium: "2px",
  large: "3px",
};

const borderConstants = {
  a: {
    z: {
      borderWidth: borderWidthConstants.zero,
      borderStyle: "solid",
      borderColor: defaultBorderColor,
    },
    s: {
      borderWidth: borderWidthConstants.small,
      borderStyle: "solid",
      borderColor: defaultBorderColor,
    },
    m: {
      borderWidth: borderWidthConstants.medium,
      borderStyle: "solid",
      borderColor: defaultBorderColor,
    },
    l: {
      borderWidth: borderWidthConstants.large,
      borderStyle: "solid",
      borderColor: defaultBorderColor,
    },
  },
  h: {
    z: {
      borderLeftWidth: borderWidthConstants.zero,
      borderLeftStyle: "solid",
      borderRightWidth: borderWidthConstants.zero,
      borderRightStyle: "solid",
      borderColor: defaultBorderColor,
    },
    s: {
      borderLeftWidth: borderWidthConstants.small,
      borderLeftStyle: "solid",
      borderRightWidth: borderWidthConstants.small,
      borderRightStyle: "solid",
      borderColor: defaultBorderColor,
    },
    m: {
      borderLeftWidth: borderWidthConstants.medium,
      borderLeftStyle: "solid",
      borderRightWidth: borderWidthConstants.medium,
      borderRightStyle: "solid",
      borderColor: defaultBorderColor,
    },
    l: {
      borderLeftWidth: borderWidthConstants.large,
      borderLeftStyle: "solid",
      borderRightWidth: borderWidthConstants.large,
      borderRightStyle: "solid",
      borderColor: defaultBorderColor,
    },
  },
  v: {
    z: {
      borderTopWidth: borderWidthConstants.zero,
      borderTopStyle: "solid",
      borderBottomWidth: borderWidthConstants.zero,
      borderBottomStyle: "solid",
      borderColor: defaultBorderColor,
    },
    s: {
      borderTopWidth: borderWidthConstants.small,
      borderTopStyle: "solid",
      borderBottomWidth: borderWidthConstants.small,
      borderBottomStyle: "solid",
      borderColor: defaultBorderColor,
    },
    m: {
      borderTopWidth: borderWidthConstants.medium,
      borderTopStyle: "solid",
      borderBottomWidth: borderWidthConstants.medium,
      borderBottomStyle: "solid",
      borderColor: defaultBorderColor,
    },
    l: {
      borderTopWidth: borderWidthConstants.large,
      borderTopStyle: "solid",
      borderBottomWidth: borderWidthConstants.large,
      borderBottomStyle: "solid",
      borderColor: defaultBorderColor,
    },
  },
  t: {
    z: {
      borderTopWidth: borderWidthConstants.zero,
      borderTopStyle: "solid",
      borderColor: defaultBorderColor,
    },
    s: {
      borderTopWidth: borderWidthConstants.small,
      borderTopStyle: "solid",
      borderColor: defaultBorderColor,
    },
    m: {
      borderTopWidth: borderWidthConstants.medium,
      borderTopStyle: "solid",
      borderColor: defaultBorderColor,
    },
    l: {
      borderTopWidth: borderWidthConstants.large,
      borderTopStyle: "solid",
      borderColor: defaultBorderColor,
    },
  },
  r: {
    z: {
      borderRightWidth: borderWidthConstants.zero,
      borderRightStyle: "solid",
      borderColor: defaultBorderColor,
    },
    s: {
      borderRightWidth: borderWidthConstants.small,
      borderRightStyle: "solid",
      borderColor: defaultBorderColor,
    },
    m: {
      borderRightWidth: borderWidthConstants.medium,
      borderRightStyle: "solid",
      borderColor: defaultBorderColor,
    },
    l: {
      borderRightWidth: borderWidthConstants.large,
      borderRightStyle: "solid",
      borderColor: defaultBorderColor,
    },
  },
  b: {
    z: {
      borderBottomWidth: borderWidthConstants.zero,
      borderBottomStyle: "solid",
      borderColor: defaultBorderColor,
    },
    s: {
      borderBottomWidth: borderWidthConstants.small,
      borderBottomStyle: "solid",
      borderColor: defaultBorderColor,
    },
    m: {
      borderBottomWidth: borderWidthConstants.medium,
      borderBottomStyle: "solid",
      borderColor: defaultBorderColor,
    },
    l: {
      borderBottomWidth: borderWidthConstants.large,
      borderBottomStyle: "solid",
      borderColor: defaultBorderColor,
    },
  },
  l: {
    z: {
      borderLeftWidth: borderWidthConstants.zero,
      borderLeftStyle: "solid",
      borderColor: defaultBorderColor,
    },
    s: {
      borderLeftWidth: borderWidthConstants.small,
      borderLeftStyle: "solid",
      borderColor: defaultBorderColor,
    },
    m: {
      borderLeftWidth: borderWidthConstants.medium,
      borderLeftStyle: "solid",
      borderColor: defaultBorderColor,
    },
    l: {
      borderLeftWidth: borderWidthConstants.large,
      borderLeftStyle: "solid",
      borderColor: defaultBorderColor,
    },
  },
};

export default borderConstants;
