/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow strict
 */

import momentT from "moment";
import moment from "moment-timezone";
import stringOrFalse from "../tools/stringOrFalse";
import invariant from "../tools/invariant";
import {type CalendarDate, calendarDateToMoment} from "./CalendarDateType";

/**
 * A WallTime is a military time encoded time, to the millisecond.
 * It looks like this: 23:59:59.999
 *
 * It is used to encode the time only portion of a date and time.
 *
 */
export opaque type WallTime = string;

const WALL_TIME_REGEX = /^(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/;

export const WALLTIME_FORMAT_STRING = "HH:mm:ss.SSS";

export function isWallTime(time: string | WallTime) {
  const groups = WALL_TIME_REGEX.exec(time);
  if (!groups) {
    return false;
  }
  const timeParts = possibleWallTimeToParts(time);
  if (
    !arePartsValidTime(timeParts.hour, timeParts.minute, timeParts.second, 0)
  ) {
    return false;
  }
  return true;
}
/**
 * Constructor for wall time. Throws an invariant if
 * the time provided is not a wall time.
 *
 * To parse a string of unknown format, try parseWallTime.
 * @param {*} time
 */
export function wallTime(time: string): WallTime {
  const wallTime = stringOrFalse(parseWallTime(time));
  invariant(wallTime, `failed converted wall time ${time}`);
  return wallTime;
}

export function wallTimeFromParts(
  hour: number,
  minute: number,
  second: number,
  millis: number
): WallTime | null {
  if (!arePartsValidTime(hour, minute, second, 0)) {
    return null;
  }
  const mmt = moment.tz(
    {
      year: 1970,
      month: 0,
      day: 1,
      hour,
      minute,
      second,
      millisecond: millis,
    },
    "UTC"
  );
  if (!mmt.isValid()) {
    return null;
  }

  return mmt.format(WALLTIME_FORMAT_STRING);
}
/**
 * Parses input text typed by a user; supports military or amPm time.
 * @param {*} textInput
 */
export function parseInputText(textInput: ?string): WallTime | null {
  if (textInput == null) {
    return null;
  }
  const amPmWallTime = stringOrFalse(parseAmPmInputText(textInput));
  if (amPmWallTime) {
    return amPmWallTime;
  }
  const milTime = stringOrFalse(parseMilInputText(textInput));
  if (milTime) {
    return milTime;
  }
  return null;
}

/**
 * Parses a wall time from a string. Allows for mal-formatted strings,
 * in which case a null is returned.
 * @param {*} time
 */
export function parseWallTime(time: string | null): WallTime | null {
  if (time === null) {
    return null;
  }
  const isValid = isWallTime(time);
  if (!isValid) {
    return null;
  }
  const parts = possibleWallTimeToParts(time);
  return wallTimeFromParts(
    parts.hour,
    parts.minute,
    parts.second,
    parts.millis
  );
}

/**
 * Used to convert calendar date and wall time
 * combinations into a moment.
 *
 * @param {*} calendarDate
 * @param {*} wallTime
 * @param {*} timeZone
 */
export function momentFromCalDateWallTime(
  calendarDate: CalendarDate,
  _wallTime: WallTime | null,
  timeZone: string
): momentT {
  const wallTime = stringOrFalse(_wallTime);
  const timeParts = wallTime ? possibleWallTimeToParts(wallTime) : null;
  const mmt = calendarDateToMoment(calendarDate, timeZone);
  return moment.tz(
    {
      year: mmt.year(),
      month: mmt.month(),
      day: mmt.date(),
      hour: timeParts ? timeParts.hour : 0,
      minute: timeParts ? timeParts.minute : 0,
      second: timeParts ? timeParts.second : 0,
      milliseconds: timeParts ? timeParts.millis : 0,
    },
    timeZone
  );
}

/**
 * Gets the wall time from a moment with provided timezone.
 *
 * Note: The moment must be valid, or an invariant is thrown.
 * @param {*} mmt
 * @param {*} timeZone
 */
export function momentToWallTime(mmt: momentT, timeZone: string): WallTime {
  if (!mmt || !mmt.isValid()) {
    invariant(
      false,
      `invalid or null moment passed to momentToWallTime ${
        mmt ? mmt.toString() : "null"
      }`
    );
  }
  return mmt
    .clone()
    .tz(timeZone)
    .format(WALLTIME_FORMAT_STRING);
}

/**
 * comparison function for wallTime. returns a negative milliseconds if
 * wallTime is less than other
 * @param {*} wallTime
 * @param {*} other
 */
export function compareWallTime(wallTime: WallTime, other: WallTime) {
  invariant(
    isWallTime(wallTime),
    "wallTime isn't actuall a WallTime in compareWallTime"
  );
  invariant(
    isWallTime(wallTime),
    "other isn't actuall a WallTime in compareWallTime"
  );
  const wtParts = possibleWallTimeToParts(wallTime);
  const otherParts = possibleWallTimeToParts(other);
  const wtMmt = moment.utc({
    year: 1970,
    day: 1,
    hour: wtParts.hour,
    minute: wtParts.minute,
    second: wtParts.second,
    milliseconds: wtParts.millis,
  });
  const otherMmt = moment.utc({
    year: 1970,
    day: 1,
    hour: otherParts.hour,
    minute: otherParts.minute,
    second: otherParts.second,
    milliseconds: otherParts.millis,
  });
  return wtMmt.diff(otherMmt, "milliseconds");
}

type WallTimeDisplayOptions = {|
  +military?: boolean,
  +resolution?: "minutes" | "seconds" | "millis",
|};

/**
 * Given a wall time and military time, formats it nicely for users.
 *
 * It makes the decision to pad the hour, such that it is always 2 digits.
 * @param {*} wallTime
 * @param {*} militaryTime
 */
export function displayTime(
  wallTime: WallTime,
  _displayOptions?: WallTimeDisplayOptions
) {
  const displayOptions = {
    military: false,
    resolution: "minutes",
    ..._displayOptions,
  };
  invariant(isWallTime(wallTime), "invalid wall time passed into formatter");
  const parts = possibleWallTimeToParts(wallTime);
  const minute = leftPadWithZero(parts.minute, 2);
  const seconds =
    displayOptions.resolution === "millis" ||
    displayOptions.resolution === "seconds"
      ? `:${leftPadWithZero(parts.second, 2)}`
      : "";
  const millis =
    displayOptions.resolution === "millis"
      ? `.${leftPadWithZero(parts.millis, 3)}`
      : "";
  if (displayOptions.military) {
    return `${leftPadWithZero(parts.hour, 2)}:${minute}${seconds}${millis}`;
  }
  // eslint-disable-next-line prefer-destructuring
  let hour = parts.hour;
  const amPm = parts.hour >= 12 ? "pm" : "am";
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }
  return `${leftPadWithZero(hour, 2)}:${minute}${seconds}${millis}${amPm}`;
}

