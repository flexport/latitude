/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import Banner from "../Banner";

describe("Banner", () => {
  it("matches snapshot", () => {
    const banner = mount(<Banner message="I am a banner" />);
    expect(banner).toMatchSnapshot();
  });
});
