const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",

  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].[contenthash].js",
    clean: true
  },
  optimization: {
    moduleIds: 'deterministic'
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash]-[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".ts", ".tsx"],
    alias: {
      root: path.resolve(__dirname, "../"),
      src: path.resolve(__dirname, "../src"),
      components: path.resolve(__dirname, "../src/components"),
      assets: path.resolve(__dirname, "../assets")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      favicon: "./assets/favicon.ico"
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false
    })
  ]
};
