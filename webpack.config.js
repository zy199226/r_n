const path = require('path');

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];

module.exports = {
	entry: {
		index: __dirname + "/src/index.js"
	},

	// entry: path.resolve(__dirname, '/index.js'),

	//入口文件输出配置
	output: {
		path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
		publicPath: '/dist/'
	},

	devtool: 'eval',

	devServer: {
      contentBase: './',
      hot: true,
      port: 8888,
      inline: true,
      open: true
    },

	module: {
		//加载器配置
		loaders: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test:/\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test:/\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			},
			{
				test: /\.(svg)$/i,
				loader: 'svg-sprite',
				include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				loader: 'url-loader?limit=8192&name=[name].[ext]'
			},
			// {
			// 	test: /\.(jpe?g|png|gif|svg)$/i,
			// 	loader: 'url-loader?limit=8192&name=[name].[ext]'
			// },
		]
	},

	resolve: {
		modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
		extensions: ['', '.web.js', '.js', '.json'],
	},

};
