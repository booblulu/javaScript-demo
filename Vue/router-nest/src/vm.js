import Vue from "vue/dist/vue.esm";
import VueRouter from "vue-router";
import router from "./router";

import "../css/main.css";

Vue.use(VueRouter);

export default new Vue({
    el: "div",
    data:{},
    router
})