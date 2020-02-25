/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import DateTimeInput, {type DateTimeValue} from "../DateTimeInput";
import {
  type DemoFile,
  textInputSizeKnob,
  demoCommonStyles,
  isInvalidKnob,
  disabledKnob,
  calendarDate,
  text,
} from "../../demoTypes";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <DateTimeInputShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs: {
        minDate: calendarDate(),
        maxDate: calendarDate(),
        disabled: disabledKnob,
        size: textInputSizeKnob,
        isInvalid: isInvalidKnob,
        timeZone: text("UTC"),
      },
    },
  ],
};

type DemoProps = {disabled?: boolean, isInvalid?: boolean};

export class DateTimeInputShim extends React.PureComponent<
  {+elementToCodeFn?: React.Node => void, +demoProps?: DemoProps},
  {value: DateTimeValue}
> {
  static defaultProps = {disabled: false, isInvalid: false};
  state = {
    value: {
      calendarDate: null,
      wallTime: null,
    },
  };

  handleChange = (value: DateTimeValue) => {
    this.setState({value});
  };

  render() {
    const element = (
      // $FlowFixMe(uforic): Figure out how to shims without expanding all props
      <DateTimeInput
        {...this.props.demoProps}
        value={this.state.value}
        onChange={this.handleChange}
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
