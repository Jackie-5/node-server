/**
 * Created by JackieWu on 2018/7/15.
 */
const path = require('path');

module.exports = {
  port: 12000,
  STATIC_DIR: path.join(process.cwd(), 'service', 'static'),
  ROUTER: {
    configDir: 'source/routers',
    actionDir: 'source/controllers'
  },
  LOG_DIR: '/data/applogs/',
  viewDir: 'source/render-views',
};