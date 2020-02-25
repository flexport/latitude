/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState, useEffect, useRef} from "react";
import Dropzone from "react-dropzone";
import {CSSTransition} from "react-transition-group";
import {
  css,
  StyleSheet,
  margin,
  padding,
  deprecatedPaddingSizeConstants,
} from "../styles";
import Button from "../button/Button";
import GraphicIcon from "../GraphicIcon";
import Icon from "../Icon";
import Text from "../Text";
import TextLinkAction from "../TextLinkAction";
import DeprecatedVerticalGroup from "../DeprecatedVerticalGroup";
import PdfViewer from "./PdfViewer";
import Portal from "../Portal";
import Toast from "../toast/Toast";
import colors from "../colors";

export type ServerState = "waiting" | "uploading" | "deleting" | "error";

type Props = {|
  /** If null, show the upload screen, otherwise show the document preview */
  +document: ?File,
  /** Called when a document is dropped on the upload screen, or when a document is deleted */
  +onChange: (?File) => void,
  /** Controls the toast notifications around uploading and deleting files */
  +serverState: ServerState,
  /** Called when the user flags that they have no file to upload */
  +onNoFileAvailableUpdate?: boolean => void,
  /** Flag for whether or not the user has a file to upload */
  +noFileAvailable?: boolean,
  /** Flag for whether or not user can delete the file */
  +canDeleteDocument?: boolean,
|};

/**
 * @short Controlled component for uploading and previewing PDF documents
 * @brandStatus V2
 * @status Beta
 * @category Documents
 *
 * The document uploader provides a `File` object to the `onChange` handler when a user drops a file
 * or selects a file from the file picker. This is a controlled component, so it is the responsibility
 * of the caller to set the `document` prop to the `File` returned from `onChange`. It is also the
 * responsibility of the caller to notify the component about the upload status of the document through
 * the `serverState` prop. Changing this prop will show appropriate toast notifications to the user.
 */
export default function DocumentUploader({
  document,
  onChange,
  serverState,
  onNoFileAvailableUpdate,
  noFileAvailable,
  canDeleteDocument,
}: Props) {
  const [isDragged, setIsDragged] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [deletedDocument, setDeletedDocument] = useState();
  const prevServerState = usePrevious(serverState);
  useEffect(() => {
    if (serverState !== "waiting") {
      setShowToast(true);
    }

    if (serverState === "waiting" || serverState === "error") {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [serverState]);

  let message = "";
  switch (serverState) {
    case "waiting":
      if (prevServerState === "uploading") {
        message = `Uploaded ${document ? document.name : ""}`;
      } else if (prevServerState === "deleting") {
        message = `Deleted ${deletedDocument ? deletedDocument.name : ""}`;
      }
      break;
    case "uploading":
      message = `Uploading ${document ? document.name : ""}...`;
      break;
    case "deleting":
      message = `Deleting ${deletedDocument ? deletedDocument.name : ""}...`;
      break;
    case "error":
      if (prevServerState === "uploading") {
        message = `Error uploading ${document ? document.name : ""}`;
      } else if (prevServerState === "deleting") {
        message = `Error deleting ${
          deletedDocument ? deletedDocument.name : ""
        }`;
      } else {
        message = "Unknown error";
      }
      break;
    default:
      throw new Error(`Unknown serverState ${serverState}`);
  }
  const intent = serverState !== "error" ? "success" : "danger";

  return (
    <div className={css(styles.container)}>
      <CSSTransition
        in={showToast}
        unmountOnExit={true}
        classNames={{
          enter: css(styles.toastEnter),
          enterActive: css(styles.toastEnterActive),
          exit: css(styles.toastExit),
          exitActive: css(styles.toastExitActive),
        }}
        timeout={300}
      >
        <Portal key="toast">
          <div className={css(styles.toastContainer)}>
            <Toast message={message} intent={intent} />
          </div>
        </Portal>
      </CSSTransition>
      {document ? (
        <div className={css(styles.pdfContainer)}>
          <PdfViewer pdf={document} />
          {canDeleteDocument ? (
            <div className={css(styles.deleteButtonPosition)}>
              <Button
                onClick={() => {
                  setDeletedDocument(document);
                  onChange(null);
                }}
                intent="danger"
              >
                Delete document
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <Dropzone
          className={css(
            styles.dropContainer,
            !onNoFileAvailableUpdate && styles.pointer
          )}
          onDragEnter={() => {
            setIsDragged(true);
          }}
          onDrop={files => {
            onChange(files[0]);
            setIsDragged(false);
          }}
          onDragLeave={() => {
            setIsDragged(false);
          }}
          style={
            isDragged
              ? {
                  border: "solid",
                  borderWidth: "3px",
                  borderColor: colors.blue30,
                }
              : {}
          }
          disablePreview={true}
          disableClick={!!onNoFileAvailableUpdate}
        >
          {onNoFileAvailableUpdate ? (
            ({open}) => (
              <div className={css(styles.body)}>
                {noFileAvailable ? (
                  <DeprecatedVerticalGroup spacing="l" crossAlign="center">
                    <Icon iconName="cancel" customSize={64} color="grey40" />
                    <div className={css(margin.t.xl)}>
                      <Text scale="headline" color="grey40">
                        No File Uploaded
                      </Text>
                    </div>
                    <Button
                      onClick={() => {
                        onNoFileAvailableUpdate(false);
                      }}
                      intent="basic"
                    >
                      I have a file to digitize now
                    </Button>
                  </DeprecatedVerticalGroup>
                ) : (
                  <DeprecatedVerticalGroup spacing="l" crossAlign="center">
                    <GraphicIcon icon="document_add" width={180} />
                    <Button
                      onClick={open}
                      intent="basic"
                      kind="hollow"
                      label="Click here to upload"
                    />
                    <Text>Or drag and drop files into this area</Text>
                    <TextLinkAction
                      onClick={() => {
                        onNoFileAvailableUpdate(true);
                      }}
                      weight="bold"
                    >
                      {"I don't have a file to upload"}
                    </TextLinkAction>
                  </DeprecatedVerticalGroup>
                )}
              </div>
            )
          ) : (
            <div className={css(styles.body)}>
              <GraphicIcon icon="document_add" width={180} />
              <Text>Drag and drop files or</Text>
              <div className={css(padding.t.m)}>
                <Button
                  label="Click here to upload"
                  intent="basic"
                  kind="hollow"
                />
              </div>
            </div>
          )}
        </Dropzone>
      )}
    </div>
  );
}

function usePrevious<T>(value: T) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  dropContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey10,
    width: "100%",
    height: "100%",
  },
  pointer: {
    cursor: "pointer",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pdfContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  deleteButtonPosition: {
    position: "absolute",
    bottom: deprecatedPaddingSizeConstants.m,
    left: deprecatedPaddingSizeConstants.m,
  },
  toastContainer: {
    position: "fixed",
    top: deprecatedPaddingSizeConstants.m,
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
  },
  toastEnter: {
    opacity: 0,
    transform: "translateX(-64px)",
  },
  toastEnterActive: {
    opacity: 1,
    transform: "translateX(0)",
    transition: "all 0.3s cubic-bezier(.42,0,.58,1)",
  },
  toastExit: {
    opacity: 1,
    transform: "translateX(0)",
  },
  toastExitActive: {
    opacity: 0,
    transform: "translateX(48px)",
    transition: "all 0.3s cubic-bezier(.42,0,.58,1)",
  },
});
