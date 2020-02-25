/**
 * TEAM: frontend_infra
 * @flow strict
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import typeof Row from "./Row";
import {rowStyles} from "./gridTools";

// These union types extracted manually from gridTools.js
type Gutter = 0 | 4 | 12 | 20 | 32;
type RowGaps = 0 | 4 | 12 | 20 | 32 | 64 | 128 | 256;

export type GridProps = {|
  +gutter: Gutter,
  +rowGap: RowGaps,
|};

type Props = {|
  +children: React.ChildrenArray<React.Element<Row>>,
  ...GridProps,
|};

export const GridContext: React.Context<GridProps> = React.createContext({
  gutter: 20,
  rowGap: 0,
});

/**
 * @short A 12 column grid component
 * @brandStatus V3
 * @status Beta
 * @category Layout
 *
 * Grids on grids on grids.
 */
/**
 * $Hide from docgen
 */
export default function Grid({children, gutter = 20, rowGap = 0}: Props) {
  return (
    <GridContext.Provider value={{gutter, rowGap}}>
      <div>
        {React.Children.map(children, (row, i) => (
          <div
            className={css(rowStyles[`rowGap-${rowGap}`], styles.row)}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
          >
            {row}
          </div>
        ))}
      </div>
    </GridContext.Provider>
  );
}

const styles = StyleSheet.create({
  row: {
    ":last-child": {
      marginBottom: 0,
    },
  },
});
