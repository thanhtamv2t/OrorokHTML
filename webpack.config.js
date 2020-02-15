const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  },
  devServer: {
    contentBase: "./"
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        // use: ["style-loader", "css-loader", "sass-loader"]
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
          // use: [
          //   {
          //     loader: "css-loader",
          //     options: {
          //       url: false
          //     }
          //   },
          //   "sass-loader"
          // ]
        })
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "static/images",
            publicPath: "static/images"
          }
        }
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, "*.html")), //Can changes for laravel: resources/views/**/*.blade.php
      minimize: process.env.NODE_ENV === "production"
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
