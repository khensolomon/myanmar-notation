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
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts']
	},
	output: {
		// filename: 'myanmar-[name].min.js',
		filename: 'lib.js',
		path: path.resolve(__dirname),
		library: 'myanmarNotation',
		libraryTarget: 'window'
	}
};

module.exports = clientConfig;