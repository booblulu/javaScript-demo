// 引入koa-router
const Router = require("koa-router");

let woman = new Router();
woman.get('/index', ctx=>{
    ctx.body = '女性频道';
});
module.exports = woman.routes();