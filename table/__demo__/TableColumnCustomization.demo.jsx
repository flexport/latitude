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
 * @title Column Customization
 * @description Adds a button to the top right of the table to customize which columns are shown. Controlled with the `columnCustomizationEnabled` prop, along with the `hiddenColumns` and `onHiddenColumnsChange` props.
 */
export default function TableColumnCustomization() {
  const [hiddenColumns, setHiddenColumns] = useState([{columnId: "city"}]);
  const [sortBy, setSortBy] = useState({
    columnId: "id",
    direction: "asc",
  });
  const pinnedColumns = [
    {
      columnId: "id",
      align: "left",
    },
  ];

  return (
    <div style={{height: "400px", width: "100%"}}>
      <Table
        data={data.slice(0, 100)}
        columnDefinitions={columnDefinitions}
        getUniqueRowId={data => data.id}
        columnCustomizationEnabled={true}
        hiddenColumns={hiddenColumns}
        onHiddenColumnsChange={setHiddenColumns}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        pinnedColumns={pinnedColumns}
      />
    </div>
  );
}
