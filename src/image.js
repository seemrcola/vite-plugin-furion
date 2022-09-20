const process = require('process');
const path = require('path');
const fs = require('fs')
const chokidar = require('chokidar');

const filesMap = {}

/*options默认值*/
const fix1stWord = '_'
const imgsInclude = ['jpg', 'png', 'jpeg', 'svg', 'webp', 'gif']

exports.createImagePlugin = function(options) {
  return {
    name: 'vite-plugin-images',
    // pre 会较于 post 先执行
    enforce: 'pre', // post
    apply: 'serve', // apply 可以是一个函数

    config(config, { command }) {
      fix1stWord = options.fix1stWord || fix1stWord
      imgsInclude = options.imgsInclude || imgsInclude
      /*开启文件监听*/
      watchFile()
    },
  }
}

/*根据path获取文件后缀*/
function getExt(path) {
  let len = path.split('.').length
  if (len > 1) return path.split('.')[len - 1]
  return ''
}

/*_转驼峰*/
function transformStr(str) {
  return str.replace(/_(\w)/g, (match, p1) => p1.toUpperCase());
}

/*监听文件*/
function watchFile() {
  chokidar
    .watch('src')
    .on('all', (event, url) => {
      /*windows系统兼容*/
      url = url.replace(/\\/g, '\/')

      let ext = getExt(url)
      let ifImage
      if (ext) ifImage = imgsInclude.includes(ext)

      let basename = transformStr(path.basename(url, '.' + ext))

      /*文件添加处理*/
      if (ifImage && event == 'add')
        filesMap[basename] = url

      /*文件删除处理*/
      if (ifImage && event == 'unlink')
        Reflect.deleteProperty(filesMap, basename)

      writeFile(filesMap)
    });
}

/*写入文件*/
function writeFile(filesMap) {
  let str = ''
  let keys = Object.keys(filesMap)
  keys.forEach(key => {
    /*处理key开头为数字的情况*/
    let firstWord = key[0]
    let ifNum = '0123456789'.includes(firstWord)
    str += `export const ${ifNum ? fix1stWord + key : key} = '${filesMap[key]}'; \n`
  })

  fs.writeFileSync('img.index.js', str)
}