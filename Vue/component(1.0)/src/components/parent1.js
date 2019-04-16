import Vue from "vue";
import Child from "./child1";

export default Vue.component("parent",{
    data(){
        return {nums: 0}
    },
    methods: {
        fn(){
            // this.$refs.c1.num++;
            // this.$refs.c1.add();
            this.$refs.c1.$emit('addNum',1);
        },
        add(){
            this.nums++;
        }
    },
    template: `
        <div>
            父级:{{nums}}<button @click="fn">+1</button><br>
            父级:{{nums}}<button @click="fn">emit +1</button><br>
            ---<child :parent="this" ref="c1"/>
        </div>
    `
})