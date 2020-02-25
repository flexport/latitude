/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import MultiselectOptions from "../MultiselectOptions";

function mountMultiselectOptions(propOverrides: {} = {}) {
  const defaultProps = {
    values: ["b"],
    options: [
      {value: "a", label: "A"},
      {value: "b", label: "B", disabled: true},
      {value: "c", label: "C", disabled: true},
      {value: "d", label: "D"},
    ],
    onChange: () => {},
    displaySelectAllButton: false,
  };

  // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
  return mount(<MultiselectOptions {...defaultProps} {...propOverrides} />);
}

describe("MultiselectOptions", () => {
  it("can select a value", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiselectOptions({
      values: ["b"],
      onChange: handleChange,
    });
    const firstCheckbox = wrapper.find("label").at(0);
    firstCheckbox.find("input").simulate("change");

    const valuesArray = handleChange.mock.calls[0][0];
    expect(valuesArray.sort()).toEqual(["a", "b"]);
  });

  it("can deselect a value", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiselectOptions({
      values: ["a", "b"],
      onChange: handleChange,
    });

    const firstCheckbox = wrapper.find("label").at(0);
    firstCheckbox.find("input").simulate("change");

    expect(handleChange.mock.calls[0][0]).not.toContain("a");
    expect(handleChange.mock.calls[0][0]).toContain("b");
    const valuesArray = handleChange.mock.calls[0][0];
    expect(valuesArray.sort()).toEqual(["b"]);
  });

  it("selects all when select all is pressed (ignoring disabled)", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiselectOptions({
      displaySelectAllButton: true,
      onChange: handleChange,
    });

    const selectAllCheckbox = wrapper.find("label").at(0);
    selectAllCheckbox.find("input").simulate("change");

    const valuesArray = handleChange.mock.calls[0][0];
    expect(valuesArray.sort()).toEqual(["a", "b", "d"]);
  });

  it("deselects all when select all is pressed again (ignoring disabled)", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiselectOptions({
      values: ["a", "b", "d"],
      displaySelectAllButton: true,
      onChange: handleChange,
    });

    const selectAllCheckbox = wrapper.find("label").at(0);
    selectAllCheckbox.find("input").simulate("change");

    expect(handleChange).toHaveBeenCalledWith(["b"]);
  });

  describe("filterSearchMode", () => {
    it("should not check values when selecting all with filtered options", () => {
      const handleChange = jest.fn();
      const options = [
        {value: "a", label: "Filtered out"},
        {value: "b", label: "filtered out but disabled", disabled: true},
        {value: "dd", label: "included"},
        {value: "dddd", label: "included 2"},
      ];
      const values = [];
      const wrapper = mountMultiselectOptions({
        values,
        options,
        displaySelectAllButton: true,
        onChange: handleChange,
        filterSearchMode: true,
      });

      const mockEvent = {target: {value: "included"}};
      wrapper
        .find("input")
        .at(0)
        .simulate("change", mockEvent); // filter results
      const selectAllCheckbox = wrapper.find("label").at(0);
      selectAllCheckbox.find("input").simulate("change");

      const valuesArray = handleChange.mock.calls[0][0];
      expect(valuesArray.sort()).toEqual(["dd", "dddd"]);
    });

    it("should not uncheck values when selecting none with filtered options", () => {
      const handleChange = jest.fn();
      const options = [
        {value: "a", label: "Filtered out"},
        {value: "b", label: "included but disabled", disabled: true},
        {value: "c", label: "included"},
        {value: "d", label: "included 2"},
      ];
      const values = ["a", "b", "c", "d"];
      const wrapper = mountMultiselectOptions({
        values,
        options,
        displaySelectAllButton: true,
        onChange: handleChange,
        filterSearchMode: true,
      });

      const mockEvent = {target: {value: "included"}};
      wrapper
        .find("input")
        .at(0)
        .simulate("change", mockEvent); // filter results
      const selectAllCheckbox = wrapper.find("label").at(0);
      selectAllCheckbox.find("input").simulate("change");

      const valuesArray = handleChange.mock.calls[0][0];
      expect(valuesArray.sort()).toEqual(["a", "b"]);
    });
  });
});
