/**
 * TEAM: frontend_infra
 *
 * @flow
 */
import React from "react";
import {shallow} from "enzyme";
import FileUploader from "../FileUploader";

const documentTypeList = [
  {name: "Document Type A", value: "document_type_a"},
  {name: "Document Type B", value: "document_type_b"},
  {name: "Document Type E", value: "document_type_e"},
];
describe("FileUploader", () => {
  it("renders simple FileUploader Button", () => {
    const component = shallow(
      <FileUploader onChange={() => {}} documentTypeList={documentTypeList} />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders FileUploader with dropzone when showDropzone={true}", () => {
    const component = shallow(
      <FileUploader
        showDropzone={true}
        onChange={() => {}}
        documentTypeList={documentTypeList}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
