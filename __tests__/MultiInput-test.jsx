/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import MultiInput from "../MultiInput";

import {ENTER, COMMA, BACKSPACE} from "../constants/interactions/KeyCodes";

function mountMultiInput(propOverrides: {} = {}) {
  const defaultProps = {
    value: [],
    onChange: () => {},
  };

  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  const mergedProps = {...defaultProps, ...propOverrides};
  return mount(<MultiInput {...mergedProps} />);
}

describe("MultiInput", () => {
  it("allows adding items to the list", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiInput({value: [], onChange: handleChange});

    const input = wrapper.find("input");
    input.simulate("change", {target: {value: "text"}});
    input.simulate("keyDown", {keyCode: ENTER});

    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toEqual(["text"]);
  });

  it("adds to list on comma press", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiInput({value: [], onChange: handleChange});

    const input = wrapper.find("input");
    input.simulate("change", {target: {value: "text"}});
    input.simulate("keyDown", {keyCode: COMMA});

    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toEqual(["text"]);
  });

  it("does not add to list when entering a less-than sign character", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiInput({value: [], onChange: handleChange});

    const input = wrapper.find("input");
    input.simulate("change", {target: {value: "text"}});
    input.simulate("keyDown", {keyCode: COMMA, shiftKey: true});

    expect(handleChange).not.toBeCalled();
  });

  it("trims text when adding to list", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiInput({value: [], onChange: handleChange});
    const text = "text to be trimmed";

    const input = wrapper.find("input");
    input.simulate("change", {target: {value: `   ${text}   `}});
    input.simulate("keyDown", {keyCode: COMMA});

    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toEqual([text]);
  });

  it("deletes the last item if and only if the textinput is empty", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiInput({
      value: ["a", "b"],
      onChange: handleChange,
    });
    const input = wrapper.find("input");

    input.simulate("keyDown", {keyCode: BACKSPACE});

    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toEqual(["a"]);

    input.simulate("change", {target: {value: "text"}});
    input.simulate("keyDown", {keyCode: BACKSPACE});

    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toEqual(["a"]);
  });

  it("shows placeholder text if there are no list items", () => {
    const placeholder = "placeholder text";

    const wrapper = mountMultiInput({value: [], placeholder});
    const input = wrapper.find("input");

    expect(input.prop("placeholder")).toBe(placeholder);
  });

  it("doesn't show placeholder text if there are no list items", () => {
    const placeholder = "placeholder text";

    const wrapper = mountMultiInput({value: ["a"], placeholder});
    const input = wrapper.find("input");

    expect(input.prop("placeholder")).toBeFalsy();
  });

  it("doesn't show placeholder text if there are no list items", () => {
    const placeholder = "placeholder text";

    const wrapper = mountMultiInput({value: ["a"], placeholder});
    const input = wrapper.find("input");

    expect(input.prop("placeholder")).toBeFalsy();
  });

  it("clears the list when the clear button is pressed", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiInput({
      value: ["a", "b", "c"],
      onChange: handleChange,
    });
    const clearButton = wrapper.find("button").last();

    clearButton.simulate("click");

    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toEqual([]);
  });

  it("doesn't show a clear button if the list is empty", () => {
    const wrapper = mountMultiInput({value: []});
    const clearButton = wrapper.find("button").last();

    expect(clearButton).toHaveLength(0);
  });

  it("adds to list comma separated items when pasted", () => {
    const handleChange = jest.fn();
    const commaSeparatedList = ["b", "c", "d", "f", "g", "h"];
    const listAsText = commaSeparatedList.join(", ");

    const wrapper = mountMultiInput({value: [], onChange: handleChange});
    const input = wrapper.find("input");
    input.prop("onPaste")({
      clipboardData: {
        getData: () => listAsText,
      },
      preventDefault: () => {},
    });

    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toEqual(commaSeparatedList);
  });

  it("appends any unadded value on blur by default", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiInput({value: [], onChange: handleChange});

    const input = wrapper.find("input");
    input.simulate("change", {target: {value: "text"}});
    input.simulate("blur");

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0]).toEqual(["text"]);
  });

  it("does not append on blur if addValueOnBlur is false", () => {
    const handleChange = jest.fn();
    const wrapper = mountMultiInput({
      value: [],
      onChange: handleChange,
      addValueOnBlur: false,
    });

    const input = wrapper.find("input");
    input.simulate("change", {target: {value: "text"}});
    input.simulate("blur");

    expect(handleChange).not.toHaveBeenCalled();
  });
});
