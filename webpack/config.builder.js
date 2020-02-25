/**
 * TEAM: frontend_infra
 */

/* eslint-disable  */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(
  require("@babel/runtime/helpers/toConsumableArray")
);

var _classCallCheck2 = _interopRequireDefault(
  require("@babel/runtime/helpers/classCallCheck")
);

var _defineProperty2 = _interopRequireDefault(
  require("@babel/runtime/helpers/defineProperty")
);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        (0, _defineProperty2["default"])(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

/**
 * TEAM: frontend_infra
 *
 *
 */
var webpack = require("webpack");

var path = require("path");

var ManifestPlugin = require("webpack-manifest-plugin");

var HashOutput = require("webpack-plugin-hash-output");

var TerserJsPlugin = require("terser-webpack-plugin");

var ENTRY_POINTS = require("./entryPoints");

var root = path.join(__dirname, "..");
var BABEL_LOADER = "babel-loader?cacheDirectory=".concat(
  path.join(root, ".cache")
);

var WebpackConfigurationBuilder = function WebpackConfigurationBuilder() {
  var _this = this;

  (0, _classCallCheck2["default"])(this, WebpackConfigurationBuilder);
  (0, _defineProperty2["default"])(this, "GLOBAL_HASH_SALT", "2");
  (0, _defineProperty2["default"])(this, "apps", void 0);
  (0, _defineProperty2["default"])(this, "minimize", false);
  (0, _defineProperty2["default"])(this, "disableCompressWarnings", false);
  (0, _defineProperty2["default"])(this, "enableSourceMaps", false);
  (0, _defineProperty2["default"])(this, "testEnv", false);
  (0, _defineProperty2["default"])(this, "enableManifest", false);
  (0, _defineProperty2["default"])(this, "enableHashOutput", false);
  (0, _defineProperty2["default"])(this, "enableDevServer", void 0);
  (0, _defineProperty2["default"])(this, "nodeEnv", void 0);
  (0, _defineProperty2["default"])(this, "setApps", function(apps) {
    if (_this.apps != null) {
      throw new Error("Apps already initialized.");
    }

    _this.apps = apps;

    _this.apps.forEach(function(app) {
      if (ENTRY_POINTS[app] == null) {
        throw new Error(
          "Application ".concat(app, " is not a valid webpack entrypoint.")
        );
      }
    });

    _this.apps = (0, _toConsumableArray2["default"])(apps);
    return _this;
  });
  (0, _defineProperty2["default"])(this, "setTestEnv", function() {
    if (_this.testEnv) {
      throw new Error("Test env already set to true.");
    }

    _this.testEnv = true;
    return _this;
  });
  (0, _defineProperty2["default"])(this, "addDevServer", function(options) {
    _this.enableDevServer = options;
    return _this;
  });
  (0, _defineProperty2["default"])(this, "setNodeEnv", function(nodeEnv) {
    if (!["development", "production"].includes(nodeEnv)) {
      throw new Error("Invalid node environment.");
    }

    _this.nodeEnv = nodeEnv;
    return _this;
  });
  (0, _defineProperty2["default"])(this, "addSourceMaps", function() {
    _this.enableSourceMaps = true;
    return _this;
  });
  (0, _defineProperty2["default"])(this, "addHashOutput", function() {
    _this.enableHashOutput = true;
    return _this;
  });
  (0, _defineProperty2["default"])(this, "minify", function(
    disableCompressWarnings
  ) {
    if (_this.minify != null) {
      throw new Error("Minify already initialized");
    }

    _this.minimize = true;
    _this.disableCompressWarnings = disableCompressWarnings;
    return _this;
  });
  (0, _defineProperty2["default"])(this, "enableManifestPlugin", function() {
    _this.enableManifest = true;
  });
  (0, _defineProperty2["default"])(this, "validate", function() {
    if (_this.apps == null) {
      throw new Error("No applications initialized.");
    }

    if (_this.nodeEnv == null) {
      throw new Error("No node environment initialized.");
    }

    return {
      nodeEnv: _this.nodeEnv,
      apps: _this.apps,
    };
  });
  (0, _defineProperty2["default"])(this, "build", function() {
    var _this$validate = _this.validate(),
      apps = _this$validate.apps,
      nodeEnv = _this$validate.nodeEnv;

    var testEnvPlugin = new webpack.DefinePlugin({
      __TEST_ENV__: JSON.stringify(_this.testEnv),
    });
    var nodeEnvPlugin = new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(nodeEnv),
    });
    var output = {
      // Keep path in sync with lib/webpack_builder.rb
      path: path.join(root, "./public/packs"),
      filename: "[name].js",
      chunkFilename: "[name].js",
      publicPath: "/packs/",
      // Third party Javascript on a different version of webpack can collide
      // with our own JS. See https://github.com/webpack/webpack/issues/6985.
      jsonpFunction: "flexJsonp",
    };

    if (_this.enableSourceMaps) {
      var sourceMapOutput = {
        devtoolModuleFilenameTemplate: "file://[absolute-resource-path]",
        devtoolFallbackModuleFilenameTemplate:
          "file://[absolute-resource-path]?",
      };
      output = _objectSpread({}, output, {}, sourceMapOutput);
    }

    var entry = Object.keys(ENTRY_POINTS)
      .filter(function(appName) {
        return apps.includes(appName);
      })
      .reduce(function(prev, curr) {
        // eslint-disable-next-line no-param-reassign
        prev[curr] = ENTRY_POINTS[curr];
        return prev;
      }, {});
    var devServerSettings;
    var hotModuleReplacementPlugin;

    if (_this.enableDevServer) {
      devServerSettings = devServer;
      output = _objectSpread({}, output, {
        publicPath: "https://"
          .concat(devServer.host, ":")
          .concat(devServer.port, "/packs/"),
      });

      if (_this.enableDevServer.hot) {
        hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
        devServerSettings = _objectSpread({}, devServerSettings, {
          hot: true,
          inline: true,
        });
        var hotModuleReplacementLibs = [
          // bundle the client for hot reloading
          // only- means to only hot reload for successful updates
          "webpack/hot/only-dev-server",
        ];
        entry = Object.keys(entry).reduce(function(prev, current) {
          // eslint-disable-next-line no-param-reassign
          prev[current] = hotModuleReplacementLibs.concat(entry[current]);
          return prev;
        }, {});
      }
    }

    var minifySettings = _this.minimize
      ? {
          minimize: true,
          minimizer: [
            new TerserJsPlugin({
              parallel: true,
              cache: true,
              // other settings we care about whose defaults are correct:
              sourceMap: false,
              terserOptions: _this.disableCompressWarnings
                ? {
                    compress: {
                      warnings: false,
                    },
                  }
                : undefined,
            }),
          ],
        }
      : {};
    var commonConfig = {
      // we don't use the default webpack behavior enabled via modes. instead,
      // we look at the webpack default options to figure out what we need in
      // which environments:
      // https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js
      mode: "none",
      context: root,
      entry: entry,
      // Necessary because a dependency of jsonlint-lines uses fs (the former is
      // in turn a dependency of MapboxDraw).
      node: {
        fs: "empty",
      },
      output: output,
      resolve: {
        // If you update modules, please update moduleRoots in package.json
        modules: [root, "node_modules"],
        extensions: [".js", ".jsx", ".json"],
      },
      // These globals are provided by application.js. Eventually we should move
      // them to the vendor chunk to remove a network request, but at the moment
      // JavaScript code that lives outside of webpack depends on the global.
      externals: {
        jquery: "jQuery",
      },
      cache: true,
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules\/.*/,
            use: ["thread-loader", BABEL_LOADER],
          }, // We compile the code shared between the web and mobile:
          {
            test: /\.jsx?$/,
            include: /node_modules\/flexport-shared\/src\/.*/,
            loader: BABEL_LOADER,
          }, // this loader is used by DesignSystemApp; we write text file documentation, and import the text and render it in the app
          {
            test: /\.txt$/,
            use: "raw-loader",
          }, // marketplace has some yaml file they load, the reason for this loader.
          {
            test: /\.ya?ml$/,
            loader: "json-loader!yaml-loader",
          }, // The package react-element-to-jsx-string has a transitive dependency
          // to stringify-object. The author of this library does not want to
          // compile the code (https://github.com/yeoman/stringify-object/issues/36),
          // so we are forced to do it ourselves. There are a few other external
          // packages that need to be transpiled as well.
          {
            test: /\.jsx?$/,
            include: /node_modules\/get-own-enumerable-property-symbols\/.*/,
            loader: BABEL_LOADER,
          },
          /**
           * If you check out our babel config, you can see that thirdPartyNoTransformRuntime
           * runs all babel transforms except "babel-transform". I forget what exactly happens,
           * but some vendored libraries break after being babel transformed.
           */
          {
            test: /\.jsx?$/,
            include: /node_modules\/@mapbox\/mapbox-gl-draw\/.*/,
            loader: "".concat(
              BABEL_LOADER,
              "&envName=thirdPartyNoTransformRuntime"
            ),
          },
          {
            test: /\.jsx?$/,
            include: /node_modules\/supercluster\/.*/,
            loader: "".concat(
              BABEL_LOADER,
              "&envName=thirdPartyNoTransformRuntime"
            ),
          },
          {
            test: /\.jsx?$/,
            include: /node_modules\/kdbush\/.*/,
            loader: "".concat(
              BABEL_LOADER,
              "&envName=thirdPartyNoTransformRuntime"
            ),
          },
          {
            test: /\.jsx?$/,
            include: /node_modules\/stringify-object\/.*/,
            loader: "".concat(
              BABEL_LOADER,
              "&envName=thirdPartyNoTransformRuntime"
            ),
          },
          {
            test: /snapsvg/,
            loader: "imports-loader?this=>window,fix=>module.exports=0",
          },
          {
            test: /highcharts-regression/,
            use: "imports-loader?Highcharts=highcharts",
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: "style-loader",
              },
              {
                loader: "css-loader",
              },
            ],
          },
        ],
        // Mapbox code has already been bundled and minfied. If we bundle
        // it with webpack it breaks, so ignore the module entierly.
        // Issue and fix:
        // https://github.com/mapbox/mapbox-gl-js/issues/4359#issuecomment-288001933
        noParse: /(mapbox-gl)\.js$/,
      },
      optimization: _objectSpread({}, minifySettings, {
        /**
         * The default value of this on webpack 4 is true only in development.
         * We'd like to have it true in production as well. This is because otherwise,
         * the addition / removal of a chunk has the possibility of churning all other packs
         * that will refer to it my it's integer index. This is likely to change a lot, but
         * it's name is likely to remain constant.
         *
         * i.e. webpackLibs[5] is less safe than webpackLibs["CoreApp"];
         *
         * Advice from here: https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
         * Haven't verified this explicitly for webpack 4, TODO.
         *
         * This also applies to namedModules.
         *
         * Lastly, there is some indication that removing this in development mode increases speed. It is enabled
         * by default in webpack 4 in development mode, because it allegedly is good for debugging. I'm not sure why
         * that is the case, it is worth exploring.
         *
         * Other resources:
         * https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
         */
        namedChunks: true,
        namedModules: true,

        /**
         * This article: https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
         * claims that there is a runtime chunk broken out by default, but this claim has not
         * borne out to be true.
         *
         * What this setting does is break out the webpack bundle loading runtime out of the bundles themselves,
         * allowing you to embed it directly into the HTML of the first page load.
         *
         * Apparently, runtime contains the map from chunk name to chunk name + hash, and thus is constantly being changed.
         * By breaking it out and embedding it in the HTML, we don't thrash our Cloudflare cache.
         */
        runtimeChunk: "single",
        splitChunks: {
          cacheGroups: {
            default: false,
            vendors: false,
          },
        },
      }),
      plugins: [
        /**
         * As of moment 2.18, all locales are bundled together with the core library
         * (see this GitHub issue). The requestRegExp parameter passed to IgnorePlugin
         * is not tested against the resolved file names or absolute module names being
         * imported or required, but rather against the string passed to require or import
         * within the source code where the import is taking place.
         */
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        }), // why this was added is lost to the sands of time. I'm guessing some node module
        // had a bunch of markdown files, and we wanted to exclude them. ¯\_(ツ)_/¯
        new webpack.IgnorePlugin({
          resourceRegExp: /.*\.md/,
        }), // see declaration for explanantion of why we need this
        _this.enableManifest && manifestPlugin, // see declaration for explanantion of why we need this
        _this.enableHashOutput && hashPlugin,
        testEnvPlugin,
        nodeEnvPlugin,
        _this.enableSourceMaps && sourceMapsPlugin,
        hotModuleReplacementPlugin, // only load js, typescript, and xml for syntax highlighting
        // https://github.com/akiran/react-highlight/issues/23#issuecomment-372989476
        new webpack.ContextReplacementPlugin(
          /highlight\.js\/lib\/languages$/,
          /^\.\/(javascript|typescript|xml)/
        ),
      ].filter(Boolean),

      /**
       * Configure how performance hints are shown.
       * For example if you have an asset that is over 250kb, webpack will emit a warning notifying you of this.
       *
       * This disables those warnings, in the interest of reducing CLI noise.
       */
      performance: {
        hints: false,
      },
      stats: {
        all: false,
        modules: true,
      },
    };

    if (_this.enableDevServer) {
      commonConfig = _objectSpread({}, commonConfig, {
        devServer: devServerSettings,
      });
    }

    return commonConfig;
  });
};

