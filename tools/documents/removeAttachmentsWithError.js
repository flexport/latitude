/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import type {AttachmentType} from "../../document/AttachmentTypes";

export default function removeAttachmentsWithError(
  attachments: $ReadOnlyArray<AttachmentType>
): Array<AttachmentType> {
  return attachments.filter(attachment => !attachment.error);
}
