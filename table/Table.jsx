/**
 * TEAM: frontend_infra
 *
 * @flow strict-local
 */
import * as React from "react";
import {FixedSizeList} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import {StyleSheet, css} from "aphrodite";
import AutoSizer from "react-virtualized-auto-sizer";

import PopupWithClickAway from "../popup/PopupWithClickAway";
import IconButton from "../button/IconButton";
import Tooltip from "../Tooltip";
import Checkbox from "../Checkbox";
import CheckboxList from "../CheckboxList";
import invariant from "../tools/invariant";
import Text from "../Text";
import Icon from "../Icon";
import Loader from "../Loader";
import colors from "../colors";
import Clickable from "../base_candidate/Clickable";
import RowContext from "./RowContext";
import typeof StaticLoadingRow from "./StaticLoadingRow";

export type Style = {[string]: string | number};

const TableContext: React.Context<TableContextType<*>> = React.createContext({
  columns: [],
  rowWidth: 0,
});
type TableContextType<T> = {|
  +rowWidth: number,
  +columns: $ReadOnlyArray<Column<T>>,
|};

export type ColumnDefinition<T> = {|
  +id: string,
  +header: string,
  +render: T => React.Node,
  +renderAggregate?: ($ReadOnlyArray<T>) => React.Node,
  +renderExpanded?: T => React.Node,
  +width: number,
  +comparator?: (T, T, "asc" | "desc") => number,
  +aggregateComparator?: ($ReadOnlyArray<T>, $ReadOnlyArray<T>) => number,
  +headerAlignment?: "left" | "center" | "right",
  +tooltipText?: string,
|};

type Sort = {|
  +columnId: string,
  +direction: "asc" | "desc",
|};

type Pin = {|
  +columnId: string,
  +align: "left" | "right",
|};

type Hide = {|
  +columnId: string,
|};

type Column<T> = {
  id: string,
  Header: () => React.Node,
  Cell: React.ComponentType<{|
    +row: T,
  |}>,
  AggregateCell: React.ComponentType<{|
    +rows: $ReadOnlyArray<T>,
  |}>,
  ExpandedCell: React.ComponentType<{|
    +row: T,
  |}>,
  pinned: "left" | "right" | null,
  width: number,
};

type FlattenedRow<T> =
  | {
      id: string,
      type: "aggregate",
      rows: $ReadOnlyArray<T>,
    }
  | {
      id: string,
      type: "default" | "expanded",
      row: T,
    };

export const HEADER_HEIGHT = 32;
export const DEFAULT_ROW_HEIGHT = 44;
export const COLUMN_PADDING = 20;
export const FIRST_COLUMN_PADDING = 12;
export const PINNED_COLUMN_BORDER_WIDTH = 2;
export const ROW_EXPANSION_COLUMN_WIDTH = 48;
export const ROW_SELECTION_COLUMN_WIDTH = 48;
const MIN_TABLE_WIDTH = 320;

const noop = () => {};

function handleCellClick(e: SyntheticEvent<HTMLDivElement>) {
  e.stopPropagation();
}

// IE11 Sticky scrolling implementation
const StickyScrollContext = React.createContext();

function createStickyScrollPolyfill() {
  const isPositionStickySupported = (() => {
    const testStyle = document.createElement("a").style;

    testStyle.cssText =
      "position:sticky;position:-webkit-sticky;position:-ms-sticky;";

    return testStyle.position.includes("sticky");
  })();
  const context = {
    addRef,
    pinElements: {
      top: [],
      left: [],
      right: [],
    },
    scrollLeft: 0,
    rightOffset: 0,
    scrollTop: 0,
    isPositionStickySupported,
  };

  // This position updater applies for recreating sticky behavior on IE11
  function processScrollPosition(targetElement: HTMLElement) {
    context.scrollLeft = targetElement.scrollLeft;

    context.pinElements.left.forEach((element: HTMLElement) => {
      // eslint-disable-next-line no-param-reassign
      element.style.transform = `translateX(${context.scrollLeft}px)`;
    });

    context.rightOffset =
      targetElement.offsetWidth -
      targetElement.scrollWidth +
      targetElement.scrollLeft;

    context.pinElements.right.forEach((element: HTMLElement) => {
      // eslint-disable-next-line no-param-reassign
      element.style.transform = `translateX(${context.rightOffset}px)`;
    });

    context.scrollTop = targetElement.scrollTop;

    context.pinElements.top.forEach((element: HTMLElement) => {
      // eslint-disable-next-line no-param-reassign
      element.style.transform = `translateY(${context.scrollTop}px)`;
    });
  }

  function addRef(type: "top" | "left" | "right") {
    if (context.isPositionStickySupported) return;

    return (element: ?HTMLElement) => {
      if (!element) return;

      if (!context.pinElements[type].includes(element))
        context.pinElements[type].push(element);
    };
  }

  return {context, processScrollPosition, addRef, isPositionStickySupported};
}

/**
 * @short Displays tabular data
 * @brandStatus V2
 * @status Beta
 * @category Data Display
 *
 * **DISCLAIMER: The table component is still under active development**
 *
 * `<Table />` efficiently displays large amounts of data, and supports column pinning,
 * row selection, sorting, and scrolling. Expandable rows, cell selection, drag-and-drop
 * column reordering, and other features are coming soon.
 *
 * **Note: Table takes the full height of its container so the container needs to have an
 * explicit height set**
 */
