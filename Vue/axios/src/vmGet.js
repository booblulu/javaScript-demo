import Vue from "vue/dist/vue.esm";
import Axios from "axios";

let vm = new Vue({
    el: "div",
    data: {
        name: "",
        age: 0,
        loaded: false
    },
    // vue对象加载完成后执行
    async created(){
        try {
            // 获取数据
            let {data} = await Axios.get("../data/user.json");
            this.name = data.name;
            this.age = data.age;
            
            this.loaded = true;
        } catch(e) {
            alert("加载页面失败");
        }      
    },
    // template 必须包含在父级标签内，并且只能有一个根元素
    template: `
        // 会出现原数据，所以在未修改完数据时，不显示
        <div v-if="loaded">
            <label>姓名：</label><span>{{name}}</span><br>
            <label>年龄：</label><span>{{age}}</span>
        </div>
    `
})