/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {boolean, text, withKnobs} from "@storybook/addon-knobs";
import moment from "moment-timezone";
import sections from "../sections";
import CalendarDateRange, {
  type CalendarDateRangeValue,
} from "../../date/CalendarDateRange";
import {DEFAULT_DATE_FORMAT} from "../../date/CalendarDateInput";
import {
  today,
  type CalendarDate,
  addDaysFromCalendarDate,
} from "../../date/CalendarDateType";

const TZ_GUESS = moment.tz.guess();

const stories = storiesOf(`${sections.dataEntry}/Calendar Date Range`, module);
stories.addDecorator(withKnobs);
stories.add("basic usage", () => (
  <CalendarDateRangeHoist {...getDateInputKnobs()} />
));

const getDateInputKnobs = () => ({
  dateFormatString: text("dateFormatString", DEFAULT_DATE_FORMAT),
  isLarge: boolean("isLarge", false),
});

type CalendarDateWrapperState = {
  startDate: CalendarDate | null,
  endDate: CalendarDate | null,
};

const defaultState = {
  startDate: addDaysFromCalendarDate(today(TZ_GUESS), -10),
  endDate: addDaysFromCalendarDate(today(TZ_GUESS), 10),
};

const defaultPresets = [
  {
    label: "yesterday",
    value: {
      startDate: addDaysFromCalendarDate(today(TZ_GUESS), -2),
      endDate: today(TZ_GUESS),
    },
  },
  {
    label: "last week",
    value: {
      startDate: addDaysFromCalendarDate(today(TZ_GUESS), -7),
      endDate: today(TZ_GUESS),
    },
  },
];

// eslint-disable-next-line import/prefer-default-export
export class CalendarDateRangeHoist extends React.Component<
  *,
  CalendarDateWrapperState
> {
  constructor() {
    super();
    this.state = defaultState;
  }
  handleInputChange = (date: CalendarDateRangeValue) => {
    this.setState(date);
  };
  render() {
    return (
      <div>
        <CalendarDateRange
          value={this.state}
          maxDate={addDaysFromCalendarDate(today(TZ_GUESS), 30)}
          onChange={this.handleInputChange}
          presets={defaultPresets}
          {...this.props}
        />
      </div>
    );
  }
}
