/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import Pill from "../Pill";

describe("Pill", () => {
  it("works as expected, shows close button if onDismiss is provided", () => {
    expect(mount(<Pill onDismiss={() => {}}>child</Pill>)).toMatchSnapshot();
  });

  it("works as expected, does not show close button if onDismiss is not provided", () => {
    expect(mount(<Pill>child</Pill>)).toMatchSnapshot();
  });

  it("handles onDismiss", () => {
    let clicked = false;
    const handleDismiss = () => {
      clicked = true;
    };
    const pill = mount(<Pill onDismiss={handleDismiss}>pill</Pill>);

    pill.find("button").simulate("click");

    expect(clicked).toBe(true);
  });
});
