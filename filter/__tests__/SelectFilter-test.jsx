/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {mount, type ReactWrapper} from "enzyme";
import SelectFilter from "../SelectFilter";

function mountSelectFilter(propOverrides: {} = {}) {
  const defaultProps = {
    options: [{label: "A", value: "A"}],
    value: null,
    label: "",
  };

  // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
  return mount(<SelectFilter {...defaultProps} {...propOverrides} />);
}

function openFilter(filter: ReactWrapper) {
  filter.find("FilterButton").simulate("click");
}

describe("SelectFilter", () => {
  it("can select a value", () => {
    const handleChange = jest.fn();
    const wrapper = mountSelectFilter({
      options: [{label: "A", value: "A"}],
      onChange: handleChange,
    });

    openFilter(wrapper);

    const optionA = wrapper.find("li").at(1);
    optionA.props().onMouseDown();

    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toBe("A");
  });

  it("can clear a value", () => {
    const handleChange = jest.fn();
    const wrapper = mountSelectFilter({
      options: [{label: "A", value: "A"}],
      onChange: handleChange,
    });

    openFilter(wrapper);

    const clearOption = wrapper.find("li").at(0);
    clearOption.props().onMouseDown();

    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toBe(null);
  });

  it("is only clearable if there isNullable is true", () => {
    const wrapper = mountSelectFilter({
      options: [{label: "A", value: "A"}],
      isNullable: false,
    });

    openFilter(wrapper);

    expect(wrapper.find("li").length).toBe(1);
  });
});
