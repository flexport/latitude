/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import momentT from "moment";
import moment from "moment-timezone";
import PopupWithClickAway from "../popup/PopupWithClickAway";
import {
  ARROW_DOWN_KEY,
  ARROW_UP_KEY,
  ENTER_KEY,
  isKeyCodeCauseBlur,
} from "./inputUtils";
import {
  addDaysFromCalendarDate,
  today,
  type CalendarDate,
  parseStringToCalendarDate,
  formatCalendarDate,
  shouldBeCalendarDate,
  calendarDateToMoment,
  momentToCalendarDate,
} from "./CalendarDateType";
import TextInput from "../TextInput";
import {type Size} from "../sizes";
import invariant from "../tools/invariant";
import {zIndices} from "../tools/zIndices";
import DatePicker from "./DatePicker";

export type CalendarDateInputProps = {
  +disabled: boolean,
  +size: Size,
  +isInvalid: boolean,
  +isPrefilled: boolean,
  +placeholder?: string,
  /**
   * The date format string that is used to display a date to the use.
   * This should be a moment format string, like "MM-DD-YYYY".
   * This date format string will also be added to the moment suite of parser strings for parsing user input.
   */
  +dateFormatString: string,
  /** The minimum date that the user is allowed to view on the calendar. The month navigation will prevent navigating to months outside this range. */
  +minDate: CalendarDate | null,
  /** The maximum date that the user is allowed to view on the calendar. The month navigation will prevent navigating to months outside this range. */
  +maxDate: CalendarDate | null,
  /** If minDate and maxDate aren't enough, filterDate can be used to arbitarily filter dates (i.e. no weekends). */
  +filterDate: (CalendarDate => boolean) | null,
  /** Access to the underlying input field. */
  +inputRef: ((HTMLElement | null) => void) | null,
  /** The value of CalendarDateInput is a CalendarDate type. Check out CalendarDateType.js to learn more about this format. */
  +value: CalendarDate | null,
  +onChange: (CalendarDate | null) => void,
  +showIcon: boolean,
  +dateToShow?: CalendarDate | null,
  +noPortal?: boolean,
  /** Display the week number next to each week  */
  +showWeekNumbers?: boolean,
};

const VALID_KEY_CODES = [ARROW_DOWN_KEY, ARROW_UP_KEY];
export const DEFAULT_DATE_FORMAT = "MMM D, YYYY";
const DATE_INPUT_DEFAULTS = {
  dateFormatString: DEFAULT_DATE_FORMAT,
  disabled: false,
  showIcon: false,
  size: "m",
  isPrefilled: false,
  isInvalid: false,
  inputRef: null,
  minDate: null,
  maxDate: null,
  filterDate: null,
  showWeekNumbers: false,
};

type CalendarDateInputState = {|
  textValue: string,
|};

/**
 * Consider removing unsafe lifecycle methods for future concurrent mode support!
 * See https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes
 */
/* eslint-disable react/no-unsafe */
/**
 * @category Data Entry
 * @brandStatus V2
 * @status Stable
 * @short CalendarDateInput is a visual calendar and text input for collecting a date from the user.
 * @group Date and Time
 *
 * CalendarDateInput wraps the [react-datepicker](https://github.com/Hacker0x01/react-datepicker) library from HackerOne for
 * displaying a visual calendar, but text input processing is done using the Flexport `<TextInput>` component.
 *
 * Under the hood, it uses moment to parse and format dates. However, CalendarDateInput uses a CalendarDateType in the API,
 * as opposed to a moment object. Moment objects have extra information in them, which leads to ambiguity. For instance, what timezone
 * should be used when decided what "day" a moment object is? Instead, CalendarDateInput forces the implementor to thoughtfully convert
 * moment objects into text strings, using the momentToCalendarDate() method in CalendarDateType.
 *
 * @extends React.Component */
class CalendarDateInputClass extends React.PureComponent<
  CalendarDateInputProps,
  CalendarDateInputState
