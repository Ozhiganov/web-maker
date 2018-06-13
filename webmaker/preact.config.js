import CopyWebpackPlugin from 'copy-webpack-plugin'

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {
	if (env.isProd) {
		config.devtool = false; // disable sourcemaps

		config.plugins.push(new CopyWebpackPlugin([{
				context: `${__dirname}/src/assets`,
				from: `*.*`
			}, {
				from: `${__dirname}/src/lib`,
				to: 'lib/'
			},
			{
				from: `${__dirname}/src/detached-window.js`
			},
			{
				from: `${__dirname}/src/*.ttf`
			},
			{
				from: `${__dirname}/src/patreon.png`
			},
			{
				from: `${__dirname}/src/preview.html`
			},
			{
				from: `${__dirname}/src/style.css`
			}
		]));

		const {
			plugin
		} = helpers.getPluginsByName(config, 'SWPrecacheWebpackPlugin')[0];
		plugin.options.maximumFileSizeToCacheInBytes = 2900000;

		const {
			index
		} = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0]
		config.plugins.splice(index, 1)
	}

}
