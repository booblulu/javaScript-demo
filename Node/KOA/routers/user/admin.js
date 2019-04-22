// 引入koa-router
const Router = require("koa-router");

let admin = new Router();
admin.get('/index', ctx=>{
    ctx.body = '管理员主页';
});
module.exports = admin.routes();