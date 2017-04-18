/* eslint-env node */

const path = require("path");

module.exports = {
  devtool: "source-map",
  entry: {
    main: "./src/main.js",
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "admin-core.js",
  },
};
