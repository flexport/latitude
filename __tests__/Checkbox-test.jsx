/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import Checkbox from "../Checkbox";

function mountCheckbox(propOverrides: {} = {}) {
  const defaultProps = {onChange: () => {}};
  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  const mergedProps = {...defaultProps, ...propOverrides};
  return mount(<Checkbox {...mergedProps} />);
}

describe("Checkbox", () => {
  describe("does the bare minimum", () => {
    it("can render a checkbox", () => {
      const comp = mountCheckbox();
      expect(comp.length).toEqual(1);
    });
    it("can render a styled checkbox", () => {
      const comp = mountCheckbox();
      expect(comp.find(".checkbox")).toBeDefined();
      expect(comp.find(".checkboxCheck")).toBeDefined();
    });
  });
  describe("can set props", () => {
    describe("default props", () => {
      it("is unchecked", () => {
        const comp = mountCheckbox();
        expect(comp.props().checked).toBe(false);
      });
      it("is enabled", () => {
        const comp = mountCheckbox();
        expect(comp.props().disabled).toBe(false);
      });
    });
    describe("custom props", () => {
      it("renders checkbox label", () => {
        const label = "Yes";
        const comp = mountCheckbox({label});
        expect(comp.find("span").html()).toContain(label);
      });
      it("can be checked", () => {
        const comp = mountCheckbox({checked: true});
        expect(comp.find("input").props().checked).toBe(true);
      });
      it("can be disabled", () => {
        const comp = mountCheckbox({disabled: true});
        expect(comp.find("input").props().disabled).toBe(true);
      });
      it("can be checked and disabled", () => {
        const comp = mountCheckbox({checked: true, disabled: true});
        expect(comp.find("input").props().checked).toBe(true);
        expect(comp.find("input").props().disabled).toBe(true);
      });
    });
  });
});
