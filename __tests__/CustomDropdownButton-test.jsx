/**
 * TEAM: customs
 * @flow
 */
import {mount} from "enzyme";
import * as React from "react";
import {_test} from "../CustomDropdownButton";
import Button from "../button/Button";

const {CustomDropdownButtonClass} = _test;

const defaultPopupWithClickAwayProps = {
  isPopupVisible: false,
  togglePopupVisible: () => {},
  setPopupVisible: () => {},
};

function mountDropdown(propOverrides: {} = {}) {
  const defaultProps = {
    button: <Button />,
  };

  const mergedProps = {
    ...defaultPopupWithClickAwayProps,
    ...defaultProps,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...propOverrides,
  };
  return mount(
    <CustomDropdownButtonClass {...mergedProps}>
      content
    </CustomDropdownButtonClass>
  );
}

describe("Dropdown", () => {
  it("clicking on button opens toggle menu", () => {
    const mockToggle = jest.fn();
    const dropdown = mountDropdown({
      togglePopupVisible: mockToggle,
    });
    dropdown.find("button").forEach(sw => sw.simulate("click"));
    expect(mockToggle.mock.calls.length).toBe(1);
  });
  it("closes menu if disabled while open", () => {
    const mockToggle = jest.fn();
    const dropdown = mountDropdown({
      setPopupVisible: mockToggle,
      isPopupVisible: true,
    });
    dropdown.setProps({disabled: true});
    expect(mockToggle.mock.calls.length).toBe(1);
  });
});
