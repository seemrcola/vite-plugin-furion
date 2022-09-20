const colors = require('colors-console')
const fg = require('fast-glob')

exports.createFurionPlugin = function() {
  return {
    // 插件名称
    name: "vite-plugin-furion",

    // pre 会较于 post 先执行
    enforce: "pre", // post

    // 指明它们仅在 'build' 或 'serve' 模式时调用
    apply: "serve", // apply 亦可以是一个函数

    // 1. vite 独有的钩子：可以在 vite 被解析之前修改 vite 的相关配置。钩子接收原始用户配置 config 和一个描述配置环境的变量env
    async config(config, { command, mode }) {
      if (command == "build") return;
      /*读取到.env.xx 文件*/
      let filesList = await fg('.env.*', {
        absolute: true,
      });
      /*如果没有类似文件，则不给任何提示*/
      if(filesList.length == 0) return

      for(let file of filesList) {
        if(file.includes(`.env.${mode}`)) return 
      }

      console.log(
        colors(
          ['red','yellowBG','underline'], 
          `furion warning: file .env.${mode} is NOT FOUND. Please check the spelling of words`
        )
      )
    },
  };
}
