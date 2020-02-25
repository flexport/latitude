/**
 * TEAM: frontend_infra
 * @flow strict
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {GridContext} from "./Grid";
import typeof Cell from "./Cell";

type Props = {|
  +children: React.ChildrenArray<React.Element<Cell>>,
|};

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
export default function Row({children}: Props) {
  const grid = React.useContext(GridContext);
  return (
    <div
      className={css(styles.row)}
      style={{
        marginLeft: `${-0.5 * grid.gutter}px`,
        marginRight: `${-0.5 * grid.gutter}px`,
        marginTop: `${-1 * grid.rowGap}px`,
      }}
    >
      {children}
    </div>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
