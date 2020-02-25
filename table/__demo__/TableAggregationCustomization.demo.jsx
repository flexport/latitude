/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";

import Table from "../Table";
import TextCell from "../TextCell";
import data from "./data.json";

import {type EditorConfig} from "../../demoTypes";
import type {ColumnDefinition} from "../Table";

export const liveDemoSettings: EditorConfig = {
  initialShowCode: false,
};

/**
 * @title Row Aggregation with customized rendering
 * @description Add `renderAggregate` and `renderExpanded` to `columnDefinitions` to customize how aggregated data is displayed.
 */
export default function TableAggregationCustomization() {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [sortBy, setSortBy] = useState({
    columnId: "id",
    direction: "asc",
  });

  const columnDefinitions: Array<ColumnDefinition<any>> = [
    {
      id: "id",
      header: "ID",
      render: row => (
        <TextCell
          value={row.id}
          verticalAlign="center"
          horizontalAlign="start"
        />
      ),
      renderAggregate: _ => null,
      renderExpanded: row => (
        <TextCell
          value=""
          secondaryValue={row.id}
          verticalAlign="center"
          horizontalAlign="start"
        />
      ),
      width: 50,
      comparator: (a, b) => a.id - b.id,
      aggregateComparator: (as, bs) => as.length - bs.length,
    },
    {
      id: "amount",
      header: "Amount",
      headerAlignment: "right",
      render: row => (
        <TextCell
          value={row.amount}
          verticalAlign="center"
          horizontalAlign="end"
        />
      ),
      renderAggregate: rows => (
        <TextCell
          value={rows
            .reduce((sum, row) => sum + Number(row.amount), 0)
            .toFixed(2)}
          verticalAlign="center"
          horizontalAlign="end"
        />
      ),
      renderExpanded: row => (
        <TextCell
          value=""
          secondaryValue={row.amount}
          verticalAlign="center"
          horizontalAlign="end"
        />
      ),
      width: 70,
      comparator: (a, b) => a.amount - b.amount,
    },
    {
      id: "company",
      header: "Company",
      render: row => (
        <TextCell
          value={row.company}
          verticalAlign="center"
          horizontalAlign="start"
        />
      ),
      renderAggregate: rows => {
        const companies = Array.from(new Set(rows.map(row => row.company)));
        return (
          <TextCell
            value={
              companies.length === 1
                ? companies[0]
                : `${companies.length} values`
            }
            verticalAlign="center"
            horizontalAlign="start"
          />
        );
      },
      renderExpanded: row => (
        <TextCell
          value=""
          secondaryValue={row.company}
          verticalAlign="center"
          horizontalAlign="start"
        />
      ),
      width: 100,
    },
  ];
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
