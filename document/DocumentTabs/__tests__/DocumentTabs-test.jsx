/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import React from "react";
import {shallow} from "enzyme";
import DocumentTabs, {test} from "../DocumentTabs";

describe("DocumentTabs", () => {
  it("renders", () => {
    expect(
      shallow(
        <DocumentTabs
          documentNameOptions={["doc1.pdf", "doc2.pdf"].map((name, key) => ({
            name,
            key,
          }))}
          selectedKey={0}
          onSelect={() => {}}
          onAdd={() => {}}
          onDelete={() => {}}
        />
      )
    ).toMatchSnapshot();
  });
  it("calculateWidths will handle zero slices scenario", () => {
    const containerWidth = 99;
    const elementCount = 1;
    const minWidth = 100;
    const maxWidth = 100;
    expect(
      test.calculateWidths(containerWidth, minWidth, maxWidth, elementCount)
    ).toEqual({
      tabWidth: 0,
      slices: 0,
    });
  });
});
