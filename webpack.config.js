var webpack = require("webpack");

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'eval',
  entry: [
    './src/index',
  ],
  module: require('./webpack/module'),
  output: require('./webpack/output'),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: require('./webpack/resolve'),
};
