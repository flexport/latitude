/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import * as React from "react";
import {mount} from "enzyme";
import Breadcrumbs from "../Breadcrumbs";

function StatefulBreadcrumb({items}: {|+items: Array<string>|}) {
  const [depth, setDepth] = React.useState(items.length);

  return (
    <Breadcrumbs
      items={items
        .map((val, index) => ({
          onClick: () => setDepth(index),
          content: val,
        }))
        .slice(0, depth)}
    />
  );
}

function mountBreadcrumbs(propOverrides: {} = {}) {
  const defaultProps = {items: []};
  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  const mergedProps = {...defaultProps, ...propOverrides};
  return mount(<Breadcrumbs {...mergedProps} />);
}

function mountStatefulBreadcrumbs(propOverrides: {} = {}) {
  const defaultProps = {items: []};
  // $FlowUpgradeFixMe(0.110.1 -> 0.111.1)
  const mergedProps = {...defaultProps, ...propOverrides};
  return mount(<StatefulBreadcrumb {...mergedProps} />);
}

describe("Breadcrumbs", () => {
  it("can render breadcrumbs", () => {
    const comp = mountBreadcrumbs({items: [{content: "Simple"}]});

    expect(comp.length).toEqual(1);
  });
  it("can render breadcrumbs with 'element' type content", () => {
    const comp = mountBreadcrumbs({
      items: [{content: <div id="breadcrumb-test" />}],
    });

    expect(comp.find("#breadcrumb-test").length).toEqual(1);
  });
  it("href prop is passed correctly for breadcrumbs", () => {
    const url = "www.wikipedia.com";
    const comp = mountBreadcrumbs({
      items: [{content: "test link", href: url}],
    });

    expect(comp.find("a").prop("href")).toEqual(url);
  });
  it("correct number of breadcrumbs are rendered", () => {
    const comp = mountStatefulBreadcrumbs({
      items: ["Breads", "Flours", "Buckwheat", "Origin"],
    });

    expect(comp.find("a").length).toEqual(4);
  });
  it("first breadcrumb is correct", () => {
    const comp = mountStatefulBreadcrumbs({
      items: ["Breads", "Flours", "Buckwheat", "Origin"],
    });

    expect(
      comp
        .find("a")
        .at(0)
        .text()
    ).toEqual("Breads");
  });
  it("last breadcrumb is correct", () => {
    const comp = mountStatefulBreadcrumbs({
      items: ["Breads", "Flours", "Buckwheat", "Origin"],
    });

    expect(
      comp
        .find("a")
        .at(3)
        .text()
    ).toEqual("Origin");
  });
  it("breadcrumbs are in the right order", () => {
    const items = ["Breads", "Flours", "Buckwheat", "Origin"];
    const comp = mountStatefulBreadcrumbs({items});

    comp.find("a").forEach((node, index) => {
      expect(node.text()).toEqual(items[index]);
    });
  });
  it("clicking breadcrumbs modifies depth", () => {
    const items = ["Breads", "Flours", "Buckwheat", "Origin"];
    const comps = items.map(() =>
      mountStatefulBreadcrumbs({
        items: ["Breads", "Flours", "Buckwheat", "Origin"],
      })
    );

    comps.forEach((comp, index) => {
      comp
        .find("a")
        .at(index)
        .simulate("click");

      expect(comp.find("a").length).toEqual(index);
    });
  });
});
