const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const svgoConfig = require('./svgoConfig')

module.exports = function (env) { 
	return {
		entry: {
			editor: './src/index.js'
		},

		output: {
			asyncChunks: true,
			clean: true,
			filename: '[name]-[contentHash].js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: 'auto',
		},

		
		target: 'web',
		
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				handlebars: 'handlebars/dist/handlebars.min.js'
			}
		},

		node: {
			__dirname: true
		},

		module: {
			rules: [
				{
					test: /\.(js|jsx)?$/,
					exclude: [
						path.resolve(__dirname, './node_modules')
					],
					loader: 'babel-loader'
				},
				{
					test: /\.(js)?$/,
					exclude: [
						path.resolve(__dirname, './node_modules')
					],
					include: [
						path.resolve(__dirname, './src/libs')
					],
					loader: 'script-loader'
				},
				{
					test:   /\.css?$/,
					use: [
						'style-loader',
						'css-loader',
					]
				},
				{
					test:   /\.scss?$/,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader'
					]
				},
				{
					test: /\.svg$/,
					use: { loader: '@svgr/webpack', options: { svgoConfig } }
				},
				{
					test: /\.(png|jpg|jpeg|gif)?$/,
					use: { loader: 'url-loader', options: { limit: 100000 } }
				},
				{ 
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: { loader: 'url-loader', options: { limit: 100000, mimetype: 'application/font-woff' } }
				},
				{ 
					test: /\.(swoff|woff|woff2|eot|ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'file-loader'
				}
			]
		},

		plugins: [
			new HtmlWebpackPlugin({
				templateContent: `
					<!DOCTYPE html>
					<html>
						<head>
							<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui, user-scalable=no">
							<title>Editor | Faculdades da Indústria</title>

							<!-- iOS -->
							<meta name="apple-mobile-web-app-title" content="Editor | Faculdades da Indústria">
							<meta name="apple-mobile-web-app-capable" content="yes">
							<meta name="apple-mobile-web-app-status-bar-style" content="black">

							<link rel="stylesheet" href="https://use.typekit.net/dsf4bil.css">
							<link rel="stylesheet" href="https://use.typekit.net/pul8mdv.css">
							<link rel="stylesheet" href="https://use.typekit.net/fgx7rql.css">
						</head>
						<body>
							<div id="root"></div>
							<script src="https://unpkg.com/feather-icons"></script>
						</body>
					</html>
				`
			})
		]
	}
}
