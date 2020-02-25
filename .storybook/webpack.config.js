const path = require("path");

module.exports = async ({config}) => {
  config.resolve.modules.unshift("stories");
  config.resolve.modules.unshift(path.resolve(__dirname, ".."));

  // Strip out the babel-plugin-react-docgen
  // This crashes Storybook when using certain Flow features 🙃
  // See https://github.com/storybooks/storybook/issues/4873#issuecomment-458497220
  const babelLoader = config.module.rules[0].use[0];
  babelLoader.options.plugins = babelLoader.options.plugins.filter(
    plugin =>
      !(
        Array.isArray(plugin) &&
        typeof plugin[0] === "string" &&
        plugin[0].includes("react-docgen")
      )
  );

  return config;
}; // console.dir(config, {depth: null}) || config;
