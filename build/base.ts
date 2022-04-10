const path = require('path')
const { mode } = process.env

module.exports = {
  output: {
    filename: 'js/[name].js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          mode === 'prod'
            ? require('mini-css-extract-plugin').loader
            : 'style-loader',
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
          // 'css-loader',
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
              ],
            }
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
              ],
            }
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|webp|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 50,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'images/[name][contenthash:6].[ext]'
                }
              }
            }
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
}

export {}
