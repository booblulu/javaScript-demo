export default {
    template: `
        <div class="nav">
            <router-link class="nav-item" to="news1">新闻1</router-link>
            <router-link class="nav-item" :to="{name:'news2'}">新闻2</router-link>
        </div>
    `
}