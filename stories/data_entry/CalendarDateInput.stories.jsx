/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {text, withKnobs} from "@storybook/addon-knobs";
import {getTextInputKnobs} from "latitude/stories/data_entry/TextInput.stories";
import sections from "latitude/stories/sections";
import CalendarDateInput, {
  DEFAULT_DATE_FORMAT,
} from "latitude/date/CalendarDateInput";
import {
  calendarDateToMoment,
  type CalendarDate,
  addDaysFromCalendarDate,
  utcStringToCalendarDate,
  today,
} from "latitude/date/CalendarDateType";
import moment from "moment-timezone";

const TZ_GUESS = moment.tz.guess();

const stories = storiesOf(`${sections.dataEntry}/Calendar Date Input`, module);
stories.addDecorator(withKnobs);
stories.add("CalendarDateInput", () => (
  <CalendarDateInputHoist {...getTextInputKnobs()} {...getDateInputKnobs()} />
));

const getDateInputKnobs = () => ({
  dateFormatString: text("dateFormatString", DEFAULT_DATE_FORMAT),
  minDate: text("minDate", addDaysFromCalendarDate(today(TZ_GUESS), -10)),
  maxDate: text("maxDate", addDaysFromCalendarDate(today(TZ_GUESS), 10)),
});

type CalendarDateWrapperState = {
  value: string | null,
};

const defaultState = {
  value: moment.utc().toISOString(),
};

// eslint-disable-next-line import/prefer-default-export
export class CalendarDateInputHoist extends React.Component<
  *,
  CalendarDateWrapperState
> {
  constructor() {
    super();
    this.state = {
      ...defaultState,
    };
  }
  handleInputChange = (date: CalendarDate) => {
    this.setState({
      value: calendarDateToMoment(date, moment.tz.guess()).toISOString(),
    });
  };
  handleInputChangeFn = (change: {deprecated_date: string | null}) => {
    this.setState({
      value: change.deprecated_date,
    });
  };
  render() {
    return (
      <div>
        <CalendarDateInput
          value={
            this.state.value
              ? utcStringToCalendarDate(this.state.value, moment.tz.guess())
              : null
          }
          onChange={this.handleInputChange}
          {...this.props}
        />
      </div>
    );
  }
}
