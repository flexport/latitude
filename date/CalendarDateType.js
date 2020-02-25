/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow strict
 */
import moment from "moment-timezone";
import type momentT from "moment";
import invariant from "../tools/invariant";
import stringOrFalse from "../tools/stringOrFalse";
/**
 * CalendarDate is a UTC time at 00:00:00, or 12:00:00AM on a given date.
 * The time field on it is insignificant, since it just represents
 * the date on a UTC time. It looks like 1988-05-12T00:00:00.000Z.
 *
 * Millisecond precision is optional.
 *
 * A UTC time is a subset of ISO 8601 time. https://en.wikipedia.org/wiki/ISO_8601.
 *
 * It does not have time zone encoded (or the time zone is just "UTC"), and it ends in Z.
 */
export type CalendarDate = string;

const CALENDAR_DATE_REGEX = /(\d{4})-(\d{2})-(\d{2})T(00):(00):(00)(\.(000))?Z/;

export function isCalendarDateValid(calDate: CalendarDate | string) {
  return CALENDAR_DATE_REGEX.test(calDate);
}

export function shouldBeCalendarDate(
  shouldBeCalDate: CalendarDate | string
): CalendarDate {
  const calDate = shouldBeCalDate;
  invariant(
    isCalendarDateValid(calDate),
    `${calDate} the incoming value is not a valid calendar date`
  );
  return calDate;
}

/**
 * Converts a moment with timezone to a UTC time at midnight on the same day.
 *
 * We avoid making it public, because we'd prefer if you call this via other
 * helper functions in this file. It's very hard to know whether you've
 * called moment.tz() on your moment, and know if you've set time zone.
 *
 * Better to call another helper fn, that requires the time zone up front,
 * and it will call .tz for you.
 *
 * For sintance, momentToCalendarDate is probably the droid you are looking for.
 * @param {*} momentWithTz
 */
function momentWithTzToCalDate(momentWithTz: momentT): CalendarDate {
  const utcMoment = moment.utc({
    year: momentWithTz.year(),
    month: momentWithTz.month(),
    day: momentWithTz.date(),
  });
  return utcMoment.toISOString();
}

//
// conversion functions
//

/**
 * A UTC string is a subset of ISO8601. It looks like 2017-12-11T23:08:47.226Z
 * or 2017-12-11T23:08:47Z without millisecond precision.
 * There is no timezone encoded in it, so we require a time zone parameter.
 *
 * An easy way to tell if it is a UTC time is to look for the "Z" at the end.
 *
 * If you want to use the UTC time zone, you can just pass in "UTC".
 * @param {*} utcString
 * @param {*} timeZone
 */
const UTC_ISO_REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.(\d{3}))?Z/;

export function utcStringToCalendarDate(
  utcString: string,
  timeZone: string
): CalendarDate {
  const isUtcString = UTC_ISO_REGEX.test(utcString);
  // changed from devInvariant on 5/24; Sentry search for this phrase yielded 0 results.
  invariant(
    isUtcString,
    `Non UTC ISO8601 string passed into method: ${utcString}`
  );
  const momentDate = moment.tz(utcString, timeZone);
  // changed from devInvariant on 5/24; Sentry search for this phrase yielded 0 results.
  invariant(
    momentDate.isValid(),
    `Moment could not parse utc string passed into method: ${utcString}`
  );
  return momentWithTzToCalDate(momentDate);
}

export function momentToCalendarDate(
  momentDate: momentT | null,
  timeZone: string
): CalendarDate | null {
  if (!momentDate) {
    return null;
  }
  // need to recreate a moment in case this one was created from moment library (not moment-tz)
  const newMoment = moment(momentDate);
  if (!newMoment.isValid()) {
    return null;
  }
  newMoment.tz(timeZone);
  return momentWithTzToCalDate(newMoment);
}

/**
 * Use this conversion method if you don't want to deal with a possible null moment,
 * because you can guarantee the moment is valid.
 *
 * Creating a moment that is based off parsing a fixed constant, or today, is an example of this.
 * @param {*} mmt
 * @param {*} timeZone
 */
export function definiteMomentToCalendarDate(
  mmt: moment,
  timeZone: string
): CalendarDate {
  const calDate = momentToCalendarDate(mmt, timeZone);
  invariant(
    calDate !== null,
    `definite moment function called, yet calendar date is null. ${mmt.toISOString()}`
  );
  return calDate;
}

