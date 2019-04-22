// 引入koa-router
const Router = require("koa-router");

let company = new Router();
company.get('/index', ctx=>{
    ctx.body = '企业主页';
});
module.exports = company.routes();