export default function Table<T>({
  data,
  columnDefinitions,
  getUniqueRowId,
  rowSelectionEnabled = false,
  rowSelectionPinned = true,
  onSelectedRowsChange = noop,
  selectedRows = new Set(),
  disabledRows = new Set(),
  hideSelectAllCheckbox = false,
  rowHeight = DEFAULT_ROW_HEIGHT,
  pinnedColumns = [],
  columnCustomizationEnabled = false,
  hiddenColumns = [],
  onHiddenColumnsChange = noop,
  sortBy,
  onSortByChange = noop,
  rowAggregationEnabled = false,
  rowAggregationPinned = true,
  getRowGroupId,
  expandSingleAggregateRow = false,
  expandedRows = new Set(),
  onExpandedRowsChange = noop,
  hasNextPage = false,
  isNextPageLoading = false,
  loadNextPage = noop,
  rowClickingEnabled = false,
  clickedRow,
  onRowClick = noop,
  rowGroupClickingEnabled = false,
  clickedRowGroup,
  onRowGroupClick = noop,
  isLoading = false,
  useFullWidth = false,
  staticLoadingRow = null,
}: {
  /** An array of data for each row in the table */
  +data: $ReadOnlyArray<T>,
  /** Defines how each column of data is rendered. Each column definitions needs an id, a header, a Cell, a width, and a comparator for sorting */
  +columnDefinitions: $ReadOnlyArray<ColumnDefinition<T>>,
  /** A function to uniquely identify each row, this ID is what is returned in the row selections set */
  +getUniqueRowId: T => string,
  /** Whether or not checkboxes for row selection will be shown */
  +rowSelectionEnabled?: boolean,
  /** Whether or not the checkboxes for row selection will be pinned to the left of the table */
  +rowSelectionPinned?: boolean,
  /** Callback for when the user changes the selected rows */
  +onSelectedRowsChange?: ($ReadOnlySet<string>) => void,
  /** Which rows are selected, based on IDs returned from getUniqueRowId */
  +selectedRows?: $ReadOnlySet<string>,
  /** Which rows cannot be selected by the checkbox, based on IDs returned from getUniqueRowId */
  +disabledRows?: $ReadOnlySet<string>,
  /** Hides the select all checkbox */
  +hideSelectAllCheckbox?: boolean,
  /** Controls the height of each row in the table */
  +rowHeight?: number,
  /** Which columns are pinned to either the left or right side of the table (other columns will scroll underneath) */
  +pinnedColumns?: $ReadOnlyArray<Pin>,
  /** Callback for when the user changes pinned columns */
  +onPinnedColumnsChange?: ($ReadOnlyArray<Pin>) => void,
  /** Whether or not to show the + for changing column visibility */
  +columnCustomizationEnabled?: boolean,
  /** Which columns are hidden */
  +hiddenColumns?: $ReadOnlyArray<Hide>,
  /** Callback for when the user changes which columns are hidden */
  +onHiddenColumnsChange?: ($ReadOnlyArray<Hide>) => void,
  /** Which column to sort by, and what direction to sort */
  +sortBy?: ?Sort,
  /** Callback for when the user changes which column and direction to sort */
  +onSortByChange?: (?Sort) => void,
  /** Whether or not rows will be grouped and an aggregation row is present */
  +rowAggregationEnabled?: boolean,
  /** Whether or not the arrows for row aggregation will be pinned to the left of the table */
  +rowAggregationPinned?: boolean,
  /** A function to determine which row group the row belongs to, this ID is what is returned in the row expansions set  */
  +getRowGroupId?: T => string,
  /** Automatically expand single aggregate row with no children */
  +expandSingleAggregateRow?: boolean,
  /** Which row groups are expanded, based on IDs returned from getRowGroupId */
  +expandedRows?: $ReadOnlySet<string>,
  /** Callback for when the user expands a row group */
  +onExpandedRowsChange?: ($ReadOnlySet<string>) => void,
  /** Whether additional data can be loaded from the server. Used for scrolling pagination */
  +hasNextPage?: boolean,
  /** Whether additional data is currently being loaded. Used for scrolling pagination */
  +isNextPageLoading?: boolean,
  /** Callback to load additional data when a user nears the end of the existing list of data. Used for scrolling pagination */
  +loadNextPage?: () => mixed,
  +rowClickingEnabled?: boolean,
  +clickedRow?: ?string,
  +onRowClick?: string => void,
  +rowGroupClickingEnabled?: boolean,
  +clickedRowGroup?: ?string,
  +onRowGroupClick?: string => void,
  /** Initial results are loading */
  +isLoading?: boolean,
  /** Table size expands to the full width of the container */
  +useFullWidth?: boolean,
  /** Enables static loading row component */
  +staticLoadingRow?: ?React.Element<StaticLoadingRow>,
}) {
  invariant(
    !(disabledRows.size > 0 && rowAggregationEnabled && rowSelectionEnabled),
    "Tables can not have disabled rows with row aggregation and row selection. Reach out to the latitude team if you have a use case that requires these"
  );

  const visibleColumnDefinitions = columnDefinitions.filter(
    cd => !hiddenColumns.find(c => c.columnId === cd.id)
  );
  const StickyScrollPolyfill = createStickyScrollPolyfill();

  function sortRows(rows: $ReadOnlyArray<T>, sortBy: ?Sort) {
    if (!sortBy) {
      return rows;
    }
    const columnDefinition = columnDefinitions.find(
      cd => cd.id === sortBy.columnId
    );
    invariant(
      columnDefinition != null,
      `column definition with id ${sortBy.columnId} does not exist`
    );
    const {comparator} = columnDefinition;
    invariant(
      comparator != null,
      `comparator does not exist for column definition with id ${
        sortBy.columnId
      }`
    );
    const multiplier = sortBy.direction === "asc" ? 1 : -1;
    return [...rows].sort(
      (a, b) => multiplier * comparator(a, b, sortBy.direction)
    );
  }

  const sortedRows = sortRows(data, sortBy);

  function groupRows(
    rows: $ReadOnlyArray<T>
  ): $ReadOnlyArray<$ReadOnlyArray<T>> {
    invariant(
      getRowGroupId,
      "getRowGroupId must be provided to aggregate rows"
    );
    const rowGroupIdToRows = new Map<string, $ReadOnlyArray<T>>();
    rows.forEach(row => {
      const rowGroupId = getRowGroupId(row);
      const rows = rowGroupIdToRows.get(rowGroupId);
      rowGroupIdToRows.set(rowGroupId, rows ? [...rows, row] : [row]);
    });
    return [...rowGroupIdToRows.values()];
  }

  function sortRowGroups(rowGroups: $ReadOnlyArray<$ReadOnlyArray<T>>) {
    if (!sortBy) {
      return rowGroups;
    }
    const columnDefinition = columnDefinitions.find(
      cd => cd.id === sortBy.columnId
    );
    invariant(
      columnDefinition != null,
      `column definition with id ${sortBy.columnId} does not exist`
    );
    const {comparator, aggregateComparator} = columnDefinition;

    const multiplier = sortBy.direction === "asc" ? 1 : -1;
    return [...rowGroups].sort((as, bs) => {
      if (aggregateComparator) {
        return multiplier * aggregateComparator(as, bs);
      }
      invariant(
        comparator != null,
        `comparator must exist if aggregateComparator does not exist for column definition with id ${
          sortBy.columnId
        }`
      );
      return multiplier * comparator(as[0], bs[0], sortBy.direction);
    });
  }

  const flattenRow = (row: T): FlattenedRow<T> => ({
    id: getUniqueRowId(row),
    type: "default",
    row,
  });

  const flattenExpandedRow = (row: T): FlattenedRow<T> => ({
    id: getUniqueRowId(row),
    type: "expanded",
    row,
  });

  const flattenRowGroup = (rowGroup: $ReadOnlyArray<T>): FlattenedRow<T> => {
    invariant(getRowGroupId);
    return {
      id: getRowGroupId(rowGroup[0]),
      type: "aggregate",
      rows: rowGroup,
    };
  };

  function flattenRows(
    rows: $ReadOnlyArray<T>
  ): $ReadOnlyArray<FlattenedRow<T>> {
    return rows.map(flattenRow);
  }

  function flattenRowGroups(
    rowGroups: $ReadOnlyArray<$ReadOnlyArray<T>>
  ): $ReadOnlyArray<FlattenedRow<T>> {
    invariant(getRowGroupId);
    return rowGroups.reduce(
      (rows, rowGroup) => [
        ...rows,
        expandSingleAggregateRow && rowGroup.length === 1
          ? flattenRow(rowGroup[0])
          : flattenRowGroup(rowGroup),
        ...(expandedRows.has(getRowGroupId(rowGroup[0]))
          ? rowGroup.map(flattenExpandedRow)
          : []),
      ],
      []
    );
  }

  const flattenedRows = rowAggregationEnabled
    ? flattenRowGroups(sortRowGroups(groupRows(sortedRows)))
    : flattenRows(sortedRows);

  const nonaggregatedSelectionCell = ({row}) => (
    <div
      className={css(styles.rowSelectionCell)}
      onClick={handleCellClick}
      role="presentation"
    >
      <Checkbox
        checked={selectedRows.has(getUniqueRowId(row))}
        disabled={disabledRows.has(getUniqueRowId(row))}
        onChange={isSelected => {
          const newSelection = new Set(selectedRows);
          if (isSelected) {
            newSelection.add(getUniqueRowId(row));
          } else {
            newSelection.delete(getUniqueRowId(row));
          }
          onSelectedRowsChange(newSelection);
        }}
      />
    </div>
  );

  const rowSelectionColumn = {
    id: "row_selection",
    pinned:
      rowSelectionPinned ||
      pinnedColumns.find(({align}) => align === "left") != null
        ? "left"
        : null,
    Header: () => (
      <div className={css(styles.rowSelectionCell)}>
        {hideSelectAllCheckbox || disabledRows.size > 0 ? null : (
          <Checkbox
            checked={selectedRows.size === data.length}
            indeterminate={selectedRows.size > 0}
            onChange={isSelected => {
              if (isSelected) {
                onSelectedRowsChange(new Set(data.map(getUniqueRowId)));
              } else {
                onSelectedRowsChange(new Set());
              }
            }}
          />
        )}
      </div>
    ),
    Cell: nonaggregatedSelectionCell,
    ExpandedCell: nonaggregatedSelectionCell,
    AggregateCell: ({rows}) => (
      <div
        className={css(styles.rowSelectionCell)}
        onClick={handleCellClick}
        role="presentation"
      >
        <Checkbox
          checked={rows.every(row => selectedRows.has(getUniqueRowId(row)))}
          onChange={isSelected => {
            const newSelection = new Set(selectedRows);
            if (isSelected) {
              rows.forEach(row => newSelection.add(getUniqueRowId(row)));
            } else {
              rows.forEach(row => newSelection.delete(getUniqueRowId(row)));
            }
            onSelectedRowsChange(newSelection);
          }}
        />
      </div>
    ),
    width: 52,
  };

  const rowExpansionColumn = {
    id: "row_expansion",
    pinned:
      rowAggregationPinned ||
      pinnedColumns.find(({align}) => align === "left") != null
        ? "left"
        : null,
    Header: () => <div className={css(styles.rowExpansionCell)} />,
    Cell: () => <div className={css(styles.rowExpansionCell)} />,
    ExpandedCell: () => <div className={css(styles.rowExpansionCell)} />,
    AggregateCell: ({rows}) => {
      invariant(getRowGroupId);
      return (
        <div
          className={css(styles.rowExpansionCell)}
          onClick={handleCellClick}
          role="presentation"
        >
          <IconButton
            size="s"
            kind="blank"
            type="button"
            iconName={
              expandedRows.has(getRowGroupId(rows[0]))
                ? "downOpen"
                : "rightOpen"
            }
            onClick={() => {
              const rowGroupId = getRowGroupId(rows[0]);
              const newExpandedRows = new Set(expandedRows);
              if (expandedRows.has(rowGroupId)) {
                newExpandedRows.delete(rowGroupId);
              } else {
                newExpandedRows.add(rowGroupId);
              }
              onExpandedRowsChange(newExpandedRows);
            }}
          />
        </div>
      );
    },
    width: 52,
  };

  const columns = [
    ...(rowAggregationEnabled ? [rowExpansionColumn] : []),
    ...(rowSelectionEnabled ? [rowSelectionColumn] : []),
    ...visibleColumnDefinitions.map(
      ({
        id,
        header,
        render,
        renderAggregate,
        renderExpanded,
        width,
        headerAlignment,
        comparator,
        aggregateComparator,
        tooltipText,
      }) => {
        const pin = pinnedColumns.find(({columnId}) => columnId === id);

        const CellDiv = ({children}) => (
          <div
            key={id}
            className={css(styles.cell)}
            style={{
              width: width + 2 * COLUMN_PADDING,
            }}
          >
            {children}
          </div>
        );

        return {
          id,
          Header: () =>
            aggregateComparator || comparator ? (
              <SortableHeader
                key={id}
                style={{
                  width: width + 2 * COLUMN_PADDING,
                }}
                onSortDirectionChange={direction =>
                  onSortByChange(direction ? {columnId: id, direction} : null)
                }
                sortDirection={
                  sortBy && sortBy.columnId === id ? sortBy.direction : null
                }
                header={header}
                align={headerAlignment || "left"}
                tooltipText={tooltipText}
              />
            ) : (
              <Header
                key={id}
                style={{
                  width: width + 2 * COLUMN_PADDING,
                }}
                header={header}
                align={headerAlignment || "left"}
                tooltipText={tooltipText}
              />
            ),
          Cell: ({row}) => <CellDiv>{render(row)}</CellDiv>,
          AggregateCell: ({rows}) => (
            <CellDiv>
              {renderAggregate ? renderAggregate(rows) : render(rows[0])}
            </CellDiv>
          ),
          ExpandedCell: ({row}) => (
            <CellDiv>
              {renderExpanded ? renderExpanded(row) : render(row)}
            </CellDiv>
          ),
          pinned: pin ? pin.align : null,
          width: width + 2 * COLUMN_PADDING,
        };
      }
    ),
  ];

  const rowWidth = columns.reduce(
    (sum, cell) => sum + cell.width,
    FIRST_COLUMN_PADDING +
      (columns.find(({pinned}) => pinned === "left")
        ? FIRST_COLUMN_PADDING + PINNED_COLUMN_BORDER_WIDTH
        : 0) +
      (columns.find(({pinned}) => pinned === "right")
        ? FIRST_COLUMN_PADDING + PINNED_COLUMN_BORDER_WIDTH
        : 0)
  );

  const outerElementType = React.forwardRef((props, ref) => (
    <div
      ref={element => {
        if (element) StickyScrollPolyfill.processScrollPosition(element);

        if (typeof ref === "function") return ref(element);

        return ref;
      }}
      {...props}
      onScroll={event => {
        onScroll(event);
        props.onScroll(event);
      }}
    />
  ));

  function isRowSelected(flattenedRow: ?FlattenedRow<T>) {
    if (!flattenedRow) {
      return false;
    }
    if (flattenedRow.type === "aggregate") {
      return flattenedRow.rows.every(row =>
        selectedRows.has(getUniqueRowId(row))
      );
    }
    return selectedRows.has(getUniqueRowId(flattenedRow.row));
  }

  function isRowClicked(flattenedRow: ?FlattenedRow<T>) {
    if (!flattenedRow) {
      return false;
    }
    if (flattenedRow.type === "aggregate") {
      return clickedRowGroup === flattenedRow.id;
    }
    return clickedRow === flattenedRow.id;
  }

  // This handler applies for recreating sticky behavior on IE11
  function onScroll(event: SyntheticEvent<HTMLDivElement>) {
    const {currentTarget} = event;
    requestAnimationFrame(() => {
      StickyScrollPolyfill.processScrollPosition(currentTarget);
    });
  }

  /* Scrolling Pagination */
  // If more results are available to fetch, or we are still loading initial results,
  // add an extra row to hold a loading indicator
  const rowCount = hasNextPage
    ? flattenedRows.length + 1
    : flattenedRows.length;
  // If we are already fetching more rows, do not try to re-fetch
  // If we are using static loading row, do not try to re-fetch
  const loadMoreItems =
    staticLoadingRow || isNextPageLoading ? noop : loadNextPage;

  // Every row is considered loaded except for the loading indicator
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < flattenedRows.length;

  const itemData = {
    isItemLoaded,
    flattenedRows,
    isRowSelected,
    isRowClicked,
    rowGroupClickingEnabled,
    onRowGroupClick,
    rowClickingEnabled,
    onRowClick,
    staticLoadingRow,
  };

  const pinnedColumnIds = pinnedColumns.map(({columnId}) => columnId);
  const customizableColumns = columnDefinitions.filter(
    ({id}) => !pinnedColumnIds.includes(id)
  );

  return (
    <TableContext.Provider value={{columns, rowWidth}}>
      <div
        className={css(styles.tableContainer)}
        style={{maxWidth: useFullWidth ? null : rowWidth}}
      >
        <StickyScrollContext.Provider value={StickyScrollPolyfill.context}>
          <AutoSizer>
            {({width, height}: {|+width: number, +height: number|}) => (
              <div style={{width: getWidth(useFullWidth, rowWidth, width)}}>
                {columnCustomizationEnabled ? (
                  <ColumnCustomization
                    columnDefinitions={customizableColumns}
                    visibleColumnIds={visibleColumnDefinitions.map(cd => cd.id)}
                    onVisibleColumnIdsChange={visibleColumnIds => {
                      onHiddenColumnsChange(
                        customizableColumns
                          .filter(cd => !visibleColumnIds.includes(cd.id))
                          .map(cd => ({columnId: cd.id}))
                      );
                    }}
                  />
                ) : null}
                <InfiniteLoader
                  isItemLoaded={isItemLoaded}
                  itemCount={rowCount}
                  loadMoreItems={loadMoreItems}
                >
                  {({onItemsRendered, ref}) =>
                    isLoading ? (
                      <InitialLoading
                        height={height}
                        width={getWidth(useFullWidth, rowWidth, width)}
                        rowHeight={rowHeight}
                        innerElementType={innerElementType}
                        outerElementType={
                          !StickyScrollPolyfill.isPositionStickySupported &&
                          outerElementType
                        }
                        ref={ref}
                      />
                    ) : (
                      <FixedSizeList
                        itemData={itemData}
                        height={height}
                        itemSize={rowHeight}
                        itemCount={rowCount}
                        width={getWidth(useFullWidth, rowWidth, width)}
                        innerElementType={innerElementType}
                        outerElementType={
                          !StickyScrollPolyfill.isPositionStickySupported &&
                          outerElementType
                        }
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        // Overscan by roughly one page
                        overscanCount={Math.ceil(height / rowHeight)}
                      >
                        {ItemRenderer}
                      </FixedSizeList>
                    )
                  }
                </InfiniteLoader>
              </div>
            )}
          </AutoSizer>
        </StickyScrollContext.Provider>
      </div>
    </TableContext.Provider>
  );
}

