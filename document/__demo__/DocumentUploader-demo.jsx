/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState, type Node} from "react";
import {type DemoFile, list} from "../../demoTypes";
import DocumentUploader, {type ServerState} from "../DocumentUploader";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <DocumentUploaderShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs: {
        serverState: list(
          [
            {label: "waiting", value: "waiting"},
            {label: "uploading", value: "uploading"},
            {label: "deleting", value: "deleting"},
            {label: "error", value: "error"},
          ],
          false,
          false,
          v => v,
          "waiting"
        ),
      },
    },
  ],
};

type Props = {|
  +elementToCodeFn: Node => void,
  +demoProps: {serverState: ServerState},
|};

export function DocumentUploaderShim({elementToCodeFn, demoProps}: Props) {
  const [document, setDocument] = useState();
  const element = (
    <DocumentUploader
      document={document}
      onChange={setDocument}
      // $FlowFixMe(ctan) Flow issue from upgrade (1.111.3 => 1.115.0)
      {...demoProps}
    />
  );
  if (elementToCodeFn) {
    elementToCodeFn(element);
  }
  return <div style={{height: 400}}>{element}</div>;
}
export default demos;
