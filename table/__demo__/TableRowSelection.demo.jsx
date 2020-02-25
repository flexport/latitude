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
 * @title Row Selection
 * @description Passing `true` to `rowSelectionEnabled` prop adds a checkbox to the left side of the table that allows users to select rows. Use the `selectedRows` and `onSelectedRowsChange` props to control behavior.
 */
export default function TableRowSelection() {
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
        getUniqueRowId={data => data.id}
        rowSelectionEnabled={true}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />
    </div>
  );
}
