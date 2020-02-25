/**
 * TEAM: frontend_infra
 * @flow strict
 */
import {calendarDateToMoment, type CalendarDate} from "./CalendarDateType";

/**
 * This prints an ISO formatted string in a certain time zone given the calendar date.
 * They look like: 2018-01-01T00:00:00.000Z, but the hour and minute will differ based on timezone.
 */
// eslint-disable-next-line import/prefer-default-export
export function calendarDateToMidnightInTzIso(
  cd: CalendarDate,
  tz: string
): string {
  return calendarDateToMoment(cd, tz).toISOString();
}
