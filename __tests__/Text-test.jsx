/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */
import * as React from "react";
import {mount} from "enzyme";

import Text from "../Text";
import TextLink from "../TextLink";

const textSample = "The freight forwarder for modern logistics teams.";

function mountText(propOverrides: {} = {}) {
  const defaultProps = {
    children: textSample,
  };
  const mergedProps = {
    ...defaultProps,
    // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
    ...propOverrides,
  };
  return mount(<Text {...mergedProps} />);
}

describe("Text", () => {
  it("can render", () => {
    const wrapper = mountText();
    expect(wrapper.find("p")).toBeDefined();
  });
  it("has text", () => {
    const wrapper = mountText();
    expect(wrapper.find("p").html()).toContain(textSample);
  });
  it("can declare the proper tag at headline scale", () => {
    const wrapper = mountText({scale: "headline"});
    expect(wrapper.find("h3")).toBeDefined();
  });
  it("can nest Text successfully", () => {
    const wrapper = mountText({
      children: <Text>cool</Text>,
    });

    expect(wrapper.find(Text).find("p")).toBeDefined();
    expect(wrapper.find(Text).find("span").length).toBe(1);
  });
  it("can contain a Link", () => {
    const wrapper = mountText({
      // $FlowFixMe(notandrewkaye)
      children: `hey ${<TextLink href="flexport.com">click me</TextLink>}`,
    });

    expect(wrapper.find(Text).find("p")).toBeDefined();
    expect(
      wrapper
        .find(Text)
        .childAt(1)
        .find("a")
    ).toBeDefined();
  });
  it("doesn't render null if nullRetainsLineHeight is false", () => {
    let wrapper = mountText({
      children: null,
    });
    expect(wrapper.find("p").length).toBe(0);

    wrapper = mountText({
      children: null,
    });
    expect(wrapper.find("p").length).toBe(0);

    wrapper = mountText({
      children: [null, "hello"],
    });
    expect(wrapper.find("p").length).toBe(1);
    expect(wrapper.find("p").text()).toBe("hello");
  });
  it("renders if nullRetainsLineHeight is true", () => {
    const wrapper = mountText({
      emptyRetainsLineHeight: true,
      children: null,
    });
    expect(wrapper.find("p")).toBeDefined();
    expect(wrapper.find("p").text()).toBe(" ");
  });
  it("renders if child is a number", () => {
    const wrapper = mountText({
      children: 42,
    });
    expect(wrapper.find("p")).toBeDefined();
    expect(wrapper.find("p").text()).toBe("42");
  });
});
