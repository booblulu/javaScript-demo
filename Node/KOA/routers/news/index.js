// 引入koa-router
const Router = require("koa-router");

let newsRouter = new Router();
newsRouter.get('/', ctx=>{
    ctx.body = '新闻主页';
})

// 将子路由挂到newsRouter上，千万不能忘记routes()
newsRouter.use('/games', require('./games'));
newsRouter.use('/woman', require('./woman'));

module.exports = newsRouter.routes();