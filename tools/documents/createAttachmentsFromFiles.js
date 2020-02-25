/**
 * TEAM: frontend_infra
 *
 * @flow strict_local
 */

import {uniqueId} from "lodash";
import type {AttachmentType} from "../../document/AttachmentTypes";
import getFileFormat from "../getFileFormat";

export default function createAttachmentsFromFiles(
  files: $ReadOnlyArray<File>,
  documentTypeList: $ReadOnlyArray<{+name: string, +value: string}>
): Array<AttachmentType> {
  return Array.from(files).map(file => ({
    // this localId is only used for interactions on the frontend, is not sent to db
    localId: uniqueId(),
    fileName: file.name,
    format: getFileFormat(file),
    /** If only 1 document type option is available, set it as default.
     * Otherwise, set to null so that user can edit using selector.
     */
    documentType:
      documentTypeList.length === 1 ? documentTypeList[0].name : null,
    description: null,
    localFile: file,
    /** react-dropzone has removed {preview} property from file objects from onDrop for version 7.0.0 onward.
     * So we should not rely on file.preview. Instead, we generate it here using createObjectURL().
     * See https://github.com/react-dropzone/react-dropzone/tree/master/examples/previews
     */
    previewURL: URL.createObjectURL(file),
    error: null,
    uploaded: false,
  }));
}
