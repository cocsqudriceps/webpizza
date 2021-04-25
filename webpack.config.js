const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNodeExternals = require('webpack-node-externals')
const config = require('config')

const backend = {
	entry: './server/src/app.js',
	externals: [WebpackNodeExternals()],
	output: {
		filename: 'server.bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
}
const frontend = {
	entry: './client/src/index.js',
	output: {
		filename: 'client.[contenthash].js',
		path: path.resolve(__dirname, 'dist/client'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/public/index.html',
		}),
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist/client'),
		port: config.get('clientPort'),
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
		],
	},
}

module.exports = [frontend, backend]
