/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";

import TimeInput, {getTimeIntervals} from "../TimeInput";
import {parseInputText, ZERO_OCLOCK, EOD_OCLOCK} from "../wallTime";

// none of our tests depend on a specific time zone or time
// unmock moment, since we will just be parsing one date
jest.unmock("moment");
jest.unmock("moment-timezone");

function mountTimeInput(props: *) {
  return mount(
    <TimeInput
      options={getTimeIntervals(ZERO_OCLOCK, EOD_OCLOCK, 60)}
      {...props}
    />
  );
}

describe("TimeInput", () => {
  it("formats the time in as HH:mmTT", () => {
    const time = "07:00am";

    const wrapper = mountTimeInput({
      value: parseInputText(time),
      onChange: () => {},
    });

    expect(wrapper.find("input").props().value).toBe(time);
  });

  it("calls onChange when a valid time is entered", () => {
    const time = "07:00am";
    const handleChange = jest.fn();

    const wrapper = mountTimeInput({
      value: null,
      onChange: handleChange,
    });

    wrapper.find("input").simulate("change", {target: {value: time}});

    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toBe(parseInputText(time));
  });

  it("snaps back to the last valid value if the inputted value is invalid", () => {
    const time = "07:00am";
    const handleChange = jest.fn();

    const wrapper = mountTimeInput({
      value: parseInputText(time),
      onChange: handleChange,
    });

    wrapper
      .find("input")
      .simulate("change", {target: {value: "invalid input"}});
    wrapper.find("input").simulate("blur");

    expect(wrapper.find("input").props().value).toBe(time);
    expect(handleChange).not.toBeCalled();
  });
});

describe("getTimeIntervals", () => {
  it("handles when endTime is >= start time", () => {
    expect(getTimeIntervals(ZERO_OCLOCK, ZERO_OCLOCK, 15).length).toBe(0);
    expect(getTimeIntervals(EOD_OCLOCK, ZERO_OCLOCK, 15).length).toBe(0);
  });
  it("handles a full day of time @ 15/30/60", () => {
    expect(getTimeIntervals(ZERO_OCLOCK, EOD_OCLOCK, 15).length).toBe(24 * 4);
    expect(getTimeIntervals(ZERO_OCLOCK, EOD_OCLOCK, 30).length).toBe(24 * 2);
    expect(getTimeIntervals(ZERO_OCLOCK, EOD_OCLOCK, 60).length).toBe(24 * 1);
  });
});
