/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import getFileNameWithoutExtension from "../getFileNameWithoutExtension";

describe("getFileNameWithoutExtension", () => {
  const fileName1 = "file_name.pdf";
  const fileName2 = "file_name.txt.csv.pdf";
  const fileName3 = "file_name.";
  const fileName4 = "file_name";
  const fileName5 = "";
  const fileName6 = null;

  it("should return fileName without extension when extension exists", () => {
    const fileNameWithoutExtension1 = getFileNameWithoutExtension(fileName1);
    const fileNameWithoutExtension2 = getFileNameWithoutExtension(fileName2);
    expect(fileNameWithoutExtension1).toEqual("file_name");
    expect(fileNameWithoutExtension2).toEqual("file_name.txt.csv");
  });

  it("should return the given fileName when there is no extension", () => {
    const fileNameWithoutExtension3 = getFileNameWithoutExtension(fileName3);
    const fileNameWithoutExtension4 = getFileNameWithoutExtension(fileName4);
    const fileNameWithoutExtension5 = getFileNameWithoutExtension(fileName5);
    expect(fileNameWithoutExtension3).toEqual("file_name");
    expect(fileNameWithoutExtension4).toEqual("file_name");
    expect(fileNameWithoutExtension5).toEqual("");
  });

  it("should return empty string when fileName is null", () => {
    const fileNameWithoutExtension6 = getFileNameWithoutExtension(fileName6);
    expect(fileNameWithoutExtension6).toEqual("");
  });
});
