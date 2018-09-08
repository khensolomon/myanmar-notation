const path = require('path');
const clientConfig = {
	target: 'web',
	mode: 'production',
	entry: {
		notation: './asset/index.ts'
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				// use: 'ts-loader',
				loader: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts']
	},
	output: {
		// filename: 'myanmar-[name].min.js',
		filename: 'min.js',
		path: path.resolve(__dirname),
		library: 'myanmarNotation',
		libraryTarget: 'window'
	}
};
/*
// webpack --module-bind 'node=node-loader'
const packageConfig = {
	target: "node",
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.node?$/,
				use: 'node-loader'
			}
		]
	},
	entry: {
		notation: './asset/'
	},
	resolve: {
		extensions: ['.ts']
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname)
	},
	externals: [nodeExternals()]
};
*/

module.exports = [clientConfig];