/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import {act} from "react-dom/test-utils";
import InlineEdit from "../InlineEdit";
import TextInput from "../TextInput";

jest.useFakeTimers();

describe("InlineEdit", () => {
  it("matches snapshot", () => {
    const comp = mount(
      <InlineEdit value="value" onChange={() => {}}>
        {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
        {props => <TextInput {...props} />}
      </InlineEdit>
    );

    expect(comp).toMatchSnapshot();
  });

  describe("switching between edit and display states", () => {
    it("initially mounts display text", () => {
      const comp = mount(
        <InlineEdit value="value" onChange={() => {}}>
          {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
          {props => <TextInput {...props} />}
        </InlineEdit>
      );

      expect(comp.find("TextInput").exists()).toBe(false);
      expect(comp.find("Text").exists()).toBe(true);
    });

    it("mounts input when the edit button is pressed", () => {
      const comp = mount(
        <InlineEdit value="value" onChange={() => {}}>
          {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
          {props => <TextInput {...props} />}
        </InlineEdit>
      );

      comp.find("Button").simulate("click");
      act(() => {
        jest.runAllTimers();
      });
      comp.update();

      expect(comp.find("TextInput").exists()).toBe(true);
    });
  });

  describe("edit to display switching interactions", () => {
    let comp;
    let handleChange;

    beforeEach(() => {
      handleChange = jest.fn();

      comp = mount(
        <InlineEdit value="value" onChange={handleChange}>
          {/* $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0) */}
          {props => <TextInput {...props} />}
        </InlineEdit>
      );

      comp.find("Button").simulate("click");
      act(() => {
        jest.runAllTimers();
      });
      comp.update();
    });

    it("does not call onChange on new value when cancel is pressed", () => {
      comp.simulate("change", {target: {value: "newValue"}});
      expect(handleChange).not.toBeCalled();

      const cancelButton = comp.find({iconName: "cancel", type: "button"});

      cancelButton.simulate("click");
      expect(handleChange).not.toBeCalled();
    });

    it("does call onChange on new value and save is pressed", () => {
      comp.simulate("change", {target: {value: "newValue"}});
      expect(handleChange).not.toBeCalled();

      const checkButton = comp.find({iconName: "check", type: "button"});

      checkButton.simulate("click");
      expect(handleChange).toBeCalled();
    });
  });
});
