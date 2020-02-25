/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import SearchableSelectInput from "../SearchableSelectInput";

import {UP, DOWN} from "../../constants/interactions/KeyCodes";

function mountSearchableSelectInput(props?: {}) {
  const options = [
    {label: "a", value: 1},
    {label: "b", value: 2},
    {label: "c", value: 3},
  ];

  return mount(
    <SearchableSelectInput
      options={options}
      value={1}
      onChange={() => {}}
      // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
      {...props}
    />
  );
}

describe("SearchableSelectInput", () => {
  it("matches snapshot", () => {
    const comp = mountSearchableSelectInput();
    expect(comp).toMatchSnapshot();
  });

  it("disables", () => {
    const comp = mountSearchableSelectInput({disabled: true});
    expect(comp.find("input").props().disabled).toBe(true);
  });

  it("displays no text if value is null initially", () => {
    const comp = mountSearchableSelectInput({value: null});
    expect(comp.find("input").props().value).toBe("");
  });

  it("displays the label of the associated current value initially", () => {
    const comp = mountSearchableSelectInput({value: 3});
    expect(comp.find("input").props().placeholder).toBe("c");
  });

  it("should filter down on the number of options", () => {
    const comp = mountSearchableSelectInput({value: null});
    comp.find("input").simulate("change", {target: {value: "a"}});
    comp.find("input").simulate("focus");

    expect(comp.find("ul").children().length).toBe(1);
  });

  it("should filters options case insensitively", () => {
    const comp = mountSearchableSelectInput({value: null});
    comp.find("input").simulate("change", {target: {value: "B"}});
    comp.find("input").simulate("focus");

    expect(comp.find("ul").children().length).toBe(1);
  });

  it("disregards trailing whitespace when filtering", () => {
    const comp = mountSearchableSelectInput({value: null});
    comp.find("input").simulate("change", {target: {value: "     a"}});
    comp.find("input").simulate("focus");

    expect(comp.find("ul").children().length).toBe(1);
  });

  it("should open dropdown on focus", () => {
    const comp = mountSearchableSelectInput();
    expect(comp.find("DropdownList").length).toBe(0);
    comp.find("input").simulate("focus");
    expect(comp.find("DropdownList").length).toBe(1);
  });

  it("should open dropdown on mouse down", () => {
    const comp = mountSearchableSelectInput();
    expect(comp.find("DropdownList").length).toBe(0);
    comp.find("input").simulate("mousedown");
    expect(comp.find("DropdownList").length).toBe(1);
  });

  it("should close dropdown on mouse down if already open", () => {
    const comp = mountSearchableSelectInput();
    comp.find("input").simulate("focus");
    expect(comp.find("DropdownList").length).toBe(1);
    comp.find("input").simulate("mousedown");
    expect(comp.find("DropdownList").length).toBe(0);
  });

  it("should update the placeholder text when the value changes", () => {
    const comp = mountSearchableSelectInput();
    comp.setProps({value: 3});
    comp.update();
    expect(comp.find("input").props().placeholder).toBe("c");
  });

  describe("option highlighting", () => {
    it("remembers the last highlighted item on focus", () => {
      const comp = mountSearchableSelectInput({value: 2});
      comp.find("input").simulate("focus");
      const optionB = comp.find("DropdownOption").at(1);
      expect(optionB.props().isHighlighted).toBe(true);
    });

    it("remembers the last highlighted item on down press", () => {
      const comp = mountSearchableSelectInput({value: 2});
      comp.find("input").simulate("keyDown", {keyCode: UP});
      const optionB = comp.find("DropdownOption").at(1);
      expect(optionB.props().isHighlighted).toBe(true);
    });

    it("remembers the last highlighted item on up press", () => {
      const comp = mountSearchableSelectInput({value: 2});
      comp.find("input").simulate("keyDown", {keyCode: DOWN});
      const optionB = comp.find("DropdownOption").at(1);
      expect(optionB.props().isHighlighted).toBe(true);
    });
  });
});
