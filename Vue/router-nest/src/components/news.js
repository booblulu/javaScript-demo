import News1 from "./news1";
import News2 from "./news2";
import NewsHeader from "./new_header";

export default {
    template : `
        <div>
            新闻
            <router-view name="news_header"></router-view>
            <router-view></router-view>
        </div>
    `
}


export let router = [
    {
        // 不能再写相对路径
        path: "1",
        // 和router-link中的name名字，必须完全一致
        name: "news1",
        components: {
            // news_header 和 router-view名一致
            news_header: NewsHeader,
            default: News1
        }
    },
    {
        path: "2",
        name: "news2",
        components: {
            news_header: NewsHeader,
            default: News2
        }
    }
];