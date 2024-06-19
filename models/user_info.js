const dbUtils = require('./../utils/db-util')

const handleResult = (result) => {
  if (Array.isArray(result) && result.length > 0) {
    return result
  } else {
    return null
  }
}

const user = {

  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create(model) {
    return await dbUtils.insertData('user_info', model)
  },


  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options) {
    const sql = `
    SELECT * FROM user_info
    where email="${options.email}" or name="${options.name}"
    limit 1  
    `
    let result = await dbUtils.query(sql)
    return handleResult(result)
  },

  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword(options) {
    const sql = `
    SELECT * from user_info
    where password="${options.password}" and name="${options.name}"
    limit 1
    `
    let result = await dbUtils.query(sql)
    return handleResult(result)
  },

  async getUserInfoByUserName(userName) {
    let result = await dbUtils.query(
        'user_info',
        [
          'id',
          'email',
          'name',
          'detail_info',
          'create_time',
          'modified_time'
        ]
    )

    return handleResult(result)
  }
}

module.exports = user