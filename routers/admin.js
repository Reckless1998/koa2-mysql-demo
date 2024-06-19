/**
 * 管理员用户子路由
 */
const Router = require('koa-router')
const router = new Router()


const admin = require('./../controllers/admin')

router.get('/', admin.indexPage)

module.exports = router