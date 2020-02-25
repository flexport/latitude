/**
 * TEAM: frontend_infra
 * @flow
 */

/* eslint-disable flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import Dropzone from "react-dropzone";

import {documentsT as t} from "../config/I18n";

import {whitespaceSizeConstants} from "../styles/whitespace";
import latitudeColors from "../colors";
import Flex from "../Flex";
import Loader from "../Loader";
import Button from "../button/Button";
import Text from "../Text";
import AttachmentList from "./AttachmentList";
import type {AttachmentType} from "./AttachmentTypes";

import createAttachmentsFromFiles from "../tools/documents/createAttachmentsFromFiles";
import getScaledImageForAttachment from "../tools/documents/getScaledImageForAttachment";
import validateFileOfAttachment from "../tools/documents/validateFileOfAttachment";
import removeAttachmentsWithError from "../tools/documents/removeAttachmentsWithError";

type Props = {|
  /** List of files uploaded */
  +attachments?: $ReadOnlyArray<AttachmentType>,
  /** Displays a Dropzone around the FileUploader Button */
  +showDropzone?: boolean,
  /** Displays description editor for each file */
  +showDescriptionEditor?: boolean,
  /**
   * Displays thumbnail preview for uploaded files
   * Currently, preview for IMAGE and PDF formats are supported
   */
  +showPreview?: boolean,
  /** FileUploader saves only 1 file (the latest) from uploaded files */
  +singleFileUpload?: boolean,
  /** Allows user to edit file names */
  +fileNameEditable?: boolean,
  /**
   * This list populates the document type selector for each file.
   * When documentTypeList contains only 1 option, it is set as the default document
   * type for files and document type selector will not be displayed.
   */
  +documentTypeList: $ReadOnlyArray<{+name: string, +value: string}>,
  /** Called when files are uploaded from the dropzone or the file selector */
  +onChange: ($ReadOnlyArray<AttachmentType>) => void,
  /** whether the uploader is disabled or not */
  +disabled?: boolean,
|};

/**
 * @short Uncontrolled component for bulk uploading and previewing files
 * @brandStatus V3
 * @status Beta
 * @category Documents
 *
 * The fileUploader provides a list of `Attachment` objects to `onChange` handler when a user uploads
 * files. This component wraps an `Attachment` object around each `File` object that is uploaded. It
 * also renders thumbnail preview, document type selector and description selector for each file.
 * Consumer is responsible for setting `attachments` prop to the list of `Attachments` objects
 * returned from `onChange`.
 */
export default function FileUploader({
  attachments = [],
  showDropzone = false,
  showPreview = false,
  showDescriptionEditor = false,
  singleFileUpload = false,
  fileNameEditable = false,
  documentTypeList,
  onChange,
  disabled = false,
}: Props) {
  const handleFileInput = (event: SyntheticInputEvent<EventTarget>): void => {
    if (!event.target || !event.target.files) return;
    handleFileUpload(Array.from(event.target.files));
  };

  const handleFileUpload = (files: $ReadOnlyArray<File>) => {
    let uploadedAttachments = createAttachmentsFromFiles(
      files,
      documentTypeList
    );

    uploadedAttachments = uploadedAttachments
      .map(attachment =>
        // Scale Image Files
        getScaledImageForAttachment(attachment)
      )
      .map(attachment =>
        // Validate uploaded files
        validateFileOfAttachment(attachment)
      );

    // Remove files with errors from last upload
    let attachmentList = removeAttachmentsWithError(attachments);

    if (singleFileUpload) {
      // For single file upload, only save the last file uploaded
      attachmentList = [uploadedAttachments[uploadedAttachments.length - 1]];
    } else {
      // Concat newly-uploaded files to previously validated files
      attachmentList = attachmentList.concat(uploadedAttachments);
    }
    onChange(attachmentList);
  };

  const uploadingCount = attachments.filter(a => a.uploaded === false).length;
  const isUploading = uploadingCount > 0;

  // Disable dropzone while uploading, and display loader
  const dropzone = isUploading ? (
    <Dropzone className={css(styles.dropzone)} disabled={true}>
      <Flex alignItems="center" justifyContent="center">
        <Loader loaded={false} size={30} />
        <Text>
          {t("Uploading {{count}} files", {count: uploadingCount.toString()})}
        </Text>
      </Flex>
    </Dropzone>
  ) : (
    <Dropzone
      onDrop={handleFileUpload}
      className={css(styles.dropzone)}
      disabled={disabled}
    >
      <Flex alignItems="center" justifyContent="center">
        <Text>{t("Drag and drop a file or")}</Text>
        <Button
          label={t("Click to upload")}
          intent="basic"
          type="submit"
          onClick={() => {}}
          disabled={disabled}
        />
      </Flex>
    </Dropzone>
  );

  return (
    <div className={css(styles.uploaderContainer)}>
      {showDropzone ? dropzone : <FileInputButton onClick={handleFileInput} />}
      <AttachmentList
        attachments={attachments}
        showPreview={showPreview}
        showDescriptionEditor={showDescriptionEditor}
        showDocumentTypeSelector={documentTypeList.length > 1}
        fileNameEditable={fileNameEditable}
        documentTypeList={documentTypeList}
        onAttachmentsChange={onChange}
      />
    </div>
  );
}

type FileInputButtonProps = {|
  +onClick?: (event: SyntheticInputEvent<EventTarget>) => mixed,
|};

function FileInputButton({onClick}: FileInputButtonProps) {
  const fileInput = React.useRef();
  return (
    <div className={css(styles.fileInputButton)}>
      <input
        type="file"
        ref={fileInput}
        onChange={onClick}
        style={{display: "none"}}
        multiple={true}
      />
      <Button
        label={t("Click to upload")}
        intent="basic"
        type="submit"
        onClick={_ => fileInput.current && fileInput.current.click()}
      />
    </div>
  );
}

const styles = StyleSheet.create({
  uploaderContainer: {
    width: "100%",
  },
  dropzone: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: whitespaceSizeConstants.l,
    width: "100%",
    height: 72,
    boxSizing: "border-box",
    backgroundColor: latitudeColors.grey10,
    marginBottom: whitespaceSizeConstants.l,
  },
  fileInputButton: {
    marginBottom: whitespaceSizeConstants.m,
  },
});
