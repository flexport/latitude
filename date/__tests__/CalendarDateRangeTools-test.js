/**
 * TEAM: air
 * @flow
 */

// $FlowBug: Flow doesn't know about jsverify because it's ignored/not flowtyped
import * as jsc from "jsverify";
import moment from "moment-timezone";
import {
  type CalendarDate,
  addDaysFromCalendarDate,
  calendarDate,
  calendarDateCompare,
  calendarDateToMoment,
  momentToCalendarDate,
} from "../CalendarDateType";
import {
  type CalendarDateRange,
  explodeCalendarDateRange,
  mergeCalendarDates,
  isCalendarDateInCalendarDateRange,
} from "../CalendarDateRangeTools";

jest.unmock("moment");
jest.unmock("moment-timezone");

/* default date range we're testing */
/* 200 years should be enough, right? */
const baseFromDate = calendarDate(1970, 1, 1);
const baseToDate = calendarDate(2170, 1, 1);

/* datatype generators */

// Selects an arbitrary CalendarDate between fromDate and toDate,
// shrinking towards earlier dates within that range
const calDateGenerator = (fromDate: CalendarDate, toDate: CalendarDate) => {
  const fromTs = calendarDateToMoment(fromDate, "UTC").unix();
  const toTs = calendarDateToMoment(toDate, "UTC").unix();

  return jsc.bless({
    generator: jsc.generator.bless(() => {
      const selectedTs = jsc.random.number(fromTs, toTs);
      return momentToCalendarDate(moment.unix(selectedTs), "UTC");
    }),
    shrink: jsc.shrink.bless(calDate => {
      // Shrink downwards towards fromDate
      const candidates = [];
      let nextDate = calDate;
      while (calendarDateCompare(fromDate, calDate) >= 0) {
        candidates.push(nextDate);
        nextDate = addDaysFromCalendarDate(nextDate, -1);
      }
      return candidates;
    }),
    show: calDate => calDate,
  });
};

/* Custom matchers */
beforeAll(() => {
  // Here I've defined a custom matcher for these tests so that when things fail
  // it's very obvious to the end-user what happened. Flow hates this and,
  // since I'd prefer people seeing failing tests know what they are reading,
  // there are a lot of kind of gross uses of $ FlowBug in some of the code below.
  // See https://github.com/flow-typed/flow-typed/issues/948 for if/when resolved
  expect.extend({
    toBeWithin(date: CalendarDate, dateRange: CalendarDateRange) {
      const {startDate, endDate} = dateRange;
      if (isCalendarDateInCalendarDateRange(date, dateRange)) {
        return {
          message: () =>
            `expected ${date} to not be within ${startDate} - ${endDate}`,
          pass: true,
        };
      }
      return {
        message: () =>
          `expected ${date} to be within ${startDate} - ${endDate}`,
        pass: false,
      };
    },
  });
});

/* Tests */
describe("isCalendarDateInCalendarDateRange", () => {
  const singleDate = calDateGenerator(baseFromDate, baseToDate);

  // NB we can't use the matcher above here, since that'd invalidate the tests
  // by using the function under test to test things. Which means failures here
  // are slightly annoying to read, sorry
  it("correctly reports if CalendarDate is within CalendarDateRange", () => {
    // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
    jsc.assertForall(
      singleDate,
      singleDate,
      singleDate,
      (testDate, rangeDateA, rangeDateB) => {
        // Build up generic CalendarDateRange to test against
        const [startDate, endDate] = [rangeDateA, rangeDateB].sort(
          calendarDateCompare
        );
        const dateRange = {startDate, endDate};

        const isInDateRange = isCalendarDateInCalendarDateRange(
          testDate,
          dateRange
        );

        const isDateBeforeStart = calendarDateCompare(startDate, testDate) < 0;
        const isDateAfterEnd = calendarDateCompare(testDate, endDate) < 0;

        expect(isInDateRange).not.toBe(isDateBeforeStart || isDateAfterEnd);
        return true;
      }
    );
  });
});

