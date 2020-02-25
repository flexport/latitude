/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow
 */
import {mount} from "enzyme";
import * as React from "react";
import {_test} from "../DropdownButton";
import {styles} from "../form/DeprecatedDropdownList";
import Button from "../button/Button";
import {getNameFromStyle} from "../tools/test";

const {DropdownButtonClass} = _test;

const defaultPopupWithClickAwayProps = {
  isPopupVisible: false,
  togglePopupVisible: () => {},
  setPopupVisible: () => {},
};

function shallowDropdownButton(propOverrides: {} = {}) {
  const defaultProps = {
    button: <Button />,
    options: [
      {
        label: "test1",
        iconName: "ship",
        handleClick: () => {},
      },
      {
        label: "test2",
        iconName: "ellipsis",
        handleClick: () => {},
      },
    ],
  };

  const mergedProps = {
    ...defaultPopupWithClickAwayProps,
    ...defaultProps,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...propOverrides,
  };
  return mount(<DropdownButtonClass {...mergedProps} />);
}

describe("DropdownButton", () => {
  it("clicking on button opens toggle menu", () => {
    const mockToggle = jest.fn();
    const dropdownButton = shallowDropdownButton({
      togglePopupVisible: mockToggle,
    });
    dropdownButton.find("button").forEach(sw => sw.simulate("click"));
    expect(mockToggle.mock.calls.length).toBe(1);
  });
  it("closes menu if disabled while open", () => {
    const mockToggle = jest.fn();
    const dropdownButton = shallowDropdownButton({
      setPopupVisible: mockToggle,
      isPopupVisible: true,
    });
    dropdownButton.setProps({disabled: true});
    expect(mockToggle.mock.calls.length).toBe(2);
  });
  it("selecting an option closes toggle menu", () => {
    const mockToggle = jest.fn();
    const dropdownButton = shallowDropdownButton({
      isPopupVisible: true,
      setPopupVisible: mockToggle,
    });
    const listItemHoverClass = getNameFromStyle(styles.listItemHover);
    const linkItems = dropdownButton.find(`.${listItemHoverClass}`);
    linkItems.first().simulate("click");
    expect(mockToggle.mock.calls.length).toBe(1);
  });
  it("calls handleClick on mouse down events", () => {
    const mockHandleClick = jest.fn();
    const dropdownButton = shallowDropdownButton({
      isPopupVisible: true,
      options: [
        {
          label: "test1",
          iconName: "ship",
          handleClick: mockHandleClick,
        },
      ],
    });
    const listItemHoverClass = getNameFromStyle(styles.listItemHover);
    const linkItems = dropdownButton.find(`.${listItemHoverClass}`);
    linkItems.first().simulate("mouseDown");
    expect(mockHandleClick).toHaveBeenCalled();
  });
});
