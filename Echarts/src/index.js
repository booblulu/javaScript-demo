import Vue from "vue";
import router from "./routers";
import App from "./App.vue";

new Vue({
    el: "div",
    data: {},
    components: {
        App
    },
    template: `
        <div>
            <App/>
        </div>
    `,
    router
})