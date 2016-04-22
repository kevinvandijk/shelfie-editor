const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

module.exports = {
  devtool: 'eval-source-map',

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  entry: {
    app: PATHS.app,
  },

  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },

  devServer: {
    contentBase: PATHS.build,
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    port: 4000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Shelfie Editor',
      template: path.join(PATHS.app, 'index.ejs'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    loaders: [
      // Babel JS and JSX
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory', 'eslint'],
        include: PATHS.app,
      },

      // SCSS
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: PATHS.app,
      },

      // CSS
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        incude: PATHS.app,
      },

      // Fonts
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },

    ],
  },
};
