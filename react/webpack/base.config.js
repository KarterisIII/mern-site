const path = require('path')
const constants = require('./constants')

const buildType = process.env.BUILD_TYPE ? process.env.BUILD_TYPE : constants.modes.dev

module.exports = {
	mode: constants.builds[buildType],
	entry: path.join(__dirname, '../src/index.jsx'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: "/",
		filename: 'js/[name]-[hash:3].js',
		clean: true,
		assetModuleFilename: 'assets/[name]-[hash:3][ext]'
	},

	devServer: {
		port: 3000,
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},		
		hot: true,
		historyApiFallback: {
			disableDotRule: true,
		  },
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', ".tsx"],
	},
}