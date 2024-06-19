/**
 * 用户业务操作
 */

const validator = require('validator')
const userModel = require('../models/user_info')
const userCode = require('../codes/user')

const user = {

  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async create(user) {
    return await userModel.create(user)
  },

  /**
   * 查找存在用户信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne(formData) {
    const result = await userModel.getExistOne({
      email: formData.email,
      name: formData.name
    })
    return result
  },

  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn(formData) {
    const result = await userModel.getOneByUserNameAndPassword({
      password: formData.password,
      name: formData.name
    })

    return result
  },

  /**
   * 根据用户名查找用户业务操作
   * @param  {string} userName 用户名
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName(userName) {
    const result = await userModel.getUserInfoByUserName(userName) || {}
    const userInfo = {
      id: result.id,
      email: result.email,
      userName: result.name,
      detailInfo: result.detail_info,
      createTime: result.create_time
    }
    return userInfo
  },

  /**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  async validatorSignUp(userInfo) {
    let result = {
      success: false,
      message: ''
    }

    const validatorMap = [
      {
        condition: /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false,
        message: userCode.ERROR_USER_NAME
      },
      {
        condition: !validator.isEmail(userInfo.email),
        message: userCode.ERROR_EMAIL
      },
      {
        condition: !/[\w+]{6,16}/.test( userInfo.password),
        message: userCode.ERROR_PASSWORD
      },
      {
        condition: userInfo.password !== userInfo.confirmPassword,
        message: userCode.ERROR_PASSWORD_CONFIRM
      }
    ]

    const errorResult = validatorMap.find(item => item.condition)
    result.message = errorResult.message
    if (errorResult) return errorResult

    result.success = true

    return result
  }
}

module.exports = user