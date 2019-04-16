import Vue from "vue";

 // 局部组件
let vm = new Vue({
    el: "div",
    data: {},
    // 减少html内标签，提高维护性
    template: `<div><cmp1/></div>`,
    // 局部组件
    components: {
        cmp1: {
            // 组件内也可以有data，但需要创建一个私有空间，和全局分开，清晰明了
            data() {
               return {a:23}
            },
            template: `<div>{{a}}</div>`
        }
    }
})