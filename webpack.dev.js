const { merge } = require('wepback-merge');
const config = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const mode = 'development';
module.exports = merge(config, {
  mode,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
    })],
  },
  devServer: {
    port: 3000,
    hot: true
  },
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