describe("explodeCalendarDateRange", () => {
  const singleDate = calDateGenerator(baseFromDate, baseToDate);

  it("converts single day range into single-element array of that CalendarDate", () => {
    // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
    jsc.assertForall(singleDate, calDate => {
      const dateArray = explodeCalendarDateRange({
        startDate: calDate,
        endDate: calDate,
      });

      // If this fails, we'll throw and jsverify will do its thing
      expect(dateArray).toEqual([calDate]);

      // All checks are successful, return true. This is a tiny bit of boilerplate
      // that looks to be required to ensure that things work with jest.
      return true;
    });
  });

  it("converts a multi-day range into a multi-element array covering all dates", () => {
    // jsc.nat(100) as numDays constrains us to checking for CalendarDateRanges
    // no larger than 100 days as a performance optimization
    // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
    jsc.assertForall(singleDate, jsc.nat(100), (startDate, numDays) => {
      const endDate = addDaysFromCalendarDate(startDate, numDays);
      const dateArray = explodeCalendarDateRange({startDate, endDate});

      /** Ensure the dateArray has the correct number of days */
      expect(dateArray.length).toBe(numDays + 1); // Include startDate w/ +1

      // Iterate through each day and ensure all days are in the right index
      let curDate = startDate;
      dateArray.forEach(date => {
        expect(date).toEqual(curDate);
        curDate = addDaysFromCalendarDate(curDate, 1);
      });

      return true;
    });
  });
});

describe("mergeCalendarDates", () => {
  const singleDate = calDateGenerator(baseFromDate, baseToDate);

  it("converts a single-element array of CalendarDate into a single day range", () => {
    // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
    jsc.assertForall(singleDate, calDate => {
      const dateRangeArray = mergeCalendarDates([calDate]);

      expect(dateRangeArray).toEqual([{startDate: calDate, endDate: calDate}]);

      return true;
    });
  });

  it("converts an array of successive CalendarDates into a single range", () => {
    // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
    jsc.assertForall(singleDate, jsc.nat(100), (startDate, numDays) => {
      // Usual case, dateArray has at least one Date
      const dateArray = [];
      for (let i = 0; i < numDays; i += 1) {
        dateArray.push(addDaysFromCalendarDate(startDate, i));
      }

      const dateRangeArray = mergeCalendarDates(dateArray);

      // No days should be empty array, then we're done
      if (numDays === 0) {
        expect(dateRangeArray).toEqual([]);
        return true;
      }

      // confirm single element, ensuring that we get cromulent expected/received
      // if there is any issue
      const [dateRange] = dateRangeArray;
      expect([dateRange]).toEqual(dateRangeArray);

      // Ensure startDate and endDate are equivalent to the original dateArray
      expect(dateRange).toEqual({
        startDate: dateArray[0],
        endDate: dateArray[dateArray.length - 1],
      });

      return true;
    });
  });

  const calDateArray = jsc.array(singleDate);
  xit("merges all mergable CalendarDates into CalendarDateRanges", () => {
    // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
    jsc.assertForall(calDateArray, dateArray => {
      // Do the merge itself
      const dateRangeArray = mergeCalendarDates(dateArray);

      if (dateRangeArray.length >= 2) {
        // Ensure that dateRange intervals never overlap when we have multiple
        // Since flow doesn't know about the def of toBeWithin above, it
        // mistypes .reduce here
        // $FlowBug
        dateRangeArray.reduce((prevRange, curRange) => {
          // $FlowBug
          expect(prevRange.startDate).not.toBeWithin(curRange);
          // $FlowBug
          expect(prevRange.endDate).not.toBeWithin(curRange);
          // $FlowBug
          expect(curRange.startDate).not.toBeWithin(prevRange);
          // $FlowBug
          expect(curRange.endDate).not.toBeWithin(prevRange);
          return curRange;
        });
      }

      // Sort & filter dateArray so we can walk through it and ensure everything is OK
      const sortedDateArray = dateArray
        .sort(calendarDateCompare)
        .filter((v, i, s) => s.indexOf(v) === i);

      // Walk through each date and ensure that it's present within an interval
      let curDateRange;
      sortedDateArray.forEach(curDate => {
        curDateRange = dateRangeArray.shift();
        // $FlowBug
        expect(curDate).toBeWithin(curDateRange);

        // If this is not the end of the current range, put it back in for later
        if (calendarDateCompare(curDate, curDateRange.endDate) !== 0) {
          dateRangeArray.unshift(curDateRange);
        }
      });

      return true;
    });
  });
});
