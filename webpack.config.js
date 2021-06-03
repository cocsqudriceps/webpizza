const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  }

  if (!isDev) {
    config.minimize = true
    config.minimizer = [new CssMinimizerWebpackPlugin()]
  }
  return config
}

const backend = {
  entry: './server/src/app.js',
  target: 'node',
  externals: [WebpackNodeExternals()],
  node: { __dirname: true },
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [new ESLintPlugin()],
}

const frontend = {
  entry: './client/src/index.jsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist/client'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      favicon: './client/public/pizza.png',
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new ESLintPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
    ],
  },
}

module.exports = [frontend, backend]
