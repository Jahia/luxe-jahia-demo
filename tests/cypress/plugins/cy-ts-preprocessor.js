const wp = require('@cypress/webpack-preprocessor')

const webpackOptions = {
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
			},
		],
	},
}

const options = {
	webpackOptions,
}

module.exports = wp(options)
