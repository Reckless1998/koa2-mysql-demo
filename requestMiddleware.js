// requestMiddleware.js
const path = require('path')
const glob = require('glob')

// actions 的绝对路径
const basePath = path.resolve(__dirname, './actions')
// 获取 actions 目录下所有的 .js 文件，并返回其绝对路径
const fileList = glob.sync(path.resolve(__dirname, './actions', '**/*.js'))

const keyGenerator = (method, router) => {
  return method + '_' + router
}

// 文件路由映射表
let routerMap = {}
fileList.forEach(item => {
  // 解构的方式获取当前文件导出对象中的 method 属性和 handler 属性
  const { method, handler } = require(item)
  // 获取和 actions 目录的相对路径，例如：goods/getInfo.js
  // path.relative(from, to) 计算并返回从 from 路径到 to 路径的相对路径。
  const relative = path.relative(basePath, item)
  // 获取文件名后缀
  const extname = path.extname(item)
  // 剔除后缀 .js，并在前面加一个 '/'，例如：/goods/geInfo
  const fileRouter = '/' + relative.split(extname)[0]
  // 连接 method，形成一个唯一请求，例如：GET_/goods/getInfo
  const key = keyGenerator(method, fileRouter)
  // 保存在路由表里面
  routerMap[key] = handler
})

const requestMiddleware = async (ctx, next) => {
  const { path, method } = ctx

  // 构建和文件路由匹配的形式为 GET_ 路由
  const key = keyGenerator(method, path)

  // 如果匹配到就去执行 handler 方法
  if (routerMap[key]) {
    routerMap[key](ctx)
    next()
    return
  }

  ctx.body = '404 match no router'
  next()
}

module.exports = requestMiddleware