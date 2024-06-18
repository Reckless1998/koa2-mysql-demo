const getSqlContentMap = require('./util/get-sql-content-map')
const { query } = require('./util/db')
const log4js = require('log4js')
const logger = log4js.getLogger()

// 打印脚本执行日志
const eventLog = function(err , sqlFile, index) {
  if(err) {
    logger.level = 'error'
    logger.error(`sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败 qwq！`)
  } else {
    logger.level = 'info'
    logger.info(`sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功 ^_^!`)
  }
}
// 获取所有sql脚本内容
let sqlContentMap = getSqlContentMap()

// 执行建表sql脚本
const createAllTables = async () => {
  for ( let key in sqlContentMap) {
    let sqlShell = sqlContentMap[key]
    let sqlShellList = sqlShell.split(';')

    for (let [i, shell] of sqlShellList.entries()) {
      if (shell.trim()) {
        let result = await query(shell)
        if (result.serverStatus === 2 ) {
          eventLog(null, key, i)
        } else {
          eventLog(true, key, i)
        }
      }
    }
  }
  console.log('sql脚本执行结束！')

}

createAllTables()