> {
  static defaultProps = DATE_INPUT_DEFAULTS;

  textInputRef: HTMLElement | null;
  TZ_GUESS: string;

  constructor(props: CalendarDateInputProps) {
    super(props);
    this.validateProps(props);
    this.state = this.computeState(this.props.value, props.dateFormatString);
    this.TZ_GUESS = moment.tz.guess();
  }

  // eslint-disable-next-line class-methods-use-this
  validateProps(props: CalendarDateInputProps) {
    // eslint-disable-next-line no-unused-expressions
    props.value && shouldBeCalendarDate(props.value);
    // eslint-disable-next-line no-unused-expressions
    props.maxDate && shouldBeCalendarDate(props.maxDate);
    // eslint-disable-next-line no-unused-expressions
    props.minDate && shouldBeCalendarDate(props.minDate);
  }

  UNSAFE_componentWillReceiveProps(nextProps: CalendarDateInputProps) {
    this.validateProps(nextProps);
    if (
      nextProps.value !== this.props.value ||
      nextProps.dateFormatString !== this.props.dateFormatString
    ) {
      this.setState(
        this.computeState(nextProps.value, nextProps.dateFormatString)
      );
    }
  }

  handleDatePickerChange = (newDate: momentT, closePopup: () => void) => {
    // changed from devInvariant on 5/24; Sentry search for this phrase yielded 0 results.
    invariant(
      // $FlowFixMe(uforic) isUTC method isn't on moment object, just on moment-timezone object
      newDate.isUTC(),
      "date incoming from date picker is not in UTC"
    );
    const calDate = momentToCalendarDate(newDate, "UTC");
    // eslint-disable-next-line no-unused-expressions
    this.textInputRef && this.textInputRef.focus();

    this.updateDate(calDate);
    closePopup();
  };

  handleKeyDown = (event: KeyboardEvent, closePopup: () => void) => {
    if (isKeyCodeCauseBlur(event.keyCode) || event.keyCode === ENTER_KEY) {
      this.updateDateFromTextInput(this.state.textValue);
      closePopup();
      return;
    }
    if (!VALID_KEY_CODES.includes(event.keyCode)) {
      return;
    }
    const dateOrNow = this.props.value || today(this.TZ_GUESS);
    if (event.keyCode === ARROW_UP_KEY) {
      this.updateDate(addDaysFromCalendarDate(dateOrNow, 1));
    } else if (event.keyCode === ARROW_DOWN_KEY) {
      this.updateDate(addDaysFromCalendarDate(dateOrNow, -1));
    }
  };

  handleInputFieldChange = (textValue: string) => {
    this.setState({textValue});
  };

  /**
   * We don't need to call hidePopup here, because if the blur
   * is caused by a click, popupWith... handles it, and if it's
   * initiated from the keyboard, onHandleKeyDown handles it.
   *
   * Why _not_ call it here? If we call hidePopup, we miss any event
   * being performed on it. For instance, if the user clicks a date,
   * handleBlur => hidePopup would get called, but handleDatePickerChange
   * would never get called.
   *
   */
  // eslint-disable-next-line autofix/no-unused-vars
  handleBlur = (event: Event) => {
    this.updateDateFromTextInput(this.state.textValue);
  };

  /**
   * This is called when we actually want to try and parse
   * the user's input. Moment is too sensitive on parsing,
   * so if we did it on every keystroke, we might get it wrong.
   *
   * Instead, we wait for a blur, or attempt to blur (tab, enter).
   */
  updateDateFromTextInput = (textValue: string) => {
    // shortcut if inputText is empty
    // we only want to call onChange if our current value is null
    // if we called it all the time, it could blow away other onChange
    // calls, because the order of onBlur and handleDatePickerChange isn't
    // guaranteed.
    if (this.props.value !== null && textValue.trim() === "") {
      this.updateDate(null);
      return;
    }
    const parseDateFormats = getSupportedDateFormats(
      this.props.dateFormatString
    );
    const newCalDate = parseStringToCalendarDate(textValue, parseDateFormats);
    // we don't want to call onChange if the value is the same
    // however, we'd like to reformat the existing date if it's changed
    // i.e. the user could have added extra spaces etc.
    if (newCalDate === this.props.value) {
      this.setState(
        this.computeState(this.props.value, this.props.dateFormatString)
      );
    } else {
      this.updateDate(newCalDate);
    }
  };

  computeState = (value: CalendarDate | null, dateFormatString: string) => {
    const displayText = calendarDateDisplayText(value, dateFormatString);
    return {
      textValue: displayText,
    };
  };
  /**
   * We only call the onChange when we want to update the
   * caller of CalendarInput. We _don't_ want to do this
   * on every keystroke.
   *
   * Instead, we call it when the user performs certain
   * actions, OR when they blur.
   *
   * The updateDate actions are: clickon on a date in the popup,
   * pressing up or down on their keyboard to iterate between days,
   *
   * If the user blurs OR attempts to blur by typing tab, escape, or return,
   * then we call updateDateFromTextInput.
   *
   * @param {*} result
   */
  updateDate(result: CalendarDate | null) {
    this.props.onChange(result);
  }

  render() {
    const currentCalDate = this.props.value;
    const startMoment = currentCalDate
      ? calendarDateToMoment(currentCalDate, "UTC")
      : null;
    const dateToShowMoment = this.props.dateToShow
      ? calendarDateToMoment(this.props.dateToShow, "UTC")
      : null;

    const placeholder =
      this.props.placeholder == null
        ? this.props.dateFormatString
        : this.props.placeholder;

    return (
      <PopupWithClickAway>
        {(Target, Popup, {openPopup, closePopup}) => (
          <>
            <Target>
              <TextInput
                size={this.props.size}
                isInvalid={this.props.isInvalid}
                isPrefilled={this.props.isPrefilled}
                disabled={this.props.disabled}
                placeholder={placeholder}
                value={this.state.textValue}
                onKeyDown={e => {
                  this.handleKeyDown(e, closePopup);
                }}
                onFocus={() => {
                  openPopup();
                }}
                onBlur={this.handleBlur}
                onChange={this.handleInputFieldChange}
                inputRef={textInputRef => {
                  this.textInputRef = textInputRef;
                  // eslint-disable-next-line no-unused-expressions
                  this.props.inputRef && this.props.inputRef(textInputRef);
                }}
                onClick={() => {
                  openPopup();
                }}
                suffix={this.props.showIcon ? {iconName: "calendar"} : null}
              />
            </Target>
            <Popup
              placement="bottom-start"
              zIndex={zIndices.zIndex1500AboveModal.value}
              noPortal={this.props.noPortal}
            >
              {/* react-datepicker optional arguments are not nullable, they should be undefined */}
              <DatePicker
                allowSameDay={true}
                selected={startMoment}
                onChange={date => this.handleDatePickerChange(date, closePopup)}
                inline={true}
                minDate={
                  this.props.minDate
                    ? calendarDateToMoment(this.props.minDate, "UTC")
                    : undefined
                }
                maxDate={
                  this.props.maxDate
                    ? calendarDateToMoment(this.props.maxDate, "UTC")
                    : undefined
                }
                filterDate={
                  this.props.filterDate
                    ? convertCalendarDateFilterToMomentFilter(
                        this.props.filterDate
                      )
                    : undefined
                }
                openToDate={dateToShowMoment}
                utcOffset={0}
                showWeekNumbers={this.props.showWeekNumbers}
              />
              {/* the utcOffset argument is required, because if not provided and the date is
                  null, then react-datepicker assumes the current timezone (instead of UTC). this means
                  the first date that is clicked may be off by a calendar date. */}
            </Popup>
          </>
        )}
      </PopupWithClickAway>
    );
  }
}