/**
 * This is where the magic happens. We parse the calendar
 * date into UTC form, pull out the month/day/year, and
 * generate a new moment in the time zone the user provides.
 *
 * This ensures that the specific day of the month the cal day on
 * will be the same day for whatever moment is passed back _in the
 * timezone provided by the user_.
 * @param {*} calDate
 * @param {*} timeZone
 */
export function calendarDateToMoment(
  calDate: CalendarDate | Date,
  timeZone: string
) {
  const utcMoment = moment.utc(calDate);
  return moment.tz(
    {year: utcMoment.year(), month: utcMoment.month(), day: utcMoment.date()},
    timeZone
  );
}

//
// utility functions
//
export function addDaysFromCalendarDate(
  calDate: CalendarDate,
  days: number
): CalendarDate {
  shouldBeCalendarDate(calDate);
  const newDate = moment
    .utc(calDate)
    .add(days, "days")
    .toISOString();
  // should double check this is a calendar date, since moment is unpredictable
  shouldBeCalendarDate(newDate);
  return newDate;
}

export function addMonthsFromCalendarDate(
  calDate: CalendarDate,
  months: number
): CalendarDate {
  shouldBeCalendarDate(calDate);
  const newDate = moment
    .utc(calDate)
    .add(months, "months")
    .toISOString();
  // should double check this is a calendar date, since moment is unpredictable
  shouldBeCalendarDate(newDate);
  return newDate;
}

/**
 * Returns a number < 0 if otherCalDate is in the future of calDate.
 * @param {*} calDate
 * @param {*} otherCalDate
 */
export function calendarDateCompare(
  calDate: CalendarDate,
  otherCalDate: CalendarDate
) {
  const calDateSecs = calendarDateToMoment(calDate, "UTC").unix();
  const otherCalDateSecs = calendarDateToMoment(otherCalDate, "UTC").unix();
  return calDateSecs - otherCalDateSecs;
}

/** Returns the minimum calendarDate */
export function calendarDateMin(
  ...calendarDates: $ReadOnlyArray<CalendarDate>
) {
  return calendarDates.reduce(
    (currMin, curr) =>
      calendarDateCompare(currMin, curr) < 0 ? currMin : curr,
    calendarDates[0]
  );
}

/** Returns the maximum calendarDate */
export function calendarDateMax(
  ...calendarDates: $ReadOnlyArray<CalendarDate>
) {
  return calendarDates.reduce(
    (currMax, curr) =>
      calendarDateCompare(currMax, curr) >= 0 ? currMax : curr,
    calendarDates[0]
  );
}

/**
 * Gives you "today" as a calendar date, in the time zone provided.
 *
 * This would be useful to set up a date filter +/- 10 days from today, since
 * you don't need precision here, and would like to anchor it around the current tz.
 */
export function today(timeZone: string): CalendarDate {
  const currentMoment = moment.tz(timeZone);
  return momentWithTzToCalDate(currentMoment);
}

export function formatCalendarDate(
  calDate: CalendarDate,
  calDateFormatString: string,
  timeZone?: string
) {
  const timeZoneOrFalse = stringOrFalse(timeZone);
  return calendarDateToMoment(calDate, timeZoneOrFalse || "UTC").format(
    calDateFormatString
  );
}

export function parseStringToCalendarDate(
  dateText: string,
  formatString: string | Array<string>
): CalendarDate | null {
  const momentDate = moment(dateText, formatString);
  if (!momentDate.isValid()) {
    return null;
  }
  return momentWithTzToCalDate(momentDate);
}

/**
 * Main constructor for CalendarDate; there are two ways to construct them, one if you
 * know the integer components of the date (this function), and one if you need to parse a string
 * (parseStringToCalendarDate).
 */
export function calendarDate(
  year: number,
  month: number,
  day: number
): CalendarDate {
  let monthString = month.toString();
  if (monthString.length < 2) {
    monthString = `0${monthString}`;
  }
  let dayString = day.toString();
  if (dayString.length < 2) {
    dayString = `0${dayString}`;
  }
  return shouldBeCalendarDate(
    `${year}-${monthString}-${dayString}T00:00:00.000Z`
  );
}
