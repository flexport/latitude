/**
 * TEAM: frontend_infra
 *
 * WATCHERS: Stephane-Y
 */

/* eslint-disable  */

"use strict";

var webpack = require("webpack");

var path = require("path");

var ManifestPlugin = require("webpack-manifest-plugin");

var HashOutput = require("webpack-plugin-hash-output");

var entryPoints = require("./entryPoints.js");

var BABEL_LOADER = "babel-loader?cacheDirectory=".concat(
  path.join(__dirname, ".cache")
);
var testEnvMacro = new webpack.DefinePlugin({
  __TEST_ENV__: JSON.stringify(false),
}); // $FlowFixMe(dmnd): When I added Flow, I found this. Don't blame me.

testEnvMacro.__isTestEnvMacro = true;

function webpackConfig(env) {
  var config = {
    context: __dirname,
    entry: entryPoints,
    // Necessary because a dependency of jsonlint-lines uses fs (the former is
    // in turn a dependency of MapboxDraw).
    node: {
      fs: "empty",
    },
    output: {
      // Keep path in sync with lib/webpack_builder.rb
      path: path.join(__dirname, "../public/packs"),
      filename: "[name].js",
      chunkFilename: "[name].js",
      publicPath: "/packs/",
      // Third party Javascript on a different version of webpack can collide
      // with our own JS. See https://github.com/webpack/webpack/issues/6985.
      jsonpFunction: "flexJsonp",
    },
    resolve: {
      // If you update modules, please update moduleRoots in package.json
      modules: [__dirname, "node_modules"],
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
        },
        {
          test: /\.txt$/,
          use: "raw-loader",
        },
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
          test: /\.jsx?$/,
          include: /node_modules\/splaytree\/.*/,
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
    optimization: {
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
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.IgnorePlugin(/.*\.md/),
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
      }),
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
      }),
      testEnvMacro, // only load js, typescript, and xml for syntax highlighting
      // https://github.com/akiran/react-highlight/issues/23#issuecomment-372989476
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        /^\.\/(javascript|typescript|xml)/
      ),
    ],

    /**
     * Configure how performance hints are shown.
     * For example if you have an asset that is over 250kb, webpack will emit a warning notifying you of this.
     *
     * This disables those warnings, in the interest of reducing CLI noise.
     */
    performance: {
      hints: false,
    },
  }; // Configure the entrypoints to compile. You can specify the list
  // of apps as a comma seperated string in the --env.apps param.
  // This makes compiling parts of our app much faster. Be default,
  // weback devserver only compile CoreApp
  // e.g. --env.apps=CoreApp,ClientApp

  if (!env || !env.apps) {
    return config;
  }

  var apps = env.apps.split(",");
  var entry = {}; // eslint-disable-next-line no-plusplus

  for (var i = 0; i < apps.length; i++) {
    var app = apps[i];
    entry[app] = config.entry[app];
  }

  config.entry = entry;
  return config;
}

module.exports = webpackConfig;
