/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow strict
 */
import {StyleSheet} from "aphrodite";

type Size = "none" | "xs" | "s" | "m" | "l" | "xl";

export const deprecatedPaddingSizeConstants: {
  [key: Size]: string,
} = {
  none: "0px",
  xs: "3px",
  s: "6px",
  m: "12px",
  l: "21px",
  xl: "36px",
};

export const deprecatedMarginSizeConstants: {
  [key: Size]: string,
} = {
  none: "0px",
  xs: "3px",
  s: "6px",
  m: "12px",
  l: "21px",
  xl: "36px",
};

export const margin = {
  a: StyleSheet.create({
    n: {margin: deprecatedMarginSizeConstants.none},
    xs: {margin: deprecatedMarginSizeConstants.xs},
    s: {margin: deprecatedMarginSizeConstants.s},
    m: {margin: deprecatedMarginSizeConstants.m},
    l: {margin: deprecatedMarginSizeConstants.l},
    xl: {margin: deprecatedMarginSizeConstants.xl},
  }),
  h: StyleSheet.create({
    n: {
      marginLeft: deprecatedMarginSizeConstants.none,
      marginRight: deprecatedMarginSizeConstants.none,
    },
    xs: {
      marginLeft: deprecatedMarginSizeConstants.xs,
      marginRight: deprecatedMarginSizeConstants.xs,
    },
    s: {
      marginLeft: deprecatedMarginSizeConstants.s,
      marginRight: deprecatedMarginSizeConstants.s,
    },
    m: {
      marginLeft: deprecatedMarginSizeConstants.m,
      marginRight: deprecatedMarginSizeConstants.m,
    },
    l: {
      marginLeft: deprecatedMarginSizeConstants.l,
      marginRight: deprecatedMarginSizeConstants.l,
    },
    xl: {
      marginLeft: deprecatedMarginSizeConstants.xl,
      marginRight: deprecatedMarginSizeConstants.xl,
    },
  }),
  v: StyleSheet.create({
    n: {
      marginTop: deprecatedMarginSizeConstants.none,
      marginBottom: deprecatedMarginSizeConstants.none,
    },
    xs: {
      marginTop: deprecatedMarginSizeConstants.xs,
      marginBottom: deprecatedMarginSizeConstants.xs,
    },
    s: {
      marginTop: deprecatedMarginSizeConstants.s,
      marginBottom: deprecatedMarginSizeConstants.s,
    },
    m: {
      marginTop: deprecatedMarginSizeConstants.m,
      marginBottom: deprecatedMarginSizeConstants.m,
    },
    l: {
      marginTop: deprecatedMarginSizeConstants.l,
      marginBottom: deprecatedMarginSizeConstants.l,
    },
    xl: {
      marginTop: deprecatedMarginSizeConstants.xl,
      marginBottom: deprecatedMarginSizeConstants.xl,
    },
  }),
  t: StyleSheet.create({
    n: {marginTop: deprecatedMarginSizeConstants.none},
    xs: {marginTop: deprecatedMarginSizeConstants.xs},
    s: {marginTop: deprecatedMarginSizeConstants.s},
    m: {marginTop: deprecatedMarginSizeConstants.m},
    l: {marginTop: deprecatedMarginSizeConstants.l},
    xl: {marginTop: deprecatedMarginSizeConstants.xl},
  }),
  r: StyleSheet.create({
    n: {marginRight: deprecatedMarginSizeConstants.none},
    xs: {marginRight: deprecatedMarginSizeConstants.xs},
    s: {marginRight: deprecatedMarginSizeConstants.s},
    m: {marginRight: deprecatedMarginSizeConstants.m},
    l: {marginRight: deprecatedMarginSizeConstants.l},
    xl: {marginRight: deprecatedMarginSizeConstants.xl},
  }),
  b: StyleSheet.create({
    n: {marginBottom: deprecatedMarginSizeConstants.none},
    xs: {marginBottom: deprecatedMarginSizeConstants.xs},
    s: {marginBottom: deprecatedMarginSizeConstants.s},
    m: {marginBottom: deprecatedMarginSizeConstants.m},
    l: {marginBottom: deprecatedMarginSizeConstants.l},
    xl: {marginBottom: deprecatedMarginSizeConstants.xl},
  }),
  l: StyleSheet.create({
    n: {marginLeft: deprecatedMarginSizeConstants.none},
    xs: {marginLeft: deprecatedMarginSizeConstants.xs},
    s: {marginLeft: deprecatedMarginSizeConstants.s},
    m: {marginLeft: deprecatedMarginSizeConstants.m},
    l: {marginLeft: deprecatedMarginSizeConstants.l},
    xl: {marginLeft: deprecatedMarginSizeConstants.xl},
  }),
};

