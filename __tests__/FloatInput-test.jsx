/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import FloatInput from "../FloatInput";

function mountFloatInput(propOverrides: {} = {}) {
  const defaultProps = {
    value: 1,
    onChange: () => {},
  };
  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  const mergedProps = {...defaultProps, ...propOverrides};
  return mount(<FloatInput {...mergedProps} />);
}

describe("FloatInput", () => {
  it("does not call on change on a same float", () => {
    const handleChange = jest.fn();
    const wrapper = mountFloatInput({value: 1, onChange: handleChange});
    const input = wrapper.find("input");
    input.simulate("change", {target: {value: "1.0"}});

    expect(wrapper.find("input").props().value).toBe("1.0");
    expect(handleChange).not.toBeCalled();
  });

  it("does call on change on a different float", () => {
    const handleChange = jest.fn();
    const wrapper = mountFloatInput({value: 1, onChange: handleChange});
    const input = wrapper.find("input");
    input.simulate("change", {target: {value: "3"}});

    expect(wrapper.find("input").props().value).toBe("3");
    expect(handleChange).toBeCalled();
  });

  it("doesn't call on change on unparseable text", () => {
    const handleChange = jest.fn();
    const wrapper = mountFloatInput({value: 1, onChange: handleChange});
    const input = wrapper.find("input");
    input.simulate("change", {target: {value: "not parseable"}});

    expect(wrapper.find("input").props().value).toBe("not parseable");
    expect(handleChange).not.toBeCalled();
  });

  it("does call on change on last valid float", () => {
    const handleChange = jest.fn();
    const wrapper = mountFloatInput({value: 1, onChange: handleChange});
    const input = wrapper.find("input");
    input.simulate("change", {target: {value: "3"}});
    input.simulate("change", {target: {value: "3k"}});
    input.simulate("change", {target: {value: "3kg"}});

    expect(wrapper.find("input").props().value).toBe("3kg");
    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toBe(3);
  });

  it("resets the text to value on blur", () => {
    const handleChange = jest.fn();
    const wrapper = mountFloatInput({value: 1, onChange: handleChange});
    const input = wrapper.find("input");
    input.simulate("change", {target: {value: "not parseable"}});
    input.simulate("blur");

    expect(wrapper.find("input").props().value).toBe("1");
    expect(handleChange).not.toBeCalled();
  });

  it("parses comma separated number", () => {
    const handleChange = jest.fn();
    const wrapper = mountFloatInput({value: 1, onChange: handleChange});
    const input = wrapper.find("input");
    input.simulate("change", {target: {value: "9,000.01"}});

    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toBe(9000.01);
  });

  it("overrides input text with new value if value prop changes", () => {
    const handleChange = jest.fn();

    const wrapper = mountFloatInput({value: 1, onChange: handleChange});
    wrapper.setProps({value: 2});
    wrapper.update();
    expect(wrapper.find("input").props().value).toBe("2");
  });

  it("doesn't cause an infinite loop if value prop is updated with same value", () => {
    const handleChange = jest.fn();

    const wrapper = mountFloatInput({value: 1, onChange: handleChange});
    wrapper.setProps({value: 1});
    wrapper.update();
    expect(wrapper.find("input").props().value).toBe("1");
  });

  it("supports precision", () => {
    const wrapper = mountFloatInput({value: 1, decimalPrecision: 2});
    expect(wrapper.find("input").props().value).toBe("1.00");

    wrapper.setProps({value: 2});
    wrapper.update();
    expect(wrapper.find("input").props().value).toBe("2.00");

    wrapper.setProps({value: 4.009});
    wrapper.update();
    expect(wrapper.find("input").props().value).toBe("4.01");
  });

  it("onChanges with the right precision applied", () => {
    const handleChange = jest.fn();
    const wrapper = mountFloatInput({
      value: null,
      decimalPrecision: 0,
      onChange: handleChange,
    });
    const input = wrapper.find("input");

    input.simulate("change", {target: {value: "1.337"}});

    expect(handleChange.mock.calls[0][0]).toBe(1);
  });
});
