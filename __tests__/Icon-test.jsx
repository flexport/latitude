/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

/* eslint-disable no-unused-expressions */

import {mount, shallow} from "enzyme";
import * as React from "react";

import {getNameFromStyle} from "../tools/test";
import {_test, styles} from "../Icon";
import latitudeColors from "../colors";
import {BASE} from "../context/ThemeNameContext";

function shallowIcon(propOverrides: {} = {}) {
  const defaultProps = {
    iconName: "rocket",
  };

  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  const mergedProps = {...defaultProps, ...propOverrides};
  const {Icon} = _test;
  return shallow(<Icon {...mergedProps} />);
}

describe("Icon", () => {
  describe("can set props", () => {
    it("allows different icons to be selected", () => {
      const {Icon} = _test;
      const wrapper = mount(<Icon iconName="rocket" />);
      expect(wrapper.props().iconName).toEqual("rocket");
      wrapper.setProps({iconName: "ship"});
      expect(wrapper.props().iconName).toEqual("ship");
    });
  });

  describe("styles", () => {
    it("adds the correct styles by default", () => {
      const component = shallowIcon();
      expect(
        component.find(`.${getNameFromStyle(styles.wrapper)}`).length
      ).toEqual(1);
    });

    it("can center align", () => {
      const component = shallowIcon({alignment: "center"});
      expect(component.find("svg").props().className).toContain(
        `${getNameFromStyle(styles.svgCenter)}`
      );
    });
  });

  describe("size", () => {
    it("inherits size by default", () => {
      const component = shallowIcon();
      expect(component.find("span").props().style).toEqual({
        width: "1em",
        height: "1em",
        fill: "unset",
      });
    });

    describe("sets a specific size", () => {
      const component = shallowIcon({size: "xl"});
      const size = 25;
      it("sets a size class on the wrapper", () => {
        expect(component.find("span").props().style).toEqual({
          width: size,
          height: size,
          fill: "unset",
        });
      });
      it("sets the width and height on the svg", () => {
        expect(component.find("svg").props().width).toEqual(size);
        expect(component.find("svg").props().height).toEqual(size);
      });
    });

    describe("sets a specific size that is not available", () => {
      it("should throw a flow error if an invalid size is used", () => {
        const {Icon} = _test;
        // $ExpectError
        <Icon size="xxxl" iconName="satellite" theme={BASE} />;
      });
    });

    describe("declares a custom size", () => {
      it("sets customSize prop", () => {
        const customSize = 128;
        const component = shallowIcon({customSize});
        expect(component.find("span").props().style).toEqual({
          width: customSize,
          height: customSize,
          fill: "unset",
        });
        expect(component.find("svg").props().style).toEqual({
          width: customSize,
          height: customSize,
        });
      });
    });
  });

  describe("color", () => {
    it("sets a color on the svg", () => {
      const component = shallowIcon({color: "green30"});
      expect(component.find("svg").props().color).toEqual(
        latitudeColors.green30
      );
    });
    it("does not set a color on the svg by default", () => {
      const component = shallowIcon();
      expect(component.find("svg").props().color).toEqual("unset");
    });
  });

  describe("paths", () => {
    it("has one path for a standard icon", () => {
      const component = shallowIcon({iconName: "check"});
      expect(component.find("path").length).toBe(1);
    });

    describe("elaborate paths", () => {
      const component = shallowIcon({iconName: "radioactive"});
      it("can render elaborate icon data", () => {
        expect(component.find("g").length).toBe(2);
      });
    });
  });

  describe("extras", () => {
    const component = shallowIcon();
    it("sets the SVG viewbox", () => {
      expect(component.find("svg").props().viewBox).toEqual("0 0 64 64");
    });
    it("sets the SVG description", () => {
      expect(component.find("desc").text()).toEqual(
        "An illustration of a rocket ship"
      );
    });
  });
});