export const padding = {
  a: StyleSheet.create({
    n: {padding: deprecatedPaddingSizeConstants.none},
    xs: {padding: deprecatedPaddingSizeConstants.xs},
    s: {padding: deprecatedPaddingSizeConstants.s},
    m: {padding: deprecatedPaddingSizeConstants.m},
    l: {padding: deprecatedPaddingSizeConstants.l},
    xl: {padding: deprecatedPaddingSizeConstants.xl},
  }),
  h: StyleSheet.create({
    n: {
      paddingLeft: deprecatedPaddingSizeConstants.none,
      paddingRight: deprecatedPaddingSizeConstants.none,
    },
    xs: {
      paddingLeft: deprecatedPaddingSizeConstants.xs,
      paddingRight: deprecatedPaddingSizeConstants.xs,
    },
    s: {
      paddingLeft: deprecatedPaddingSizeConstants.s,
      paddingRight: deprecatedPaddingSizeConstants.s,
    },
    m: {
      paddingLeft: deprecatedPaddingSizeConstants.m,
      paddingRight: deprecatedPaddingSizeConstants.m,
    },
    l: {
      paddingLeft: deprecatedPaddingSizeConstants.l,
      paddingRight: deprecatedPaddingSizeConstants.l,
    },
    xl: {
      paddingLeft: deprecatedPaddingSizeConstants.xl,
      paddingRight: deprecatedPaddingSizeConstants.xl,
    },
  }),
  v: StyleSheet.create({
    n: {
      paddingTop: deprecatedPaddingSizeConstants.none,
      paddingBottom: deprecatedPaddingSizeConstants.none,
    },
    xs: {
      paddingTop: deprecatedPaddingSizeConstants.xs,
      paddingBottom: deprecatedPaddingSizeConstants.xs,
    },
    s: {
      paddingTop: deprecatedPaddingSizeConstants.s,
      paddingBottom: deprecatedPaddingSizeConstants.s,
    },
    m: {
      paddingTop: deprecatedPaddingSizeConstants.m,
      paddingBottom: deprecatedPaddingSizeConstants.m,
    },
    l: {
      paddingTop: deprecatedPaddingSizeConstants.l,
      paddingBottom: deprecatedPaddingSizeConstants.l,
    },
    xl: {
      paddingTop: deprecatedPaddingSizeConstants.xl,
      paddingBottom: deprecatedPaddingSizeConstants.xl,
    },
  }),
  t: StyleSheet.create({
    n: {paddingTop: deprecatedPaddingSizeConstants.none},
    xs: {paddingTop: deprecatedPaddingSizeConstants.xs},
    s: {paddingTop: deprecatedPaddingSizeConstants.s},
    m: {paddingTop: deprecatedPaddingSizeConstants.m},
    l: {paddingTop: deprecatedPaddingSizeConstants.l},
    xl: {paddingTop: deprecatedPaddingSizeConstants.xl},
  }),
  r: StyleSheet.create({
    n: {paddingRight: deprecatedPaddingSizeConstants.none},
    xs: {paddingRight: deprecatedPaddingSizeConstants.xs},
    s: {paddingRight: deprecatedPaddingSizeConstants.s},
    m: {paddingRight: deprecatedPaddingSizeConstants.m},
    l: {paddingRight: deprecatedPaddingSizeConstants.l},
    xl: {paddingRight: deprecatedPaddingSizeConstants.xl},
  }),
  b: StyleSheet.create({
    n: {paddingBottom: deprecatedPaddingSizeConstants.none},
    xs: {paddingBottom: deprecatedPaddingSizeConstants.xs},
    s: {paddingBottom: deprecatedPaddingSizeConstants.s},
    m: {paddingBottom: deprecatedPaddingSizeConstants.m},
    l: {paddingBottom: deprecatedPaddingSizeConstants.l},
    xl: {paddingBottom: deprecatedPaddingSizeConstants.xl},
  }),
  l: StyleSheet.create({
    n: {paddingLeft: deprecatedPaddingSizeConstants.none},
    xs: {paddingLeft: deprecatedPaddingSizeConstants.xs},
    s: {paddingLeft: deprecatedPaddingSizeConstants.s},
    m: {paddingLeft: deprecatedPaddingSizeConstants.m},
    l: {paddingLeft: deprecatedPaddingSizeConstants.l},
    xl: {paddingLeft: deprecatedPaddingSizeConstants.xl},
  }),
};
