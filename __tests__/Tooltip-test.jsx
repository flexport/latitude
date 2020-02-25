/**
 * TEAM: frontend_infra
 * @flow
 */
import * as React from "react";
import {mount} from "enzyme";

import Tooltip from "../Tooltip";

const CHILD_TEXT = "Some text";
function mountChild() {
  return mount(
    <Tooltip overlay="I am a tooltip">
      {/* eslint-disable-next-line flexport/no-oocss */}
      <div className="child">{CHILD_TEXT}</div>
    </Tooltip>
  );
}

describe("<Tooltip />", () => {
  // TODO(levimeahan): Needs more comprehensive tests but Enzyme does not seem to support React portals very well
  it("renders child contents", () => {
    const wrapper = mountChild();
    expect(wrapper.find(".child").text()).toMatch(CHILD_TEXT);
  });
});
