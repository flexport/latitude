/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

module.exports = {
  trailingComma: "es5",
  bracketSpacing: false,
  parser: "flow",
  overrides: [
    {
      files: "*.json",
      options: {
        parser: "json",
      },
    },
    {
      files: "*.ts",
      options: {
        parser: "typescript",
      },
    },
  ],
};
