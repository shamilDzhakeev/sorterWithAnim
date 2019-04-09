const path = require('path');

module.exports = {
  entry: './app/testSort.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: './build.js',
    publicPath: '/dist',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      /*       {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }, */

      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },

  devtool: 'cheap-module-eval-source-map',
};