const getWidth = (useFullWidth, rowWidth, width) =>
  useFullWidth ? width : Math.max(MIN_TABLE_WIDTH, Math.min(width, rowWidth));

const InitialLoading = React.forwardRef(
  ({height, rowHeight, width, outerElementType}, ref) => (
    <FixedSizeList
      height={height}
      itemSize={rowHeight}
      itemCount={1}
      width={width}
      innerElementType={innerElementType}
      outerElementType={outerElementType}
      ref={ref}
      style={{overflow: "hidden"}}
    >
      {LoadingRow}
    </FixedSizeList>
  )
);

const LoadingRow = ({style}) => (
  <div
    className={css(styles.loadingIndicator)}
    style={{
      ...style,
      top: style.top + HEADER_HEIGHT,
    }}
  >
    <Loader loaded={false} />
  </div>
);

const innerElementType = React.forwardRef(({children, ...rest}, ref) => (
  <TableContext.Consumer>
    {({columns, rowWidth}) => (
      <div ref={ref} {...rest}>
        <HeaderRow
          columns={columns}
          style={{
            minWidth: rowWidth,
          }}
        />
        {children}
      </div>
    )}
  </TableContext.Consumer>
));

type ItemRendererData<T> = {|
  isItemLoaded: number => boolean,
  flattenedRows: $ReadOnlyArray<FlattenedRow<T>>,
  isRowSelected: (FlattenedRow<T>) => boolean,
  isRowClicked: (FlattenedRow<T>) => boolean,
  rowGroupClickingEnabled: boolean,
  onRowGroupClick: string => void,
  rowClickingEnabled: boolean,
  onRowClick: string => void,
  staticLoadingRow: React.Element<StaticLoadingRow>,
|};

