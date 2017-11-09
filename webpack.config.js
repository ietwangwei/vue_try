// 引入依赖模块
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// 入口文件，路径相对于本文件所在的位置，可以写成字符串、数组、对象
	entry: {
		// path.resolve([from ...], to) 将to参数解析为绝对路径
		index: path.resolve(__dirname, 'src/main.js'),
		// 需要被提取为公共模块的群组
		vendors: ['vue', 'vue-router'],
	},

	// 输出配置
	output: {
		// 输出文件，路径相对于本文件所在的位置
		path: path.resolve(__dirname, 'build'),

		// 设置publicPath这个属性会出现很多问题：
		// 1.可以看成输出文件的另一种路径，差别路径是相对于生成的html文件；
		// 2.也可以看成网站运行时的访问路径；
		// 3.该属性的好处在于当你配置了图片CDN的地址，本地开发时引用本地的图片资源，上线打包时就将资源全部指向CDN了，如果没有确定的发布地址不建议配置该属性，特别是在打包图片时，路径很容易出现混乱，如果没有设置，则默认从站点根目录加载
		// publicPath: '../static/js/',

		// 基于文件的md5生成Hash名称的script来防止缓存
		filename: '[name].[hash].js',
		// 非主入口的文件名，即未被列在entry中，却又需要被打包出来的文件命名配置
		chunkFilename: '[id].[chunkhash].js'
	},

	// 其他解决方案
	resolve: {
		// require时省略的扩展名，遇到.vue结尾的也要去加载
		extensions: ['', '.js', '.vue'],
		// 模块别名地址，方便后续直接引用别名，无须写长长的地址，注意如果后续不能识别该别名，需要先设置root
		alias: {
			'style':'./styles',
			'@':'../components',
		}
	},

	// 不进行打包的模块
	externals: {},

	// 模块加载器
	module: {
		// loader相当于gulp里的task，用来处理在入口文件中require的和其他方式引用进来的文件，test是正则表达式，匹配要处理的文件；loader匹配要使用的loader，"-loader"可以省略；include把要处理的目录包括进来，exclude排除不处理的目录       
		loaders: [
			//  使用vue-loader 加载 .vue 结尾的文件
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/
			},
			// 使用babel 加载 .js 结尾的文件
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'stage-0'],
					plugins: ['transform-runtime']
				}
			},
			// 加载图片
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader',
				query: {
					// 把较小的图片转换成base64的字符串内嵌在生成的js文件里
					limit: 10000,
					// 路径要与当前配置文件下的publicPath相结合
					name: '../img/[name].[ext]?[hash:7]'
				}
			}, {
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}, {
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader'
			}
		]
	},
	// 配置插件项
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html', // Load a custom template 
			inject: 'body' // Inject all scripts into the body 
		}),
	]
}