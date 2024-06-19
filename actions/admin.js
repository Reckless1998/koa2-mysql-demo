const admin = require('../controllers/admin')

// todo 这里需要写成数组形式，因为一个文件可能对应多个执行方法
//  对应的 requestMiddleware 也需要更改
module.exports = {
  method: 'GET',
  handler: admin.indexPage
}