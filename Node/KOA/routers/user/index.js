// 引入koa-router
const Router = require("koa-router");

let userRouter = new Router();
userRouter.get('/', ctx=>{
    ctx.body = '用户主页';
})

userRouter.use('/admin', require('./admin'));
userRouter.use('/company', require('./company'));

module.exports = userRouter.routes();