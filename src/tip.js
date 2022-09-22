const colors = require("colors-console");
const fg = require("fast-glob");

exports.createTipPlugin = async function (mode) {
  /*读取到.env.xx 文件*/
  let filesList = await fg(".env.*", {
    absolute: true,
  });
  /*如果没有类似文件，则不给任何提示*/
  if (filesList.length == 0) return;

  for (let file of filesList) {
    if (file.includes(`.env.${mode}`)) return;
  }

  console.log(
    colors(
      ["red", "yellowBG", "underline"],
      `furion warning: file .env.${mode} is NOT FOUND. Please check the spelling of words`
    )
  );
};
