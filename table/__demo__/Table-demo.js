/**
 * TEAM: frontend_infra
 * @flow
 */

import {type DemoFile} from "../../demoTypes";

import TableBasic from "./TableBasic.demo";
import TableColumnCustomization from "./TableColumnCustomization.demo";
import TableRowClicking from "./TableRowClicking.demo";
import TableRowSelection from "./TableRowSelection.demo";
import TableAggregation from "./TableAggregation.demo";
import TableAggregationCustomization from "./TableAggregationCustomization.demo";
import TableAggregationSelection from "./TableAggregationSelection.demo";
import TableColumnPinning from "./TableColumnPinning.demo";
import TableInfinite from "./TableInfinite.demo";

const demos: DemoFile = {
  demos: [
    {
      type: "live",
      fullWidth: true,
      example: TableBasic,
    },
    {
      type: "live",
      fullWidth: true,
      example: TableColumnCustomization,
    },
    {
      type: "live",
      fullWidth: true,
      example: TableRowClicking,
    },
    {
      type: "live",
      fullWidth: true,
      example: TableRowSelection,
    },
    {
      type: "live",
      fullWidth: true,
      example: TableAggregation,
    },
    {
      type: "live",
      fullWidth: true,
      example: TableAggregationCustomization,
    },
    {
      type: "live",
      fullWidth: true,
      example: TableAggregationSelection,
    },
    {
      type: "live",
      fullWidth: true,
      example: TableColumnPinning,
    },
    {
      type: "live",
      fullWidth: true,
      example: TableInfinite,
    },
  ],
};

export default demos;
