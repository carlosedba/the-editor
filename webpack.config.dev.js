const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.config.base')

module.exports = function (env) {
	return merge(base(env), {
		mode: 'development',

		devtool: 'eval-cheap-module-source-map',

		devServer: {
			client: {
				overlay: {
					errors: true
				},
				progress: true
			},
			historyApiFallback: true,
			host: '0.0.0.0',
			hot: true,
			port: 4000,
		},

		optimization: {
			minimize: false,
			moduleIds: 'named'
		}
	})
}

