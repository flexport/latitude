/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import {storiesOf} from "@storybook/react";
import {array, boolean, withKnobs} from "@storybook/addon-knobs";
import uuid from "uuid/v4";
import sections from "../sections";
import Table, {type ColumnDefinition} from "../../table/Table";
import Button from "../../button/Button";
import data from "../../table/__demo__/data";
import columnDefinitions from "../../table/__demo__/columnDefinitions";
import Text from "../../Text";
import NotificationModal from "../../modal/NotificationModal";
import StaticLoadingRow from "../../table/StaticLoadingRow";

const BasicTableHoist = () => {
  const [sortBy, setSortBy] = React.useState({
    columnId: "id",
    direction: "asc",
  });

  return (
    <div className={css(styles.container)}>
      <Text weight="bold">
        NOTE: Table takes the full height of its container so the container
        needs to have an explicit height set
      </Text>
      <Table
        data={data.slice(0, 100)}
        columnDefinitions={columnDefinitions}
        getUniqueRowId={data => data.id}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />
    </div>
  );
};

const LoadingTableHoist = ({isLoading, useFullWidth}) => {
  const [sortBy, setSortBy] = React.useState({
    columnId: "id",
    direction: "asc",
  });

  return (
    <div className={css(styles.container)}>
      <Table
        isLoading={isLoading}
        data={data.slice(0, 100)}
        columnDefinitions={columnDefinitions}
        getUniqueRowId={data => data.id}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        useFullWidth={useFullWidth}
      />
    </div>
  );
};

const ColumnCustomizationHoist = ({isLoading, useFullWidth}) => {
  const [hiddenColumns, setHiddenColumns] = React.useState([
    {columnId: "city"},
  ]);
  const [sortBy, setSortBy] = React.useState({
    columnId: "id",
    direction: "asc",
  });
  const pinnedColumns = [
    {
      columnId: "id",
      align: "left",
    },
  ];

  const table = (
    <Table
      isLoading={isLoading}
      data={data.slice(0, 100)}
      columnDefinitions={columnDefinitions}
      getUniqueRowId={data => data.id}
      columnCustomizationEnabled={true}
      hiddenColumns={hiddenColumns}
      onHiddenColumnsChange={setHiddenColumns}
      sortBy={sortBy}
      onSortByChange={setSortBy}
      pinnedColumns={pinnedColumns}
      useFullWidth={useFullWidth}
    />
  );
  return <div className={css(styles.container)}>{table}</div>;
};

const RowClickingHoist = () => {
  const [clickedRow, setClickedRow] = React.useState(null);
  const [sortBy, setSortBy] = React.useState({
    columnId: "id",
    direction: "asc",
  });

  const table = (
    <Table
      data={data.slice(0, 100)}
      columnDefinitions={columnDefinitions}
      getUniqueRowId={data => data.id}
      sortBy={sortBy}
      onSortByChange={setSortBy}
      rowClickingEnabled={true}
      clickedRow={clickedRow}
      onRowClick={setClickedRow}
    />
  );
  return (
    <div className={css(styles.container)}>
      {table}
      {clickedRow ? (
        <NotificationModal
          title="Clicked Row"
          buttons={[]}
          onRequestClose={() => setClickedRow(null)}
        >
          <Text>You clicked the row with id {clickedRow}</Text>
        </NotificationModal>
      ) : null}
    </div>
  );
};

const RowSelectionHoist = ({disabledRows, hideSelectAllCheckbox}) => {
  const [selectedRows, setSelectedRows] = React.useState(new Set());
  const [sortBy, setSortBy] = React.useState({
    columnId: "id",
    direction: "asc",
  });

  const table = (
    <Table
      data={data.slice(0, 100)}
      columnDefinitions={columnDefinitions}
      getUniqueRowId={data => data.id}
      rowSelectionEnabled={true}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      sortBy={sortBy}
      onSortByChange={setSortBy}
      disabledRows={new Set(disabledRows.map(Number))}
      hideSelectAllCheckbox={hideSelectAllCheckbox}
    />
  );
  return <div className={css(styles.container)}>{table}</div>;
};

const RowAggregationHoist = () => {
  const [expandedRows, setExpandedRows] = React.useState(new Set());
  const [sortBy, setSortBy] = React.useState({
    columnId: "id",
    direction: "asc",
  });

  const table = (
    <Table
      data={data.slice(0, 100)}
      columnDefinitions={columnDefinitions}
      getUniqueRowId={row => row.id}
      rowAggregationEnabled={true}
      rowAggregationPinned={false}
      getRowGroupId={row => row.network}
      expandedRows={expandedRows}
      expandSingleAggregateRow={true}
      onExpandedRowsChange={setExpandedRows}
      sortBy={sortBy}
      onSortByChange={setSortBy}
    />
  );
  return <div className={css(styles.container)}>{table}</div>;
};

const RowAggregationSelectionHoist = () => {
  const [expandedRows, setExpandedRows] = React.useState(new Set());
  const [selectedRows, setSelectedRows] = React.useState(new Set());

  const [sortBy, setSortBy] = React.useState({
    columnId: "id",
    direction: "asc",
  });

  const table = (
    <Table
      data={data.slice(0, 100)}
      columnDefinitions={columnDefinitions}
      getUniqueRowId={row => row.id}
      rowSelectionEnabled={true}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      rowAggregationEnabled={true}
      getRowGroupId={row => row.network}
      expandedRows={expandedRows}
      onExpandedRowsChange={setExpandedRows}
      sortBy={sortBy}
      onSortByChange={setSortBy}
    />
  );
  return <div className={css(styles.container)}>{table}</div>;
};

