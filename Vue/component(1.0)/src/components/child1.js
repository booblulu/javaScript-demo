import Vue from "vue";

export default Vue.component("child",{
    props: ["parent"],
    data(){
        return {
            num:0
        }
    },
    methods: {
        add(){
            this.num++;
        },
        fn(){
            // this.parent.nums++;
            // this.parent.add();
        }
    },
    template: `
        <div>
            子级:{{num}}
            <button @click="fn">+1</button>
        </div>
    `,
    created(){
        this.$on('addNum',function(n){
            this.num += n;
        })
    }
})