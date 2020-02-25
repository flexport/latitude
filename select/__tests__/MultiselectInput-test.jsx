/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */
import * as React from "react";
import {mount} from "enzyme";
import {isEqual} from "lodash";
import {_test} from "../MultiselectInput";
import MultiselectOptions from "../MultiselectOptions";

import {options} from "./generateOverviewText-test";
import {inputStyles} from "../../styles/input";
import {styleToClassname} from "../../styles/index";

const {MultiselectInputClass} = _test;

function mountMultiselect(propOverrides: {} = {}) {
  const defaultProps = {
    isPopupVisible: true,
    value: [options[0].value],
    options,
  };
  const mergedProps = {
    ...defaultProps,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...propOverrides,
  };

  return mount(<MultiselectInputClass {...mergedProps} />);
}

describe("Multiselect", () => {
  it("displays select all when flag enabled", () => {
    const wrapper = mountMultiselect({displaySelectAllButton: true});
    wrapper.find("SelectButton").simulate("click");
    // "Select all" appears in Checkbox and in the wrapped CheckboxClass
    expect(wrapper.find({label: "Select all"}).length).toBe(1);
  });
  it("doesn't display select all when flag not enabled", () => {
    const wrapper = mountMultiselect({displaySelectAllButton: false});
    wrapper.find("SelectButton").simulate("click");
    expect(wrapper.find({label: "Select all"}).length).toBe(0);
  });
  it("isValid works", () => {
    const wrapper = mountMultiselect({isInvalid: true});
    expect(
      wrapper.find("div[data-qa='select-button']").props().className
    ).toContain(styleToClassname(inputStyles.isInvalid));
  });
  it("isDisabled works", () => {
    const wrapper = mountMultiselect({disabled: true});
    expect(
      wrapper.find("div[data-qa='select-button']").props().className
    ).toContain(styleToClassname(inputStyles.disabled));
  });
  it("throws if no toKeyFn is provided and the type is not a string or number", () => {
    expect(() => mountMultiselect({value: [options[0]]})).toThrow();
  });
  it("record multiselect works", () => {
    const onChange = jest.fn();
    const recordOptions = [
      {
        label: "test",
        value: "test",
      },
      {
        label: "test1",
        value: "test1",
      },
    ];
    const selectedVals = [recordOptions[0].value];
    const wrapper = mountMultiselect({
      options: recordOptions,
      value: selectedVals,
      onChange,
    });
    wrapper.find("SelectButton").simulate("click");
    expect(
      isEqual(wrapper.find(MultiselectOptions).props().values, ["test"])
    ).toBe(true);
    wrapper
      .find(MultiselectOptions)
      .props()
      .onChange(["test", "test1"]);
    expect(onChange.mock.calls.length).toBe(1);
    expect(
      isEqual(
        onChange.mock.calls[0][0],
        recordOptions.map(option => option.value)
      )
    ).toBe(true);
  });
});
