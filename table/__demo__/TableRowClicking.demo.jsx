/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";
import Table from "../Table";
import NotificationModal from "../../modal/NotificationModal";
import Text from "../../Text";
import data from "./data.json";
import columnDefinitions from "./columnDefinitions";
import {type EditorConfig} from "../../demoTypes";

export const liveDemoSettings: EditorConfig = {
  initialShowCode: false,
};

/**
 * @title Row Clicking Example
 * @description Make rows clickable with `rowClickingEnabled` prop and pass in a callback to the `onRowClick` prop
 */
export default function TableRowClicking() {
  const [clickedRow, setClickedRow] = useState(null);
  const [sortBy, setSortBy] = useState({
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
    <div style={{height: "400px", width: "100%"}}>
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
}
