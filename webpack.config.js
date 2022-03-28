const webpack = require("webpack");
const path = require("path");

const config = {
  entry: "./src/index.js",
  watch: true,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
};

module.exports = config;
