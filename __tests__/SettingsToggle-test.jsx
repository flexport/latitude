/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import SettingsToggle from "../SettingsToggle";

function mountSettingsToggle(propOverrides: {} = {}) {
  const defaultProps = {onChange: () => {}};
  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  const mergedProps = {...defaultProps, ...propOverrides};
  return mount(<SettingsToggle {...mergedProps} />);
}

describe("SettingsToggle", () => {
  describe("does the bare minimum", () => {
    it("can render a settings toggle", () => {
      const comp = mountSettingsToggle();
      expect(comp.length).toEqual(1);
    });
  });
  describe("can set props", () => {
    describe("default props", () => {
      it("is unchecked", () => {
        const comp = mountSettingsToggle();
        expect(comp.find("input").prop("checked")).toBe(false);
      });
      it("is enabled", () => {
        const comp = mountSettingsToggle();
        expect(comp.find("input").prop("disabled")).toBe(false);
      });
    });
    describe("custom props", () => {
      it("renders settings toggle label", () => {
        const label = "Yes";
        const comp = mountSettingsToggle({label});
        expect(comp.find("span").html()).toContain(label);
      });
      it("can be checked", () => {
        const comp = mountSettingsToggle({checked: true});
        expect(comp.find("input").props().checked).toBe(true);
      });
      it("can be disabled", () => {
        const comp = mountSettingsToggle({disabled: true});
        expect(comp.find("input").props().disabled).toBe(true);
      });
      it("can be checked and disabled", () => {
        const comp = mountSettingsToggle({checked: true, disabled: true});
        expect(comp.find("input").props().checked).toBe(true);
        expect(comp.find("input").props().disabled).toBe(true);
      });
    });
  });
});
