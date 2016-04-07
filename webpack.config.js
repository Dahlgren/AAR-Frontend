var webpack = require("webpack");

module.exports = {
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'https://arma-stats-go.herokuapp.com/',
        rewrite: function(req) {
          req.url = req.url.replace(/^\/api/, '');
        },
        secure: false,
        changeOrigin: true,
      },
    },
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
