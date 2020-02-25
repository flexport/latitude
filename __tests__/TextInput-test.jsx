/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */
import {mount} from "enzyme";
import * as React from "react";
import TextInput from "../TextInput";
import {getNameFromStyle} from "../tools/test";
import {inputStyles} from "../styles/input";

function mountTextInput(propOverrides: {} = {}) {
  const defaultProps = {
    value: "Starting value...",
    onChange: () => {},
  };

  const mergedProps = {
    ...defaultProps,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...propOverrides,
  };
  return mount(<TextInput {...mergedProps} />);
}

const getInputNode = (textInput: any) => textInput.find("input").get(0);
describe("TextInput", () => {
  describe("handles various state booleans", () => {
    it("disabled renders properly", () => {
      const textInput = mountTextInput({disabled: true});
      expect(getInputNode(textInput).props.disabled).toBe(true);
    });
    it("isInvalid renders properly", () => {
      const textInput = mountTextInput({isInvalid: true});
      expect(
        getInputNode(textInput).props.className.indexOf(
          getNameFromStyle(inputStyles.isInvalid)
        )
      ).toBeGreaterThan(-1);
    });
    it("renders placeholder text", () => {
      const placeholder = "Placeholder";
      const textInput = mountTextInput({placeholder});
      expect(getInputNode(textInput).props.placeholder).toEqual(placeholder);
    });
  });
  describe("onFn's function as expected", () => {
    it("onChange is called when the user types", () => {
      const mockOnChange = jest.fn();
      const textInput = mountTextInput({onChange: mockOnChange});
      const newValue = "a"; // letter a
      textInput.find("input").simulate("change", {
        target: {
          value: newValue,
        },
      });
      expect(mockOnChange.mock.calls.length).toEqual(1);
      expect(mockOnChange.mock.calls[0][0]).toBe(newValue);
    });
  });
});
