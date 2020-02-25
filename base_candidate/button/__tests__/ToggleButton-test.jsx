/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {shallow} from "enzyme";

import ToggleButton from "../ToggleButton";

describe("ToggleButton", () => {
  it("renders", () => {
    const component = <ToggleButton iconName="cog" label="test" />;
    expect(component).toMatchSnapshot();
  });

  it("should show toggle icon by default", () => {
    const component = <ToggleButton label="test" hideToggleIcon={false} />;
    const wrapper = shallow(component);

    expect(wrapper.props().children.filter(child => !!child).length).toBe(2);
  });

  it("should not show toggle icon when hideToggleIcon is set to true", () => {
    const component = <ToggleButton label="test" hideToggleIcon={true} />;
    const wrapper = shallow(component);

    expect(wrapper.props().children.filter(child => !!child).length).toBe(1);
  });
});
