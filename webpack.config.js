/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  entry: './app/index.ts',
  output: {
    path: path.resolve('./'),
    filename: './dist/build.js',
  },

  devServer: {
    hot: true,
    port: 8085,
    overlay: true,
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ title: 'My app' }),
    //new HtmlWebpackInlineSourcePlugin(),
  ],
  devtool: 'inline-source-map',
};
