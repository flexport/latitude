/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";
import Table from "../Table";
import data from "./data.json";
import columnDefinitions from "./columnDefinitions";
import {type EditorConfig} from "../../demoTypes";

export const liveDemoSettings: EditorConfig = {
  initialShowCode: false,
};

/**
 * @title Row Aggregation and Selection
 * @description Passing `true` to both `rowSelectionEnabled` and `rowAggregationEnabled` creates a table with both features.
 */
export default function TableAggregationSelection() {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [selectedRows, setSelectedRows] = useState(new Set());

  const [sortBy, setSortBy] = useState({
    columnId: "id",
    direction: "asc",
  });

  return (
    <div style={{height: "400px", width: "100%"}}>
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
    </div>
  );
}
