<template lang="html">
    <div v-if="loader">  
        首页<br>
        姓名：{{name | reverse}}
        年龄：{{age}}
    </div>
</template>

<script>

export default {
    name: "index",
    data(){
        return {
            name: "",
            age: 0,
            loader: false
        }
    },
    filters: {
        reverse(value){
            return value.split("").reverse().join("");
        }
    },
    async created(){
        let res = await this.axios.get("http://localhost:8080/data/test.json");
        let {data} = res;
        this.name = data.name;
        this.age = data.age;

        this.loader = true;
    }
}
</script>

<style lang="css" scoped>

</style>