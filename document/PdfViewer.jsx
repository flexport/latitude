/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import React, {useEffect, useMemo} from "react";

type Props = {|+pdf: File | string|};

/**
 * @short Previews PDF documents from `File` objects or URLs
 * @brandStatus V2
 * @status Beta
 * @category Documents
 *
 * This component uses the browser's native PDF renderer by opening the PDF in an `iframe`.
 */
export default function PdfViewer({pdf}: Props) {
  const url = useMemo(
    () => (pdf instanceof File ? URL.createObjectURL(pdf) : pdf),
    [pdf]
  );
  useEffect(() => {
    if (pdf instanceof File) URL.revokeObjectURL(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdf]);
  return (
    <iframe
      title={pdf instanceof File ? pdf.name : pdf}
      src={url}
      style={{width: "100%", height: "100%"}}
    />
  );
}
