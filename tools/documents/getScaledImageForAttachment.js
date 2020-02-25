/**
 * TEAM: frontend_infra
 *
 * @flow strict-local
 */
import type {AttachmentType} from "../../document/AttachmentTypes";
import ImageScaler from "../ImageScaler";
import FileFormat from "../../constants/FileFormatConstants";

// Scales down the localFile that are of Image format in Attachment
export default function getScaledImageForAttachment(
  attachment: AttachmentType
): AttachmentType {
  const imageScaler = new ImageScaler();
  let scaledAttachment = attachment;
  imageScaler.process(attachment.localFile, scaledFile => {
    if (attachment.format !== FileFormat.IMAGE) {
      scaledAttachment = attachment;
    } else if (!scaledFile.size) {
      /** scaling fails on some formats for some browsers */
      scaledAttachment = {...attachment, format: FileFormat.OTHER};
    } else {
      /** Replace localFile with successfully scaled image */
      scaledAttachment = {...attachment, localFile: scaledFile};
    }
  });
  return scaledAttachment;
}
