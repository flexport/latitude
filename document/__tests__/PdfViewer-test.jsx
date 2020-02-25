/**
 * TEAM: frontend_infra
 *
 * @flow
 */
import React from "react";
import {shallow} from "enzyme";
import PdfViewer from "../PdfViewer";

describe("DocumentUploader", () => {
  it("renders", () => {
    expect(shallow(<PdfViewer pdf="" />)).toMatchSnapshot();
  });
});
