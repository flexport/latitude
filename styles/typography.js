/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow strict
 */

export const uiFontFamily = [
  "gt-america",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Fira Sans",
  "Droid Sans",
  "Helvetica Neue",
  "sans-serif",
];

export const fontWeights = Object.freeze({
  regular: "400",
  bold: "700",
  boldExtended: "800",
});

export const fontStyles = Object.freeze({
  normal: "normal",
  italic: "italic",
});

export const typeScale = {
  display: {
    fontSize: "32px",
    fontFamily: uiFontFamily,
    lineHeight: "48px",
    letterSpacing: -0.02,
    fontWeight: fontWeights.bold,
    fontStyle: fontStyles.normal,
  },
  headline: {
    fontSize: "24px",
    fontFamily: uiFontFamily,
    lineHeight: "32px",
    letterSpacing: -0.02,
    fontWeight: fontWeights.boldExtended,
    fontStyle: fontStyles.normal,
  },
  title: {
    fontSize: "16px",
    fontFamily: uiFontFamily,
    lineHeight: "20px",
    letterSpacing: 0,
    fontWeight: fontWeights.bold,
    fontStyle: fontStyles.normal,
  },
  base: {
    fontSize: "14px",
    fontFamily: uiFontFamily,
    lineHeight: "20px",
    letterSpacing: 0,
    fontWeight: fontWeights.regular,
    fontStyle: fontStyles.normal,
  },
  subtext: {
    fontSize: "12px",
    fontFamily: uiFontFamily,
    lineHeight: "16px",
    letterSpacing: 0,
    fontWeight: fontWeights.regular,
    fontStyle: fontStyles.normal,
  },
  tiny: {
    fontSize: "9px",
    fontFamily: uiFontFamily,
    lineHeight: "12px",
    letterSpacing: 0,
  },
};
