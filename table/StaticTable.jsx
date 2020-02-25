/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import invariant from "../tools/invariant";

import Loader from "../Loader";

import Column, {type SortDirection} from "./Column";
import TableRow, {TableHeader, type RowPadding} from "./TableRow";
import StaticCell from "./StaticCell";

type ColumnComponent = React.Element<typeof Column>;

type Props<Data> = {|
  +children: React.ChildrenArray<ColumnComponent>,
  +keyExtractor: Data => string | number,
  +data: $ReadOnlyArray<Data>,
  +rowPadding: RowPadding,
  +loading: boolean,
  +onSortChange?: (string, SortDirection) => void,
  +sortColumn?: ?string,
  +sortDir: SortDirection,
  +showColumns?: $ReadOnlyArray<string>,
  +dataSelected?: Data,
  +emptyState: React.Node,
  +rowHeight?: number | "auto",
  +height?: number | "auto",
  +onRowHover?: (index: number, hover: boolean) => void,
|};

export default class StaticTable<Data> extends React.PureComponent<
  Props<Data>
> {
  static defaultProps = {
    loading: false,
    rowPadding: "medium",
    sortDir: "none",
    emptyState: null,
  };

  filterColumns = (
    children: React.ChildrenArray<ColumnComponent>,
    showColumns: $ReadOnlyArray<string> | void
  ) => {
    const cells = [];
    const columns = [];
    const showColumnsSet = new Set(showColumns);
    React.Children.forEach(children, column => {
      if (!showColumns || showColumnsSet.has(column.props.value)) {
        let defaultCell;
        const {value, children} = column.props;
        if (value) {
          const getDefaultValue = val => value(val);
          defaultCell = (data: Data) => (
            <StaticCell data={data}>{getDefaultValue}</StaticCell>
          );
        }
        const cell = children || defaultCell;
        invariant(
          cell,
          "Column must define a value prop or contain a Cell component in its children"
        );
        cells.push(cell);
        columns.push(column);
      }
    });
    return {cells, columns};
  };

  itemRenderer = (rowData: Data, index: number) => {
    const {
      children,
      showColumns,
      dataSelected,
      rowPadding,
      rowHeight,
      keyExtractor,
      onRowHover,
    } = this.props;
    const {cells, columns} = this.filterColumns(children, showColumns);
    return (
      <TableRow
        key={keyExtractor(rowData)}
        i={index}
        cells={cells}
        columns={columns}
        rowPadding={rowPadding}
        rowData={rowData}
        rowHeight={rowHeight}
        onRowHover={onRowHover}
        isSelected={
          dataSelected
            ? keyExtractor(rowData) === keyExtractor(dataSelected)
            : false
        }
      />
    );
  };

  render() {
    const {
      children,
      data,
      showColumns,
      sortColumn,
      sortDir,
      onSortChange,
      height,
      loading,
      emptyState,
    } = this.props;
    const {columns} = this.filterColumns(children, showColumns);

    const content =
      data.length > 0 ? (
        <div className={css(styles.rowContainer)}>
          {/* $FlowFixMe(Dirak) type Data === type Data */}
          {data.map((datum: Data, index) => this.itemRenderer(datum, index))}
        </div>
      ) : (
        emptyState
      );

    return (
      <div>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          sortDir={sortDir}
          onSortChange={onSortChange}
        />
        <div style={{height}}>
          {loading ? (
            <div className={css(styles.loaderContainer)}>
              <Loader loaded={false} />
            </div>
          ) : (
            content
          )}
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    // eslint-disable-next-line flexport/no-unknown-styles
    "-ms-overflow-style": "-ms-autohiding-scrollbar",
    overflow: "overlay",
  },
  loaderContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
});
