/**
 * Created by JackieWu on 2018/7/15.
 */
const prefix = '';
const routers = [
  {
    url: '/',
    method: ['get', 'post'],
    action: ['/xunke-pc/container']
  },
  {
    url: '*',
    method: ['get', 'post'],
    action: ['/xunke-pc/container']
  },
];

module.exports = {
  prefix: prefix,
  routers: routers
};
