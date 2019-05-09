import Vue from "vue";
import VueRouter from "vue-router";

import Index from "@/index.vue";
import Tables from "@/tables.vue";


Vue.use(VueRouter);


export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "index",
            component: Index
        },
        {
            path: "/tables",
            name: "tables",
            component: Tables
        }
    ]
})