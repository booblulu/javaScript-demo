import Vue from "vue/dist/vue.esm";
import Axios from "axios";


let vm = new Vue({
    el: "div",
    data: {
        name: "lulu",
        age: 0,
        loaded: false
    },
    // vue对象加载完成后执行
    async created(){   
        // 请求
        let res = await fetch("data/user.json");
        // 解析可能也会涉及异步操作
        let data = await res.json();

        this.name = data.name;
        this.age = data.age;

        this.loaded = true;
    },
    // template 必须包含在父级标签内，并且只能有一个根元素
    template: `
        <div v-if="loaded">
            姓名：{{name}}<br>
            年龄：{{age}}
        </div>
    `
})