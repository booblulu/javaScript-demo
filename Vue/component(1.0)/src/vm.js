import Vue from "vue";
import Cmp1 from "./cmp1";
import MyDialog from "./my-dialog";
import Parent from "./components/parent1";



// 数据通信 start
let vm = new Vue({
    el: "div",
    data: {},
    components: {
        Parent
    },
    template: `
        <div>
            <Parent/>
        </div>
    `
})
// 数据通信 end 

// dialog组件 start
// let vm = new Vue({
//     el: "div",
//     data: {},
//     // 传输进去的参数都是字符串
//     // 变量前加v-bind(:)则是属性
//     // template必须写在my-dialog内
//     template: `
//         <div>
//             <my-dialog>
//                 <template slot="title">标题</template>
//                 xxxxx
//             </my-dialog>
//         </div>
//     `
// });
// dialog组件 end

// 组件测试 start
// let cmp = new Cmp1({
//     propsData: {
//         name: "张三",
//         age: 11,
//         list: [22,55,7]
//     }
// });

// // 虚拟vm对象
// let vm = cmp.$mount();
// console.log(vm.$el);

// if (vm.$el.querySelector("li").innerHTML == "22") {
//     console.log("正确");
// } else {
//     console.log("错误");
// }
// 组件测试 end


// 全局组件 start
// let vm = new Vue({
//     el: "div",
//     data: {
//         type: ""
//     },
//     // 传输进去的参数都是字符串
//     // 变量前加v-bind(:)则是属性
//     template: `
//         <div>
//             <input type="text" v-model="type" />
//             <component :is="type" name="blue" :age="19" :list="[1,5,7]" />
//         </div>
//     `
// });
// 全局组件 end