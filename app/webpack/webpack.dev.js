const path = require("path");
const { merge } = require("webpack-merge");
const webpackBase = require("./webpack.base");

module.exports = env => {
  return merge(webpackBase, {
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "../dist"),
      open: true,
      port: 7777,
    },
  });
};
