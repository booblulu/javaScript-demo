<template>
    <div class="nav">
        <router-link class="nav-item" to="/">index</router-link>
        <router-link class="nav-item" to="/tables">tables</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    data() { return {} }
}
</script>

<style lang="css" scoped>
.nav {
    overflow: hidden;
}
.nav .nav-item {
    margin-right: 10px;
    color: #888;
}
.nav .router-link-exact-active {
    color: black;
}
</style>