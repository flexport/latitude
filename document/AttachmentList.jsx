/**
 * TEAM: frontend_infra
 *
 * @flow
 */

/* eslint-disable flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import {ENTER} from "../constants/interactions/KeyCodes";
import latitudeColors from "../colors";
import {
  deprecatedMarginSizeConstants,
  deprecatedPaddingSizeConstants,
} from "../styles/deprecatedWhitespace";
import groupBy from "../tools/betterGroupBy";
import getFileExtension from "../tools/documents/getFileExtension";
import getFileNameWithoutExtension from "../tools/documents/getFileNameWithoutExtension";
import consolidateFileExtension from "../tools/documents/consolidateFileExtension";
import validateFileName from "../tools/documents/validateFileName";
import {documentsT as t} from "../config/I18n";
import IconButton from "../button/IconButton";
import Icon from "../Icon";
import Text from "../Text";
import Flex from "../Flex";
import TextInput from "../TextInput";
import InputError from "../InputError";
import HelpTooltip from "../HelpTooltip";
import SearchableSelectInput from "../select/SearchableSelectInput";
import FileFormat from "../constants/FileFormatConstants";
import type {AttachmentType} from "./AttachmentTypes";

type Props = {|
  +attachments: $ReadOnlyArray<AttachmentType>,
  +showPreview: boolean,
  +showDocumentTypeSelector: boolean,
  +showDescriptionEditor: boolean,
  +fileNameEditable: boolean,
  +documentTypeList: $ReadOnlyArray<{+name: string, +value: string}>,
  +onAttachmentsChange: (attachments: $ReadOnlyArray<AttachmentType>) => void,
|};

type State = {|
  +editingFileName: boolean,
  +editingFileId: ?string,
|};

export default class AttachmentList extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editingFileName: false,
      editingFileId: null,
    };
  }

  findAttachmentIndex = (localId: string) =>
    this.props.attachments.findIndex(item => item.localId === localId);

  handleAttachmentDelete = (attachment: AttachmentType) => {
    const {attachments, onAttachmentsChange} = this.props;
    const attachmentList = Array.from(attachments);
    attachmentList.splice(this.findAttachmentIndex(attachment.localId), 1);

    onAttachmentsChange(attachmentList);
  };

  handleDescriptionChange = (
    description: string,
    attachment: AttachmentType
  ) => {
    const {attachments, onAttachmentsChange} = this.props;
    const index = this.findAttachmentIndex(attachment.localId);
    const attachmentList = Array.from(attachments);
    // replace the attachment in the attachment list with updated documentType
    attachmentList.splice(index, 1, {
      ...attachments[index],
      description,
    });

    // update the attachment list in FileUploader
    onAttachmentsChange(attachmentList);
  };

  handleFileNameChange = (fileName: string, attachment: AttachmentType) => {
    const {attachments, onAttachmentsChange} = this.props;
    const index = this.findAttachmentIndex(attachment.localId);
    const attachmentList = Array.from(attachments);

    const newFileName = consolidateFileExtension(fileName, attachment.fileName);
    // replace the attachment in the attachment list with updated documentType
    attachmentList.splice(index, 1, {
      ...attachments[index],
      fileName: [newFileName, getFileExtension(attachment.fileName)].join(""),
    });

    // update the attachment list in FileUploader
    onAttachmentsChange(attachmentList);
  };

  handleDocumentTypeSelect = (type: ?string, attachment: AttachmentType) => {
    const {attachments, onAttachmentsChange} = this.props;
    const index = this.findAttachmentIndex(attachment.localId);
    const attachmentList = Array.from(attachments);
    // replace the attachment in the attachment list with updated documentType
    attachmentList.splice(index, 1, {
      ...attachments[index],
      documentType: type,
    });

    // update the attachment list in FileUploader
    onAttachmentsChange(attachmentList);
  };

  render() {
    const {
      attachments,
      showPreview,
      showDocumentTypeSelector,
      showDescriptionEditor,
      fileNameEditable,
      documentTypeList,
    } = this.props;
    const {editingFileName, editingFileId} = this.state;

    if (attachments.length === 0) {
      return null;
    }

    return (
      <>
        <Flex flexDirection="row" gap={20}>
          {attachments.map(attachment => {
            if (attachment.error) {
              return null;
            }
            const isFileNameValid = validateFileName(attachment.fileName);
            return (
              <div key={attachment.localId}>
                {showPreview ? <FilePreview attachment={attachment} /> : null}
                <div className={css(styles.nameTag)}>
                  <div className={css(styles.fileName)}>
                    {fileNameEditable &&
                    editingFileName &&
                    editingFileId === attachment.localId ? (
                      <InputError
                        errorText={t("Invalid File Name")}
                        showError={!isFileNameValid}
                      >
                        <TextInput
                          value={getFileNameWithoutExtension(
                            attachment.fileName
                          )}
                          onChange={fileName =>
                            this.handleFileNameChange(fileName, attachment)
                          }
                          onBlur={() => {
                            this.setState({
                              editingFileName: false,
                              editingFileId: null,
                            });
                          }}
                          onKeyDown={(e: KeyboardEvent) => {
                            if (e.keyCode === ENTER) {
                              this.setState({
                                editingFileName: false,
                                editingFileId: null,
                              });
                            }
                          }}
                          size="s"
                          suffix={getFileExtension(attachment.fileName)}
                          isInvalid={!isFileNameValid}
                        />
                      </InputError>
                    ) : (
                      <Text
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {attachment.fileName}
                      </Text>
                    )}
                  </div>
                  <Flex justifyContent="flex-end" flexWrap="nowrap" gap={2}>
                    {fileNameEditable ? (
                      <IconButton
                        type="button"
                        kind="blank"
                        size="s"
                        iconName="pencil"
                        onClick={() => {
                          this.setState({
                            editingFileName: true,
                            editingFileId: attachment.localId,
                          });
                        }}
                      />
                    ) : null}
                    <IconButton
                      type="button"
                      kind="blank"
                      size="s"
                      iconName="trash"
                      onClick={() => this.handleAttachmentDelete(attachment)}
                    />
                  </Flex>
                </div>
                <Flex flexDirection="column" gap={12}>
                  {showDocumentTypeSelector ? (
                    <SearchableSelectInput
                      value={attachment.documentType}
                      placeholder={t("Select document type")}
                      options={documentTypeList.map(type => ({
                        label: type.name,
                        value: type.value,
                      }))}
                      onChange={type =>
                        this.handleDocumentTypeSelect(type, attachment)
                      }
                    />
                  ) : null}
                  {showDescriptionEditor ? (
                    <TextInput
                      placeholder={
                        attachment.format === FileFormat.IMAGE
                          ? t("Optional photo caption...")
                          : t("Optional memo...")
                      }
                      value={attachment.description || ""}
                      onChange={description =>
                        this.handleDescriptionChange(description, attachment)
                      }
                    />
                  ) : null}
                </Flex>
              </div>
            );
          })}
        </Flex>
        <div className={css(styles.errorMessage)}>
          {[...groupBy(attachments, attachment => attachment.error)].map(
            ([error, attachments]) => (
              <div key={error}>
                {attachments.length > 1 ? (
                  <Flex alignItems="center">
                    <Text color="red40">
                      {error}: {attachments.length} files failed to upload.
                    </Text>
                    <HelpTooltip
                      alignment="center"
                      size="s"
                      maxWidth="100%"
                      iconColor="red30"
                      text={`${attachments.map(a => a.fileName).join("\n")}`}
                    />
                  </Flex>
                ) : (
                  <Text color="red40">
                    {t("{{fileName}} failed to upload.", {
                      fileName: attachments[0].fileName,
                    })}{" "}
                    {error}
                  </Text>
                )}
              </div>
            )
          )}
        </div>
      </>
    );
  }
}

const PdfPreview = React.lazy(() =>
  import(/* webpackChunkName: "document_PdfPreview" */ "../document/PdfPreview")
);

