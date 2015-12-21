var path = require('path');

module.exports = {
	context: path.resolve(__dirname, "app"),
	entry: "." + path.sep + "app.js",

	output: {
		filename: "app.js",
		path: path.resolve(__dirname,"dist"),
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ["react-hot", "babel-loader"]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ["babel-loader"],
			},
			{
				test: /\.html$/,
				loader: "file?name=[name].[ext]",
			},

			{test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
		]
	},
	devServer: {
		historyApiFallback: true
	}
}
