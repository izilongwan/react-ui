const { merge } = require('webpack-merge'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin')

var base = require('./base')

module.exports = merge({}, base, {
  mode: 'production',

  entry: '/src/index.ts',

  output: {
    filename: 'index.js',
    library: {
      type: 'umd',
      name: 'ReactUI',
      export: 'default',
      umdNamedDefine: true,
    },
    globalObject: 'this',
    clean: true,
  },

  // module: {
  //   rules: [
  //     {
  //       test: /\.s?css$/,
  //       use: [
  //         MiniCssExtractPlugin.loader,
  //         {
  //           loader: 'css-loader',
  //           options: {
  //             modules: true,
  //           }
  //         },
  //         'sass-loader',
  //       ],
  //     }
  //   ]
  // },

  externals: { // 定义外部依赖，避免把react和react-dom打包进去
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:6].css'
    })
  ]
})
