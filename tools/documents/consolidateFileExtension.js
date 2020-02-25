/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import getFileExtension from "./getFileExtension";
import getFileNameWithoutExtension from "./getFileNameWithoutExtension";

/** If fileName inputted by User contains the same file extension as the
 * originalFileName, consolidate the repeated file extension.
 */
export default function consolidateFileExtension(
  fileName: string,
  originalFileName: string
): string {
  if (getFileExtension(fileName) === getFileExtension(originalFileName)) {
    return getFileNameWithoutExtension(fileName);
  }
  return fileName;
}
