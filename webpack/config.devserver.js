/**
 * TEAM: frontend_infra
 */

/* eslint-disable  */

"use strict";

var _require = require("./config.builder"),
  WebpackConfigurationBuilder = _require.WebpackConfigurationBuilder,
  appWrapper = _require.appWrapper;

module.exports = appWrapper(
  new WebpackConfigurationBuilder()
    .setNodeEnv("development")
    .addSourceMaps()
    .setTestEnv()
    .addDevServer({
      hot: false,
    }),
  true
);
