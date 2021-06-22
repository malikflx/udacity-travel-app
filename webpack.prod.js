const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = 'production';

module.exports = merge(config, {
  mode,
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
});