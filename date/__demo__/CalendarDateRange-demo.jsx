/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import moment from "moment-timezone";
import {today, addDaysFromCalendarDate} from "../CalendarDateType";
import {
  type DemoFile,
  demoCommonStyles,
  disabledKnob,
  calendarDate,
  textInputSizeKnob,
  bool,
} from "../../demoTypes";
import CalendarDateRange, {
  type CalendarDateRangeValue,
} from "../CalendarDateRange";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <CalendarDateRangeShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs: {
        minDate: calendarDate(),
        maxDate: calendarDate(),
        disabled: disabledKnob,
        size: textInputSizeKnob,
        startDateInvalid: bool(false),
        endDateInvalid: bool(false),
      },
    },
  ],
};

type DemoProps = {
  disabled?: boolean,
  startDateInvalid?: boolean,
  endDateInvalid?: boolean,
};

export class CalendarDateRangeShim extends React.PureComponent<
  {+elementToCodeFn?: React.Node => void, +demoProps?: DemoProps},
  {value: CalendarDateRangeValue}
> {
  state = {
    value: {
      startDate: null,
      endDate: null,
    },
  };

  handleChange = (value: CalendarDateRangeValue) => {
    this.setState({value});
  };

  render() {
    const {demoProps} = this.props;

    const isStartDateInvalid = demoProps
      ? demoProps.startDateInvalid || false
      : undefined;
    const isEndDateInvalid = demoProps
      ? demoProps.endDateInvalid || false
      : undefined;

    const element = (
      <CalendarDateRange
        {...this.props.demoProps}
        value={this.state.value}
        onChange={this.handleChange}
        isStartDateInvalid={isStartDateInvalid}
        isEndDateInvalid={isEndDateInvalid}
        presets={[
          {
            label: "Today",
            value: {
              startDate: today(moment.tz.guess()),
              endDate: today(moment.tz.guess()),
            },
          },
          {
            label: "Last Week",
            value: {
              startDate: addDaysFromCalendarDate(today(moment.tz.guess()), -7),
              endDate: today(moment.tz.guess()),
            },
          },
        ]}
      />
    );
    // eslint-disable-next-line prefer-destructuring
    const elementToCodeFn = this.props.elementToCodeFn;
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn && elementToCodeFn(element);
    return <div className={css(demoCommonStyles.midWrapper)}>{element}</div>;
  }
}

export default demos;
