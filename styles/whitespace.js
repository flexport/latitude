/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow strict
 */
import {StyleSheet} from "aphrodite";

type Size = "none" | "xs" | "s" | "m" | "l" | "xl" | "xxl";

export const whitespaceSizeConstants: {
  [key: Size]: number,
} = {
  none: 0,
  xs: 4,
  s: 8,
  m: 12,
  l: 20,
  xl: 32,
  xxl: 40,
};

export const margin = {
  a: StyleSheet.create({
    n: {margin: whitespaceSizeConstants.none},
    xs: {margin: whitespaceSizeConstants.xs},
    s: {margin: whitespaceSizeConstants.s},
    m: {margin: whitespaceSizeConstants.m},
    l: {margin: whitespaceSizeConstants.l},
    xl: {margin: whitespaceSizeConstants.xl},
    xxl: {margin: whitespaceSizeConstants.xxl},
  }),
  h: StyleSheet.create({
    n: {
      marginLeft: whitespaceSizeConstants.none,
      marginRight: whitespaceSizeConstants.none,
    },
    xs: {
      marginLeft: whitespaceSizeConstants.xs,
      marginRight: whitespaceSizeConstants.xs,
    },
    s: {
      marginLeft: whitespaceSizeConstants.s,
      marginRight: whitespaceSizeConstants.s,
    },
    m: {
      marginLeft: whitespaceSizeConstants.m,
      marginRight: whitespaceSizeConstants.m,
    },
    l: {
      marginLeft: whitespaceSizeConstants.l,
      marginRight: whitespaceSizeConstants.l,
    },
    xl: {
      marginLeft: whitespaceSizeConstants.xl,
      marginRight: whitespaceSizeConstants.xl,
    },
    xxl: {
      marginLeft: whitespaceSizeConstants.xxl,
      marginRight: whitespaceSizeConstants.xxl,
    },
  }),
  v: StyleSheet.create({
    n: {
      marginTop: whitespaceSizeConstants.none,
      marginBottom: whitespaceSizeConstants.none,
    },
    xs: {
      marginTop: whitespaceSizeConstants.xs,
      marginBottom: whitespaceSizeConstants.xs,
    },
    s: {
      marginTop: whitespaceSizeConstants.s,
      marginBottom: whitespaceSizeConstants.s,
    },
    m: {
      marginTop: whitespaceSizeConstants.m,
      marginBottom: whitespaceSizeConstants.m,
    },
    l: {
      marginTop: whitespaceSizeConstants.l,
      marginBottom: whitespaceSizeConstants.l,
    },
    xl: {
      marginTop: whitespaceSizeConstants.xl,
      marginBottom: whitespaceSizeConstants.xl,
    },
    xxl: {
      marginTop: whitespaceSizeConstants.xxl,
      marginBottom: whitespaceSizeConstants.xxl,
    },
  }),
  t: StyleSheet.create({
    n: {marginTop: whitespaceSizeConstants.none},
    xs: {marginTop: whitespaceSizeConstants.xs},
    s: {marginTop: whitespaceSizeConstants.s},
    m: {marginTop: whitespaceSizeConstants.m},
    l: {marginTop: whitespaceSizeConstants.l},
    xl: {marginTop: whitespaceSizeConstants.xl},
    xxl: {marginTop: whitespaceSizeConstants.xxl},
  }),
  r: StyleSheet.create({
    n: {marginRight: whitespaceSizeConstants.none},
    xs: {marginRight: whitespaceSizeConstants.xs},
    s: {marginRight: whitespaceSizeConstants.s},
    m: {marginRight: whitespaceSizeConstants.m},
    l: {marginRight: whitespaceSizeConstants.l},
    xl: {marginRight: whitespaceSizeConstants.xl},
    xxl: {marginRight: whitespaceSizeConstants.xxl},
  }),
  b: StyleSheet.create({
    n: {marginBottom: whitespaceSizeConstants.none},
    xs: {marginBottom: whitespaceSizeConstants.xs},
    s: {marginBottom: whitespaceSizeConstants.s},
    m: {marginBottom: whitespaceSizeConstants.m},
    l: {marginBottom: whitespaceSizeConstants.l},
    xl: {marginBottom: whitespaceSizeConstants.xl},
    xxl: {marginBottom: whitespaceSizeConstants.xxl},
  }),
  l: StyleSheet.create({
    n: {marginLeft: whitespaceSizeConstants.none},
    xs: {marginLeft: whitespaceSizeConstants.xs},
    s: {marginLeft: whitespaceSizeConstants.s},
    m: {marginLeft: whitespaceSizeConstants.m},
    l: {marginLeft: whitespaceSizeConstants.l},
    xl: {marginLeft: whitespaceSizeConstants.xl},
    xxl: {marginLeft: whitespaceSizeConstants.xxl},
  }),
};

