<template lang="html">
    <div v-if="loader">
        新闻
        姓名：{{name | myReverse( "|")}}
        年龄：{{age}}
    </div>
</template>

<script>
export default {
    name: "news",
    data(){
        return {
            name: "",
            age: 22,
            loader: false
        }
    },
    async created(){
        let res = await fetch("http://localhost:8080/data/test.json");
        console.log(res);
        let data = await res.json();
        console.log(data);
        this.name = data.name;
        this.age = data.age;

        this.loader = true;
    }
}
</script>

<style scoped>

</style>
