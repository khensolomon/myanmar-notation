const path = require('path');

const clientConfig = {
	target: 'web',
	mode: 'production',
	entry: {
		notation: './assets/index.ts'
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts']
	},
	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, 'dist/web'),
		library: 'myanmarNotation',
		libraryTarget: 'window'
	}
};

module.exports = clientConfig;