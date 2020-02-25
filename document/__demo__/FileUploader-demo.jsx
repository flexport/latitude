/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState, type Node} from "react";
import {type DemoFile, bool} from "../../demoTypes";
import FileUploader from "../FileUploader";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <FileUploaderShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs: {
        showDropzone: bool(true),
        showPreview: bool(true),
        fileNameEditable: bool(true),
        singleFileUpload: bool(false),
        showDescriptionEditor: bool(true),
      },
    },
  ],
};

type Props = {|
  +elementToCodeFn: Node => void,
  +demoProps: {|
    +showDropzone: boolean,
    +showPreview: boolean,
    +fileNameEditable: boolean,
    +singleFileUpload: boolean,
    +showDescriptionEditor: boolean,
  |},
|};

export function FileUploaderShim({elementToCodeFn, demoProps}: Props) {
  const [attachments, setAttachments] = useState([]);
  const element = (
    <FileUploader
      {...demoProps}
      attachments={attachments}
      onChange={attachments => setAttachments(attachments)}
      documentTypeList={[
        {name: "AMS/ACI Worksheet", value: "ams_aci_worksheet"},
        {
          name: "Air Certification for Safe Transport",
          value: "air_certification_for_safe_transport",
        },
        {name: "Bill of Lading", value: "bill_of_lading"},
        {
          name: "Customs Entry Summary (7501)",
          value: "customs_entry_summary_7501",
        },
        {name: "ISF Worksheet", value: "isf_worksheet"},
      ]}
    />
  );
  if (elementToCodeFn) {
    elementToCodeFn(element);
  }

  return <div>{element}</div>;
}
export default demos;
