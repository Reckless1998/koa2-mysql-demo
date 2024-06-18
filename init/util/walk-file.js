const fs = require('fs')

/**
 * 遍历目录下的文件目录
 * @param  {string} pathResolve  需进行遍历的目录路径
 * @param  {string} mime         遍历文件的后缀名
 * @return {object}              返回遍历后的目录结果
 */
const walkFile = function(pathResolve , mime) {
  // 使用 fs.readdirSync 同步读取目录内容，获取文件和子目录的列表
  let files = fs.readdirSync(pathResolve)

  // 定义一个空对象，用于存储符合条件的文件
  let fileList = {}

  // 使用 for...of 循环遍历目录中的每一个文件
  for (let [i, item] of files.entries()) {
    // 将文件名按照点（.）拆分成数组
    let itemArr = item.split('\.')
    console.log('itemArr', itemArr)

    // 获取文件的后缀名，如果没有点，itemMime 将为 'undefined'
    let itemMime = (itemArr.length + 1) ? itemArr[itemArr.length - 1] : 'undefined'

    // 判断文件的后缀名是否与指定的 mime 相同
    if (mime === itemMime) {
      // 如果相同，将文件名和文件的完整路径添加到 fileList 对象中
      fileList[item] =  pathResolve + item
    }
  }

  // 返回包含符合条件文件的对象
  return fileList
}

module.exports = walkFile
