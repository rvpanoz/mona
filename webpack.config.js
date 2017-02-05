const path = require('path')
const projectRoot = path.resolve(__dirname, '../')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: {
    app: ["./src/main.js"]
  },
  output: {
    path: path.resolve(__dirname),
    filename: "./dist/bundle.js"
  },
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, "src"),
    compress: false,
    outputPath: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css'],
    fallback: [path.join(__dirname, './node_modules')],
    root: path.resolve(__dirname),
    alias: {
      'src': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './src/assets'),
      'handlebars': 'handlebars/dist/handlebars.min.js',
      'app': path.resolve(__dirname, './src/app'),
      'config': path.resolve(__dirname, './src/config'),
      'utils': path.resolve(__dirname, './src/utils'),
      'pagination': path.resolve(__dirname, './src/components/pagination/pagination'),
      'selectPicker': path.resolve(__dirname, './src/plugins/bootstrap-select/dist/js/bootstrap-select.min'),
      'datePicker': path.resolve(__dirname, './src/plugins/datepicker/js/datepicker.min'),
      'bootstrapSelect': path.resolve(__dirname, './src/plugins/bootstrap-select/dist/js/bootstrap-select.min')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, './node_modules')]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    //   output: {
    //     comments: false,
    //   },
    // }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './index.html'),
      to: path.resolve(__dirname, './dist/index.html')
    }]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],
  module: {
    preLoaders: [{
      test: /\.js$/, // include .js files
      exclude: /node_modules/, // exclude any and all files in the node_modules folder
      loader: "jshint-loader"
    }],
    loaders: [{
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: "underscore-template-loader",
        query: {
          engine: 'underscore',
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug'
        ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: require.resolve("underscore"),
        loader: 'expose?_'
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./assets/scss")]
  },
  htmlLoader: {
    ignoreCustomFragments: [/\{\{.*?}}/],
    root: path.resolve(__dirname, 'templates'),
    attrs: ['img:src', 'link:href']
  },
  jshint: {
    // any jshint option http://www.jshint.com/docs/options/
    camelcase: true,

    // jshint errors are displayed by default as warnings
    // set emitErrors to true to display them as errors
    emitErrors: false,

    // jshint to not interrupt the compilation
    // if you want any file with jshint errors to fail
    // set failOnHint to true
    failOnHint: false,

    // custom reporter function
    reporter: function(errors) {}
  }
};
