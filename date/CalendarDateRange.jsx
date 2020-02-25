/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {include, margin} from "../styles/index";
import CalendarDateInput, {DEFAULT_DATE_FORMAT} from "./CalendarDateInput";
import {type Size} from "../sizes";
import {
  formatCalendarDate,
  type CalendarDate,
  calendarDateToMoment,
  calendarDateCompare,
  addDaysFromCalendarDate,
  shouldBeCalendarDate,
} from "./CalendarDateType";
import DropdownButton from "../DropdownButton";
import colors from "../colors";
import IconButton from "../button/IconButton";

export type CalendarDateRangeValue = {
  +startDate: CalendarDate | null,
  +endDate: CalendarDate | null,
};

export type CalendarDateRangePreset = {
  +value: {
    +startDate: CalendarDate | null,
    +endDate: CalendarDate | null,
  },
  +label: string,
};

type CalendarDateRangeProps = {
  /** a CalendarDateRangeValue is a combination of two CalendarDates that are nullable */
  +value: CalendarDateRangeValue,
  +onChange: CalendarDateRangeValue => void,
  /** this is only here for type-safety, and has no actual effect */
  +onBlur: () => void,
  /** you can provide a list of preset options, such as "Last week", that will prepopulate the fields. Provide an ordered ist of CalendarDateRangePreset, defined in this component, and the presets will be provided. */
  +presets: Array<CalendarDateRangePreset> | null,
  /** blocks calendar off prior to this date */
  +minDate: CalendarDate | null,
  /** blocks calendar off after this date */
  +maxDate: CalendarDate | null,
  +size: Size,
  /** sets the placeholder text of the start date field */
  +startDatePlaceholder?: string,
  /** sets the placeholder text of the end date field */
  +endDatePlaceholder?: string,
  +disabled: boolean,
  /** controls the red outline of the start date field */
  +isStartDateInvalid: boolean,
  /** controls the red outline of the end date field */
  +isEndDateInvalid: boolean,
  /** controls the red outline of the two date fields */
  +isInvalid: boolean,
};

const RANGE_DEFAULTS = {
  onBlur: () => {},
  size: "m",
  disabled: false,
  minDate: null,
  maxDate: null,
  startDatePlaceholder: "Enter start date",
  endDatePlaceholder: "Enter end date",
  isStartDateInvalid: false,
  isEndDateInvalid: false,
  isInvalid: false,
};

/**
 * Consider removing unsafe lifecycle methods for future concurrent mode support!
 * See https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes
 */
/* eslint-disable react/no-unsafe */
/**
 * @short A date range input, with an optional dropdown button that has presets for the calendar date range.
 * @category Data Entry
 * @group Date and Time
 * @brandStatus V2
 * @status Stable
 * @extends React.Component */
export default class CalendarDateRange extends React.PureComponent<CalendarDateRangeProps> {
  static defaultProps = RANGE_DEFAULTS;
  secondInput: HTMLElement | null = null;

  constructor(props: CalendarDateRangeProps) {
    super(props);
    this.validateProps(props);
  }

  // eslint-disable-next-line class-methods-use-this
  validateProps(props: CalendarDateRangeProps) {
    // eslint-disable-next-line no-unused-expressions
    props.value.startDate && shouldBeCalendarDate(props.value.startDate);
    // eslint-disable-next-line no-unused-expressions
    props.value.endDate && shouldBeCalendarDate(props.value.endDate);
    // eslint-disable-next-line no-unused-expressions
    props.maxDate && shouldBeCalendarDate(props.maxDate);
    // eslint-disable-next-line no-unused-expressions
    props.minDate && shouldBeCalendarDate(props.minDate);
  }

  UNSAFE_componentWillReceiveProps(nextProps: CalendarDateRangeProps) {
    this.validateProps(nextProps);
  }

  handleStartDateChange = (startDate: CalendarDate | null) => {
    // eslint-disable-next-line prefer-destructuring
    let endDate = this.props.value.endDate;
    if (startDate && endDate && calendarDateCompare(startDate, endDate) > 0) {
      // if start date was empty and chosen post end date
      // set end date equal to start date
      const oldStartDate = this.props.value.startDate;
      if (oldStartDate === null) {
        endDate = startDate;
      } else {
        // otherwise, maintain the difference between them
        const endDateMmt = calendarDateToMoment(endDate, "UTC");
        const oldStartDateMmt = calendarDateToMoment(oldStartDate, "UTC");
        const daysDiff = endDateMmt.diff(oldStartDateMmt, "days");
        // change to the difference between the two
        endDate = addDaysFromCalendarDate(startDate, daysDiff);
        if (
          this.props.maxDate &&
          calendarDateCompare(endDate, this.props.maxDate) > 0
        ) {
          endDate = this.props.maxDate;
        }
      }
    }
    this.props.onChange({
      startDate,
      endDate,
    });
  };

