const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const base = require('./webpack.config.base')

module.exports = function (env) {
	const { BUNDLE_NAME } = env

	return merge(base(env), {
		mode: 'production',

		devtool: false,

		output: {
			filename: '[name].[contenthash].js',
			publicPath: ''
		},

		optimization: {
			minimize: true,

			splitChunks: {
				chunks: 'all',
				minSize: 20000,
				minRemainingSize: 0,
				minChunks: 1,
				maxAsyncRequests: 30,
				maxInitialRequests: 30,
				enforceSizeThreshold: 50000,
				cacheGroups: {
					defaultVendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
						reuseExistingChunk: true,
						name: `${BUNDLE_NAME}-vendor`
					},
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true,
					},
				},
			},
		},

		plugins: [
			new CompressionPlugin(),
			new MiniCssExtractPlugin(),
		]
	})
}

