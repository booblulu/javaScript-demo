## parcel

### 基本使用
1. 安装
```
    npm install -g parcel-bundler
```
2. 运行
```
    parcel index.html
    // 不自动刷新
    parcel --no-hmr ndex.html
```

## Pixi

### 基本使用
1. 安装
```
    npm install pixi.js-legacy
```
2.  检测
```javascript
    var pixi = require("pixi.js-legacy");

    let type = "WebGL";
    // 测试pixi的是否可用
    if( !pixi.utils.isWebGLSupported()){
        type = "canvas";
    }
    pixi.utils.sayHello(type);

    // 成功控制台输出
    // PixiJS 4.4.5 - * canvas * http://www.pixijs.com/  ♥♥♥
```
3. 基本语法
```javascript
    // 创建一个pixi画布
    let app = new PIXI.Application({
        width: 256,
        height: 256
    });
    // 将画布添加到页面
    document.body.appendChild(app.view);
```
4. 画布
```javascript
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
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);
```

## three

### 基本使用
1. 安装
```
    npm i three -s
    npm i three-orbitcontrols -s  // 控制camera插件
```
2.  基本语法
```javascript
    var THREE = require("three");  
    var Orbitcontrols = require("three-orbitcontrols");

    // 查看版本
    console.log(THREE.REVISION);

    // 场景    首先我需要一个3D观察空间
    var scene = new THREE.Scene();

    /*
        相机    建立数据模型（需要一个相机用来拍摄） 默认位置(0,0,0) z轴越小越近，越大越远
        PerspectiveCamera 远景相机（
            视角，默认50度
            相机拍摄面的长宽比(总会以宽除以高，否则会出现挤压变形)，
            近裁剪面
            远裁剪面
        ）
    */
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    // 将照相机的视角对准舞台
    camera.lookAt(scene.position);

    // 渲染器   WebGL绘图上下文和着色器（用来将拍摄好的场景转成胶卷）
    var renderer = new THREE.WebGLRenderer();
    // 渲染空间的尺寸，一般使用屏幕的宽高
    // renderer.setSize( window.innerWidth, window.innerHeight, false );   1/2分辨率绘制应用程序
    renderer.setSize( window.innerWidth, window.innerHeight );
    // 将画布(renderer.domElement)挂载到body内
    document.body.appendChild( renderer.domElement );
    // 修改背景颜色
    renderer.setClearColor(0xFFFFFF, 1.0);

    // 添加角色
    // 创建一个几何图形（立方体），使用盒子模型（BoxGeometry），包含了立方体所有顶点和填充面的对象
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // 使用材料上色，网孔基础材料（MeshBasicMaterial）
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // 可以对六个面分别上色，也可以对几个面上色，但未上色的面则为背景色
    var material = [
        new THERE.MeshBasicMaterial({color: "pink"}),
        new THERE.MeshBasicMaterial({color: "lightgreen"}),
        new THERE.MeshBasicMaterial({color: "yellow"}),
        new THERE.MeshBasicMaterial({color: "blue"}),
        new THERE.MeshBasicMaterial({color: "lightblue"}),
        new THERE.MeshBasicMaterial({color: "green"})
    ];
    // 网孔，用来承载几何模型的一个对象
    var cube = new THREE.Mesh( geometry, material );
    // 添加到场景中，默认会在坐标点(0, 0, 0)，会导致相机和立方体发生空间重合
    scene.add( cube );
    // 所以，要把相机的位置移出来一些
    camera.position.z = 5;

    // 拖动改变方向
    var controls = new Orbitcontrols(camera, renderer.domElement);
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true
    // 动态阻尼系数 就是鼠标拖拽旋转灵敏度 
    controls.dampingFactor = 0.25

    // 启动摄像机缩放
    controls.enableZoom = true
    // 鼠标缩放最小/最大的距离
    controls.minZoom = 200;
    controls.maxZoom = 400;

    // 是否允许右键拖拽
    controls.enablePan = false;

    // 是否自动旋转
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 2.0;

    // 渲染场景
    function render() {
        // 以每秒60次的频率绘制场景。
        // 浏览器Tab切换后停止渲染以节约资源，屏幕刷新同步避免无效资源，在不支持该借口的浏览器中能安全退回setInterval
        requestAnimationFrame( render );
        
        // 旋转
        cube.rotation.x += 0.1;     // x轴旋转（上下） 
        cube.rotation.y += 0.1;  // y轴旋转（左右）
        cube.rotation.z += 0.1;  // z轴旋转 ？？？

        // 渲染场景和相机
        renderer.render( scene, camera );
    }
    render();
```

## p5

### 基本使用
1. 安装
```
    npm i p5 -s
```
2. 基本语法
```javascript
    import p5 from "p5";

    // one
    var s = new p5(function(_){});
    s.setup = function(){
        s.createCanvas(500, 500);
        s.noLoop();
        document.querySelector(".main").appendChild(s.canvas);
    }
    s.draw = () => { 
        s.background(255, 0, 0);
        s.ellipse(s.mouseX, s.mouseY, 10, 10);
    };

    // two
    var s = new p5(function(_){
        _.setup = function(){
            s.createCanvas(500, 500);
            s.noLoop();
            document.querySelector(".main").appendChild(s.canvas);
        }
        _.draw = () => { 
            s.background(255, 0, 0);
            s.ellipse(s.mouseX, s.mouseY, 10, 10);
        };
    });
    
```