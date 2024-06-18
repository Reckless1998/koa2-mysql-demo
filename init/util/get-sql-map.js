const walkFile = require('./walk-file')

/**
 * 获取 sql 目录下的文件目录数据
 * @return {object}
 */
function getSqlMap () {
  // 定义一个变量 basePath 并初始化为当前目录名
  let basePath = __dirname

  // 将路径中的反斜杠（\）替换为正斜杠（/），以适应跨平台路径格式
  basePath = basePath.replace(/\\/g, '\/')

  // 将路径字符串按照正斜杠（/）拆分成数组
  let pathArr = basePath.split('\/')

  // 去掉数组中的最后一个元素
  pathArr = pathArr.splice(0, pathArr.length - 1 )

  // 将数组重新拼接成字符串，并在末尾添加 '/sql/'，得到 sql 目录的路径
  basePath = pathArr.join('/') + '/sql/'

  // 调用 walkFile 函数获取 sql 目录下的所有文件，并将结果赋值给 fileList
  const fileList = walkFile(basePath, 'sql' )

  // 返回 fileList 结果
  return fileList
}


module.exports = getSqlMap