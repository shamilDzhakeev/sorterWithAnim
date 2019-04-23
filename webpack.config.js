/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  entry: './app/index.ts',
  output: {
    path: path.resolve('./'),
    filename: './dist/build.js'
  },

  devServer: {
    hot: true,
    open: true,
    port: 8085,
    overlay: true
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },

  devtool: 'eval-source-map'
};
