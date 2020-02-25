/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

import FileFormat, {
  type FileFormatType,
} from "../constants/FileFormatConstants";

// categorized uploaded files by their extension
export default function getFileFormat(file: File): FileFormatType {
  if (file.type.indexOf("image/") === 0) {
    return FileFormat.IMAGE;
  } else if (file.type === "application/pdf") {
    return FileFormat.PDF;
  } else if (file.type === "application/ms-excel") {
    return FileFormat.EXCEL;
  } else if (file.type === "text/csv") {
    return FileFormat.CSV;
  }

  return FileFormat.OTHER;
}