const ItemRenderer = ({
  index,
  data,
  style,
}: {|
  +index: number,
  +data: ItemRendererData<*>,
  +style: Style,
|}) => {
  const [highlightedRowIndex, setHighlightedRowIndex] = React.useState(null);
  const {
    isItemLoaded,
    flattenedRows,
    isRowSelected,
    isRowClicked,
    rowGroupClickingEnabled,
    onRowGroupClick,
    rowClickingEnabled,
    onRowClick,
    staticLoadingRow,
  } = data;

  if (!isItemLoaded(index)) {
    return (
      <div
        className={css(styles.row, styles.infiniteLoader)}
        style={{
          ...style,
          top: style.top + HEADER_HEIGHT,
        }}
      >
        {staticLoadingRow || <Loader loaded={false} />}
      </div>
    );
  }

  const flattenedRow = flattenedRows[index];
  const nextFlattenedRow = flattenedRows[index + 1];
  const isSelected = isRowSelected(flattenedRow);
  const isNextSelected = isRowSelected(nextFlattenedRow);
  const isClicked = isRowClicked(flattenedRow);
  const isNextClicked = isRowClicked(nextFlattenedRow);

  const isHighlighted = index === highlightedRowIndex;

  const NonaggregatedRow = flattenedRow.type === "default" ? Row : ExpandedRow;
  return (
    <TableContext.Consumer>
      {({columns, rowWidth}) => (
        <RowContext.Provider value={{isHighlighted, isSelected}}>
          {flattenedRow.type === "aggregate" ? (
            <AggregateRow
              className={css(
                styles.row,
                isHighlighted && styles.isHighlighted,
                (isSelected || isClicked) && styles.isSelected,
                (isNextSelected || isNextClicked) && styles.isNextSelected
              )}
              style={{
                ...style,
                top: style.top + HEADER_HEIGHT,
                minWidth: rowWidth,
              }}
              columns={columns}
              data={flattenedRow.rows}
              onHighlightedChange={isHighlighted =>
                setHighlightedRowIndex(isHighlighted ? index : null)
              }
              onClick={
                rowGroupClickingEnabled
                  ? () => onRowGroupClick(flattenedRow.id)
                  : null
              }
            />
          ) : (
            <NonaggregatedRow
              className={css(
                styles.row,
                isHighlighted && styles.isHighlighted,
                isSelected && styles.isSelected,
                isNextSelected && styles.isNextSelected,
                (isSelected || isClicked) && styles.isSelected,
                (isNextSelected || isNextClicked) && styles.isNextSelected
              )}
              style={{
                ...style,
                top: style.top + HEADER_HEIGHT,
                minWidth: rowWidth,
              }}
              columns={columns}
              data={flattenedRow.row}
              onHighlightedChange={isHighlighted =>
                setHighlightedRowIndex(isHighlighted ? index : null)
              }
              onClick={
                rowClickingEnabled ? () => onRowClick(flattenedRow.id) : null
              }
            />
          )}
        </RowContext.Provider>
      )}
    </TableContext.Consumer>
  );
};

