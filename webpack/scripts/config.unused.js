/**
 * TEAM: frontend_infra
 *
 * @flow strict-local
 */
const {WebpackConfigurationBuilder, appWrapper} = require("./config.builder");

module.exports = appWrapper(
  new WebpackConfigurationBuilder().setNodeEnv("development"),
  true
);
