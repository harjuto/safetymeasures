var path = require('path');
var webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  assets: path.join(__dirname, 'build/static')
};

module.exports = {
  // Entry accepts a path or an object of entries.
  // The build chapter contains an example of the latter.
  entry: './src/index.jsx',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.min.js'
  },

  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        },
        include: PATHS.app
      },
      { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/, loader: "file-loader" },
      { test: /\.eot$/, loader: "file-loader" },
      { test: /\.svg$/, loader: "file-loader" },
      { test: /\.png$/, loader: "url-loader" }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    host: '0.0.0.0',
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    proxy: {
      '/api/*': {
        target: 'http://localhost:1337',
      },
      '/report/*': {
        target: 'http://localhost:8080'
      }
    },
    // Parse host and port from env so this is easy to customize.
    //host: process.env.HOST,
    port: "8080"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
