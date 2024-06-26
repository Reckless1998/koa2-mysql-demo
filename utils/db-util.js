const allConfig = require("../config")
const config = allConfig.database
const mysql = require("mysql2")

const pool = mysql.createPool({
  host     : config.HOST,
  user     : config.USERNAME,
  password : config.PASSWORD,
  database : config.DATABASE
})

const query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })

}

const createTable = function(sql) {
  return query(sql, [])
}


const findDataById = function(table,  id) {
  let  _sql =  "SELECT * FROM ?? WHERE id = ? "
  return query(_sql, [table, id, start, end])
}


const findDataByPage = function(table, keys, start, end) {
  let  _sql =  "SELECT ?? FROM ??  LIMIT ? , ?"
  return query(_sql, [keys, table, start, end])
}


const insertData = function(table, values) {
  let _sql = "INSERT INTO ?? SET ?"
  return query(_sql, [table, values])
}


const updateData = function(table, values, id) {
  let _sql = "UPDATE ?? SET ? WHERE id = ?"
  return query(_sql, [table, values, id])
}


const deleteDataById = function(table, id) {
  let _sql = "DELETE FROM ?? WHERE id = ?"
  return query(_sql, [table, id])
}


const select = function(table, keys) {
  let  _sql =  "SELECT ?? FROM ?? "
  return query(_sql, [keys, table])
}

const count = function(table) {
  let  _sql =  "SELECT COUNT(*) AS total_count FROM ?? "
  return query(_sql, [table])
}

module.exports = {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count,
}