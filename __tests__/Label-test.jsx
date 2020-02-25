/**
 * TEAM: frontend_infra
 * @flow
 */

import {mount} from "enzyme";
import * as React from "react";
import Label from "../Label";
import TextInput from "../TextInput";

function mountLabel(propOverrides: {} = {}) {
  const defaultProps = {
    value: "Test label",
  };

  const mergedProps = {
    ...defaultProps,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...propOverrides,
  };
  return mount(<Label {...mergedProps} />);
}

describe("Label", () => {
  describe("handles display and value properly", () => {
    it("focuses the first child input when the label is clicked", () => {
      const wrapper = mountLabel({
        children: (
          <>
            <TextInput value="test1" onChange={() => {}} />
            <TextInput value="test2" onChange={() => {}} />
          </>
        ),
      });
      const firstNestedTextInput = wrapper
        .find("input")
        .at(0)
        .instance();
      const secondNestedTextInput = wrapper
        .find("input")
        .at(1)
        .instance();

      wrapper
        .find("label")
        .props()
        .onClick();
      wrapper.update();

      // Make sure our first text input is focused
      expect(firstNestedTextInput).toBe(document.activeElement);

      // Make sure our second text input is not focused
      expect(secondNestedTextInput).not.toBe(document.activeElement);
    });

    it("renders label text", () => {
      const wrapper = mountLabel();
      expect(wrapper.find("label").contains("Test label")).toBe(true);
    });
  });
});