  handleEndDateChange = (endDate: CalendarDate | null) => {
    // eslint-disable-next-line prefer-destructuring
    let startDate = this.props.value.startDate;
    if (
      endDate &&
      this.props.value.startDate &&
      calendarDateCompare(endDate, this.props.value.startDate) < 0
    ) {
      startDate = endDate;
    }
    this.props.onChange({
      startDate,
      endDate,
    });
  };

  // eslint-disable-next-line autofix/no-unused-vars
  handleClickPreset = (preset: CalendarDateRangePreset, event: Event) => {
    this.props.onChange({
      startDate: preset.value.startDate,
      endDate: preset.value.endDate,
    });
  };

  renderPresetMenu = (
    presets: Array<CalendarDateRangePreset>,
    disabled: boolean
  ) => {
    const computeLabel = (preset: CalendarDateRangePreset) => ({
      label: computePresetLabel(preset, DEFAULT_DATE_FORMAT),
      labelTitle: preset.label,
      handleClick: this.handleClickPreset.bind(this, preset),
      iconName: null,
    });
    return (
      <div className={css(dateRangeStyleSheet.dropdownButton)}>
        <DropdownButton
          button={<IconButton iconName="ellipsis" intent="none" type="menu" />}
          options={presets.map(computeLabel)}
          menuAlignRight={true}
          disabled={disabled}
        />
      </div>
    );
  };

  getEndDateMinDate = () => {
    const {minDate, value} = this.props;
    if (
      minDate &&
      value.startDate &&
      calendarDateCompare(minDate, value.startDate) < 0
    ) {
      return value.startDate;
    } else if (!minDate && value.startDate) {
      return value.startDate;
    }
    return minDate;
  };

  isStartDateInvalid = () => {
    const {isInvalid, isStartDateInvalid} = this.props;
    return isInvalid || isStartDateInvalid;
  };

  isEndDateInvalid = () => {
    const {isInvalid, isEndDateInvalid} = this.props;
    return isInvalid || isEndDateInvalid;
  };

  render() {
    const {
      value,
      minDate,
      maxDate,
      disabled,
      size,
      presets,
      startDatePlaceholder,
      endDatePlaceholder,
    } = this.props;

    return (
      <span style={{display: "flex"}}>
        <CalendarDateInput
          value={value.startDate}
          onChange={this.handleStartDateChange}
          minDate={minDate}
          maxDate={maxDate}
          dateFormatString={DEFAULT_DATE_FORMAT}
          placeholder={startDatePlaceholder}
          disabled={disabled}
          size={size}
          isInvalid={this.isStartDateInvalid()}
        />
        <span
          className={css(
            dateRangeStyleSheet.toStyle,
            disabled && dateRangeStyleSheet.disabledTo
          )}
        >
          to
        </span>
        <CalendarDateInput
          inputRef={inputRef => {
            this.secondInput = inputRef;
          }}
          value={value.endDate}
          onChange={this.handleEndDateChange}
          minDate={this.getEndDateMinDate()}
          maxDate={maxDate}
          dateFormatString={DEFAULT_DATE_FORMAT}
          placeholder={endDatePlaceholder}
          disabled={disabled}
          size={size}
          isInvalid={this.isEndDateInvalid()}
        />
        {presets ? this.renderPresetMenu(presets, disabled) : null}
      </span>
    );
  }
}

function computePresetLabel(
  preset: CalendarDateRangePreset,
  dateFormatString: string
) {
  const startDateLabel = preset.value.startDate
    ? formatCalendarDate(preset.value.startDate, dateFormatString)
    : "";
  const endDateLabel = preset.value.endDate
    ? formatCalendarDate(preset.value.endDate, dateFormatString)
    : "";
  if (!startDateLabel && !endDateLabel) {
    return ``;
  } else if (!startDateLabel) {
    return `Before ${endDateLabel}`;
  } else if (!endDateLabel) {
    return `After ${startDateLabel}`;
  }
  return `${startDateLabel} - ${endDateLabel}`;
}

const dateRangeStyleSheet = StyleSheet.create({
  toStyle: {
    marginTop: "auto",
    marginBottom: "auto",
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...include(margin.h.s),
  },
  dropdownButton: {
    ...include(margin.l.m),
  },
  disabledTo: {
    color: colors.grey40,
  },
});

export const _test = {dateRangeStyleSheet};

export const convertDateRangeToUtcBounds = (
  range: CalendarDateRangeValue,
  timeZone: string
) => ({
  startUtc: range.startDate
    ? calendarDateToMoment(range.startDate, timeZone).toISOString()
    : null,
  endUtc: range.endDate
    ? calendarDateToMoment(range.endDate, timeZone)
        .endOf("day")
        .toISOString()
    : null,
});
