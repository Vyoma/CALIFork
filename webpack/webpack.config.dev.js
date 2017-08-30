const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../public');
// const TEMPLATE = path.resolve(__dirname, '../public/index.html');
const SOURCE_DIR = path.resolve(__dirname, '../source');
const STATIC_DIR = path.resolve(__dirname, '../static'); 

module.exports = [
	{
		name: 'client',
		target: 'web',
		entry: SOURCE_DIR + '/client/index.js',
		output: {
			path: STATIC_DIR,
			filename: 'client.js',
			publicPath: '/static/',
		},
		resolve: {
			extensions: ['.js', '.jsx']
		},
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules\/)/,
					use: [
						{
							loader: 'babel-loader',
						}
					]
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[name]__[local]___[hash:base64:5]',
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader'
						}
					]
				}
			],
		},
	},
	{
		name: 'server',
		target: 'node',
		entry: SOURCE_DIR + '/server/index.js',
		output: {
			path: STATIC_DIR,
			filename: 'server.js',
			libraryTarget: 'commonjs2',
			publicPath: '/static/',
		},
		devtool: 'source-map',
		resolve: {
			extensions: ['.js', '.jsx']
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules\/)/,
					use: [
						{
							loader: 'babel-loader',
						}
					]
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: 'isomorphic-style-loader',
						},
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[name]__[local]___[hash:base64:5]',
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader'
						}
					]
				}
			],
		},
	}
];