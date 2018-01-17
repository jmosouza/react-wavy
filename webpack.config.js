var path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "commonjs2" // Build as an exportable module.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react", "stage-1"]
          }
        }
      }
    ]
  },
  externals: {
    react: "react" // Use the React dependency of the project using this library instead of using our own React.
  }
};
