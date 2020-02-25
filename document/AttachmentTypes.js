/**
 * TEAM: squad_tools
 *
 * @flow strict
 */

import {type FileFormatType} from "../constants/FileFormatConstants";

export type AttachmentType = {|
  +localId: string,
  +fileName: string,
  +format: FileFormatType,
  +documentType: ?string,
  +description: ?string,
  +localFile: File,
  +previewURL: string,
  +error: ?string,
  +uploaded: boolean,
|};
