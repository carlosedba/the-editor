module.exports = function (env) {
	let file = (env.PRODUCTION) ? 'prod' : 'dev'
	return require(`./webpack.config.${file}`)(env)
}

