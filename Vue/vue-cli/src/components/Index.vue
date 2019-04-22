<template>
  <div>
    <!-- count:{{count}}<button @click="count+=5">+5</button><br> -->
    a: {{a}} | b: {{b}}<Cmp/><button @click="set([a+1,b+1])">+1</button>
    <TableSelf :fields="fields" :datas="datas" :parent="this"/>
    <button @click="setOnline(1)">lulu上线</button>
    <ul>
      <li v-for="user in onlineUsers">
        姓名：{{user.name}} | 年龄：{{user.age}} 
      </li>
    </ul>
  </div>
</template>

<script>
import Cmp from '@/components/common/Cmp';
import TableSelf from '@/components/common/TableSelf';
import {mapState, mapActions, mapGetters} from "vuex"

export default {
  name: 'index',
  data () {
    return {
      fields:[
        {name:'ID', text:'ID'},
        {name:'name', text:'姓名'},
        {name:'age', text:'年龄'}
      ],
      datas: [
        {ID:1, name:'lulu', age:18},
        {ID:2, name:'sun', age:12},
        {ID:4, name:'tom', age:3}
      ]
    }
  },
  components:{
    TableSelf,
    Cmp
  },
  methods: {
    del(id){
      this.datas = this.datas.filter(data => data.ID!=id);
    },
    ...mapActions(['set','setOnline','readUsers'])
  },
  created(){
    this.readUsers();
  },
  computed: {
    // count:{
    //   get(){
    //     return this.$store.getters.count;
    //   },
    //   set(value){
    //     console.log(value);
    //     this.$store.dispatch('set', {a:value-33, b:33})
    //   }
    // }
    // 展开函数，相当于增加了a和b的get函数
    ...mapState(['a','b']),
    ...mapGetters(['onlineUsers'])
    
  }
}
</script>


<style scoped>

</style>
