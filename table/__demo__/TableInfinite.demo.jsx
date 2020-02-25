/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState, useEffect, useCallback, useRef} from "react";
import Table from "../Table";
import data from "./data.json";
import columnDefinitions from "./columnDefinitions";
import {type EditorConfig} from "../../demoTypes";

export const liveDemoSettings: EditorConfig = {
  initialShowCode: false,
};

/**
 * @title Scrolling Pagination
 * @description You can fetch additional data when a user scrolls to the bottom of the table
 */
export default function TableInfinite() {
  const [sortBy, setSortBy] = React.useState({
    columnId: "id",
    direction: "asc",
  });
  const [sliceIndex, setSliceIndex] = useState<number>(100);
  const [isLoading, setLoading] = useState(false);
  const timeoutRef = useRef();

  const handleLoadNextPage = useCallback(() => {
    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      setSliceIndex(index => index + 100);
      setLoading(false);
      clearTimeout(timeoutRef.current);
    }, 3000);
  }, [setSliceIndex, setLoading]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  return (
    <div style={{height: "400px", width: "100%"}}>
      <Table
        data={data.slice(0, sliceIndex)}
        columnDefinitions={columnDefinitions}
        getUniqueRowId={data => data.id}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        hasNextPage={sliceIndex < data.length}
        isNextPageLoading={isLoading}
        loadNextPage={handleLoadNextPage}
      />
    </div>
  );
}
