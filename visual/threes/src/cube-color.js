var THREE = require("three");
var Orbitcontrols = require("three-orbitcontrols");

// 创建场景
var scene = new THREE.Scene();

// 创建远景相机
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// 将照相机的视角对准舞台
camera.lookAt(scene.position);

// 创建渲染器
var renderer = new THREE.WebGLRenderer();
// 渲染大小
renderer.setSize(window.innerWidth,window.innerHeight);
// 将画布添加到body中
document.body.appendChild(renderer.domElement);

// 创建几何图形，立方体(cube)
var geometry = new THREE.CubeGeometry(2,2,2); // 搭建模型
// var material = new THREE.MeshBasicMaterial({color: 0x00ff00}); // 填色
var material = [
    new THREE.MeshBasicMaterial({color: "pink"}),
    new THREE.MeshBasicMaterial({color: "lightgreen"}),
    new THREE.MeshBasicMaterial({color: "yellow"}),
    new THREE.MeshBasicMaterial({color: "blue"}),
    new THREE.MeshBasicMaterial({color: "lightblue"}),
    new THREE.MeshBasicMaterial({color: "green"})
];
var cube = new THREE.Mesh(geometry, material);   // 创建网孔
// 添加到场景中
scene.add(cube);
// 修改相机的位置，避免重叠
camera.position.z = 10;

// 拖动改变方向
var controls = new Orbitcontrols(camera, renderer.domElement);
// 使动画循环使用时阻尼或自转 意思是否有惯性
controls.enableDamping = true
// 动态阻尼系数 就是鼠标拖拽旋转灵敏度 
controls.dampingFactor = 0.25

// 启动摄像机缩放
controls.enableZoom = true

// 是否允许右键拖拽
controls.enablePan = false;

// 是否自动旋转
// controls.autoRotate = true;
// controls.autoRotateSpeed = 2.0;



// 渲染
function render(){
    // 循环
    requestAnimationFrame(render);

    cube.rotation.x += 0.1;     // x轴旋转（上下） 
    cube.rotation.y += 0.1;  // y轴旋转（左右）
    cube.rotation.z += 0.1;  // z轴旋转 ？？？

    controls.update();

    // 渲染成图形
    renderer.render(scene, camera);
}
// start
render();