//  安装淘宝镜像cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org

//  安装依赖
cnpm install

// 数据库初始化
npm run init_sql

// 编译react.js源码
npm run start_static

// 启动服务
npm run start_server

###### 访问项目
chrome浏览器访问：http://localhost:3000/admin

#### 框架设计
###### 实现概要
+ koa2搭建服务
+ MySQL作为数据库
    + mysql 5.7版本
    + 存储普通数据
    + 存储session登录态数据
+ 渲染
    + 服务端渲染：ejs作为服务端渲染的模板引擎
    + 前端渲染：用webpack2环境编译react.js动态渲染页面，使用ant-design框架

###### 文件目录设计
```
·
├── init # 数据库初始化目录
│   ├── index.js # 初始化入口文件
│   ├── sql/    # sql脚本文件目录
│   └── util/   # 工具操作目录
├── package.json 
├── config.js # 配置文件
├── server  # 后端代码目录
│   ├── app.js # 后端服务入口文件
│   ├── codes/ # 提示语代码目录
│   ├── controllers/    # 操作层目录
│   ├── models/ # 数据模型model层目录
│   ├── routers/ # 路由目录
│   ├── services/   # 业务层目录
│   ├── utils/  # 工具类目录
│   └── views/  # 模板目录
└── static # 前端静态代码目录
    ├── build/   # webpack编译配置目录
    ├── output/  # 编译后前端代码目录&静态资源前端访问目录
    └── src/ # 前端源代码目录
```