/**
 * TEAM: frontend_infra
 *
 * @flow strict-local
 */
import type {AttachmentType} from "../../document/AttachmentTypes";
import {MAX_FILE_SIZE} from "../../constants/DocumentConstants";
import {documentsT as t} from "../../config/I18n";

// validate uploaded files: file sizes, etc.
export default function validateFileOfAttachment(
  attachment: AttachmentType
): AttachmentType {
  if (attachment.localFile.size > MAX_FILE_SIZE) {
    return {
      ...attachment,
      error: t("Cannot upload files larger than 25MB"),
    };
  }
  return attachment;
}
