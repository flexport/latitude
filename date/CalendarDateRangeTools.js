/**
 * TEAM: air
 * @flow
 */
import {
  type CalendarDate,
  addDaysFromCalendarDate,
  calendarDateCompare,
  calendarDateToMoment,
  shouldBeCalendarDate,
} from "./CalendarDateType";

export type CalendarDateRange = {
  startDate: CalendarDate,
  endDate: CalendarDate,
};

/**
 * Returns a friendly display string for a CalendarDateRange. NB that formats
 * follow Moment's formatting language
 */
export function formatCalendarDateRange(
  {startDate, endDate}: CalendarDateRange,
  format: string
): string {
  const startDisp = calendarDateToMoment(startDate, "UTC").format(format);
  const endDisp = calendarDateToMoment(endDate, "UTC").format(format);
  if (startDisp === endDisp) {
    return startDisp;
  }
  return `${startDisp} - ${endDisp}`;
}

/**
 * Tests whether or not a CalendarDate is within a definite CalendarDateRange
 */
export function isCalendarDateInCalendarDateRange(
  calDate: CalendarDate,
  {startDate, endDate}: CalendarDateRange
): boolean {
  shouldBeCalendarDate(calDate);
  shouldBeCalendarDate(startDate);
  shouldBeCalendarDate(endDate);

  const isDateAfterStart = calendarDateCompare(startDate, calDate) >= 0;
  const isDateBeforeEnd = calendarDateCompare(calDate, endDate) >= 0;
  return isDateAfterStart && isDateBeforeEnd;
}

/**
 * Converts a CalendarDateRange into an array of CalendarDate, with the
 * startDate and endDate inclusive
 */
export function explodeCalendarDateRange({
  startDate,
  endDate,
}: CalendarDateRange): Array<CalendarDate> {
  shouldBeCalendarDate(startDate);
  shouldBeCalendarDate(endDate);
  // Ensure startDate is before endDate
  const [sDate, eDate] = [startDate, endDate].sort(calendarDateCompare);

  const dates = [sDate];
  let curDate = sDate;
  while (calendarDateCompare(curDate, eDate) !== 0) {
    dates.push(curDate);
    curDate = addDaysFromCalendarDate(curDate, 1);
  }
  dates.push(eDate);

  return dates.filter((val, idx, self) => self.indexOf(val) === idx);
}

/**
 * Converts an array of CalendarDates to one with CalendarDateRanges. For any run
 * of dates, we expect there to be an equivalent CalendarDateRange in output and
 * in the degenerate case where the run of dates is singular the resulting
 * CalendarDateRange should span a single day
 */
export function mergeCalendarDates(
  dates: Array<CalendarDate>
): Array<CalendarDateRange> {
  // Guard for empty array input
  if (dates === []) return [];

  const shouldMergeDates = (firstDate, secondDate) =>
    // Merge iff firstDate is one day before secondDate
    calendarDateCompare(addDaysFromCalendarDate(firstDate, 1), secondDate) ===
    0;

  // Ensure dates are sorted & unique before merging
  const sortedDates = dates
    .sort(calendarDateCompare)
    .filter((val, idx, self) => self.indexOf(val) === idx);

  let prevDateRange;
  const mergedDates = [];
  sortedDates.forEach(curDate => {
    shouldBeCalendarDate(curDate);

    prevDateRange = mergedDates.pop();
    // Just push the first date and skip comparisons to setup initial state
    if (typeof prevDateRange === "undefined") {
      mergedDates.push({startDate: curDate, endDate: curDate});
      return;
    }

    if (shouldMergeDates(prevDateRange.endDate, curDate)) {
      // Merge curDate by extending the prevDateRange
      mergedDates.push({...prevDateRange, endDate: curDate});
    } else {
      // Push prevDateRange and open new DateRange with curDate
      mergedDates.push(prevDateRange);
      mergedDates.push({startDate: curDate, endDate: curDate});
    }
  });

  return mergedDates;
}
