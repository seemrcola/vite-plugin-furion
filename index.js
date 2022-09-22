const { createTipPlugin } = require('./src/tip.js')
const { createImagePlugin } = require('./src/image.js')

/*
* @params: options = {fix1stWord,imgsInclude}
*/
exports.createFurionPlugin = (options) => {
  return {
    // 插件名称
    name: 'vite-plugin-furion',
    // pre 会较于 post 先执行
    enforce: 'pre', 
    // 指明它们仅在 'build' 或 'serve' 模式时调用
    apply: 'serve', 
   
    config(config, { command,mode }) {
      createTipPlugin(mode)
      createImagePlugin()
    },
  }
}
