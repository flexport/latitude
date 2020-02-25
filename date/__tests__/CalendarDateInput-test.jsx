/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import moment from "moment-timezone";
import {_test} from "../CalendarDateInput";
import {
  type CalendarDate,
  parseStringToCalendarDate,
  calendarDateToMoment,
} from "../CalendarDateType";
import invariant from "../../tools/invariant";

// none of our tests depend on a specific time zone or time
// unmock moment, since we will just be parsing one date
jest.unmock("moment");
jest.unmock("moment-timezone");

// eslint-disable-next-line import/first
import {ARROW_DOWN_KEY, ARROW_UP_KEY, ESCAPE_KEY} from "../inputUtils";

const {CalendarDateInputClass} = _test;

const defaultPopupWithClickAwayProps = {
  isPopupVisible: false,
  togglePopupVisible: () => {},
  setPopupVisible: () => {},
};

const defaultDate = "2017-12-15";
const dateFormatString = "YYYY-MM-DD";
const CALENDAR_DATE = parseStringToCalendarDate(defaultDate, dateFormatString);

function getCalendarDateProps(propOverrides: {} = {}) {
  const defaultProps = {
    value: CALENDAR_DATE,
    // eslint-disable-next-line autofix/no-unused-vars
    onChange: (value: CalendarDate | null) => {},
    timeZone: "America/Chicago",
    dateFormatString,
  };
  const mergedProps = {
    ...defaultProps,
    ...defaultPopupWithClickAwayProps,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...propOverrides,
  };
  return mergedProps;
}

function shallowDateInput(propOverrides: {} = {}) {
  const mergedProps = getCalendarDateProps(propOverrides);
  return mount(<CalendarDateInputClass {...mergedProps} />);
}
describe("DateInput", () => {
  describe("constructing", () => {
    it("doesn't construct if date is not CalendarDate", () => {
      expect(() =>
        shallowDateInput({
          value: "1988-05-12T00:08:00.000Z",
        })
      ).toThrow();
    });
    it("freaks out if incoming props are not CalendarDate", () => {
      const dateInput = shallowDateInput();
      expect(() => {
        dateInput.setProps(
          getCalendarDateProps({value: "1988-05-12T00:08:00.000Z"})
        );
      }).toThrow();
    });
  });
  describe("focusing, blurring, and popups", () => {
    it("shows the popup if the user focuses", () => {
      const dateInput = shallowDateInput();
      expect(dateInput.find("PopupWithClickAway").state("isOpen")).toBe(false);
      dateInput.find("input").simulate("focus");
      expect(dateInput.find("PopupWithClickAway").state("isOpen")).toBe(true);
    });
    it("shows the popup if popupVisible set to true", () => {
      const dateInput = shallowDateInput({
        isPopupVisible: true,
      });

      expect(dateInput.find("Popper").exists()).toBe(true);
    });
    it("parses the users input if the user blurs", () => {
      const mockOnChange = jest.fn();
      const dateInput = shallowDateInput({
        onChange: mockOnChange,
      });
      dateInput.setState(
        {
          textValue: "2017-12-02",
        },
        () => {
          dateInput.find("input").simulate("blur");
          expect(mockOnChange.mock.calls.length).toEqual(1);
          expect(mockOnChange.mock.calls[0][0]).toEqual(
            parseStringToCalendarDate("2017-12-02", dateFormatString)
          );
        }
      );
    });
    it("doesn't call update if the user doesn't input state and blurs", () => {
      const mockOnChange = jest.fn();
      const dateInput = shallowDateInput({
        onChange: mockOnChange,
      });
      dateInput.find("input").simulate("blur");
      expect(mockOnChange.mock.calls.length).toEqual(0);
    });
  });
  describe("key presses", () => {
    it("handles arrow keys", () => {
      const mockOnChange = jest.fn();
      const dateInput = shallowDateInput({
        onChange: mockOnChange,
      });
      dateInput.find("input").simulate("keyDown", {keyCode: ARROW_DOWN_KEY});
      expect(mockOnChange.mock.calls.length).toEqual(1);
      // TODO: figure out a way to compare dates
      // expect(mockOnChange.mock.calls[0][0]).toEqual();
      dateInput.find("input").simulate("keyDown", {keyCode: ARROW_UP_KEY});
      expect(mockOnChange.mock.calls.length).toEqual(2);
      // TODO: figure out a way to compare dates
      // expect(mockOnChange.mock.calls[1][0]).toEqual("12:00 am");
    });
    it("hides popup if esc pressed", () => {
      const dateInput = shallowDateInput();
      dateInput.find("input").simulate("focus");
      expect(dateInput.find("PopupWithClickAway").state("isOpen")).toBe(true);
      dateInput.find("input").simulate("keyDown", {keyCode: ESCAPE_KEY});
      expect(dateInput.find("PopupWithClickAway").state("isOpen")).toBe(false);
    });
  });
  describe("filter dates", () => {
    it("correctly filters out sundays", () => {
      const onlyMondayFn = (calendarDate: CalendarDate) => {
        const mmt = calendarDateToMoment(calendarDate, "UTC");
        if (mmt.isoWeekday() === 1) {
          return true;
        }
        return false;
      };
      const convertedFn = _test.convertCalendarDateFilterToMomentFilter(
        onlyMondayFn
      );
      const thisWasAFriday = "2017-12-15";
      const fridayCalDate = parseStringToCalendarDate(
        thisWasAFriday,
        dateFormatString
      );
      const thisWasAMonday = "2017-12-18";
      const mondayCalDate = parseStringToCalendarDate(
        thisWasAMonday,
        dateFormatString
      );
      invariant(
        mondayCalDate !== null,
        `this date should parse ${thisWasAMonday}`
      );
      invariant(
        fridayCalDate !== null,
        `this date should parse ${thisWasAFriday}`
      );
      expect(onlyMondayFn(mondayCalDate)).toBeTruthy();
      expect(onlyMondayFn(fridayCalDate)).toBeFalsy();
      expect(
        convertedFn(calendarDateToMoment(mondayCalDate, "UTC"))
      ).toBeTruthy();
      expect(
        convertedFn(calendarDateToMoment(fridayCalDate, "UTC"))
      ).toBeFalsy();
    });
  });
  describe("parsing dates", () => {
    it("can add a date format to the supported list", () => {
      const dateFormats = _test.getSupportedDateFormats("TEST");
      expect(dateFormats.includes("TEST")).toBeTruthy();
    });
    it("can parse a somewhat exotic D/T", () => {
      const dateFormats = _test.getSupportedDateFormats();
      const mmt = moment("5/12/1988", dateFormats);
      expect(mmt.isValid()).toBeTruthy();
      expect(mmt.month()).toBe(4);
    });
  });
});