var manifestPlugin = function manifestPlugin() {
  return (
    /**
     * This plugin produces a json file alongside our build which is simply a map of
     * chunk name to the file in that build that corresponds to that chunk.
     *
     * For instance, if a chunk gets produced callked "CoreApp.hash.js", manifest.json
     * will have an entry "CoreApp" => "CoreApp.hash.js".
     *
     * We use this later to map routes to the JS files they require. For instance, a
     * PortInterface route might require a package called "CorePort" (user defined). What
     * is CorePort's exact file name on a specific build? manifest.json will provide this.
     */
    new ManifestPlugin({
      // by default, the plugin as of version 2.0 will append //www.flexport.com/packs/ to
      // chunk names when generating chunks using a production configuration. This is because
      // it uses the output.publicPath configuration option. We don't need this prefix, so we
      // empty it here. The reason we don't need it is we'd like our manifest.json file to have
      // packName -> specificPackInstance; our Ruby code has a mapping of route_name -> packName,
      // so the key we have is "packName". If our packs were across multiple domains, then
      // perhaps we'd want the manifest behavior of appending the output URL, but we don't have that
      // use case.
      publicPath: "",
    })
  );
};

var hashPlugin = function hashPlugin() {
  return (
    /**
     * Webpack by default hashes the files before other plugins like uglify.
     * This plugin rehashes the bundles after all other plugins have run.
     *
     * From the NPM resources:
     * There are other webpack plugins for hashing out there.
     * But when they run, they don't "see" the final form of the code,
     * because they run before plugins like webpack.optimize.UglifyJsPlugin.
     * In other words, if you change webpack.optimize.UglifyJsPlugin config,
     * your hashes won't change, creating potential conflicts with cached resources.
     *
     * The reason why this behavior is desirable is: i.e. if someone adds a comment to their file
     * it is stripped out with UglifyJS, but the webpack hash will still change since it's of the
     * original bundle. Instead, we recompute the hash after uglify, with this plugin.
     *
     * The exact order of operations is:
     * 1) Webpack runs, generating non-minified bundles. Source maps with incorrect hashes are generated.
     * 2) Our transforms run
     * 3) HashOutput generates the new hashes for the files.
     * 4) The files are written to disk.
     * 5) We run a script, called replaceSourceMapHash, moving the source maps to their new addresses.
     * 6) Separately, in js.rake, we add a line to the bottom of every bundle pointing to the source maps URL.
     */
    new HashOutput({
      manifestFiles: [
        // 'runtime' contains references to others bundles.
        // Placing it here ensures that it gets re-hahsed last
        // so the references in the file get updated correctly.
        "runtime",
      ],
    })
  );
};

