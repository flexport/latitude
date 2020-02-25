/**
 * TEAM: frontend_infra
 *
 * @flow
 */
import React from "react";
import {shallow} from "enzyme";
import DocumentUploader from "../DocumentUploader";

describe("DocumentUploader", () => {
  it("renders", () => {
    expect(
      shallow(
        <DocumentUploader
          document={null}
          onChange={() => {}}
          serverState="waiting"
        />
      )
    ).toMatchSnapshot();
  });

  it("renders a delete button when canDeleteDocument is true", () => {
    const file = new File(["foo"], "foo.pdf", {
      type: "application/pdf",
    });
    const component = shallow(
      <DocumentUploader
        canDeleteDocument={true}
        document={file}
        onChange={() => {}}
        serverState="waiting"
      />
    );
    expect(
      component.find("Button").findWhere(n => n.text().includes("Delete"))
    ).toHaveLength(1);
  });

  it("does not render a delete button when canDeleteDocument is false", () => {
    const file = new File(["foo"], "foo.pdf", {
      type: "application/pdf",
    });
    const component = shallow(
      <DocumentUploader
        canDeleteDocument={false}
        document={file}
        onChange={() => {}}
        serverState="waiting"
      />
    );
    expect(
      component.find("Button").findWhere(n => n.text().includes("Delete"))
    ).toHaveLength(0);
  });
});
