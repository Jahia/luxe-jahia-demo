const path = require("path");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const getModuleFederationConfig = require("@jahia/webpack-config/getModuleFederationConfig");
const packageJson = require("./package.json");

module.exports = (env, argv) => {
  let _argv = argv || {};

  // config.devtool = argv.mode === "production" ? "source-map" : "eval-source-map";
  //
  // if (argv.analyze) {
  // 	config.devtool = "source-map";
  // 	config.plugins.push(new BundleAnalyzerPlugin());
  // }

  return {
    entry: {
      main: path.resolve(__dirname, "javascript/apps/registerExtensions.js"),
    },
    output: {
      path: path.resolve(__dirname, "dist/javascript/apps/"),
      filename: "extension.bundle.js",
      chunkFilename: "[name].jahia.[chunkhash:6].js",
    },
    resolve: {
      mainFields: ["module", "main"],
      // extensions: [".mjs", ".js", ".jsx", ".json", ".scss"],
      extensions: [".mjs", ".js"],
      fallback: { url: false },
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          type: "javascript/auto",
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin(
        getModuleFederationConfig(packageJson, {
          remotes: {
            "@jahia/app-shell": "appShellRemote",
          },
          shared: {
            "@apollo/client": { singleton: true, requiredVersion: "^3.7.0" },
          },
        }),
      ),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [`${path.resolve(__dirname, "dist/javascript/apps/")}/**/*`],
        verbose: false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "./package.json",
            to: "",
          },
        ],
      }),
      new CaseSensitivePathsPlugin(),
    ],
    mode: "development",
  };
};
