import NewHeader from "./new_header";
import News1 from "./news1";
import News2 from "./news2";

export default {
    template: `
        <div>
            新闻
            <router-view name="new_header"></router-view>
            <router-view></router-view>
        </div>
    `
}

export let router = [
    {
        path: "news1",
        name: "news1",
        components: {
            new_header: NewHeader,
            default: News1
        }
    },
    {
        path: "news2",
        name: "news2",
        components: {
            // 不能重名
            new_header: NewHeader,
            default: News2
        }       
    }
];
