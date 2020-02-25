/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import CalendarDateRange, {
  convertDateRangeToUtcBounds,
  _test,
} from "../CalendarDateRange";
import {
  parseStringToCalendarDate,
  addDaysFromCalendarDate,
} from "../CalendarDateType";
import invariant from "../../tools/invariant";
import {getNameFromStyle} from "../../tools/test";

// none of our tests depend on a specific time zone or time
// unmock moment, since we will just be parsing one date
jest.unmock("moment");
jest.unmock("moment-timezone");

const defaultPopupWithClickAwayProps = {
  isPopupVisible: false,
  togglePopupVisible: () => {},
  setPopupVisible: () => {},
};

const defaultDate = "2017-12-15";
const dateFormatString = "YYYY-MM-DD";
const CALENDAR_DATE = parseStringToCalendarDate(defaultDate, dateFormatString);
invariant(CALENDAR_DATE !== null, "parsing a well formed calendar date");
const END_CALENDAR_DATE = addDaysFromCalendarDate(CALENDAR_DATE, 10);

function getDateRangeProps(propOverrides: {} = {}) {
  const defaultProps = {
    value: {startDate: CALENDAR_DATE, endDate: END_CALENDAR_DATE},
    onChange: () => {},
    presets: null,
  };
  const mergedProps = {
    ...defaultProps,
    ...defaultPopupWithClickAwayProps,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...propOverrides,
  };
  return mergedProps;
}

function shallowDateRange(propOverrides: {} = {}) {
  const mergedProps = getDateRangeProps(propOverrides);
  return mount(<CalendarDateRange {...mergedProps} />);
}

describe("CalendarDateRange", () => {
  describe("behavior", () => {
    it("moves the second input to the first input if the first input is after", () => {
      const jestOnChange = jest.fn();
      const dateRange = shallowDateRange({
        onChange: jestOnChange,
      });
      const newStartDate = addDaysFromCalendarDate(CALENDAR_DATE, 365);
      dateRange.instance().handleStartDateChange(newStartDate);
      expect(jestOnChange.mock.calls.length).toBe(1);
      expect(jestOnChange.mock.calls[0][0].startDate).toEqual(newStartDate);
      expect(jestOnChange.mock.calls[0][0].endDate).toEqual(
        addDaysFromCalendarDate(newStartDate, 10)
      );
    });
    it("doesn't move the second input if the first is not after", () => {
      const jestOnChange = jest.fn();
      const dateRange = shallowDateRange({
        onChange: jestOnChange,
      });
      const newStartDate = CALENDAR_DATE;
      dateRange.instance().handleStartDateChange(newStartDate);
      expect(jestOnChange.mock.calls.length).toBe(1);
      expect(jestOnChange.mock.calls[0][0].startDate).toEqual(newStartDate);
      expect(jestOnChange.mock.calls[0][0].endDate).toBe(END_CALENDAR_DATE);
    });
    it("moves the first input to the second input if the second input is before", () => {
      const jestOnChange = jest.fn();
      const dateRange = shallowDateRange({
        onChange: jestOnChange,
      });
      const newEndDate = addDaysFromCalendarDate(CALENDAR_DATE, -365);
      dateRange.instance().handleEndDateChange(newEndDate);
      expect(jestOnChange.mock.calls.length).toBe(1);
      expect(jestOnChange.mock.calls[0][0].startDate).toEqual(newEndDate);
      expect(jestOnChange.mock.calls[0][0].endDate).toEqual(newEndDate);
    });
  });
  describe("presets", () => {
    it("doesn't display presets if they don't exist", () => {
      const dateRange = shallowDateRange({});
      expect(
        dateRange.find(
          `.${getNameFromStyle(_test.dateRangeStyleSheet.dropdownButton)}`
        ).length
      ).toEqual(0);
    });
    it("does display if does exist", () => {
      const dateRange = shallowDateRange({
        presets: [],
      });
      expect(
        dateRange.find(
          `.${getNameFromStyle(_test.dateRangeStyleSheet.dropdownButton)}`
        ).length
      ).toEqual(1);
    });
    it("clicking a preset changes the date range", () => {
      const newStartDate = addDaysFromCalendarDate(CALENDAR_DATE, -365);
      const onChange = jest.fn();
      const dateRange = shallowDateRange({onChange});
      dateRange.instance().handleClickPreset({
        value: {startDate: newStartDate, endDate: CALENDAR_DATE},
        label: "Last year",
      });
      expect(onChange.mock.calls[0][0].startDate).toBe(newStartDate);
      expect(onChange.mock.calls[0][0].endDate).toBe(CALENDAR_DATE);
    });
  });
  describe("interval conversion", () => {
    it("converts a calendar date range value to the correct start of day EOD pair", () => {
      const utcBounds = convertDateRangeToUtcBounds(
        {startDate: CALENDAR_DATE, endDate: END_CALENDAR_DATE},
        "America/Chicago"
      );
      expect(utcBounds.startUtc).toBe("2017-12-15T06:00:00.000Z");
      expect(utcBounds.endUtc).toBe("2017-12-26T05:59:59.999Z");
    });
  });
});
