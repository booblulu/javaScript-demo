import Vue from "vue";

export default Vue.component("cmp1", {
    // 注册一下，接收哪些参数
    props:["name","age","list"],
    data(){
        return {
            a: 12,
            b: 3
        }
    },
    template: `
        <div>
            result={{a+b}}<br/>
            姓名：{{name}}<br/>
            年龄：{{age+3}}<br/>
            <ul v-for="item in list">
                <li>{{item}}</li>
            </ul>
        </div>
    `
})
