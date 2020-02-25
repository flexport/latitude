/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
export default function getFileExtension(fileName: ?string) {
  if (fileName == null || fileName.split(".").length <= 1) {
    return "";
  }

  const fileNameParts = fileName.split(".");
  const extension = fileNameParts[fileNameParts.length - 1];
  return extension === "" ? extension : ".".concat(extension);
}
