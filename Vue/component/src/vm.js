import Vue from "vue";
import App from "./App.vue";
// 路由表 ./routers/index.js   --> 简写 ./routers
import router from "./routers";

import Axios from "axios";
import VueAxios from "vue-axios";

// 挂载axios，注意顺序先处理vue-axios，后处理axios
Vue.use(VueAxios, Axios);

// import VueResource from "vue-resource";
// Vue.use(VueResource);

Vue.filter("myReverse",function(value, symbol){
    return value.split("").reverse().join(symbol);
});

let vm = new Vue({
    el: "div",
    data: {},
    components: { App },
    router,
    template: `
        <div>
            <App/>
        </div>
    `
    
})

