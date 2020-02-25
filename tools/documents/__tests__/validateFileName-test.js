/**
 * TEAM: squad_tools
 *
 * @flow strict
 */
import validateFileName from "../validateFileName";

describe("getFileExtension", () => {
  const fileName1 = "file_name.pdf";
  const fileName2 = "file_name.pdf.csv.txt";
  const invalidFileName1 = "";
  const invalidFileName2 = "file_name.";
  const invalidFileName3 = "file_name";
  const invalidFileName4 = ".txt";
  const invalidFileName5 = null;

  it("should return true when file name is valid (most common format)", () => {
    expect(validateFileName(fileName1)).toEqual(true);
  });

  it("should return true when file name is valid (with multiple .extensions)", () => {
    expect(validateFileName(fileName2)).toEqual(true);
  });

  it("should return false when file name is empty", () => {
    expect(validateFileName(invalidFileName1)).toEqual(false);
  });

  it("should return false when extension is missing in fileName", () => {
    expect(validateFileName(invalidFileName2)).toEqual(false);
    expect(validateFileName(invalidFileName3)).toEqual(false);
  });

  it("should return false when file name contains only extension", () => {
    expect(validateFileName(invalidFileName4)).toEqual(false);
  });

  it("should return false when file name is null", () => {
    expect(validateFileName(invalidFileName5)).toEqual(false);
  });
});
