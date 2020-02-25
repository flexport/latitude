/**
 * TEAM: frontend_infra
 *
 * @flow
 */
const {WebpackConfigurationBuilder, appWrapper} = require("./config.builder");

module.exports = appWrapper(
  new WebpackConfigurationBuilder().setNodeEnv("development").addSourceMaps(),
  true
);
