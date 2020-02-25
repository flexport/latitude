/**
 * TEAM: frontend_infra
 * @flow strict
 */
import * as React from "react";
import {mount} from "enzyme";
import {isEqual} from "lodash";
import {_test, type SelectInputProps} from "../SelectInput";
import {inputStyles} from "../../styles/input";
import {styleToClassname} from "../../styles/index";

function mountSelect<K>(propOverrides?: $Shape<SelectInputProps<K | string>>) {
  const defaultProps = {
    value: null,
    options: [
      {
        value: "val1",
        label: "text1",
      },
    ],
    toKeyFn: value => {
      if (typeof value === "string") {
        return value;
      }
      return JSON.stringify(value);
    },
  };
  const mergedProps = {
    ...defaultProps,
    ...propOverrides,
  };
  const {SelectInput} = _test;
  // $FlowUpgradeFixMe(0.94.0 -> 0.95.1)
  return mount(<SelectInput {...mergedProps} />);
}

describe("SelectInput", () => {
  it("disables", () => {
    const wrapper = mountSelect();
    expect(wrapper.find("select").props().disabled).toBe(false);
    wrapper.setProps({disabled: true});
    expect(wrapper.find("select").props().disabled).toBe(true);
  });
  it("isValid works", () => {
    const wrapper = mountSelect();
    expect(wrapper.find("select").props().className).not.toContain(
      styleToClassname(inputStyles.isInvalid)
    );
    wrapper.setProps({isInvalid: true});
    expect(wrapper.find("select").props().className).toContain(
      styleToClassname(inputStyles.isInvalid)
    );
  });
  describe("size works", () => {
    it("small works", () => {
      const wrapper = mountSelect();
      expect(wrapper.find("select").props().className).not.toContain(
        styleToClassname(inputStyles.large)
      );
      wrapper.setProps({size: "s"});
      expect(wrapper.find("select").props().className).toContain(
        styleToClassname(inputStyles.small)
      );
    });
    it("large works", () => {
      const wrapper = mountSelect();
      expect(wrapper.find("select").props().className).not.toContain(
        styleToClassname(inputStyles.large)
      );
      wrapper.setProps({size: "l"});
      expect(wrapper.find("select").props().className).toContain(
        styleToClassname(inputStyles.large)
      );
    });
  });
  it("option is disabled", () => {
    const wrapper = mountSelect({
      options: [{value: "val1", label: "text1", disabled: true}],
    });
    expect(wrapper.find({value: "val1"}).props().disabled).toBe(true);
  });
  it("if null is passed in, the nullable option is correctly chosen", () => {
    const wrapper = mountSelect();
    expect(wrapper.find("select").props().value).toBe(_test.NULL_OPTION);
  });
  it("the value that is chosen is passed down to select", () => {
    const wrapper = mountSelect({value: "val1"});
    expect(wrapper.find("select").props().value).toBe("val1");
  });
  it("if isNullable is false, the nullable option is disabled", () => {
    const wrapper = mountSelect();
    expect(
      wrapper
        .find("option")
        .find({value: _test.NULL_OPTION})
        .props().disabled
    ).toBe(true);
  });
  it("if isNullable is true, and the nullable option is selected, onChange called with null", () => {
    const onChangeMock = jest.fn();
    const wrapper = mountSelect({
      isNullable: true,
      value: "val1",
      onChange: onChangeMock,
    });
    wrapper
      .find("select")
      .simulate("change", {target: {value: _test.NULL_OPTION}});
    expect(
      wrapper
        .find("option")
        .find({value: _test.NULL_OPTION})
        .props().disabled
    ).toBe(false);
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0][0]).toBe(null);
  });
  it("fails if no key function is provided but values are not strings or numbers", () => {
    expect(() => _test.defaultKeyFn({label: "key", value: {}})).toThrow();
  });
  it("selecting records works", () => {
    const onChangeMock = jest.fn();
    const wrapper = mountSelect({
      isNullable: true,
      value: {random: "val1"},
      onChange: onChangeMock,
      options: [
        {label: "Label 1", value: {random: "val1"}},
        {label: "Label 2", value: {random: "val2"}},
      ],
      // $ExpectError - the way this is flow typed
      toKeyFn: (val: {random: string}) => val.random,
    });
    wrapper.find("select").simulate("change", {target: {value: "val2"}});
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(isEqual(onChangeMock.mock.calls[0][0], {random: "val2"})).toBe(true);
    wrapper
      .find("select")
      .simulate("change", {target: {value: _test.NULL_OPTION}});
    expect(onChangeMock.mock.calls.length).toBe(2);
    expect(onChangeMock.mock.calls[1][0]).toBe(null);
  });
});
