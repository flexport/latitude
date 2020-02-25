/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */

import moment from "moment-timezone";
import {
  momentToCalendarDate,
  parseStringToCalendarDate,
  formatCalendarDate,
  type CalendarDate,
  addDaysFromCalendarDate,
  addMonthsFromCalendarDate,
  isCalendarDateValid,
  calendarDateToMoment,
  calendarDateCompare,
  calendarDateMin,
  calendarDateMax,
  shouldBeCalendarDate,
  utcStringToCalendarDate,
} from "../CalendarDateType";
import {calendarDateToMidnightInTzIso} from "../CalendarDateTypeTools";
import invariant from "../../tools/invariant";

// none of our tests depend on a specific time zone or time
// unmock moment, since we will just be parsing one date
jest.unmock("moment");
jest.unmock("moment-timezone");

describe("CalendarDateType", () => {
  const testString = "05/12/1988";
  const testCalendarDate = momentToCalendarDate(
    moment("1988-05-12T00:00:00.000Z"),
    "UTC"
  );
  const testCalendarDateWithoutMillisecondPrecision = "1988-05-12T00:00:00Z";
  invariant(testCalendarDate);

  const invalidCalendarDate = ("1988-05-12T00:08:00.000Z": CalendarDate);
  describe("creating CalendarDate objects", () => {
    it("returns null given an invalid moment", () => {
      const invalidMoment = moment("bad value");
      const calDate = momentToCalendarDate(invalidMoment, "America/Chicago");
      expect(calDate).toBeNull();
    });
    it("can detect an invalid date", () => {
      expect(isCalendarDateValid(invalidCalendarDate)).toBeFalsy();
      expect(isCalendarDateValid(testCalendarDate)).toBeTruthy();
      expect(
        isCalendarDateValid(testCalendarDateWithoutMillisecondPrecision)
      ).toBeTruthy();
    });
  });
  describe("parsing strings dates", () => {
    it("can parse a well formed string", () => {
      const calDate = parseStringToCalendarDate(testString, "MM/DD/YYYY");
      const expected = testCalendarDate;
      expect(testCalendarDate).toBeTruthy();
      expect(calDate).toBe(expected);
    });
  });
  describe("comparison and equality functions", () => {
    it("calendarDateCompare - lt", () => {
      expect(
        calendarDateCompare(
          testCalendarDate,
          addDaysFromCalendarDate(testCalendarDate, 1)
        ) < 0
      ).toBeTruthy();
    });
    it("calendarDateCompare - gt", () => {
      expect(
        calendarDateCompare(
          testCalendarDate,
          addDaysFromCalendarDate(testCalendarDate, -1)
        ) > 0
      ).toBeTruthy();
    });
    it("calendarDateCompare - eq", () => {
      expect(calendarDateCompare(testCalendarDate, testCalendarDate)).toBe(0);
    });
  });
  describe("calendarDateMin", () => {
    it("gets the oldest calendar date", () => {
      expect(
        calendarDateMin(
          testCalendarDate,
          addDaysFromCalendarDate(testCalendarDate, 1)
        )
      ).toBe(testCalendarDate);
    });
    it("works with multiple args", () => {
      expect(
        calendarDateMin(
          testCalendarDate,
          addDaysFromCalendarDate(testCalendarDate, 1),
          addDaysFromCalendarDate(testCalendarDate, -1)
        )
      ).toBe(addDaysFromCalendarDate(testCalendarDate, -1));
    });
  });
  describe("calendarDateMax", () => {
    it("gets the oldest calendar date", () => {
      expect(
        calendarDateMax(
          testCalendarDate,
          addDaysFromCalendarDate(testCalendarDate, 1)
        )
      ).toBe(addDaysFromCalendarDate(testCalendarDate, 1));
    });
    it("works with multiple args", () => {
      expect(
        calendarDateMax(
          testCalendarDate,
          addDaysFromCalendarDate(testCalendarDate, 1),
          addDaysFromCalendarDate(testCalendarDate, -1)
        )
      ).toBe(addDaysFromCalendarDate(testCalendarDate, 1));
    });
  });
  describe("calendar date helper functions", () => {
    it("calendarDateToMoment", () => {
      const momentDateWestCoast = calendarDateToMoment(
        testCalendarDate,
        "America/Los_Angeles"
      );
      const utcMomentDate = moment.utc(
        calendarDateToMidnightInTzIso(testCalendarDate, "UTC")
      );
      const utcConvertedDate = moment.tz(
        {
          year: utcMomentDate.year(),
          month: utcMomentDate.month(),
          day: utcMomentDate.date(),
        },
        "America/Los_Angeles"
      );
      expect(momentDateWestCoast.toISOString()).toEqual(
        utcConvertedDate.toISOString()
      );
      expect(
        calendarDateToMoment(testCalendarDate, "America/Los_Angeles").tz()
      ).toEqual("America/Los_Angeles");
      expect(
        calendarDateToMoment(testCalendarDate, "America/Los_Angeles").toString()
      ).not.toEqual(testCalendarDate);
    });
    it("can format a string", () => {
      expect(formatCalendarDate(testCalendarDate, "MM/DD/YYYY")).toEqual(
        testString
      );
    });
    it("can format a string with no timezone specified", () => {
      expect(formatCalendarDate(testCalendarDate, "MM/DD/YYYY z")).toEqual(
        `${testString} UTC`
      );
    });
    it("can format a string with a timezone", () => {
      expect(
        formatCalendarDate(
          testCalendarDate,
          "MM/DD/YYYY z",
          "America/Los_Angeles"
        )
      ).toEqual(`${testString} PDT`);
    });
    it("can format a string", () => {
      expect(formatCalendarDate(testCalendarDate, "MM/DD/YYYY")).toEqual(
        testString
      );
    });
    it("shouldBeCalendarDate", () => {
      // add back once we make shouldBeCalendarDate fail
      // expect(() => shouldBeCalendarDate("0000-00-00T00:00:00.000Z")).toThrow();
      expect(() =>
        shouldBeCalendarDate("0000-01-01T00:00:00.000Z")
      ).not.toThrow();
    });
    it("addDaysFromCalendarDate/subtractDaysFromCalendarDate", () => {
      expect(addDaysFromCalendarDate(testCalendarDate, 2)).toEqual(
        moment
          .utc(calendarDateToMidnightInTzIso(testCalendarDate, "UTC"))
          .add(2, "days")
          .toISOString()
      );
      const subtractDays = 3;
      expect(
        addDaysFromCalendarDate(testCalendarDate, -1 * subtractDays)
      ).toEqual(
        moment
          .utc(calendarDateToMidnightInTzIso(testCalendarDate, "UTC"))
          .subtract(subtractDays, "days")
          .toISOString()
      );

      const february2018date: CalendarDate | null = momentToCalendarDate(
        moment("2018-02-12T00:00:00.000Z"),
        "UTC"
      );
      invariant(february2018date);

      // if moment() instead of moment.utc is used, this would result in a 11:00PM DST error
      expect(addDaysFromCalendarDate(february2018date, 31)).toEqual(
        "2018-03-15T00:00:00.000Z"
      );
    });

    it("addMonthsFromCalendarDate/subtractMonthsFromCalendarDate", () => {
      expect(addMonthsFromCalendarDate(testCalendarDate, 2)).toEqual(
        moment
          .utc(calendarDateToMidnightInTzIso(testCalendarDate, "UTC"))
          .add(2, "Months")
          .toISOString()
      );

      const subtractMonths = 3;
      expect(
        addMonthsFromCalendarDate(testCalendarDate, -1 * subtractMonths)
      ).toEqual(
        moment
          .utc(calendarDateToMidnightInTzIso(testCalendarDate, "UTC"))
          .subtract(subtractMonths, "Months")
          .toISOString()
      );

      const february2018date = momentToCalendarDate(
        moment("2018-02-12T00:00:00.000Z"),
        "UTC"
      );
      invariant(february2018date);

      // if moment() instead of moment.utc is used, this would result in a 11:00PM DST error
      expect(addMonthsFromCalendarDate(february2018date, 12)).toEqual(
        "2019-02-12T00:00:00.000Z"
      );
    });

    it("calendarDateToMidnightInTzIso", () => {
      expect(calendarDateToMidnightInTzIso(testCalendarDate, "UTC")).toEqual(
        "1988-05-12T00:00:00.000Z"
      );
      expect(
        calendarDateToMidnightInTzIso(testCalendarDate, "America/Los_Angeles")
      ).toEqual("1988-05-12T07:00:00.000Z");
    });
    it("utcStringToCalendarDate", () => {
      expect(() => {
        utcStringToCalendarDate(
          testCalendarDateWithoutMillisecondPrecision,
          "UTC"
        );
      }).not.toThrow();
      expect(
        isCalendarDateValid(
          utcStringToCalendarDate(
            testCalendarDateWithoutMillisecondPrecision,
            "UTC"
          )
        )
      ).toBeTruthy();
      expect(
        isCalendarDateValid(utcStringToCalendarDate(testCalendarDate, "UTC"))
      ).toBeTruthy();
    });
  });
});
