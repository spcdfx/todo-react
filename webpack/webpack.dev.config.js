var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

module.exports = {
	entry: [
		path.join(parentDir, 'index.js')
	],
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: 'babel-loader'
		}, {
			test: /\.(less|css)$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loder"},
				{loader: "less-loader"}
			]
		}
		]
	},
	output: {
		path: parentDir + '/dist',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: parentDir,
		historyApiFallback: true
	},
	mode: 'production'
}