function FilePreview({attachment}: {|+attachment: AttachmentType|}) {
  switch (attachment.format) {
    case FileFormat.IMAGE:
      return (
        <div className={css(styles.previewContainer)}>
          <img
            className={css(styles.imagePreview)}
            src={attachment.previewURL}
            alt={attachment.fileName}
          />
        </div>
      );
    case FileFormat.PDF:
      return (
        <React.Suspense
          fallback={
            <div className={css(styles.previewContainer)}>
              <Flex flexDirection="column" alignItems="center">
                <Icon iconName="doc" size="xl" color="white" />
                <Text color="white">{t("Loading")}</Text>
              </Flex>
            </div>
          }
        >
          <PdfPreview attachment={attachment} />
        </React.Suspense>
      );
    default:
      /** Currently, we only support image and PDF file preview.
       * Idealy, EXCEl and CSV files should have previews if reliable
       * libraries become available.
       */
      return (
        <div className={css(styles.previewContainer)}>
          <Flex flexDirection="column" alignItems="center">
            <Icon iconName="doc" size="xl" color="white" />
            <Text color="white">{t("Preview not supported")}</Text>
          </Flex>
        </div>
      );
  }
}

export const documentPreviewWidth = 170;
export const documentPreviewHeight = 170;
export const previewContainerWidth = 194;

const styles = StyleSheet.create({
  nameTag: {
    display: "inline-flex",
    alignItems: "stretch",
    width: previewContainerWidth,
    height: "32px",
    backgroundColor: latitudeColors.grey10,
    border: `2px solid ${latitudeColors.grey30}`,
    paddingLeft: deprecatedPaddingSizeConstants.m,
    marginBottom: deprecatedMarginSizeConstants.m,
  },
  errorMessage: {
    marginTop: deprecatedMarginSizeConstants.m,
  },
  fileName: {
    display: "inline-flex",
    minWidth: 128,
    padding: `${deprecatedPaddingSizeConstants.s} 0`,
    alignItems: "center",
    flexGrow: 0,
  },
  previewContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    margin: "auto",
    overflow: "hidden",
    width: previewContainerWidth,
    height: documentPreviewHeight,
    backgroundColor: latitudeColors.grey50,
    padding: deprecatedPaddingSizeConstants.m,
  },
  imagePreview: {
    position: "absolute",
    minWidth: documentPreviewWidth,
    minHeight: documentPreviewHeight,
    /**
     * max width and height here combined with min width and height to enlarge
     * the image a little and cover the container area.
     */
    maxWidth: 300,
    maxHeight: 300,
  },
});
