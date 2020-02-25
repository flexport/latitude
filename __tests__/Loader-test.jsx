/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {mount, shallow} from "enzyme";
import Loader from "../Loader";

function shallowLoader(propOverrides: {} = {}) {
  const defaultProps = {loaded: false};
  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  const mergedProps = {...defaultProps, ...propOverrides};
  return shallow(<Loader {...mergedProps} />);
}

const testChild = "Hi, test.";

describe("Loader", () => {
  describe("it does the bare minimum", () => {
    it("matches snapshot", () => {
      const loader = mount(<Loader loaded={false} />);
      expect(loader).toMatchSnapshot();
    });
    it("Renders children if loaded", () => {
      const comp = shallowLoader({loaded: true, children: testChild});
      expect(comp.html()).toContain(testChild);
    });
  });
});
