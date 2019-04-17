<template>
  <div>
    a:{{$store.state.a}}<Cmp/>
    <TableSelf :fields="fields" :datas="datas" :parent="this"/>
  </div>
</template>

<script>
import Cmp from '@/components/common/Cmp';
import TableSelf from '@/components/common/TableSelf';

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
    }
  }
}
</script>


<style scoped>

</style>
