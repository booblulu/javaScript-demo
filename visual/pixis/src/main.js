var PIXI = require("pixi.js-legacy");

// 创建一个pixi画布，使用Canvas还是WebGL，取决于浏览器支持哪一个
let app = new PIXI.Application({
    width: 256,
    height: 256,
    antialias: true,     // 圆滑边界
    transparent: false,  // 透明度
    resolution: 1        // 分辨率
});
// 将画布添加到页面
document.body.appendChild(app.view);
// 修改画布背景色，16进制
app.renderer.backgroundColor = 0x633577;
// 修改画布的宽高 
// app.renderer.view.width = 512;
// app.renderer.view.height = 512;
// 确保resize的宽高格式正确
// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);


// 需要一个舞台
// app.stage

// 由于pixi用WebGL和Gpu渲染图像，所以图像需要转换成Gpu可以处理的版本，这样的图像称为纹理
// 可以在纹理缓存中找到它
// let texture = PIXI.utils.TextureCache["./images/snow.jpg"];

// 加载图片变成纹理
PIXI.loader
    .add("images/snow.jpg")
    .load(setup);

function setup(){
    // 创建一个精灵，使用纹理
    let sprite = new PIXI.Sprite(
        PIXI.loader.resources["images/snow.jpg"].texture
    );
    app.stage.addChild(sprite);
}