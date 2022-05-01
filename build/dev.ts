const devBase = require('./base')
const { merge } = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge({}, devBase, {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  entry: {
    index: './test/index.tsx'
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启 CSS Modules
              modules: {
                // 自定义生成的类名
                localIdentName: '[local]___[hash:base64:8]'
              },
            }
          },
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
    ]
  },

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

export {}
