/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import colors from "../colors";

import Column, {type SortDirection} from "./Column";

const PADDING = {
  none: "0px",
  small: "8px",
  medium: "12px",
  large: "20px",
};

export type RowPadding = $Keys<typeof PADDING>;

type RowProps<Data> = {|
  +i: number,
  +cells: Array<*>,
  +columns: Array<*>,
  +rowPadding: RowPadding,
  +rowHeight?: number | "auto",
  +rowData: Data,
  +isSelected: boolean,
  +onRowHover?: (index: number, hover: boolean) => void,
|};

type RowState = {|
  hovering: boolean,
|};

const border = column => {
  const standardBorder = `1px solid ${colors.grey30}`;
  const style = {};
  column.props.border.forEach(b => {
    if (b === "l") {
      style.borderLeft = standardBorder;
    }
    if (b === "r") {
      style.borderRight = standardBorder;
    }
  });
  return style;
};

const boxShadow = (columns, index) => {
  const style = [];
  if (
    index < columns.length - 1 &&
    columns[index + 1].props.border.find(b => b === "l")
  ) {
    style.push("inset -4px 0px 10px -7px rgba(0,0,0,0.4)");
  }
  if (index > 1 && columns[index - 1].props.border.find(b => b === "r")) {
    style.push("inset 4px 0px 10px -7px rgba(0,0,0,0.4)");
  }
  return style.join(", ");
};

export default class TableRow<Data> extends React.PureComponent<
  RowProps<Data>,
  RowState
> {
  state = {
    hovering: false,
  };

  handleMouseEnter = () => {
    this.setState({hovering: true});
    if (this.props.onRowHover) {
      this.props.onRowHover(this.props.i, true);
    }
  };

  handleMouseLeave = () => {
    this.setState({hovering: false});
    if (this.props.onRowHover) {
      this.props.onRowHover(this.props.i, false);
    }
  };

  render() {
    const {i, cells, columns, rowPadding, rowData, rowHeight} = this.props;
    return (
      <div
        className={css(styles.tableWrapper)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {cells.map((cell, j) => {
          const backgroundColor =
            /* eslint-disable-next-line no-nested-ternary */
            this.state.hovering || this.props.isSelected
              ? colors.grey20
              : columns[j].props.striped && i % 2 === 0
              ? colors.grey10
              : colors.white;
          return (
            <div
              className={css(styles.tableRow)}
              key={columns[j].props.name}
              style={{
                backgroundColor,
                flex: columns[j].props.flex,
                width: columns[j].props.width,
                height: rowHeight,
                padding: `${PADDING[rowPadding]} 0px`,
                maxWidth: columns[j].props.maxWidth,
                minWidth: columns[j].props.minWidth,
                justifyContent: columns[j].props.justifyContent,
                boxShadow: boxShadow(columns, j),
                ...border(columns[j]),
              }}
            >
              {cell(rowData)}
            </div>
          );
        })}
      </div>
    );
  }
}

type ColumnComponent = React.Element<typeof Column>;

type HeaderProps = {|
  +columns: $ReadOnlyArray<ColumnComponent>,
  +sortColumn?: ?string,
  +sortDir: SortDirection,
  +onSortChange?: (string, SortDirection) => void,
|};

export function TableHeader(props: HeaderProps) {
  const {columns, sortColumn, sortDir, onSortChange} = props;

  return (
    <div className={css(styles.tableContainer)}>
      {columns.map((column, i) => {
        const {name, header, flex, width, maxWidth, minWidth} = column.props;
        const columnSortDirection = sortColumn === name ? sortDir : "none";
        return (
          <div
            className={css(styles.header)}
            key={name}
            style={{
              flex,
              width,
              maxWidth,
              minWidth,
              boxShadow: boxShadow(columns, i),
              ...border(column),
            }}
          >
            {header
              ? header(
                  columnSortDirection,
                  onSortChange
                    ? sortDir => onSortChange(name, sortDir)
                    : () => {}
                )
              : null}
          </div>
        );
      })}
    </div>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    display: "flex",
    background: colors.white,
  },
  tableWrapper: {
    display: "flex",
    alignItems: "stretch",
  },
  tableRow: {
    display: "flex",
  },
  header: {
    display: "flex",
    padding: "8px 0px",
    borderBottom: `1px solid ${colors.grey30}`,
  },
});
