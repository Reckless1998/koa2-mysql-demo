// routers/index.js
const compose = require('koa-compose')
const { globSync } = require('glob')
const { resolve } = require('path')

composedRoutes = () => {
  let routers = []

  // 递归式获取当前文件夹下所有的.js文件
  globSync(resolve(__dirname, '**/*.js'))
      // 排除index.js文件, 因为这个文件不是具体的路由文件
      .filter(value => !~value.indexOf('index.js'))
      .forEach(router => {
        // router.routes() 返回一个中间件函数，它用于注册路由处理程序
        // router.allowedMethods() 返回一个中间件函数，它用于处理请求方法不被允许的情况
        routers.push(require(router).routes())
        routers.push(require(router).allowedMethods())
      })

  // 函数返回值为中间件函数
  return compose(routers)
}

module.exports = composedRoutes