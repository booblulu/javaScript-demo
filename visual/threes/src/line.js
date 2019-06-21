var THREE = require("THREE");

var width = window.innerWidth;
var height = window.innerHeight;


var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);



// 声明一个几何体，会存放一个vertices变量
var geometry = new THREE.Geometry({
    linejoin: "round"
});

// 定义一个线条的材质
var material = new THREE.LineBasicMaterial( { 
    // color: 0xffffff,
    vertexColors: THREE.VertexColors
});


// 添加顶点
// geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
// geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
// geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

geometry.vertices.push( new THREE.Vector3( - 500, 0, 0 ) );
geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ) );

for ( var i = 0; i <= 20; i ++ ) {

    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.2 } ) );
    line.position.z = ( i * 50 ) - 500;
    scene.add( line );

    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.2 } ) );
    line.position.x = ( i * 50 ) - 500;
    line.rotation.y = 90 * Math.PI / 180;
    scene.add( line );

}

// for ( var i = 0; i < geometry.vertices.length; i++ ) {
//     geometry.colors[i] = new THREE.Color( Math.random(), Math.random(), Math.random() );
// }

// x轴向右，y轴向上，z轴由里到外
// 右手坐标系，定义线条，(顶点+颜色，材质，一组点的连接方式)
// var line = new THREE.Line( geometry, material);
// scene.add(line);

renderer.clear();
renderer.render(scene, camera);
