module.exports = {
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
        presets: ['react', 'es2015', 'stage-2'],
      }
    },
    {
      test: /\.png$/,
      loader: "file-loader"
    },
  ],
};
