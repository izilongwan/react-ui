const path = require('path')

module.exports = {
  module: {
    rules: [
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
