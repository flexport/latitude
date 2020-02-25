/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import SegmentedControl, {
  type SegmentedControlProps,
} from "../SegmentedControl";

const defaultOptions = [
  {label: "Sourdough", value: "sourdough"},
  {label: "Rye", value: "rye"},
  {label: "Pumpernicker", value: "pumpernicker"},
  "banana",
  "Walnut",
];

function StatefulSegmentedControl({
  options,
}: {|
  +options: $PropertyType<SegmentedControlProps, "options">,
|}) {
  const [value, setValue] = React.useState(
    typeof options[0] === "string" ? options[0] : options[0].value
  );

  return (
    <SegmentedControl
      options={options}
      value={value}
      onChange={value => setValue(value)}
      size="xs"
    />
  );
}

function mountSegmentedControl(propOverrides: {} = {}) {
  const defaultProps = {
    options: defaultOptions,
    value: defaultOptions[0].value,
  };
  const mergedProps = {
    ...defaultProps,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...propOverrides,
  };
  return mount(<SegmentedControl {...mergedProps} />);
}

function mountStatefulSegmentedControl(propOverrides: {} = {}) {
  return mount(
    // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
    <StatefulSegmentedControl options={defaultOptions} {...propOverrides} />
  );
}

describe("SegmentedControl", () => {
  it("string options supported and rendered", () => {
    expect(
      mountSegmentedControl({options: ["a", "b"]}).find("input[type='radio']")
        .length
    ).toBe(2);
  });
  it("mixed (object and string) type options rendered", () => {
    expect(mountSegmentedControl().find("input[type='radio']").length).toBe(
      defaultOptions.length
    );
  });
  it("correct button selected when passed a value", () => {
    const wrapper = mountSegmentedControl({value: defaultOptions[0].value});

    expect(
      wrapper
        .find("input[type='radio']")
        .first()
        .props().checked
    ).toEqual(true);

    expect(
      wrapper
        .find("input[type='radio']")
        .at(1)
        .props().checked
    ).toEqual(false);
  });
  it("onchange is called correctly", () => {
    const onChange = jest.fn();
    const wrapper = mountSegmentedControl({onChange});
    wrapper
      .find("input[type='radio']")
      .first()
      .find("input")
      .simulate("change");

    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it("button selection works properly", () => {
    const wrapper = mountStatefulSegmentedControl();

    defaultOptions.forEach((_, index) => {
      wrapper
        .find("input[type='radio']")
        .at(index)
        .find("input")
        .simulate("change");

      for (let idx = 0; idx < defaultOptions.length; idx += 1) {
        expect(
          wrapper
            .find("input[type='radio']")
            .at(idx)
            .props().checked
        ).toEqual(idx === index);
      }
    });
  });
  it("cannot unselect a button by clicking it", () => {
    const wrapper = mountStatefulSegmentedControl();

    wrapper
      .find("input[type='radio']")
      .first()
      .find("input")
      .simulate("change");

    expect(
      wrapper
        .find("input[type='radio']")
        .first()
        .props().checked
    ).toEqual(true);

    wrapper
      .find("input[type='radio']")
      .first()
      .find("input")
      .simulate("change");

    expect(
      wrapper
        .find("input[type='radio']")
        .first()
        .props().checked
    ).toEqual(true);
  });
});
