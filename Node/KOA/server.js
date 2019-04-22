// 引入koa
const Koa = require('koa');
// 引入koa-router
const Router = require("koa-router");

// 创建服务器
let server = new Koa();

// 设置端口
server.listen('8081');

// 总路由
// let router = new Router();
//     // 用户路由
//     let userRouter = new Router();
//         let admin = new Router();
//             admin.get('/index', ctx=>{
//                 ctx.body = '管理员主页';
//             })
//         let company = new Router();
//             company.get('/index', ctx=>{
//                 ctx.body = '企业主页';
//             })
//         userRouter.use('/admin',admin.routes());
//         userRouter.use('/company',company.routes());
//     // 新闻路由
//     let newsRouter = new Router();
//         let woman = new Router();
//             woman.get('/index', ctx=>{
//                 ctx.body = '女性频道';
//             })
//         let games = new Router(); 
//             games.get('/index', ctx=>{
//                 ctx.body = '游戏新闻';
//             })
//         // 将子路由挂到newsRouter上，千万不能忘记routes()
//         newsRouter.use('/games', games.routes());
//         newsRouter.use('/woman', woman.routes());
// router.use('/user', userRouter.routes());
// router.use('/news', newsRouter.routes());

// 嵌套路由，文件夹内是index时可以省略
// server.use(require('./routers'));


// 路由参数 ctx.params
// let router = new Router();

// router.get('/news/:id', async (ctx, next)=>{
//     let {id} = ctx.params;
//     ctx.body = `access ${id} `; 
//     // 会跳转到下一个符合条件的路由，由于是async函数，需要加await
//     await next();
// })

// router.get('/news/1', async ctx=>{
//     ctx.body += `1`; // access 1 1
// })

// server.use(router.routes());

server.context.a = 11;


// 引入koa-static
// const static = require('koa-static');
// 创建路由
// let staticRouter = new Router();
// staticRouter.all(/\.(html|htm)$/i,static('./static',{
//     maxage: 7200*1000// html两个小时一刷新
// }));
// staticRouter.all(/\.(jpq|png|gif)$/i,static('./static',{
//     maxage: 60*86400*1000   // 图片两个月一刷新
// }));
// staticRouter.all(/\.css$/i,static('./static',{
//     maxage: 1*86400*1000   // css一天一刷新
// }));
// staticRouter.all('',static('./static',{
//     maxage: 60*86400*1000   // 其他文件两个月一刷新
// }));
// 挂在服务器上
// server.use(staticRouter.routes());


const body = require("koa-better-body");

server.use(body({
    uploadDir: './static/upload'
}));


server.use(async ctx=>{
    console.log(ctx.request.fields);

    ctx.body = "hello";
})