<template>
  <div class="table-box">
    <table class="table">
      <thead>
        <tr>
          <th v-for="field in fields">{{field.text}}</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in datas">
          <td v-for="field in fields">{{data[field.name]}}</td>
          <td>
            <button class="btn btn-danger" @click="del(data.ID)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props:['fields','datas','parent'],
  name: 'table-self',
  methods: {
    del(id){
      this.parent.del(id);
    }
  }
}
</script>


<style scoped>
.table-box {
  width: 700px;
  margin: 0 auto;
}
.table, th {
  text-align: center;
}
</style>
