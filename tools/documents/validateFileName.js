/**
 * TEAM: squad_tools
 *
 * @flow strict
 */

const fileNameRegex = new RegExp("^.+\\.[a-zA-Z\\d]+$");

export default function validateFileName(fileName: ?string): boolean {
  if (fileName == null) return false;

  return fileNameRegex.test(fileName);
}
