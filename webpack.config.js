const path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: './build.js',
    publicPath: '/dist',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },

  devtool: 'source-map',
};
