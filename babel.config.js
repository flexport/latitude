/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */
// WARNING: If you add custom Babel transforms to any of these,
//          you'll need to bust the S3 caches used in lib/webpack_builder.rb
// WARNING: make sure lodash is always before reflective-bind/babel
// https://github.com/flexport/flexport/pull/30471

const presets = [
  "@babel/preset-env",
  // https://babeljs.io/docs/en/babel-preset-react
  "@babel/preset-react",
  // https://www.npmjs.com/package/@babel/preset-flow
  ["@babel/preset-flow"],
];

const reflectiveBind = ["reflective-bind/babel", {propRegex: "^on[A-Z].*$"}];

const prismJs = [
  "prismjs",
  {
    languages: ["javascript", "jsx"],
    theme: "default",
    css: true,
  },
];

const babelCommon = [
  ["@babel/plugin-proposal-decorators", {legacy: true}],
  "@babel/plugin-proposal-function-sent",
  "@babel/plugin-proposal-export-namespace-from",
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-syntax-import-meta",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-proposal-json-strings",
  "@babel/plugin-proposal-unicode-property-regex",
  "@babel/plugin-proposal-nullish-coalescing-operator",
  "@babel/plugin-proposal-optional-chaining",
];

// this plugin drops any attributes that start with "data-qa" from JSX code
const removeTestIds = [
  "remove-test-ids",
  {
    attributes: ["data-qa"],
  },
];

module.exports = {
  env: {
    test: {
      presets,
      plugins: [
        //   "lodash", the lodash plugin does not play nice with jest-code-coverage
        reflectiveBind,
        prismJs,
        "@babel/plugin-transform-runtime",
        // this is required to handle the webpack import() syntax, which is preferred over require.ensure.
        "dynamic-import-node",
        ...babelCommon,
      ],
    },
    thirdPartyNoTransformRuntime: {
      presets,
      plugins: ["lodash", reflectiveBind, prismJs, ...babelCommon],
    },
    development: {
      presets,
      plugins: [
        "lodash",
        reflectiveBind,
        prismJs,
        "@babel/plugin-transform-runtime",
        // this allows for webpack hot reloading whe developing
        "react-hot-loader/babel",
        ...babelCommon,
      ],
    },
    integrationTests: {
      presets,
      plugins: [
        "lodash",
        reflectiveBind,
        prismJs,
        "@babel/plugin-transform-runtime",
        // we only remove test ids from production code and integration tests
        ...babelCommon,
      ],
    },
    production: {
      presets,
      plugins: [
        "lodash",
        reflectiveBind,
        prismJs,
        "@babel/plugin-transform-runtime",
        "add-react-displayname",
        // we only remove test ids from production code and integration tests
        removeTestIds,
        ...babelCommon,
      ],
    },
    node: {
      presets,
      plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-class-properties",
      ],
    },
  },
};