function calendarDateDisplayText(
  value: CalendarDate | null,
  dateFormatString: string
) {
  return value ? formatCalendarDate(value, dateFormatString) : "";
}

function getSupportedDateFormats(dateFormatString?: string) {
  let parseDateFormats = SUPPORTED_DATE_FORMATS;
  if (dateFormatString && !SUPPORTED_DATE_FORMATS.includes(dateFormatString)) {
    parseDateFormats = [dateFormatString, ...SUPPORTED_DATE_FORMATS];
  }
  return parseDateFormats;
}

// latest supported date formats from:
//  github.com/flexport/react-datepicker/master/src/date_input.jsx
const SUPPORTED_DATE_FORMATS = [
  // 1 comma club
  "MMM D, YYYY",
  "MMM D, YY",
  "MMMM D, YYYY",
  "MMMM D, YY",

  // no comma club
  "MMM D YYYY",
  "MMM D YY",
  "MMMM D YYYY",
  "MMMM D YY",

  "MM-DD-YYYY",
  "MM/DD/YYYY",
  "MM-DD-YY",
  "MM/DD/YY",
];

/**
 * This method converts the users filter function into a react-datepicker filter function.
 * That API uses moment instead of CalendarDate.
 *
 * The filter function is called for each date visible to the user on the calendar, typically
 * 1 months worth.
 */
function convertCalendarDateFilterToMomentFilter(
  filterFn: CalendarDate => boolean
) {
  return (mmt: momentT) => {
    const calDate = momentToCalendarDate(mmt, "UTC");
    if (!calDate) {
      // changed from devInvariant on 5/24; Sentry search for this phrase yielded 0 results.
      invariant(
        false,
        `moment passed to filter function was not converted to calendar date successfully ${mmt.toISOString()}`
      );
    }
    return filterFn(calDate);
  };
}

export const _test = {
  CalendarDateInputClass,
  convertCalendarDateFilterToMomentFilter,
  getSupportedDateFormats,
};

const CalendarDateInput = CalendarDateInputClass;

export default CalendarDateInput;
