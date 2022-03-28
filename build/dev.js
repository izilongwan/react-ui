const devBase = require('./base')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({}, devBase, {
  mode: 'development',

  devServer: {
    compress: true,
    port: 5001,
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: '/public/index.html',
      filename: 'index.html',
    })
  ]
})
