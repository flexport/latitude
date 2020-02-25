/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import moment from "moment-timezone";
import momentT from "moment";
import {
  momentToWallTime,
  type WallTime,
  EOD_OCLOCK,
  ZERO_OCLOCK,
} from "./wallTime";
import CalendarDateInput from "./CalendarDateInput";
import TimeInput, {getTimeIntervals} from "./TimeInput";
import {type CalendarDate, momentToCalendarDate} from "./CalendarDateType";
import {type Size} from "../sizes";
import SelectInput from "../select/SelectInput";
import InputGroup from "../InputGroup";

/**
 * To convert a date time value into a moment,
 * look into using momentFromCalDateWallTime.
 *
 * In order to determine if the date is a date_only
 * (for storing to the backend), check if calendarDate
 * is not null but wallTime is null.
 */
export type DateTimeValue = {
  calendarDate: CalendarDate | null,
  wallTime: WallTime | null,
};

type DateTimeInputProps = {
  /** a date time value, defined in this component, is a CalendarDate and a WallTime, either one is optional. */
  +value: DateTimeValue,
  /** called when the value of the DateTimeInput changes */
  +onChange: DateTimeValue => void,
  /** from TextInput */
  +disabled?: boolean,
  /** the size of the input */
  +size?: Size,
  /** whether the input is invalid or not */
  +isInvalid?: boolean,
  /** whether the input is prefilled or not */
  +isPrefilled?: boolean,
  /** how the date will be displayed on the CalendarDateInput */
  +dateFormatString?: string,
  /** the minimum date that can be selected */
  +minDate?: CalendarDate | null,
  /** the maximum date that can be selected */
  +maxDate?: CalendarDate | null,
  /** used to filter calendar dates, like 'no mondays' */
  +filterDate?: (CalendarDate => boolean) | null,
  /** the list of preset options to display on the time input */
  +timeInputOptions?: $ReadOnlyArray<WallTime>,
  /** displayed next to the date and time inputs. */
  +timeZone: string,
};

export const EMPTY_DATE_TIME_VALUE = {
  calendarDate: null,
  wallTime: null,
};

/**
 * @short An input for date AND time.
 * @category Data Entry
 * @group Date and Time
 * @brandStatus V2
 * @status Stable
 * This component combines a CalendarDateInput with a TimeInput, allowing the user to set both.
 *
 * This component allows the user to input a date and time separately and in any order, hence a date
 * time value can have either value be null.
 *
 * You can convert the DateTimeValue with the exported method `momentFromCalDateWallTime` from wallTime.js.
 */
function DateTimeInput({
  value,
  onChange,
  timeZone,
  size = "m",
  disabled = false,
  isInvalid = false,
  isPrefilled = false,
  minDate = null,
  maxDate = null,
  filterDate = null,
  dateFormatString = "MMM D, YYYY",
  timeInputOptions = getTimeIntervals(ZERO_OCLOCK, EOD_OCLOCK, 30),
}: DateTimeInputProps) {
  const handleDateChange = (newCalDate: CalendarDate | null) => {
    onChange({
      wallTime: value.wallTime,
      calendarDate: newCalDate,
    });
  };

  const handleTimeChange = (newWallTime: WallTime | null) => {
    onChange({
      wallTime: newWallTime,
      calendarDate: value.calendarDate,
    });
  };

  const formattedTimeZone = moment.tz(timeZone).format("z");

  return (
    <InputGroup customWidthSettings={[{minWidth: 100}, {}, {}]}>
      <CalendarDateInput
        disabled={disabled}
        isInvalid={isInvalid}
        isPrefilled={isPrefilled}
        dateFormatString={dateFormatString}
        minDate={minDate}
        maxDate={maxDate}
        filterDate={filterDate}
        value={value.calendarDate}
        onChange={handleDateChange}
        size={size}
        showIcon={true}
      />
      <TimeInput
        value={value.wallTime}
        disabled={disabled}
        isInvalid={isInvalid}
        isPrefilled={isPrefilled}
        onChange={handleTimeChange}
        options={timeInputOptions}
        size={size}
      />
      <SelectInput
        readOnly={true}
        disabled={disabled}
        size={size}
        value={formattedTimeZone}
        isInvalid={isInvalid}
        options={[{value: formattedTimeZone, label: formattedTimeZone}]}
        onChange={() => {}}
      />
    </InputGroup>
  );
}

export default React.memo<DateTimeInputProps>(DateTimeInput);

export function momentWithTzToDateTimeValue(
  value: momentT,
  timeZone: string,
  dateOnly: boolean
) {
  const clonedMoment = value.clone();
  return {
    calendarDate: momentToCalendarDate(clonedMoment, timeZone),
    wallTime: dateOnly ? null : momentToWallTime(clonedMoment, timeZone),
  };
}