export const padding = {
  a: StyleSheet.create({
    n: {padding: whitespaceSizeConstants.none},
    xs: {padding: whitespaceSizeConstants.xs},
    s: {padding: whitespaceSizeConstants.s},
    m: {padding: whitespaceSizeConstants.m},
    l: {padding: whitespaceSizeConstants.l},
    xl: {padding: whitespaceSizeConstants.xl},
    xxl: {padding: whitespaceSizeConstants.xxl},
  }),
  h: StyleSheet.create({
    n: {
      paddingLeft: whitespaceSizeConstants.none,
      paddingRight: whitespaceSizeConstants.none,
    },
    xs: {
      paddingLeft: whitespaceSizeConstants.xs,
      paddingRight: whitespaceSizeConstants.xs,
    },
    s: {
      paddingLeft: whitespaceSizeConstants.s,
      paddingRight: whitespaceSizeConstants.s,
    },
    m: {
      paddingLeft: whitespaceSizeConstants.m,
      paddingRight: whitespaceSizeConstants.m,
    },
    l: {
      paddingLeft: whitespaceSizeConstants.l,
      paddingRight: whitespaceSizeConstants.l,
    },
    xl: {
      paddingLeft: whitespaceSizeConstants.xl,
      paddingRight: whitespaceSizeConstants.xl,
    },
    xxl: {
      paddingLeft: whitespaceSizeConstants.xxl,
      paddingRight: whitespaceSizeConstants.xxl,
    },
  }),
  v: StyleSheet.create({
    n: {
      paddingTop: whitespaceSizeConstants.none,
      paddingBottom: whitespaceSizeConstants.none,
    },
    xs: {
      paddingTop: whitespaceSizeConstants.xs,
      paddingBottom: whitespaceSizeConstants.xs,
    },
    s: {
      paddingTop: whitespaceSizeConstants.s,
      paddingBottom: whitespaceSizeConstants.s,
    },
    m: {
      paddingTop: whitespaceSizeConstants.m,
      paddingBottom: whitespaceSizeConstants.m,
    },
    l: {
      paddingTop: whitespaceSizeConstants.l,
      paddingBottom: whitespaceSizeConstants.l,
    },
    xl: {
      paddingTop: whitespaceSizeConstants.xl,
      paddingBottom: whitespaceSizeConstants.xl,
    },
    xxl: {
      paddingTop: whitespaceSizeConstants.xxl,
      paddingBottom: whitespaceSizeConstants.xxl,
    },
  }),
  t: StyleSheet.create({
    n: {paddingTop: whitespaceSizeConstants.none},
    xs: {paddingTop: whitespaceSizeConstants.xs},
    s: {paddingTop: whitespaceSizeConstants.s},
    m: {paddingTop: whitespaceSizeConstants.m},
    l: {paddingTop: whitespaceSizeConstants.l},
    xl: {paddingTop: whitespaceSizeConstants.xl},
    xxl: {paddingTop: whitespaceSizeConstants.xxl},
  }),
  r: StyleSheet.create({
    n: {paddingRight: whitespaceSizeConstants.none},
    xs: {paddingRight: whitespaceSizeConstants.xs},
    s: {paddingRight: whitespaceSizeConstants.s},
    m: {paddingRight: whitespaceSizeConstants.m},
    l: {paddingRight: whitespaceSizeConstants.l},
    xl: {paddingRight: whitespaceSizeConstants.xl},
    xxl: {paddingRight: whitespaceSizeConstants.xxl},
  }),
  b: StyleSheet.create({
    n: {paddingBottom: whitespaceSizeConstants.none},
    xs: {paddingBottom: whitespaceSizeConstants.xs},
    s: {paddingBottom: whitespaceSizeConstants.s},
    m: {paddingBottom: whitespaceSizeConstants.m},
    l: {paddingBottom: whitespaceSizeConstants.l},
    xl: {paddingBottom: whitespaceSizeConstants.xl},
    xxl: {paddingBottom: whitespaceSizeConstants.xxl},
  }),
  l: StyleSheet.create({
    n: {paddingLeft: whitespaceSizeConstants.none},
    xs: {paddingLeft: whitespaceSizeConstants.xs},
    s: {paddingLeft: whitespaceSizeConstants.s},
    m: {paddingLeft: whitespaceSizeConstants.m},
    l: {paddingLeft: whitespaceSizeConstants.l},
    xl: {paddingLeft: whitespaceSizeConstants.xl},
    xxl: {paddingLeft: whitespaceSizeConstants.xxl},
  }),
};
