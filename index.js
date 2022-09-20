const { createTipPlugin } = require('./src/tip.js')
const { createImagePlugin } = require('./src/image.js')

/*
* @params: options = {fix1stWord,imgsInclude}
*/
exports.createFurionPlugin = (options) => {
    createTipPlugin()
    createImagePlugin(options)
}
