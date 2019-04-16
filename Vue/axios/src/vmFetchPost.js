import Vue from "vue/dist/vue.esm";
import Axios from "axios";


let vm = new Vue({
    el: "div",
    data: {
        a: 0,
        b: 0,
        result: 0,
        loaded: false
    },
    // vue对象加载完成后执行
    // async created(){   
    //     // 完整表单带文件
    //     let formdata = new FormData();
    //     formdata.append('a',55);
    //     formdata.append('b',55);
    //     let res = await fetch("data/sum.php",{
    //         method: "post",
    //         // data
    //         body: formdata
    //     });
    //     this.result = await res.json();
    //     this.loaded = true;
    // },
    methods: {
        async fn_submit(){
            // vue自带的都需要$符号
            // ref 组件的名字
            console.log(this.$refs); // {form1: form}   
            let form =  this.$refs["form1"];
            
            let formdata = new FormData(form);

            // 使用form表单的action
            let res = await fetch(form.action, {
                // 使用form表单的method
                method: form.method,
                body: formdata
            });

            this.result = await res.json();
        }
    },
    // template 必须包含在父级标签内，并且只能有一个根元素
    template: `
        <div>            
            <form ref="form1" @click.prevent="fn_submit()" action="data/sum.php" method="post">
                <input type="text" name="a" v-model="a">
                <input type="text" name="b" v-model="b">
                <button type="submit">计算</button>
            </form>
            {{result}}
        </div>
    `
})