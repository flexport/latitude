/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */
import {mount, shallow} from "enzyme";
import * as React from "react";

import Flag from "../Flag";

function shallowFlag(propOverrides: {} = {}) {
  const defaultProps = {
    countryCode: "US",
  };

  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  const mergedProps = {...defaultProps, ...propOverrides};
  return shallow(<Flag {...mergedProps} />);
}

describe("Flag", () => {
  describe("can render a flag", () => {
    it("works as expected", () => {
      expect(mount(<Flag countryCode="AU" />)).toMatchSnapshot();
    });
    it("can set a maxHeight", () => {
      const component = shallowFlag({countryCode: "CA", maxWidth: 64});
      expect(component.find("img").props().style).toEqual({
        height: "64px",
        maxWidth: "64px",
        width: "100%",
      });
      expect(component).toMatchSnapshot();
    });
  });
});
