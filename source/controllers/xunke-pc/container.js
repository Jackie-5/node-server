/**
 * Created by JackieWu on 2018/7/15.
 */
const React = require('react');
const Server = require('react-dom/server');

module.exports = async (ctx, next) => {
  await ctx.render('xunke-pc/index');
};