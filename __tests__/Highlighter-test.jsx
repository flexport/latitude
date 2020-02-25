/**
 * TEAM: frontend_infra
 * WATCHERS: ctan
 *
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import Highlighter from "../Highlighter";

function mountHighlighter(children: React.Node, propOverrides: {} = {}) {
  return mount(
    <Highlighter
      color="grey20"
      selectionRef={{current: null}}
      // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
      {...propOverrides}
    >
      {children}
    </Highlighter>
  );
}

describe("Highlighter", () => {
  it("can render Highlighter correctly", () => {
    const comp = mountHighlighter(<div />);

    expect(comp.length).toEqual(1);
  });
  it("can render children correctly", () => {
    const comp = mountHighlighter(
      <>
        <span />
        <span />
        <span />
      </>
    );
    expect(comp.find("span").length).toEqual(3);
  });
});
