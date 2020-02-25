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
 * @title Basic Table Example
 * @description Table with horizontal scrolling, column sorting, and row hover highlighting. Column sorting is enabled by passing a `comparator` into the column definition.
 */
export default function TableBasic() {
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
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />
    </div>
  );
}
