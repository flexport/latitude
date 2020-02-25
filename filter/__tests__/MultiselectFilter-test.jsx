/**
 * TEAM: frontend_infra
 * @flow
 */
import * as React from "react";
import {mount, type ReactWrapper} from "enzyme";
import {act} from "react-dom/test-utils";
import MultiselectFilter, {
  getFilterValueFromArray,
  type Option,
} from "../MultiselectFilter";

// Popper uses document.createRange, which JSDOM doesn't support
jest.mock("popper.js");

const testOptions: $ReadOnlyArray<Option<string>> = [
  {
    value: "test1",
    label: "Schedule Pick Up",
  },
  {
    value: "test2",
    label: "Pending Pick Up",
  },
];

function mountMultiSelectFilter(propOverrides: {} = {}) {
  const props = {
    label: "test",
    value: getFilterValueFromArray([], testOptions),
    onChange: () => {},
    options: testOptions,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...propOverrides,
  };

  return mount(<MultiselectFilter {...props} />);
}

function openFilter(filter: ReactWrapper) {
  filter.find("FilterButton").simulate("click");
}

describe("Multifilter", () => {
  it("can select a value", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiSelectFilter({
      onChange: handleChange,
    });

    openFilter(wrapper);

    const firstOption = wrapper.find("Checkbox").at(0);
    act(() => firstOption.props().onChange(true));

    expect(handleChange).toHaveBeenCalledWith({
      specificValues: ["test1"],
      type: "specificValues",
    });
  });

  it("can clear a value", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiSelectFilter({
      value: getFilterValueFromArray(["test1"], testOptions),
      onChange: handleChange,
    });

    openFilter(wrapper);

    const firstOption = wrapper.find("Checkbox").at(0);
    act(() => firstOption.props().onChange(false));

    expect(handleChange).toHaveBeenCalledWith({type: "allSelected"});
  });

  it("can select all with the select all option", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiSelectFilter({
      value: getFilterValueFromArray(["test1"], testOptions),
      onChange: handleChange,
      displaySelectAllButton: true,
    });

    openFilter(wrapper);

    const selectAllOption = wrapper.find("Checkbox").at(0);
    act(() => selectAllOption.props().onChange(true));

    expect(handleChange).toHaveBeenCalledWith({type: "allSelected"});

    // Pass update back into component as props
    wrapper.setProps({value: handleChange.mock.calls[0][0]});
    expect(wrapper.find("Checkbox").every({checked: true})).toBe(true);
  });

  it("can deselect all with the select all option", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiSelectFilter({
      value: getFilterValueFromArray(["test1", "test2"], testOptions),
      onChange: handleChange,
      displaySelectAllButton: true,
    });

    openFilter(wrapper);

    const selectAllOption = wrapper.find("Checkbox").at(0);
    act(() => selectAllOption.props().onChange(false));

    // Deselecting all is equivalent to selecting all
    expect(handleChange).toHaveBeenCalledWith({type: "allSelected"});

    // Even though we tell the onChange handler that everything is selected,
    // we want to uncheck all the checkboxes in the UI
    wrapper.setProps({value: handleChange.mock.calls[0][0]});
    expect(wrapper.find("Checkbox").every({checked: false})).toBe(true);
  });

  it("can remove all values", () => {
    const handleRemove = jest.fn();
    const wrapper = mountMultiSelectFilter({
      value: getFilterValueFromArray(["test1"], testOptions),
      onRemove: handleRemove,
    });

    const removeButton = wrapper.find({iconName: "cancel"}).find("button");
    removeButton.simulate("click");

    expect(handleRemove).toHaveBeenCalled();

    // Pass update back into component as props
    wrapper.setProps({value: {type: "allSelected"}});
    expect(wrapper.find("Checkbox").every({checked: false})).toBe(true);
  });

  it("disables remove button when disabled", () => {
    const handleRemove = jest.fn();
    const wrapper = mountMultiSelectFilter({
      value: getFilterValueFromArray(["test1"], testOptions),
      onRemove: handleRemove,
      disabled: true,
    });

    const removeButton = wrapper.find({iconName: "cancel"}).find("button");
    removeButton.simulate("click");

    expect(handleRemove).not.toHaveBeenCalled();
  });

  it("updates when value changes", () => {
    const wrapper = mountMultiSelectFilter({
      value: getFilterValueFromArray(["test1"], testOptions),
    });

    expect(wrapper.text()).toContain("Schedule Pick Up");

    wrapper.setProps({value: {type: "allSelected"}});

    expect(wrapper.text()).not.toContain("Schedule Pick Up");
  });
});
