import VueRouter from "vue-router";
import Header from "./components/header";
import News, {router as new_router} from "./components/news";
import Home from "./components/home";

export default new VueRouter({
    routes:[
        {
            path: "/index",
            name: "index",
            components: {
                header: Header,
                default: Home   
            }
        },
        {
            path: "/news",
            name: "news",
            components: {
                header: Header,
                default: News            
            },
            // 子路由
            children: new_router
        }
    ]
})