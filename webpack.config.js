var path = require("path");

module.exports = {
  entry: './src/index.jsx',
  module: {
    loaders: [
      {
        test: /\.css?$/,
        loader: "style-loader!css-loader!"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.png$/,
        loader: "file-loader"
      },
    ],
  },
  resolve: {
    alias: {
      leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css",
      react_leaflet: __dirname + "/node_modules/react-leaflet/src",
    },
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'https://arma-stats-api.herokuapp.com/',
        rewrite: function(req) {
          req.url = req.url.replace(/^\/api/, '');
        },
        secure: false,
        changeOrigin: true,
      },
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
    publicPath: "/assets/",
  },
};
