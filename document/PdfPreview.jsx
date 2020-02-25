/**
 * TEAM: frontend_infra
 *
 * @flow
 */

/* eslint-disable flexport/no-unused-aphrodite-styles */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {Document, Page, pdfjs} from "react-pdf";
import latitudeColors from "../colors";
import {deprecatedPaddingSizeConstants} from "../styles/deprecatedWhitespace";
import type {AttachmentType} from "./AttachmentTypes";
import {
  documentPreviewWidth,
  previewContainerWidth,
  documentPreviewHeight,
} from "./AttachmentList";

/**
 * TODO(zyang): Cannot import react-pdf from `react-pdf/dist/entry.webpack` because
 * devbox does not allow cross-origin access to pdf.worker.js in webpack. The following
 * is a work around it, But adds 90kb of extra import to the compressed JS file.
 * Fix the cross-orgin error and remove the following to decrease the added size.
 * This is to set up pdf.worker.js correctly for react-pdf
 * See "Create React App" section here:
 * https://github.com/wojtekmaj/react-pdf/wiki/Known-issues
 */
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

export default function PdfPreview({
  attachment,
}: {|
  +attachment: AttachmentType,
|}) {
  return (
    <Document className={css(styles.document)} file={attachment.previewURL}>
      <Page width={documentPreviewWidth} pageNumber={1} />
    </Document>
  );
}

const styles = StyleSheet.create({
  document: {
    width: previewContainerWidth,
    height: documentPreviewHeight,
    margin: "auto",
    overflow: "hidden",
    backgroundColor: latitudeColors.grey50,
    paddingTop: deprecatedPaddingSizeConstants.m,
    paddingLeft: deprecatedPaddingSizeConstants.m,
  },
});
