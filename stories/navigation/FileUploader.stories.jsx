/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs} from "@storybook/addon-knobs";
import {StyleSheet, css} from "aphrodite";
import sections from "../sections";

import Text from "../../Text";
import Flex from "../../Flex";
import FileUploader from "../../document/FileUploader";

const stories = storiesOf(`${sections.dataEntry}/File Uploader`, module);

stories.addDecorator(withKnobs);
stories.add("File Uploader Button", () => (
  <div className={css(styles.uploaderDemoContainer)}>
    <Flex flexDirection="column" gap={40}>
      <Text>Simple FileUploader Button</Text>
      <FileUploaderShim
        documentTypeList={[
          {name: "Document Type A", value: "document_type_a"},
          {name: "Document Type B", value: "document_type_b"},
          {name: "Document Type E", value: "document_type_e"},
        ]}
      />

      <br />
      <Text>FileUploader Button - Single File Upload</Text>
      <FileUploaderShim
        singleFileUpload={true}
        documentTypeList={[
          {name: "Document Type A", value: "document_type_a"},
          {name: "Document Type B", value: "document_type_b"},
          {name: "Document Type E", value: "document_type_e"},
        ]}
      />

      <br />
      <Text>FileUploader Button with preview, and editable file name</Text>
      <FileUploaderShim
        showPreview={true}
        fileNameEditable={true}
        documentTypeList={[
          {name: "Document Type A", value: "document_type_a"},
          {name: "Document Type B", value: "document_type_b"},
          {name: "Document Type E", value: "document_type_e"},
        ]}
      />
    </Flex>
  </div>
));

stories.add("File Uploader Dropzone", () => (
  <div className={css(styles.uploaderDemoContainer)}>
    <Flex flexDirection="column" gap={40}>
      <Text>Simple FileUploader Dropzone</Text>
      <FileUploaderShim
        showDropzone={true}
        documentTypeList={[
          {name: "Document Type A", value: "document_type_a"},
          {name: "Document Type B", value: "document_type_b"},
          {name: "Document Type E", value: "document_type_e"},
        ]}
      />

      <br />
      <Text>FileUploader Dropzone - Single File Upload</Text>
      <FileUploaderShim
        showDropzone={true}
        singleFileUpload={true}
        documentTypeList={[
          {name: "Document Type A", value: "document_type_a"},
          {name: "Document Type B", value: "document_type_b"},
          {name: "Document Type E", value: "document_type_e"},
        ]}
      />

      <br />
      <Text>FileUploader Dropzone with preview, and editable file name</Text>
      <FileUploaderShim
        showDropzone={true}
        showPreview={true}
        fileNameEditable={true}
        documentTypeList={[
          {name: "Document Type A", value: "document_type_a"},
          {name: "Document Type B", value: "document_type_b"},
          {name: "Document Type E", value: "document_type_e"},
        ]}
      />
    </Flex>
  </div>
));

type Props = {|
  +showDropzone?: boolean,
  +showPreview?: boolean,
  +singleFileUpload?: boolean,
  +fileNameEditable?: boolean,
  +documentTypeList: $ReadOnlyArray<{+name: string, +value: string}>,
|};

function FileUploaderShim({
  showDropzone,
  showPreview,
  singleFileUpload,
  fileNameEditable,
  documentTypeList,
}: Props) {
  const [attachments, setAttachments] = React.useState([]);
  return (
    <FileUploader
      attachments={attachments}
      showDropzone={showDropzone}
      showPreview={showPreview}
      singleFileUpload={singleFileUpload}
      fileNameEditable={fileNameEditable}
      documentTypeList={documentTypeList}
      onChange={attachments => setAttachments(attachments)}
    />
  );
}

const styles = StyleSheet.create({
  uploaderDemoContainer: {
    width: 700,
  },
});
