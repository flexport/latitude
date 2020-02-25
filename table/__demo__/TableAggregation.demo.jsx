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
 * @title Row Aggregation
 * @description Pass `true` to `rowAggregationEnabled` to enable row aggregation. Use `getRowGroupId` to control which rows are grouped together.
 */
export default function TableAggregation() {
  const [expandedRows, setExpandedRows] = useState(new Set());
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
        rowAggregationEnabled={true}
        rowAggregationPinned={false}
        getRowGroupId={row => row.network}
        expandedRows={expandedRows}
        onExpandedRowsChange={setExpandedRows}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />
    </div>
  );
}
