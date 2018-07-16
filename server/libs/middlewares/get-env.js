/**
 * Created by JackieWu on 2018/7/15.
 */
const serverConfig = require("../middle-container/server-env").getServerProperties();

exports.init = async (app) => {
  let env = 'dev';
  if (process.env.npm_lifecycle_event === 'dev') {
    env = 'dev';
  } else if (serverConfig.env) {
    switch (serverConfig.env) {
      case 'alpha':
      case 'test':
      case 'beta':
      case 'qa':
        env = 'beta';
        break;
      case 'ppe':
      case 'staging':
        env = 'ppe';
        break;
      case 'prod':
        env = 'prod';
        break;
      default:
        env = 'dev';
    }
  }
  return async function (ctx, next) {
    ctx.state.ENV = env;
    ctx.state.envLinks = require(`../../config/node-env/${env}`);
    await next();
  };
};