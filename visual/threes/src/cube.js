var THREE = require("three");

// 创建场景
var scene = new THREE.Scene();

// 创建远景相机
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// 创建渲染器
var renderer = new THREE.WebGLRenderer();
// 渲染大小
renderer.setSize(window.innerWidth,window.innerHeight);
// 将画布添加到body中
document.body.appendChild(renderer.domElement);

// 创建几何图形，立方体(cube)
var geometry = new THREE.CubeGeometry(1,1,1); // 搭建模型
var material = new THREE.MeshBasicMaterial({color: 0x00ff00}); // 填色
var cube = new THREE.Mesh(geometry, material);   // 创建网孔
// 添加到场景中
scene.add(cube);
// 修改相机的位置，避免重叠
camera.position.z = 5;

// 创建平行光
var light = new THREE.DirectionalLight(0xffffff, 0.5 );
// light.position.set(100, 100, 200);
// 添加到场景
scene.add(light);

// 渲染
function render(){
    // 循环
    requestAnimationFrame(render);

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    // cube.position.x ++ ;
    // if(cube.position.x > window.innerWidth ){
    //     cube.position.x %= window.innerWidth;
    // }
    // console.log(cube.position.x);

    // 渲染成图形
    renderer.render(scene, camera);
}
// start
render();