/**
 * Created by JackieWu on 2018/7/15.
 */
const bodyParser = require('koa-bodyparser');

exports.init = async () => {
  // 解析request的body
  let bodyParserOptions = {
    formLimit: "1mb"
  };
  return bodyParser(bodyParserOptions);
};
