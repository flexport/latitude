/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow strict
 */

import {StyleSheet} from "aphrodite";

const FORM_GUTTERS = [12, 20, 32];
const FORM_COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8];

type Gutter = 12 | 20 | 32;
type ColumnSpan = Array<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>;

function buildSpanRules(gutters: Array<Gutter>, columns: ColumnSpan) {
  const spanRules = {};
  const totalCols = columns;
  totalCols.forEach(col => {
    columns.forEach(column => {
      gutters.forEach(gutter => {
        if (column <= col) {
          const spanRuleName = `span-${column.toString()}-of-${col.toString()}-${gutter.toString()}`;
          const spanPercent = (column / col) * 100;
          const colGutter = gutter / 2;
          spanRules[spanRuleName] = {
            flexBasis: `calc(${spanPercent}% - ${gutter}px)`,
            marginLeft: `${colGutter}px`,
            marginRight: `${colGutter}px`,
            marginTop: `${gutter}px`,
            "@supports (display: grid)": {
              gridColumn: `span ${column}`,
              flexBasis: "unset",
              margin: "unset",
            },
          };
        }
      });
    });
  });
  return spanRules;
}

function buildGridRules(gutters: Array<Gutter>) {
  const gridRules = {};
  gutters.forEach(gutter => {
    const gridRuleName = `grid-${gutter.toString()}`;
    const rowGutter = gutter / 2;
    gridRules[gridRuleName] = {
      marginLeft: `${-1 * rowGutter}px`,
      marginRight: `${-1 * rowGutter}px`,
      marginTop: `${-1 * gutter}px`,
      "@supports (display: grid)": {
        marginLeft: "unset",
        marginRight: "unset",
        marginTop: "unset",
        gridColumnGap: `${gutter}px`,
        gridRowGap: `${gutter}px`,
      },
    };
  });
  return gridRules;
}

export const spanRules = StyleSheet.create(
  buildSpanRules(FORM_GUTTERS, FORM_COLUMNS)
);
export const gridRules = StyleSheet.create(buildGridRules(FORM_GUTTERS));
