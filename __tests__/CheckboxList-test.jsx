/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {mount, shallow} from "enzyme";
import CheckboxList, {type Option} from "../CheckboxList";
import Checkbox from "../Checkbox";

type ComponentProps = {
  +options?: $ReadOnlyArray<Option<string>>,
  +values?: $ReadOnlyArray<string>,
  +onChange?: (values: $ReadOnlyArray<string>) => void,
  +showSelectAllOption?: boolean,
};

const defaultProps = {
  options: [],
  values: [],
  onChange: () => {},
  showSelectAllOption: false,
};

function mountCheckboxList(customProps: ComponentProps) {
  // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
  return mount(<CheckboxList {...defaultProps} {...customProps} />);
}

function shallowCheckboxList(customProps: ComponentProps) {
  // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
  return shallow(<CheckboxList {...defaultProps} {...customProps} />);
}

const oneOption: Array<Option<string>> = [
  {
    label: "A",
    value: "a",
  },
];

const twoOptions: Array<Option<string>> = [
  {
    label: "A",
    value: "a",
  },
  {
    label: "B",
    value: "b",
  },
];

describe("CheckboxList", () => {
  describe("with no options", () => {
    it("renders an empty list", () => {
      const wrapper = shallowCheckboxList({options: [], values: []});
      const checkboxes = wrapper.find(Checkbox);
      expect(checkboxes).toHaveLength(0);
    });
  });

  describe("with one option", () => {
    it("renders a list with one unchecked checkbox", () => {
      const handleClick = jest.fn();
      const wrapper = mountCheckboxList({
        options: oneOption,
        values: [],
        onChange: handleClick,
      });

      const checkboxes = wrapper.find("input");
      expect(checkboxes).toHaveLength(1);

      const checkbox = checkboxes.at(0);
      expect(wrapper.find("span").text()).toBe("A");
      expect(checkbox.props().checked).toBe(false);

      checkbox.find("input").simulate("change");

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(["a"]);
    });

    it("renders a list with one checked checkbox", () => {
      const handleClick = jest.fn();
      const wrapper = mountCheckboxList({
        options: oneOption,
        values: ["a"],
        onChange: handleClick,
      });

      const checkboxes = wrapper.find("label");
      expect(checkboxes).toHaveLength(1);

      const checkbox = checkboxes.at(0);
      expect(checkbox.find("span").text()).toBe("A");
      expect(checkbox.find("input").props().checked).toBe(true);

      checkbox.find("input").simulate("change");

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith([]);
    });
  });

  describe("with two options", () => {
    it("renders a list with two unchecked checkboxes", () => {
      const handleClick = jest.fn();
      const wrapper = mountCheckboxList({
        options: twoOptions,
        values: [],
        onChange: handleClick,
      });

      const checkboxes = wrapper.find("label");
      expect(checkboxes).toHaveLength(2);

      const aCheckbox = checkboxes.at(0);
      expect(aCheckbox.find("span").text()).toBe("A");
      expect(aCheckbox.find("input").props().checked).toBe(false);

      const bCheckbox = checkboxes.at(1);
      expect(bCheckbox.find("span").text()).toBe("B");
      expect(bCheckbox.find("input").props().checked).toBe(false);

      aCheckbox.find("input").simulate("change");

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(["a"]);

      handleClick.mockClear();

      bCheckbox.find("input").simulate("change");

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(["b"]);
    });

    it("renders a list with one unchecked checkbox and one checked checkbox", () => {
      const handleClick = jest.fn();
      const wrapper = mountCheckboxList({
        options: twoOptions,
        values: ["b"],
        onChange: handleClick,
      });
      expect(wrapper).toHaveLength(1);

      const checkboxes = wrapper.find("label");
      expect(checkboxes).toHaveLength(2);

      const aCheckbox = checkboxes.at(0);
      expect(aCheckbox.find("span").text()).toBe("A");
      expect(aCheckbox.find("input").props().checked).toBe(false);

      const bCheckbox = checkboxes.at(1);
      expect(bCheckbox.find("span").text()).toBe("B");
      expect(bCheckbox.find("input").props().checked).toBe(true);

      aCheckbox.find("input").simulate("change");

      expect(handleClick).toHaveBeenCalledTimes(1);

      const selected = handleClick.mock.calls[0][0];
      expect(selected).toHaveLength(2);
      expect(selected).toContain("a");
      expect(selected).toContain("b");

      handleClick.mockClear();

      bCheckbox.find("input").simulate("change");

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith([]);
    });

    it("renders a list with two checked checkboxes", () => {
      const handleClick = jest.fn();
      const wrapper = mountCheckboxList({
        options: twoOptions,
        values: ["a", "b"],
        onChange: handleClick,
      });

      const checkboxes = wrapper.find("label");
      expect(checkboxes).toHaveLength(2);

      const aCheckbox = checkboxes.at(0);
      expect(aCheckbox.find("span").text()).toBe("A");
      expect(aCheckbox.find("input").props().checked).toBe(true);

      const bCheckbox = checkboxes.at(1);
      expect(bCheckbox.find("span").text()).toBe("B");
      expect(bCheckbox.find("input").props().checked).toBe(true);

      aCheckbox.find("input").simulate("change");

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(["b"]);

      handleClick.mockClear();

      bCheckbox.find("input").simulate("change");

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(["a"]);
    });

    it("supports generic value types", () => {
      const handleClick = jest.fn();
      const wrapper = mount(
        <CheckboxList
          values={[]}
          onChange={handleClick}
          options={[{value: "1", label: "a"}, {value: 1, label: "b"}]}
        />
      );

      const checkboxes = wrapper.find("label");
      expect(checkboxes).toHaveLength(2);

      const aCheckbox = checkboxes.at(0);
      aCheckbox.find("input").simulate("change");
      expect(handleClick).toHaveBeenCalledWith(["1"]);

      const bCheckbox = checkboxes.at(1);
      bCheckbox.find("input").simulate("change");
      expect(handleClick).toHaveBeenCalledWith([1]);
    });
  });

  describe("with the select all option", () => {
    it("should have a 'Select all' option when not all values are selected", () => {
      const options = [{label: "One", value: "1"}];
      const wrapper = shallowCheckboxList({
        options,
        values: [],
        onChange: jest.fn(),
        showSelectAllOption: true,
      });
      const selectAllCheckbox = wrapper.find(Checkbox).at(0);
      expect(selectAllCheckbox.prop("label")).toEqual("Select all");
    });

    it("should have text 'Select none' when all the options are selected", () => {
      const options = [{label: "One", value: "1"}];
      const values = ["1"];
      const wrapper = shallowCheckboxList({
        options,
        values,
        onChange: jest.fn(),
        showSelectAllOption: true,
      });
      const selectAllCheckbox = wrapper.find(Checkbox).at(0);
      expect(selectAllCheckbox.prop("label")).toEqual("Select none");
    });

    it("should select all the values", () => {
      const options = [{label: "One", value: "1"}, {label: "Two", value: "2"}];
      const onChangeSpy = jest.fn();
      const wrapper = mountCheckboxList({
        options,
        values: [],
        onChange: onChangeSpy,
        showSelectAllOption: true,
      });
      const selectAllCheckbox = wrapper.find("input").at(0);
      selectAllCheckbox.simulate("change");
      expect(onChangeSpy).toHaveBeenCalledWith(["1", "2"]);
    });

    describe("with disabled options", () => {
      it("selects all when select all is pressed (ignoring disabled)", () => {
        const options = [
          {label: "One", value: "1"},
          {label: "Two", value: "2", disabled: true},
          {label: "Three", value: "3"},
        ];
        const values = ["1", "2", "3"];
        const onChangeSpy = jest.fn();
        const wrapper = mountCheckboxList({
          options,
          values,
          onChange: onChangeSpy,
          showSelectAllOption: true,
        });
        const selectAllCheckbox = wrapper.find("input").at(0);
        selectAllCheckbox.simulate("change");
        expect(onChangeSpy).toHaveBeenCalledWith(["2"]);
      });

      it("deselects all when select all is pressed again (ignoring disabled)", () => {
        const options = [
          {label: "One", value: "1"},
          {label: "Two", value: "2", disabled: true},
          {label: "Three", value: "3"},
        ];
        const values = [];
        const onChangeSpy = jest.fn();
        const wrapper = mountCheckboxList({
          options,
          values,
          onChange: onChangeSpy,
          showSelectAllOption: true,
        });
        const selectAllCheckbox = wrapper.find("input").at(0);
        selectAllCheckbox.simulate("change");
        expect(onChangeSpy).toHaveBeenCalledWith(["1", "3"]);
      });
    });
  });
});
