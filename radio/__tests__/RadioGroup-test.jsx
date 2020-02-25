/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */
import * as React from "react";
import {mount} from "enzyme";
import RadioGroup from "../RadioGroup";
import Radio from "../Radio";

const options = [
  {label: "Client", value: "client"},
  {label: "Freight Partner", value: "freight_partner"},
];

function mountRadioGroup(propOverrides: {} = {}) {
  const defaultProps = {
    options,
    onChange: () => {},
    value: null,
  };
  const mergedProps = {
    ...defaultProps,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...propOverrides,
  };
  return mount(<RadioGroup {...mergedProps} />);
}

describe("RadioGroup", () => {
  it("shows two radios when supplied with two options", () => {
    const wrapper = mountRadioGroup();
    expect(wrapper.find(Radio).length).toBe(2);
  });
  it("can have a value", () => {
    const wrapper = mountRadioGroup({value: options[0].value});
    expect(wrapper.props().value).toEqual(options[0].value);
  });
  it("can select a value", () => {
    const onChange = jest.fn();
    const wrapper = mountRadioGroup({onChange});
    wrapper
      .find(Radio)
      .first()
      .find("input")
      .simulate("change");
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it("can be disabled", () => {
    const wrapper = mountRadioGroup({disabled: true});
    expect(
      wrapper
        .find(Radio)
        .first()
        .find("input")
        .props().disabled
    ).toBe(true);
  });
  it("can be inline", () => {
    const wrapper = mountRadioGroup({isInline: true});
    expect(wrapper.props().isInline).toBe(true);
  });
  it("can be sized", () => {
    const wrapper = mountRadioGroup({size: "s"});
    expect(
      wrapper
        .find(Radio)
        .first()
        .props().size
    ).toBe("s");
  });
});
