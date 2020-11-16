/*
 * @Author: lzd
 * @Date: 2020-09-04 08:54:44
 * @LastEditors: lzd
 * @LastEditTime: 2020-11-13 13:44:38
 * @Description: content description
 */
const path = require("path"); // 引入path模块
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 压缩模块

module.exports = {
  outputDir: path.resolve(__dirname, "dist/"),
  assetsDir: "static",
  configureWebpack: {
    // output: {
    //   path: path.resolve(__dirname, 'dist/'),
    //   publicPath: "/static/"
    // },
    resolve: {
      alias: {
        "@api": path.resolve(__dirname, "src/api"),
        "@plugins": path.resolve(__dirname, "src/plugins"),
        "@config": path.resolve(__dirname, "src/config"),
        "@assets": path.resolve(__dirname, "src/assets")
      }
    },
    externals: {
      BMap: "BMap",
      BMap_Symbol_SHAPE_POINT: "BMap_Symbol_SHAPE_POINT"
    },
    plugins: process.env.NODE_ENV === 'production'?[new CompressionWebpackPlugin(
      {
        // filename: info => {
        //   console.log(info)
        //   return `${info.path}.gz${info.query}`
        // },
        algorithm: 'gzip',
        threshold: 0, // 只有大小大于该值的资源会被处理 10240
        test: new RegExp('\\.(' + ['js','css'].join('|') + ')$'
        ),
        minRatio: 1, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      }
    )]:[]
  },
  pluginOptions: {
    moment: {
      locales: [""]
    },
    htmlWebpackPlugin: {
      title: "JQ管理系统"
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "JQ管理系统",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/main.js'
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://47.112.136.15:8888", //目标地址
        ws: false, //// 是否启用websockets
        secure: false, //是否使用https加密 如果后台是非安全证书，关闭加密
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { "^/api": "" } //这里重写路径
      },
      "/ws": {
        target: "ws://47.112.136.15:8090", //目标地址
        ws: true, //// 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { "^/ws": "" } //这里重写路径
      }
    }
  },
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: {

  //       }
  //     },
  //   }
  // },
  transpileDependencies: ["vue-echarts", "resize-detector"]
};