const PinnedColumnsHoist = () => {
  const [sortBy, setSortBy] = React.useState({
    columnId: "id",
    direction: "asc",
  });

  const table = (
    <Table
      data={data.slice(0, 100)}
      columnDefinitions={columnDefinitions}
      getUniqueRowId={data => data.id}
      pinnedColumns={[
        {columnId: "id", align: "left"},
        {columnId: "name", align: "left"},
        {columnId: "cta", align: "right"},
      ]}
      sortBy={sortBy}
      onSortByChange={setSortBy}
    />
  );
  return <div className={css(styles.container)}>{table}</div>;
};

const InfiniteLoadHoist = () => {
  const [sortBy, setSortBy] = React.useState({
    columnId: "id",
    direction: "asc",
  });
  const [sliceIndex, setSliceIndex] = React.useState<number>(100);
  const [isNextPageLoading, setNextPageLoading] = React.useState(false);
  const timeoutRef = React.useRef();
  const handleLoadNextPage = React.useCallback(() => {
    setNextPageLoading(true);
    timeoutRef.current = setTimeout(() => {
      setSliceIndex(index => index + 100);
      setNextPageLoading(false);
      clearTimeout(timeoutRef.current);
    }, 3000);
  }, [setSliceIndex, setNextPageLoading]);
  React.useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const table = (
    <Table
      data={data.slice(0, sliceIndex)}
      columnDefinitions={columnDefinitions}
      getUniqueRowId={data => data.id}
      sortBy={sortBy}
      onSortByChange={setSortBy}
      hasNextPage={sliceIndex < data.length}
      isNextPageLoading={isNextPageLoading}
      loadNextPage={handleLoadNextPage}
    />
  );
  return <div className={css(styles.container)}>{table}</div>;
};

const StaticLoadingRowHoist = () => {
  const [sortBy, setSortBy] = React.useState({
    columnId: "id",
    direction: "asc",
  });
  const [sliceIndex, setSliceIndex] = React.useState<number>(100);
  const handleLoadNextPage = () => setSliceIndex(index => index + 100);

  const table = (
    <Table
      data={data.slice(0, sliceIndex)}
      columnDefinitions={columnDefinitions}
      getUniqueRowId={data => data.id}
      sortBy={sortBy}
      onSortByChange={setSortBy}
      hasNextPage={sliceIndex < data.length}
      staticLoadingRow={
        <StaticLoadingRow
          onLoadMoreClick={handleLoadNextPage}
          fetchedItemCount={sliceIndex}
          totalItemCount={data.length}
        />
      }
    />
  );
  return <div className={css(styles.container)}>{table}</div>;
};

function HelloCell({row}: {|+row: string|}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("HelloCell mounted");
  }, []);
  // eslint-disable-next-line no-console
  console.log("HelloCell rendered");

  return <div>Hello {row}</div>;
}

const MemoizedHelloCell = React.memo(HelloCell);

const memoizedColumns: $ReadOnlyArray<ColumnDefinition<string>> = [
  {
    id: "helloColumn",
    header: "Hello",
    render: row => <MemoizedHelloCell row={row} />,
    width: 100,
  },
];

const nonMemoizedColumns: $ReadOnlyArray<ColumnDefinition<string>> = [
  {
    id: "helloColumn",
    header: "Hello",
    render: row => <HelloCell row={row} />,
    width: 100,
  },
];

const memoData = ["row 1", "row 2", "row 3"];

function getUniqueRowId(row: string) {
  return row;
}

function RerenderTableTest() {
  const [memoize, setMemoize] = React.useState(false);
  const [, setUselessState] = React.useState(uuid);

  const columns = memoize ? memoizedColumns : nonMemoizedColumns;
  const triggerRerender = React.useCallback(() => {
    setUselessState(uuid());
  }, [setUselessState]);

  return (
    <div>
      <Button onClick={triggerRerender} label="Rerender" />
      <Button
        onClick={() => {
          setMemoize(!memoize);
        }}
        label={`Switch to ${memoize ? "non-memoized" : "memoized"}`}
      />

      <div style={{height: "200px", width: "200px"}}>
        <Table
          columnDefinitions={columns}
          data={memoData}
          getUniqueRowId={getUniqueRowId}
        />
      </div>
    </div>
  );
}

const getKnobs = ({isLoading = false} = {}) => ({
  isLoading: boolean("isLoading", isLoading),
  useFullWidth: boolean("useFullWidth", false),
});

const getDisableKnobs = () => ({
  disabledRows: array("disabledRows", []),
  hideSelectAllCheckbox: boolean("hideSelectAllCheckbox", false),
});

const stories = storiesOf(`${sections.table}/Table`, module);
stories.addDecorator(withKnobs);

stories.add("Basic Table", () => <BasicTableHoist />);
stories.add("Loading Table", () => (
  <LoadingTableHoist {...getKnobs({isLoading: true})} />
));
stories.add("Column Customization Table", () => (
  <ColumnCustomizationHoist {...getKnobs()} />
));
stories.add("Row Clicking Table", () => <RowClickingHoist />);
stories.add("Row Selection Table", () => (
  <RowSelectionHoist {...getDisableKnobs()} />
));
stories.add("Row Aggregation Table", () => <RowAggregationHoist />);
stories.add("Row Aggregation Selection Table", () => (
  <RowAggregationSelectionHoist />
));
stories.add("Pinned Columns Table", () => <PinnedColumnsHoist />);
stories.add("Static Loading Row Table", () => <StaticLoadingRowHoist />);
stories.add("Infinite Load Table", () => <InfiniteLoadHoist />);
stories.add("Rerender Table Test", () => <RerenderTableTest />);

const styles = StyleSheet.create({
  container: {width: 900, height: 600},
});