function ColumnCustomization<T>({
  columnDefinitions,
  visibleColumnIds,
  onVisibleColumnIdsChange,
}: {|
  +columnDefinitions: $ReadOnlyArray<ColumnDefinition<T>>,
  +visibleColumnIds: $ReadOnlyArray<string>,
  +onVisibleColumnIdsChange: ($ReadOnlyArray<string>) => void,
|}) {
  return (
    <div className={css(styles.columnCustomizationContainer)}>
      <PopupWithClickAway>
        {(Target, Popup, {openPopup}) => (
          <>
            <Target>
              <IconButton
                size="l"
                kind="blank"
                iconName="cog"
                type="button"
                onClick={openPopup}
              />
            </Target>
            {/* zIndex needed for IE11 */}
            <Popup placement="bottom-end" zIndex={1}>
              <div className={css(styles.columnCustomizationPopup)}>
                <div>
                  <CheckboxList
                    values={visibleColumnIds}
                    options={columnDefinitions.map(cd => ({
                      label: cd.header,
                      value: cd.id,
                    }))}
                    onChange={onVisibleColumnIdsChange}
                    gap={8}
                    showSelectAllOption={true}
                  />
                </div>
              </div>
            </Popup>
          </>
        )}
      </PopupWithClickAway>
    </div>
  );
}