var sourceMapsPlugin = new webpack.SourceMapDevToolPlugin({
  append: "\n//# sourceMappingURL=[url]",
  columns: false,
  filename: null,
  module: true,
  moduleFilenameTemplate: "file://[absolute-resource-path]",
  fallbackModuleFilenameTemplate: "file://[absolute-resource-path]?",
  noSources: false,
});
var devServer = {
  port: 8080,
  host: "localhost",
  hot: false,
  inline: false,
  contentBase: false,
  compress: true,
  disableHostCheck: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  stats: {
    assets: false,
    assetsSort: "size",
    cached: false,
    children: true,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    warnings: true,
    errors: true,
    errorDetails: true,
    hash: false,
    modules: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: true,
    version: false,
  },
};

function appWrapper(
  configBuilder, // eslint-disable-next-line autofix/no-unused-vars
  devMode
) {
  return function(env) {
    // Configure the entrypoints to compile. You can specify the list
    // of apps as a comma seperated string in the --env.apps param.
    // This makes compiling parts of our app much faster. Be default,
    // weback devserver only compile CoreApp
    // e.g. --env.apps=CoreApp,ClientApp
    var entryPoints = [];

    if (!env || !env.apps) {
      return configBuilder.setApps(Object.keys(ENTRY_POINTS)).build();
    }

    var apps = env.apps.split(","); // eslint-disable-next-line no-plusplus

    for (var i = 0; i < apps.length; i++) {
      var app = apps[i];
      entryPoints.push(app);
    }

    configBuilder.setApps(entryPoints);
    return configBuilder.build();
  };
}

module.exports = {
  WebpackConfigurationBuilder: WebpackConfigurationBuilder,
  appWrapper: appWrapper,
};
