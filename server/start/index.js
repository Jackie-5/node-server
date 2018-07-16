/**
 * Created by JackieWu on 2018/7/15.
 */
const Koa = require('koa');
const convert = require('koa-convert');
const staticCache = require('koa-static-cache');
const config = require('../config');
const router = require('../libs/middlewares/router');
// 实例化koa
const app = new Koa();

app.init = async () => {
  // 统一错误的处理
  app.on('error', (e) => {
    app.logger.error(e);
  });

  // middleware
  const middlewares = [
    'get-env',
    'log',
    'render',
    'body',
    'handle-throw-error'
  ];

  for (let file of middlewares) {
    let md = require(`../libs/middlewares/${file}`);
    let middleware = await md.init(app);
    app.use(convert(middleware));
  }
};
(async () => {
  const port = config.port;

  await app.init();

  app.use(router.routes()).use(router.allowedMethods());

  app.use(staticCache(config.STATIC_DIR, {
    prefix: '/static',
  }));

  app.listen(port, () => {
    app.logger.info(`The start success. port ${port}`)
  });
})();