function HeaderRow<T>({
  columns,
  style,
}: {|
  +columns: $ReadOnlyArray<Column<T>>,
  +style: Style,
|}) {
  const leftPinnedColumns = columns.filter(({pinned}) => pinned === "left");
  const unpinnedColumns = columns.filter(({pinned}) => pinned === null);
  const rightPinnedColumns = columns.filter(({pinned}) => pinned === "right");
  const scrollContext = React.useContext(StickyScrollContext);

  return (
    <div
      className={css(styles.headerRow)}
      ref={scrollContext && scrollContext.addRef("top")}
      style={{
        ...style,
        ...(scrollContext && !scrollContext.isPositionStickySupported
          ? {
              transform: `translateY(${scrollContext.scrollTop}px)`,
              position: "relative",
            }
          : {position: "sticky"}),
      }}
    >
      <PinnedColumns columns={leftPinnedColumns} type="left">
        {({id, Header}) => <Header key={id} />}
      </PinnedColumns>
      <div className={css(styles.unpinnedDrawer)}>
        {unpinnedColumns.map(({id, Header}) => (
          <Header key={id} />
        ))}
      </div>
      <PinnedColumns columns={rightPinnedColumns} type="right">
        {({id, Header}) => <Header key={id} />}
      </PinnedColumns>
    </div>
  );
}