/**
 * Converts a wall time to a struct with numerical parts.
 *
 * This must be a string that has previously been tested against the wall time regex.
 * It might not be a wall time (invalid hours, etc), but the pattern is taken and
 * split into a struct.
 * @param {*} wallTime
 */
export function possibleWallTimeToParts(possibleWallTime: WallTime) {
  const groups = WALL_TIME_REGEX.exec(possibleWallTime);
  invariant(
    groups,
    `wall time to parts called on something that doesn't regex ${possibleWallTime}`
  );
  const hour = parseInt(groups[1], 10);
  const minute = parseInt(groups[2], 10);
  const second = parseInt(groups[3], 10);
  const millis = parseInt(groups[4], 10);
  return {
    hour,
    minute,
    second,
    millis,
  };
}

/**
 * This parses text input, typically from an input field.
 *
 * This does not support seconds or millis, since the use case
 * isn't necessary. If it was necessary, we would add support here.
 * @param {*} textInput
 */
const AMPM_TIME_INPUT_REGEX = /^(\d{1,2}):(\d{1,2})\s*((am)|(pm))$/i;
function parseAmPmInputText(textInput: string): WallTime | null {
  const result = AMPM_TIME_INPUT_REGEX.exec(textInput);
  if (!result) {
    return null;
  }
  const amPm = result[3].toLowerCase();
  let hour = parseInt(result[1], 10);
  if (hour > 12 || hour < 0) {
    return null;
  }
  if (hour < 12 && amPm === "pm") {
    hour += 12;
  } else if (hour === 12 && amPm === "am") {
    hour = 0;
  }
  return wallTimeFromParts(hour, parseInt(result[2], 10), 0, 0);
}

const MIL_TIME_INPUT_REGEX = /^(\d{1,2}):(\d{1,2})$/i;
/**
 * This parses text input, typically from an input field.
 *
 * This does not support seconds or millis, since the use case
 * isn't necessary. If it was necessary, we would add support here.
 * @param {*} textInput
 */
function parseMilInputText(textInput: string): WallTime | null {
  const result = MIL_TIME_INPUT_REGEX.exec(textInput);
  if (!result) {
    return null;
  }
  return wallTimeFromParts(
    parseInt(result[1], 10),
    parseInt(result[2], 10),
    0,
    0
  );
}

function arePartsValidTime(
  hour: number,
  minute: number,
  second: number,
  millis: number
) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(hour) || hour >= 24 || hour < 0) {
    return false;
  }
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(minute) || minute >= 60 || minute < 0) {
    return false;
  }
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(second) || second >= 60 || second < 0) {
    return false;
  }
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(millis) || millis >= 1000 || millis < 0) {
    return false;
  }
  return true;
}

/**
 * We probably need to find a dependency on npm that does this.
 * @param {*} num
 * @param {*} size
 */
function leftPadWithZero(num: number, size: number) {
  let s = `${num}`;
  // changed from devInvariant on 5/24; Sentry search for this phrase yielded 0 results.
  invariant(
    s.length <= size,
    "doesn't make sense to left pad a number already greater than the desired size"
  );
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
}

export const ZERO_OCLOCK = wallTime("00:00:00.000");
export const EOD_OCLOCK = wallTime("23:59:59.999");

export const _test = {
  isWallTime,
  possibleWallTimeToParts,
  leftPadWithZero,
  arePartsValidTime,
  parseMilInputText,
  parseAmPmInputText,
};
