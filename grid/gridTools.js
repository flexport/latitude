/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import {memoize} from "lodash";
import {StyleSheet} from "aphrodite";

export const GRID_COLUMNS = 12;
const spans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const gutters = [0, 4, 12, 20, 32];
const rowGaps = [0, 4, 12, 20, 32, 64, 128, 256];
const breakpoints = [
  {
    name: "xs",
    min: "0px",
  },
  {
    name: "sm",
    min: "480px",
  },
  {
    name: "md",
    min: "768px",
  },
  {
    name: "lg",
    min: "1024px",
  },
  {
    name: "xl",
    min: "1440px",
  },
];

// this function generates a bunch of CSS rules that map to the permutations generated in makeSpanRules in Column.jsx
const buildColumnRules = memoize(() => {
  const columnSpans = {};
  breakpoints.forEach(breakpoint => {
    spans.forEach(span => {
      gutters.forEach(gutter => {
        rowGaps.forEach(rowGap => {
          // main column span rule name specified by: breakpoint-columnSpan-gutter-rowGap
          const columnSpanRuleName = `${
            breakpoint.name
          }-${span}-${gutter}-${rowGap}`;
          // offset rule name specified by: breakpoint-columnOffset-gutter
          const offsetRuleName = `${breakpoint.name}Offset-${span}-${gutter}`;
          const spanPercent = (span / GRID_COLUMNS) * 100;
          const colGutter = gutter / 2; // split in half since it is split between left and right margins
          const mediaQuery = breakpoints.find(
            bp => bp.name === breakpoint.name
          );
          if (mediaQuery) {
            columnSpans[columnSpanRuleName] = {
              [`@media (min-width: ${mediaQuery.min})`]: {
                flexBasis: `calc(${spanPercent}% - ${gutter}px)`,
                marginLeft: `${colGutter}px`,
                marginRight: `${colGutter}px`,
                marginTop: `${rowGap}px`, // account for wrapping
              },
            };
            columnSpans[offsetRuleName] = {
              [`@media (min-width: ${mediaQuery.min})`]: {
                marginLeft: `calc(${spanPercent}% + ${colGutter}px)`,
              },
            };
          }
        });
      });
    });
  });
  return columnSpans;
});

export const columnStyles = StyleSheet.create(buildColumnRules());

const buildRowGapRules = memoize(() => {
  const rowGapRules = {};
  rowGaps.forEach(rowGap => {
    const rowGapRuleName = `rowGap-${rowGap}`;
    rowGapRules[rowGapRuleName] = {
      marginBottom: `${rowGap}px`,
    };
  });
  return rowGapRules;
});

export const rowStyles = StyleSheet.create(buildRowGapRules());
