###  安装依赖
yarn install

### 数据库初始化
yarn init_sql

### 编译react.js源码
yarn start_static

### 启动服务
yarn start_server

### 访问项目
chrome 浏览器访问：http://localhost:3000/admin

### 框架设计

##### 实现概要
+ koa2 搭建服务
+ MySQL 作为数据库
    + mysql ^8.0 版本
    + 存储普通数据
    + 存储 session 登录态数据
+ 渲染
    + 服务端渲染：ejs作为服务端渲染的模板引擎
    + 前端渲染：用 webpack2 环境编译 react.js 动态渲染页面，使用 ant-design 框架

##### 文件目录设计
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