function getIcon(sortDirection: "asc" | "desc" | null) {
  const iconNames = {
    asc: "up",
    desc: "down",
  };

  return iconNames[sortDirection || "asc"];
}

function Header({
  style,
  header,
  align,
  tooltipText,
}: {|
  +style: Style,
  +header: React.Node,
  +align: "left" | "center" | "right",
  +tooltipText: ?string,
|}) {
  return (
    <div
      className={css(
        styles.cell,
        styles.header,
        align === "center" && styles.alignCenter,
        align === "right" && styles.alignRight
      )}
      style={style}
    >
      {tooltipText != null ? (
        <Tooltip
          placement="bottom"
          overlay={<span className={css(styles.tooltip)}>{tooltipText}</span>}
        >
          <div className={css(styles.tooltipHeader)}>
            <Text scale="subtext" color="grey40">
              {header}
            </Text>
          </div>
        </Tooltip>
      ) : (
        <Text scale="subtext" color="grey50">
          {header}
        </Text>
      )}
    </div>
  );
}

function SortableHeader({
  style,
  onSortDirectionChange,
  sortDirection,
  header,
  align,
  tooltipText,
}: {|
  +style: Style,
  +onSortDirectionChange: ("asc" | "desc" | null) => void,
  +sortDirection: "asc" | "desc" | null,
  +header: React.Node,
  +align: "left" | "center" | "right",
  +tooltipText: ?string,
|}) {
  const [isHovered, setHovered] = React.useState(false);
  const isSorted = sortDirection !== null;

  return (
    <Clickable
      onClick={() => {
        if (sortDirection === null) {
          onSortDirectionChange("asc");
        } else if (sortDirection === "asc") {
          onSortDirectionChange("desc");
        } else {
          onSortDirectionChange(null);
        }
      }}
    >
      <div
        className={css(
          styles.cell,
          styles.header,
          styles.clickable,
          align === "center" && styles.alignCenter,
          align === "right" && styles.alignRight
        )}
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={css(styles.sortableHeader)}>
          {tooltipText != null ? (
            <Tooltip
              placement="bottom"
              overlay={
                <span className={css(styles.tooltip)}>{tooltipText}</span>
              }
            >
              <div className={css(styles.tooltipHeader)}>
                <Text
                  scale="subtext"
                  weight={isSorted ? "bold" : "regular"}
                  color={isSorted ? "grey60" : "grey40"}
                >
                  {header}
                </Text>
              </div>
            </Tooltip>
          ) : (
            <Text
              scale="subtext"
              weight={isSorted ? "bold" : "regular"}
              color={isSorted ? "grey60" : "grey40"}
            >
              {header}
            </Text>
          )}
          {isSorted || isHovered ? (
            <div className={css(styles.headerSortIcon)}>
              <Icon
                alignment="center"
                color={isSorted ? "grey60" : "grey40"}
                size="xxxs"
                iconName={getIcon(sortDirection)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </Clickable>
  );
}

function Row<T>({
  data,
  ...params
}: {|
  +data: T,
  +columns: $ReadOnlyArray<Column<T>>,
  +className: string,
  +style: Style,
  +onHighlightedChange: boolean => void,
  +onClick: (() => void) | null,
|}) {
  const render = ({id, Cell}) => <Cell key={id} row={data} />;
  return BaseRow({
    render,
    ...params,
  });
}

function ExpandedRow<T>({
  data,
  ...params
}: {|
  +data: T,
  +columns: $ReadOnlyArray<Column<T>>,
  +className: string,
  +style: Style,
  +onHighlightedChange: boolean => void,
  +onClick: (() => void) | null,
|}) {
  const render = ({id, ExpandedCell}) => <ExpandedCell key={id} row={data} />;
  return BaseRow({
    render,
    ...params,
  });
}

function AggregateRow<T>({
  data,
  ...params
}: {|
  +data: $ReadOnlyArray<T>,
  +columns: $ReadOnlyArray<Column<T>>,
  +className: string,
  +style: Style,
  +onHighlightedChange: boolean => void,
  +onClick: (() => void) | null,
|}) {
  const render = ({id, AggregateCell}) => (
    <AggregateCell key={id} rows={data} />
  );
  return BaseRow({
    render,
    ...params,
  });
}

function BaseRow<T>({
  render,
  columns,
  className,
  style,
  onHighlightedChange,
  onClick,
}: {|
  +render: (Column<T>) => React.Node,
  +columns: $ReadOnlyArray<Column<T>>,
  +className: string,
  +style: Style,
  +onHighlightedChange: boolean => void,
  +onClick: (() => void) | null,
|}) {
  const leftPinnedColumns = columns.filter(({pinned}) => pinned === "left");
  const unpinnedColumns = columns.filter(({pinned}) => pinned === null);
  const rightPinnedColumns = columns.filter(({pinned}) => pinned === "right");

  return (
    <Clickable onClick={onClick}>
      <div
        onMouseEnter={() => onHighlightedChange(true)}
        onMouseLeave={() => onHighlightedChange(false)}
        className={className}
        style={style}
      >
        <PinnedColumns columns={leftPinnedColumns} type="left">
          {render}
        </PinnedColumns>
        <div className={css(styles.unpinnedDrawer)}>
          {unpinnedColumns.map(render)}
        </div>
        <PinnedColumns columns={rightPinnedColumns} type="right">
          {render}
        </PinnedColumns>
      </div>
    </Clickable>
  );
}

function PinnedColumns<T>({
  columns,
  children,
  type,
}: {|
  +columns: Array<Column<T>>,
  +children: (Column<T>) => React.Node,
  +type: "left" | "right",
|}) {
  const scrollContext = React.useContext(StickyScrollContext);

  return columns.length ? (
    <div
      className={css(
        type === "left" ? styles.leftPinnedDrawer : styles.rightPinnedDrawer
      )}
      ref={scrollContext && scrollContext.addRef(type)}
      style={
        scrollContext && !scrollContext.isPositionStickySupported
          ? {
              transform: `translateX(${
                type === "left"
                  ? scrollContext.scrollLeft
                  : scrollContext.rightOffset
              }px)`,
              position: "relative",
            }
          : {position: "sticky"}
      }
    >
      {columns.map(column => children(column))}
    </div>
  ) : null;
}

const styles = StyleSheet.create({
  tableContainer: {
    minHeight: "100px", // hint to users that they need to set a container height to size table
    minWidth: MIN_TABLE_WIDTH,
    height: "100%",
    width: "100%",
    overflow: "auto",
    position: "relative",
  },
  leftPinnedDrawer: {
    display: "flex",
    left: 0,
    backgroundColor: "inherit",
    borderRight: `2px solid ${colors.grey30}`,
    paddingLeft: 12,
    zIndex: 1,
  },
  unpinnedDrawer: {
    display: "flex",
    paddingLeft: 12,
  },
  rightPinnedDrawer: {
    display: "flex",
    right: 0,
    backgroundColor: "inherit",
    borderLeft: `2px solid ${colors.grey30}`,
    paddingLeft: 12,
    zIndex: 1,
  },
  rowExpansionCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ROW_EXPANSION_COLUMN_WIDTH,
  },
  rowSelectionCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ROW_SELECTION_COLUMN_WIDTH,
  },
  tooltipHeader: {
    borderBottom: `1px dashed ${colors.grey40}`,
  },
  tooltip: {
    display: "block",
    width: 150,
    wordWrap: "break-word",
  },
  cell: {
    display: "flex",
    textOverflow: "ellipsis",
    overflowX: "hidden",
    whiteSpace: "nowrap",
    minWidth: 0,
    paddingLeft: COLUMN_PADDING,
    paddingRight: COLUMN_PADDING,
  },
  alignCenter: {
    justifyContent: "center",
  },
  alignRight: {
    justifyContent: "flex-end",
  },
  headerRow: {
    display: "inline-flex",
    backgroundColor: "white",
    borderTop: `1px solid ${colors.grey30}`,
    borderBottom: `1px solid ${colors.grey30}`,
    zIndex: 2,
    top: 0,
    left: 0,
    width: "100%",
    height: HEADER_HEIGHT,
  },
  header: {
    alignItems: "center",
    color: colors.grey40,
    backgroundColor: "inherit",
    ":hover": {
      color: colors.grey60,
    },
  },
  sortableHeader: {
    position: "relative",
    display: "flex",
  },
  headerSortIcon: {
    position: "absolute",
    left: "calc(100% + 6px)",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clickable: {
    cursor: "pointer",
  },
  row: {
    display: "flex",
    backgroundColor: "white",
    borderBottom: `1px solid ${colors.grey30}`,
  },
  columnCustomizationContainer: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    right: 0,
    zIndex: 3,
    borderTop: `1px solid ${colors.grey30}`,
    borderBottom: `1px solid ${colors.grey30}`,
    borderLeft: `1px solid ${colors.grey30}`,
    padding: "0 12px",
    background: "white",
    height: HEADER_HEIGHT,
  },
  columnCustomizationPopup: {
    background: "white",
    boxShadow: "0px 0px 20px rgba(57, 65, 77, 0.15)",
    minWidth: 200,
    marginTop: 4,
    padding: 12,
  },
  infiniteLoader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 0px",
  },
  loadingIndicator: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 0px",
  },
  isHighlighted: {
    backgroundColor: colors.grey10,
  },
  isSelected: {
    backgroundColor: colors.grey20,
    borderBottom: `1px solid ${colors.grey60}`,
  },
  isNextSelected: {
    borderBottom: `1px solid ${colors.grey60}`,
  },
});
