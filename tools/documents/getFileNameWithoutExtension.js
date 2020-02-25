/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
export default function getFileNameWithoutExtension(fileName: ?string) {
  if (fileName == null) {
    return "";
  }

  /** If fileName="file.name.txt.csv.pdf", this will return "file.name.text.csv" */
  const fileNameParts = fileName.split(".");
  if (fileNameParts.length > 1) {
    fileNameParts.splice(fileNameParts.length - 1, 1);
  }
  return fileNameParts.join(".");
}
