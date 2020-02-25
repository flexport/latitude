/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
import consolidateFileExtension from "../consolidateFileExtension";

describe("consolidateFileExtension", () => {
  const originalFileName = "file_name.pdf";
  const fileNameWithoutExtension1 = "file_name.pdf";
  const fileNameWithoutExtension2 = "file_name.txt.csv.pdf";
  const fileNameWithoutExtension3 = "file_name.csv";
  const fileNameWithoutExtension4 = "file_name";

  it("should return consolidated fileName when fileName contains repeated file extension", () => {
    const consolidatedName1 = consolidateFileExtension(
      fileNameWithoutExtension1,
      originalFileName
    );
    const consolidatedName2 = consolidateFileExtension(
      fileNameWithoutExtension2,
      originalFileName
    );
    expect(consolidatedName1).toEqual("file_name");
    expect(consolidatedName2).toEqual("file_name.txt.csv");
  });

  it("should return fileName when there is no repeated file extension", () => {
    const consolidatedName3 = consolidateFileExtension(
      fileNameWithoutExtension3,
      originalFileName
    );
    const consolidatedName4 = consolidateFileExtension(
      fileNameWithoutExtension4,
      originalFileName
    );
    expect(consolidatedName3).toEqual("file_name.csv");
    expect(consolidatedName4).toEqual("file_name");
  });
});
