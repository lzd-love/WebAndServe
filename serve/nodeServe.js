/*
 * @Author: lzd
 * @Date: 2020-09-07 18:57:36
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-21 13:56:26
 * @Description: content description
 */
var express = require("express");
var app = express(); //使用nodejs自带的http、https模块
var https = require("https");
var http = require("http");
var fs = require("fs");
var path = require("path");
var { createProxyMiddleware } = require("http-proxy-middleware");
var cp = require("child_process");
var url = require("url");
var history = require("connect-history-api-fallback");
var multiparty = require("multiparty");
var cors = require('cors');

var compression = require('compression')

app.use(compression({filter: shouldCompress}))//用来定向压缩文件

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // 这里就过滤掉了请求头包含'x-no-compression'
    return false
  }
 
  return compression.filter(req, res)
}

var privateKey = fs.readFileSync(path.join(__dirname, "./key/key.pem"), "utf8");
var certificate = fs.readFileSync(
  path.join(__dirname, "./key/key-cert.pem"),
  "utf8"
);
var credentials = { key: privateKey, cert: certificate };


app.use(cors());//node服务文件传输数据类型确认
app.use(
  history({
    rewrites: [
      {
        //访问路径含dist则继续访问
        from: /^\/static\/.*$/,
        to: function (context) {
          return context.parsedUrl.pathname;
        }
      },
      {
        //后缀为js|css 访问dist下相应文件
        from: /^\/.*[js|css]$/,
        to: function (context) {
          return "/static";
        }
      },
      {
        //访问路径不含dist则默认访问/dist/index.html
        from: /^\/.*$/,
        to: function (context) {
          return "./";
        }
      }
    ]
  })
);//路由重定向

app.use(express.static(path.join(__dirname, "./dist")));//静态资源请求
app.use(
  "/api",
  createProxyMiddleware({
    // 代理跨域目标接口
    target: "http://127.0.0.1:8888",//10.129.11.1:8888
    changeOrigin: true,
    // 修改响应头信息，实现跨域并允许带cookie
    pathRewrite: { "^/api": "/" }, //这里重写路径
    // onProxyRes: function (proxyRes, req, res) {
    //   res.header("Access-Control-Allow-Origin", "*");
    // }, 
    // 修改响应信息中的cookie域名
    //  cookieDomainRewrite: ''  // 可以为false，表示不修改
  })
);//反向代理
app.use(
  "/ws",
  createProxyMiddleware({
    // 代理跨域目标接口
    target: "ws://127.0.0.1:8090",//10.129.11.1:8090
    changeOrigin: true,
    // 修改响应头信息，实现跨域并允许带cookie
    ws: true,
    pathRewrite: { "^/ws": "/" }, //这里重写路径
    // onProxyRes: function (proxyRes, req, res) {
    //   res.header("Access-Control-Allow-Origin", "*");
    // },
    
    // 修改响应信息中的cookie域名
    //  cookieDomainRewrite: ''  // 可以为false，表示不修改
  })
);

// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", ' 3.2.1');
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

// app.post("/post", function (req, res) {
//   console.log("主页 POST 请求");
//   res.send("Hello POST");
// });

// app.get("/get", function (req, res) {
//   console.log("主页 get 请求");
//   res.send("Hello get");
// });//使用了history中间键这里是不会触发的。

// app.post("/upload", function (req, res) {
//   var form = new multiparty.Form({ uploadDir: './files' });
//   form.parse(req, function (err, fields, files) {
//     console.log(fields, files)
//     fs.renameSync(files.path || files['file'][0].path, 'files\\' + (files.originalFilename || files['file'][0].originalFilename));
//     if (err) {
//     } else {
//       res.json({ src: files.path || files['file'][0].path })
//     }
//   });
// });

//创建http与HTTPS服务器
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
//可以分别设置http、https的访问端口号

var PORT = 8902;
var SSLPORT = 8903;
//创建http服务器

httpServer.listen(PORT, function () {
  console.log("HTTP Server is running on: http://localhost:%s", PORT);
});
//创建https服务器
httpsServer.listen(SSLPORT, function () {
  console.log("HTTPS Server is running on: https://localhost:%s", SSLPORT);
}); //可以根据请求判断是http还是https

cp.exec("start chrome http://127.0.0.1:8902/");
