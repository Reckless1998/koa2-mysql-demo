const mysql = require('mysql2')
const config = require('../../config')
const dbConfig = config.database

// 创建 MySQL 连接池
const pool = mysql.createPool({
  host     :  dbConfig.HOST,
  user     :  dbConfig.USERNAME,
  password :  dbConfig.PASSWORD,
  database :  dbConfig.DATABASE
})

// 定义 query 函数，用于执行 SQL 查询
const query = function(sql, values) {
  return new Promise((resolve, reject) => {
    // 从连接池中获取一个连接
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log(err)
        resolve(err)
      } else {
        // 使用获取到的连接执行 SQL 查询
        connection.query(sql, values, (err, rows) => {
          if (err) {
            console.log(err)
            reject(err)
          } else {
            resolve(rows)
          }
          // 释放连接回连接池
          connection.release()
        })
      }
    })
  })
}

// 导出 query 函数
module.exports = { query }