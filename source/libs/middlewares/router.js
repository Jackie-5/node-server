/**
 * Created by JackieWu on 2018/7/15.
 */

const Router =require('koa-router');
const fs =require('fs');
const config =require('../../config');

const routerFloder = `${process.cwd()}/${config.ROUTER.configDir}`;
const actionsFloder = `${process.cwd()}/${config.ROUTER.actionDir}`;
const routerInit = new Router();


/**
 * 引入Action files.
 * @param {Array} config 配置DATA
 * @param {String} prefix Url Prefix
 */
function setRouteByConfig (routerConfig, prefix = '') {
  const router = new Router();
  for (let i = 0; i < routerConfig.length; i += 1) {
    const rConfig = routerConfig[i];
    const methods = !Array.isArray(rConfig.method) ? [rConfig.method] : rConfig.method;
    const actions = !Array.isArray(rConfig.action) ? [rConfig.action] : rConfig.action;
    const actionArrays = [];
    for (let j = 0; j < actions.length; j += 1) {
      let actionFile = null;
      try {
        /* eslint-disable global-require, import/no-dynamic-require */
        actionFile = require(`${actionsFloder}${actions[j]}`);
      } catch (e) {
        console.error(e);
        console.error(`找不到Action file: .${actionsFloder}${actions[j]}`);
      }
      if (actionFile) {
        actionArrays.push(actionFile);
      }
    }
    // Register url with methods and actinos.
    if (Array.isArray(rConfig.url)) {
      rConfig.url.forEach((url)=>{
        router.register(url, methods, actionArrays);
      });
    } else {
      router.register(rConfig.url, methods, actionArrays);
    }
  }
  routerInit.use(prefix, router.routes(), router.allowedMethods());
}


/**
 * 引入Router config files.
 * @param  {String} dirPath Router configs dir path
 */
function readRouteConfigFiles (dirPath) {
  let checkPrefix = [];
  fs.readdirSync(dirPath).forEach((file) => {
    let prefix = '';
    let routers = [];
    let rConfig = null;
    if (fs.lstatSync(`${dirPath}/${file}`).isFile()) {
      /* eslint-disable global-require, import/no-dynamic-require */
      rConfig = require(`${dirPath}/${file}`);
      prefix = rConfig.prefix ? `/${rConfig.prefix}` : '';
      routers = Array.isArray(rConfig.routers) ? rConfig.routers : [];

      if (checkPrefix.indexOf(prefix) > -1) {
        throw `Url Prefix: ${prefix} 重复 , File: ${file}`;
      }

      if (!prefix && !(file.indexOf('indexRouter.js') > -1)) {
        throw `Url Prefix: 必须要设置 , File: ${file}`;
      }

      if (routers.length > 0) {
        setRouteByConfig(routers, prefix);
      }
      checkPrefix.push(prefix);
    }
  });
}

readRouteConfigFiles(routerFloder);

module.exports = routerInit;
