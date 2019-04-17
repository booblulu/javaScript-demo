<template>
  <div>
    <button class="btn btn-primary" @click="fn">+7</button>
  </div>
</template>

<script>
export default {
  name: 'cmp',
  methods: {
    fn(){
      // this.$store.state.a++;
      // commit 找 store中的mutations
      // this.$store.commit('add', 5)
      // dispacth 找 store中的 actions
      this.$store.dispatch('add',7);
    }
  }
}
</script>


<style scoped>

</style>
