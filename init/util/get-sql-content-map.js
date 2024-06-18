const fs = require('fs')
const getSqlMap = require('./get-sql-map')

let sqlContentMap = {}

/**
 * 读取 sql 文件内容
 * @param  {string} fileName 文件名称
 * @param  {string} path     文件所在的路径
 * @return {string}          脚本文件内容
 */
function getSqlContent(fileName, path) {
  // 读取文件内容，并以二进制格式存储到 sqlContentMap 对象中
  sqlContentMap[fileName] = fs.readFileSync(path, 'binary')
}

/**
 * 封装所有 sql 文件脚本内容
 * @return {object}
 */
function getSqlContentMap () {
  // 获取所有 SQL 文件的路径映射
  let sqlMap = getSqlMap()

  // 遍历 sqlMap 中的每个文件
  for (let key in sqlMap) {
    // 读取每个文件的内容并存储到 sqlContentMap 中
    getSqlContent(key, sqlMap[key])
  }

  // 返回包含所有 SQL 文件内容的对象
  return sqlContentMap
}

// 导出 getSqlContentMap 函数
module.exports = getSqlContentMap