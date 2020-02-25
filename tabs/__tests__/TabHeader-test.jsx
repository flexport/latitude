/**
 * TEAM: frontend_infra
 * @flow
 */
import {mount, shallow} from "enzyme";
import * as React from "react";
import Button from "../../button/Button";

import TabHeader, {_test} from "../TabHeader";

const {TabComponent} = _test;

function shallowTabHeader(propOverrides: {} = {}) {
  const defaultProps = {
    tabs: [{name: "a", id: "a"}, {name: "b", id: "b"}],
    activeTab: "a",
    onTabChange: () => {},
  };
  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  const mergedProps = {...defaultProps, ...propOverrides};
  return shallow(<TabHeader {...mergedProps} />);
}

function mountTabHeader(propOverrides: {} = {}) {
  const defaultProps = {
    tabs: [{name: "a", id: "a"}, {name: "b", id: "b"}],
    activeTab: "a",
    onTabChange: () => {},
  };
  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  const mergedProps = {...defaultProps, ...propOverrides};
  return mount(<TabHeader {...mergedProps} />);
}

describe("TabHeader", () => {
  it("renders provided number of tabs", () => {
    const component = shallowTabHeader();
    expect(component.find(TabComponent)).toHaveLength(2);
  });

  it("renders right button", () => {
    const component = shallowTabHeader({
      components: <Button intent="none" kind="hollow" label="Cancel" />,
    });
    expect(component.find("Button").props().kind).toBe("hollow");
  });

  it("calls the onChange with correct parameters", () => {
    const mockCallback = jest.fn();
    const component = mountTabHeader({onTabChange: mockCallback});

    component.find("#th-a").simulate("click");
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe("a");
  });

  it("errors if no activeTab match is found in props", () => {
    expect(() => shallowTabHeader({activeTab: "f"})).toThrow();
  });
});
