/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import TextInputAutocomplete, {
  defaultFilter,
} from "../../TextInputAutocomplete";

function mountTextInputAutocomplete(props?: {}) {
  return mount(
    <TextInputAutocomplete
      value=""
      onChange={() => {}}
      suggestions={["aaa", "aaabbb", "aaabbbccc"]}
      // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
      {...props}
    />
  );
}

describe("TextInputAutocomplete", () => {
  describe("default filter", () => {
    it("positively filters a query that exactly matches an option", () => {
      expect(defaultFilter("aaa", "aaa")).toBe(true);
    });

    it("positively filters a query that matches an option after trim", () => {
      expect(defaultFilter("   aaa", "aaa")).toBe(true);
      expect(defaultFilter("aaa   ", "aaa")).toBe(true);
      expect(defaultFilter("   aaa   ", "aaa")).toBe(true);
    });

    it("negatively filters text that doesn't lexically match", () => {
      expect(defaultFilter("a", "b")).toBe(false);
    });

    it("works case insensitively", () => {
      expect(defaultFilter("a", "A")).toBe(true);
    });
  });

  it("matches snapshot", () => {
    const comp = mountTextInputAutocomplete();
    expect(comp).toMatchSnapshot();
  });

  it("should open dropdown on focus", () => {
    const comp = mountTextInputAutocomplete();
    expect(comp.find("DropdownList").length).toBe(0);
    comp.find("input").simulate("focus");
    expect(comp.find("DropdownList").length).toBe(1);
  });

  it("should open dropdown on mouse down", () => {
    const comp = mountTextInputAutocomplete();
    expect(comp.find("DropdownList").length).toBe(0);
    comp.find("input").simulate("mousedown");
    expect(comp.find("DropdownList").length).toBe(1);
  });

  it("should close dropdown on mouse down if already open", () => {
    const comp = mountTextInputAutocomplete();
    comp.find("input").simulate("focus");
    expect(comp.find("DropdownList").length).toBe(1);
    comp.find("input").simulate("mousedown");
    expect(comp.find("DropdownList").length).toBe(0);
  });

  it("should filter down on options based on value is entered", () => {
    const comp = mountTextInputAutocomplete({
      value: "bbb",
      suggestions: ["aaa", "aaabbb", "aaabbbccc"],
    });
    comp.find("input").simulate("focus");

    expect(comp.find("ul").children().length).toBe(2);
  });

  it("calls onChange when an option is clicked with the respective value", () => {
    const handleChange = jest.fn();

    const comp = mountTextInputAutocomplete({
      value: "",
      suggestions: ["aaa", "aaabbb", "aaabbbccc"],
      onChange: handleChange,
    });

    comp.find("input").simulate("focus");
    const firstOption = comp.find("DropdownOption").first();

    firstOption.simulate("mousedown");

    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toBe("aaa");
  });

  it("wont filter options when suggestionsFilter is null", () => {
    const comp = mountTextInputAutocomplete({
      value: "---",
      suggestions: ["aaa", "aaabbb", "aaabbbccc"],
      suggestionsFilter: null,
    });

    comp.find("input").simulate("focus");
    const options = comp.find("DropdownOption");

    expect(options.length).toBe(3);
  });
});
