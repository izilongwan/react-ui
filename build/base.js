module.exports = {
  entry: {
    index: './test/index.tsx'
  },

  output: {
    filename: 'js/[name].js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
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
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
}
