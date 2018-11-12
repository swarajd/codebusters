const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Hyperapp One',
    template: './src/index.html',
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
  }),
  new MiniCssExtractPlugin({
    filename: './[name].[hash].css',
    allChunks: true,
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
];

module.exports = () => ({
  mode: 'development',
  entry: [
    './src/index.js',
    './styles/app.css',
  ],
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, './'),
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?importLoaders=1',
        ]
      },
    ],
  },
  plugins,
  devServer: {
    publicPath: '/',
    open: true,
  },
});
