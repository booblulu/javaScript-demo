// 引入koa-router
const Router = require("koa-router");

let games = new Router(); 
games.get('/index', ctx=>{
    ctx.body = '游戏新闻';
})
module.exports = games.routes();