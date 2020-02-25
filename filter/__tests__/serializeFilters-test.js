/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */

import "url-polyfill";
import {_test} from "../serializeFilters";
import {today} from "../../date/CalendarDateType";
import {ALL_SELECTED_VALUE_STATE} from "../MultiselectFilter";

jest.unmock("moment-timezone");
jest.unmock("moment");

const {
  serializeSelect,
  serializeMultiselect,
  serializeDateRange,
  serializeText,
  serializeFilters,
  deserializeFilters,
  SELECT_FILTER_TYPE,
  MULTISELECT_FILTER_TYPE,
  DATE_RANGE_FILTER_TYPE,
  TEXT_FILTER_TYPE,
  deserializeSelect,
  deserializeMultiselect,
  deserializeText,
  deserializeDateRange,
} = _test;

describe("serializing and deserializing filters", () => {
  const KEY = "key";
  describe("serializing and deserializing SelectFilter", () => {
    const value = "5";
    const serializedArgs = JSON.stringify("5");
    it("serializes a SelectFilter", () => {
      const selectStr = serializeSelect({
        type: SELECT_FILTER_TYPE,
        value,
        key: KEY,
      });
      expect(selectStr).toBe(serializedArgs);
    });
    it("deserializes a SelectFilter", () => {
      const selectFilter = deserializeSelect(KEY, serializedArgs);
      expect(selectFilter).toEqual({
        type: SELECT_FILTER_TYPE,
        value,
        key: KEY,
      });
    });

    it("serializes an empty SelectFilter", () => {
      const selectStr = serializeSelect({
        type: SELECT_FILTER_TYPE,
        key: KEY,
      });
      expect(selectStr).toBe("");
    });
    it("deserializes an empty SelectFilter", () => {
      const selectFilter = deserializeSelect(KEY, "");
      expect(selectFilter).toEqual({
        type: SELECT_FILTER_TYPE,
        key: KEY,
      });
    });
  });

  describe("serialize and deserialize MultiselectFilter", () => {
    const val = ["1", "1"];
    const serializedArgs =
      '{"type":"specificValues","specificValues":["1","1"]}';
    it("serializes a MultiselectFilter", () => {
      const val = ["1", "1"];
      const selectStr = serializeMultiselect({
        type: MULTISELECT_FILTER_TYPE,
        value: {type: "specificValues", specificValues: val},
        key: KEY,
      });
      expect(selectStr).toBe(serializedArgs);
    });
    it("deserializes a MultiselectFilter", () => {
      const selectFilter = deserializeMultiselect(KEY, serializedArgs);
      expect(selectFilter).toEqual({
        type: MULTISELECT_FILTER_TYPE,
        value: {type: "specificValues", specificValues: val},
        key: KEY,
      });
    });

    it("serializes an allSelected MultiselectFilter", () => {
      const selectStr = serializeMultiselect({
        type: MULTISELECT_FILTER_TYPE,
        key: KEY,
        value: ALL_SELECTED_VALUE_STATE,
      });
      expect(selectStr).toBe("");
    });
    it("deserializes an empty MultiselectFilter", () => {
      const selectFilter = deserializeMultiselect(KEY, "");
      expect(selectFilter).toEqual({
        type: MULTISELECT_FILTER_TYPE,
        key: KEY,
        value: ALL_SELECTED_VALUE_STATE,
      });
    });
  });

  describe("serialize and deserialize DateRangeFilter", () => {
    const todayCaldate = today("America/Los_Angeles");
    const val = {
      type: "custom",
      startDate: todayCaldate,
      endDate: todayCaldate,
    };
    const serializedArgs = JSON.stringify(val);
    it("serializes a DateRange", () => {
      const filterStr = serializeDateRange({
        type: DATE_RANGE_FILTER_TYPE,
        value: val,
        key: KEY,
      });
      expect(filterStr).toBe(serializedArgs);
    });
    it("deserializes a DateRange", () => {
      const calFilter = deserializeDateRange(KEY, serializedArgs);
      expect(calFilter).toEqual({
        type: DATE_RANGE_FILTER_TYPE,
        value: val,
        key: KEY,
      });
    });
    it("serializes and deserializes a preset date range", () => {
      const filter = {
        type: DATE_RANGE_FILTER_TYPE,
        value: {type: "preset", label: "Last week"},
        key: KEY,
      };
      const filterStr = serializeDateRange(filter);
      expect(filterStr).toBe(`{"type":"preset","label":"Last week"}`);
      const dateRange = deserializeDateRange(KEY, filterStr);
      expect(dateRange).toEqual(filter);
    });

    it("serializes an empty DateRange", () => {
      const filterStr = serializeDateRange({
        type: DATE_RANGE_FILTER_TYPE,
        key: KEY,
      });
      expect(filterStr).toBe("");
    });
    it("deserializes an empty DateRange", () => {
      const emptyFilter = deserializeDateRange(KEY, "");
      expect(emptyFilter).toEqual({
        type: DATE_RANGE_FILTER_TYPE,
        key: KEY,
      });
    });
  });

  describe("serializing and deserializing multiple filters", () => {
    const otherKey = "key2";
    const filter1 = {
      type: SELECT_FILTER_TYPE,
      value: "a",
      key: KEY,
    };
    const filter2 = {
      type: SELECT_FILTER_TYPE,
      value: "b",
      key: otherKey,
    };
    const serializedFilters = {};
    serializedFilters[KEY] = JSON.stringify("a");
    serializedFilters[otherKey] = JSON.stringify("b");
    it("serializes no filters correctly", () => {
      const urlParams = serializeFilters([]);
      expect(urlParams).toEqual({});
    });
    it("serializes multiple filters in alphabetic order", () => {
      const urlParams = serializeFilters([filter2, filter1]);
      expect(urlParams).toEqual(serializedFilters);
    });
    it("deserializes no filters", () => {
      const filterStr = deserializeFilters([], {doesnt: "matter"});
      expect(filterStr).toEqual([]);
    });
    it("deserializes multiple", () => {
      const filters = deserializeFilters(
        [
          {type: SELECT_FILTER_TYPE, key: KEY},
          {type: SELECT_FILTER_TYPE, key: otherKey},
        ],
        serializedFilters
      );
      expect(filters).toEqual([filter1, filter2]);
    });
  });

  describe("serializing and deserializing TextFilter", () => {
    const value = "5";
    const serializedArgs = "5";
    it("serializes a TextFilter", () => {
      const textStr = serializeText({
        type: TEXT_FILTER_TYPE,
        value,
        key: KEY,
      });
      expect(textStr).toBe(serializedArgs);
    });
    it("deserializes a TextFilter", () => {
      const textFilter = deserializeText(KEY, serializedArgs);
      expect(textFilter).toEqual({
        type: TEXT_FILTER_TYPE,
        value,
        key: KEY,
      });
    });

    it("serializes an empty TextFilter", () => {
      const textStr = serializeText({
        type: TEXT_FILTER_TYPE,
        key: KEY,
      });
      expect(textStr).toBe("");
    });
    it("deserializes an empty TextFilter", () => {
      const textFilter = deserializeText(KEY, "");
      expect(textFilter).toEqual({
        type: TEXT_FILTER_TYPE,
        key: KEY,
      });
    });
  });
});
