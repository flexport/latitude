/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import Portal from "../Portal";

function mountPortal(children: React.Node) {
  return mount(
    <div>
      <Portal>{children}</Portal>
    </div>
  );
}

describe("Portal", () => {
  it("matches snapshot", () => {
    const comp = mountPortal(null);
    expect(comp).toMatchSnapshot();
  });

  it("uses portals", () => {
    const comp = mountPortal(null);

    expect(comp.find("Portal").exists()).toBe(true);
  });
});
