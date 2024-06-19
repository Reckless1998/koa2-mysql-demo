// app.js
const Koa = require('koa')
const requestMiddleware = require('./requestMiddleware')

const app = new Koa()

app.use(requestMiddleware)

app.listen(3000, () => {
  console.log('app is running, port is 3000')
})