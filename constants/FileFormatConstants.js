/**
 * TEAM: customs
 *
 * @flow strict
 */

export type FileFormatType = $Keys<typeof FileFormat>;

const FileFormat = Object.freeze({
  PDF: "PDF",
  IMAGE: "IMAGE",
  CSV: "CSV",
  EXCEL: "EXCEL",
  OTHER: "OTHER",
});

export default FileFormat;
