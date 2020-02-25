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
 * @title Column Pinning
 * @description Columns can be pinned to the left or right of the table. Controlled by the `pinnedColumns` prop.
 */
export default function TableColumnPinning() {
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
        pinnedColumns={[
          {columnId: "id", align: "left"},
          {columnId: "name", align: "left"},
          {columnId: "cta", align: "right"},
        ]}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />
    </div>
  );
}
