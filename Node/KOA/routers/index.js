// 引入koa-router
const Router = require("koa-router");

let router = new Router();
router.get('/', ctx=>{
    ctx.body = '首页'; 
})
router.use('/user', require('./user'));
router.use('/news', require('./news'));

module.exports = router.routes();