/**
 * Created by JackieWu on 2018/7/15.
 */

exports.init = async () => {
  return async (ctx, next) => {
    try {
      await next();
      const status = ctx.status;
      if (status === 404) {
        ctx.throw(404, 'page not found')
      }
    } catch (err) {
      ctx.status = err.status || 500;
      if (ctx.status === 401) {
        ctx.logger.warn('401:' + err.message);
        //other_error jade
        return await ctx.render('error/401', {
          message: err.message || '',
          productHead: err.productHead
        });
      }
      if (ctx.status === 404) {
        //Your 404.jade
        return await ctx.render('error/404', {
          message: err.message || ''
        });
      }
      if(ctx.status === 501){
        return ctx.body = err.message;
      }
      ctx.logger.error('500 error',err);
      await ctx.render('error/500', {
        message: err.message || ''
      });
    }
  };
};