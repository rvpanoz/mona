const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: './entry',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundleprod.js',
    publicPath: '/assets/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src')
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss'],
    modules: [
      path.join(__dirname, './src'),
      "node_modules"
    ],
    alias: {
      src: path.resolve(__dirname, 'src'),
      libc: path.resolve(__dirname, 'src/libc'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      scripts: path.resolve(__dirname, 'src/scripts'),
      utilities: path.resolve(__dirname, 'src/utilities/'),
      templates: path.resolve(__dirname, 'src/templates/'),
      schemas: path.resolve(__dirname, 'src/schemas/'),
      views: path.resolve(__dirname, 'src/views/'),
      app$: path.resolve(__dirname, 'src/app.js')
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          "style-loader", "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
            }, {
          loader: "css-loader" // translates CSS into CommonJS
            }, {
          loader: "sass-loader" // compiles Sass to CSS
            }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url-loader?limit=10000&mimetype=application/font-woff']
      },
      {
        test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader']
      }
    ]
  }
}
