import p5 from "p5";

// var s = new p5(function(_){});
// s.setup = function(){
//     console.log(2);
//     s.createCanvas(500, 500);
//     s.noLoop();
//     document.querySelector(".main").appendChild(s.canvas);
// }
// s.draw = () => { 
//     s.background(255, 0, 0);
//     s.ellipse(s.mouseX, s.mouseY, 10, 10);
// };

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

console.log(1);

var t = 0;
var buttons = [];

for(var i = 0; i < 100; i++) {
    var b = document.createElement("button");
    b.innerText = "hello";
    buttons.push(b);
    document.body.appendChild(b);
}
function update() {
    s.draw();
    t += 0.1;
    for(var i = 0; i < buttons.length;i++) {
        var y = Math.sin(t + i / 10) * 100;
        var r = Math.cos(t * 2 + i / 10) * 180;
        var cur = buttons[i];
        cur.style.transform = `translate(${(t + i / 10) * 100 % (window.innerWidth - 100)}px, ${100 + y}px) rotate(${r}deg)`;
    }
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

cancelAnimationFrame(update);