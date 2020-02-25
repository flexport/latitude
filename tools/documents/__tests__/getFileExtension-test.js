/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import getFileExtension from "../getFileExtension";

describe("getFileExtension", () => {
  const fileName1 = "file_name.pdf";
  const fileName2 = "file_name.txt.csv.pdf";
  const fileName3 = "file_name.";
  const fileName4 = "file_name";
  const fileName5 = null;

  it("should return file extension when extension exists", () => {
    const fileExension1 = getFileExtension(fileName1);
    const fileExension2 = getFileExtension(fileName2);
    expect(fileExension1).toEqual(".pdf");
    expect(fileExension2).toEqual(".pdf");
  });

  it("should return empty string when there is not file extension or fileName is null", () => {
    const fileExension3 = getFileExtension(fileName3);
    const fileExension4 = getFileExtension(fileName4);
    const fileExension5 = getFileExtension(fileName5);
    expect(fileExension3).toEqual("");
    expect(fileExension4).toEqual("");
    expect(fileExension5).toEqual("");
  });
});
