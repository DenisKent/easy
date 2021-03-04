const { merge } = require("webpack-merge");
const webpackBase = require("./webpack.base");

module.exports = env => {
  return merge(webpackBase, {
    mode: "production"
  });
};
