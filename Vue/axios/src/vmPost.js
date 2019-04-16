import Vue from "vue/dist/vue.esm";
import Axios from "axios";
// webpack可以直接引用后台模块，将json转换成{a=x&b=x}
import {stringify} from "querystring";


// 将transfromRequest提出来公用，使用axios方法
const axios = Axios.create({
    // 内部将data转成某种数据格式
    transformRequest:[
        function(data){
            return stringify(data);
        }                  
    ] 
});


let vm = new Vue({
    el: "div",
    data: {
        result: 0,
        loaded: false
    },
    // vue对象加载完成后执行
    async created(){   
        // 默认传送JSON数据
        let {data} = await axios({
            url: "./data/sum.php",
            method: "post",
            data: {
                a: 45,
                b: 45
            }
        });
        this.result = data;   
        this.loaded = true;    
    },
    // template 必须包含在父级标签内，并且只能有一个根元素
    template: `
        <div v-if="loaded">
            {{result}}
        </div>
    `
})