const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //支持.vue
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//提取样式到css
const HtmlWebpackPlugin = require('html-webpack-plugin') //html生成模板
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin //webpack打包可视化
//const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //引入清除文件插件
const MomentLocalesPlugin = require('moment-locales-webpack-plugin'); //去除moment 的其他语言版本
const webpack =require('webpack')

module.exports = {
    mode: 'development', //'production' 生产环境  development 开发
    entry: { //入口文件
        jilong: './view/src/view/jilong/jilong.js',
        menu: './view/src/view/menu/index.js',

    },
    output: {
        filename: 'js/[name].js', //打包后的文件名  开发环境
        //filename: '/js/[name].[contenthash:4].js', //打包后的文件名   生产环境
        chunkFilename: 'js/[name].ck.js', //动态生成的名称
        //chunkFilename: '/js/[name].[contenthash:4].ck.js', //动态生成的名称
        path: path.resolve(__dirname, 'view/dist/script'), //路径要绝对路径 默认插件path 可以帮助 resolve 解析 __dirname默认的：
        publicPath: '/view/dist/script/'//路由懒加载的路径 ，不加这个路径会错
        //library:'[name]',//生成的js会暴露一个全局接口
    },
    externals: { //“资源名”:“外部引入名”
        'vue': 'Vue',
        //'vue-router': 'VueRouter',
    },
    module: { //模块
        rules: [ //规则
            { // 提取样式到css
                test: /\.css$/,
                use:[
                //{
                //    loader: MiniCssExtractPlugin.loader,
                //    options: {
                //        // 这里可以指定一个 publicPath
                //        // 默认使用 webpackOptions.output中的publicPath
                //        // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                //        // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                //        publicPath: '../',       
                //        // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                //        //hmr: devMode, // 仅dev环境启用HMR功能
                //    },
                //},
                'style-loader',
                'css-loader',
                'postcss-loader'
                ],
            },
            { //scss提取样式到css
                test: /\.scss$/,
                use:[
                //{
                //    loader: MiniCssExtractPlugin.loader,
                //    options: {
                //        // 这里可以指定一个 publicPath
                //        // 默认使用 webpackOptions.output中的publicPath
                //        // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                //        // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                //        publicPath: '../',  
                //        // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                //        //hmr: devMode, // 仅dev环境启用HMR功能
                //    },
                //},
                'style-loader',
                'css-loader',
                'sass-loader',
                'postcss-loader'
                ],
            },
            { //用于使用label插件
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                }],
            },
            { //用于使用label插件
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: { //如果有这个设置则不用再添加.babelrc文件进行配置  路由懒加载
                        "babelrc": false, // 不采用.babelrc的配置                       
                        "plugins": [
                            "@babel/plugin-syntax-dynamic-import"
                        ]
                    }
                }],
            },
            { //支持.vue文件
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            //{
            //    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //
            //    use: [{
            //        loader: "url-loader?esModule=false",
                    
            //    }],
            //},
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //
                use: [{
                    loader: "url-loader",
                    options: {
                        name: 'images/[name].[ext]',
                        esModule:false,
                        limit: 1024*20
                    }
                }],
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: 'video/[name].[ext]',
                        esModule:false
                    }
                }],
            },
            { //支持icon和图片等
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: [{
                    loader: 'url-loader?name=font/[name].[md5:hash:hex:7].[ext]',
                    options: {}
                }]
            }
            //{
            //    test: /\.svg$/,
            //    use: [{
            //        loader: "svg-inline-loader",
            //        options: {
            //            name: 'images/[name].[ext]',
            //        }
            //    }],
            //}
        ]
    },
    
    plugins: [
        new VueLoaderPlugin(), //支持.vue
        //new MiniCssExtractPlugin({
        //    filename: "css/[name].css",
        //    //filename: "[name].[chunkhash:4].css",
        //    chunkFilename: "css/[name].ck.css"
        //}),//提取样式到css
        //new CleanWebpackPlugin(), //清除文件插件
        new MomentLocalesPlugin({localesToKeep: ['zh-cn'],}),//清除出moment 的en以外的语言
        //new webpack.NamedModulesPlugin(), //热更新
        //new webpack.HotModuleReplacementPlugin(), //热更新

         new HtmlWebpackPlugin({ // 打包输出HTML  
             title: '上海吉陇合金材料有限公司',
             minify: { // 压缩HTML文件
                 removeComments: true, // 移除HTML中的注释
                 collapseWhitespace: false, // 删除空白符与换行符
                 minifyCSS: true // 压缩内联css
             },
             template: './view/src/view/jilong/jilong.html', //模板
             filename: path.resolve(__dirname, 'view/dist/jilong/jilong.html'), //生成
             chunks: ['jilong'] //引用的js
         }),
         new HtmlWebpackPlugin({ // 打包输出HTML  
             title: '物贸菜单',
             minify: { // 压缩HTML文件
                 removeComments: true, // 移除HTML中的注释
                 collapseWhitespace: false, // 删除空白符与换行符
                 minifyCSS: true // 压缩内联css
             },
             template: './view/src/view/menu/index.html', //模板
             filename: path.resolve(__dirname, 'view/dist/menu/index.html'), //生成
             chunks: ['menu'] //引用的js
         })
        
    ],
    optimization: {
        //抽取公共的js和css   在html中引用
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons", //自己的公共模块
                    chunks: "all",
                    minChunks: 2,
                    minSize: 1,
                    priority: 0
                },
                vendor: {
                    name: 'vendor', //第三方的公共模块
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10
                }
            }
        }
    },
    resolve: { //vant import vue会有错误 需要重新给vue起别名
        modules: [ // 优化模块查找路径
           path.resolve('view/src'),
           path.resolve('node_modules') // 指定node_modules所在位置 当你import 第三方模块时 直接从这个路径下搜索寻找
        ],
        alias: {
            'vue$': 'vue/dist/vue.js' //内部为正则表达式  vue结尾的
            //'vue': 'vue/dist/vue.js', //开发版本
            //'vue': 'vue/dist/vue.min.js' //生产版本
        },
    },
    devtool: "eval-source-map", //生产环境（省略 devtool 选项） 开发 eval  eval-source-map 好一点
    devServer: {
        publicPath: "/view/dist/script/",
        //publicPath:path.resolve(__dirname, 'view/dist/script/'),
        //contentBase: './view/dist',
        port: 3000,
        compress: false,
        open:false,
        hot: true
    },
};