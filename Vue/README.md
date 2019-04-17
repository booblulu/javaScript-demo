## Vue

### 开发模式

* MVC 数据(后台接口)，表现(视图)，行为(js)
    - model      数据层data
    - view       表现层html
    - controller 控制器vm
* MVP 
* MVVM


### 前端渲染 vs 后台渲染

* 前端渲染 
    - 相当于一对零件自己组装
    - 降低服务器负担，带宽压力小，用户体验小
* 后台渲染
    - 相当于组装好的物件
    - 安全好，兼容好


### 初学vue
* vue数据只要被更改，会自动刷新。
```html
    <div>
        姓名：{{name}}<br>
        年龄：{{age}}<br>
        出生日期：{{calcBirth()}}
    </div>
    <script src="js/vue.js"></script>
    <script>
        let vm = new Vue({
            // 根元素(挂载点)，只在el内起作用(只对第一个检测到的div起作用)
            el: "div",
            // vue需要的数据
            data: {
                name: "blue",
                age: 18
            },
            // 复杂运算
            methods: {
                calcBirth(){
                    return new Date().getFullYear() - this.age + "年出生";
                }
            },
        });
    </script>
```


### 指令(directive) 补充了html的属性

#### v-bind 
* 可以在属性中输出，并且去掉花括号，会当做遍变量处理
* v-bind:name = "lulu"   简写  :name = "lulu"
```html
    <strong v-bind:title="calcBirth()">年龄：{{age+5}}<br></strong>
    <strong :title="calcBirth()">年龄：{{age+5}}<br></strong>
```
* 可以作用任意属性，但有两个属性是另外的写法
    - class 可以使用数组或字符串两种方法
    ```html
        <div>
            <strong :class="class_str">年龄：{{age}}</strong>
            <strong :class="class_arr">年龄：{{age}}</strong>
        </div>
        <script src="js/vue.js"></script>
        <script>
            let vm = new Vue({
                // 根元素(挂载点)，只在el内起作用
                el: "div",
                // vue需要的数据
                data: {     
                    age: 18,          
                    class_str: "aaa bbb ccc",
                    class_arr: ["aaa","bbb","ccc"]
                }
            });
        </script>
    ```
    - style 可以使用JSON或字符串两种方法
    ```html
        <div>
            <strong :class="style_str">年龄：{{age}}</strong>
            <strong :class="style_arr">年龄：{{age}}</strong>
        </div>
        <script src="js/vue.js"></script>
        <script>
            let vm = new Vue({
                // 根元素(挂载点)，只在el内起作用
                el: "div",
                // vue需要的数据
                data: {     
                    age: 18,          
                    style_str: "color:pink;font-size:18px",
                    style_arr: {color:"red","font-size":"18px"}
                }
            });
        </script>
    ```

#### v-model 数据双向绑定，仅用于输入组件
* 对dom进行操作，更快更便捷
```html
    <div>
        <!-- 数据和input相互绑定，一方变另一方也会变 -->
        <input type="text" v-model="name">
        <p>
            {{name}}
        </p>
    </div>
    <script src="js/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "div",
            data: {
                name: "lulu"
            }
        });
    </script>
```
* 操作的数据是字符串
```html
    <div>
        <!-- 操作的数据是字符串 -->
        <input type="text" v-model="n1">+
        <input type="text" v-model="n2">=
        <!-- 修改n1为10 结果为101 -->
        {{n1+n2}} 
        <!-- 当然官方不推荐复杂算法 -->
        {{parseInt(n1)+parseInt(n2)}}
        <!-- 推荐 -->
        {{sum()}}       
    </div>
    <script src="js/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "div",
            data: {
                name: "lulu",
                n1: 0,
                n2: 1
            },
            methods: {
                sum(){
                    return parseInt(this.n1)+parseInt(this.n2);
                }
            }
        });
    </script> 
```

#### v-test 等同于{{name}}，只能用在双标签中，给元素的innerText赋值
```html
    <div v-text="'zi'+str">
        <!-- 不会显示两个 -->
        {{str}}
    </div>
    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el: "div",
            data: {
                str: "lulu"
            }
        });
    </script>
```

#### v-html，给元素的innerHTML赋值
```html
    <div v-html="str">
        <!-- 采取段落，会转义成文本节点，防止注入攻击 -->
        {{str}}
    </div>
    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el: "div",
            data: {
                str: `<p>dddddddddddddddddddddddddddddddddd
                    333333333333333333333333333
                    wwwwwwwwwwwwwwww</p>`
            }
        });
    </script>
```

#### vue事件 (v-on)
* 格式 `v-on:click="sum()"`
* 简写 `@click="sum()"`
```html
    <div>
        {{num}}
        <!-- 需要什么事件写什么事件，无参数可以不加括号 -->
        <button v-on:click="sum()">+1</button>
        <!-- 简写 -->
        <button @click="sum()">+1</button>
    </div>
    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el: "div",
            data: {
                num: 0
            },
            methods:{
                sum(){
                    this.num++;
                }
            }
        });
    </script>
```
* 事件修饰符，可以混用 `@click.stop.prevent="fn()"`
    - 单次事件，只触发一次 `@click.once="fn()"`
    - 阻止冒泡 `@click.stop="fn()"`
    ```html
        <div>
            <div @click="fn1">
                <button @click.stop="fn2">fn2</button>
            </div>      
        </div>
        <script src="js/vue.js"></script>
        <script>
            new Vue({
                el: "div",
                data : {},
                methods: {
                    fn1(){
                        alert("111");
                    },
                    fn2(){
                        alert("222");
                    }
                }
            });
        </script>
    ```
    - 阻止默认事件  `@click.prevent="fn()"` 
    ```html
        <form action="" method="post" @submit.prevent="submit()">
            <button type="submit">提交</button>
        </form>  
    ```
    - 使用原生事件(组件)  `@click.native="fn()"` 
    - 键盘按键 keycode|name
    ```html
        <!-- enter -->
        <input type="text" name="" id="" @keydown.13="fn()">
        <input type="text" name="" id="" @keydown.enter="fn()">
        <!-- 组合键:ctrl+enter -->
        <input type="text" name="" id="" @keydown.enter.ctrl="fn()">
    ```
    - 处理自身事件 self
    - 捕获的事件 capture

#### v-once 只会渲染一次，不会跟着数据的改变而改变，类似于常量
```html
    <div>
        <button @click="fn()">+1</button>
        {{num}}
        <p v-once>{{num}}</p>
    </div>
    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el: "div",
            data: {
                num: 3
            },
            methods: {
                fn(){
                    this.num++;
                }
            }
        })
    </script>
```

#### v-show 控制display的显示与隐藏
```html
    <div>
        <button>显示隐藏</button>
        <div class="box" v-show="flag"></div>
    </div>
    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el: "div",
            // boolean不需要双引号
            data: {
                flag: false
            }
        });
    </script>
```

#### v-if 会删除元素，换成注释，可以缩减html标签数，增加性能
```html
    <div>
        <button>显示隐藏</button>
        <div class="box" v-if="flag"></div>
    </div>
    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el: "div",
            // boolean不需要双引号
            data: {
                flag: false
            }
        });
    </script>
```

#### v-for 循环
* 需要和:key属性相配合，不能重复及修改，辅助虚拟dom，增加性能
* 循环数组，有两个参数`v-for="item,index in items"` index索引，可省略
```html
    <div>
        <ul>
            <li v-for="user in users" :key="user.id">
                用户名：{{user.name}} 密码：{{user.password}}
            </li>
        </ul>
    </div>
    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el: "div",
            data: {
                users:[
                    {id: "2",name: "lulu",password: "123456"},
                    {id: "7",name: "fengfeng",password: "987765"}
                ]
            }
        })
    </script>
```
* 循环JSON，`v-for="val,key in items"`，key可省略
```html
    <div>
        <ul>
            <li v-for="val,key in style">
                {{key}}:{{val}}
            </li>
        </ul>
    </div>
    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el: "div",
            data: {
                style:{
                    width: "200px",
                    height: "100px"
                }
            }
        })
    </script>
```
* 循环字符串，`v-for="s,index in str"`，index可省略
```html
    <div>
        <ul>
            <li v-for="s,index in str">
                {{index}}:{{s}}
            </li>
        </ul>
    </div>
    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el: "div",
            data: {
                str: "hahahahahahaha"
            }
        })
    </script>
```
* 循环数字，`v-for="i in 10"`，从1开始
```html
    <div>
        <ul>
            <li v-for="i in 10">
                {{i}}
            </li>
        </ul>
    </div>
    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el: "div"
        })
    </script>
```

#### v-pre 预编译
当大段文章或者不需要它解析的时候，就可以预编译，提升性能
```html
    <p v-pre> 
        {{aaa}}-{{bbb}}
    </p>
```

#### v-cloak 防止vue代码意外显示
* 使用方法 `<p v-cloak>{{num}}</p>`
* 当页面阻塞，或者前面的script阻塞时，会将代码显示在页面中，阻塞之后会刷新。
* 在编译完成之前，标签内会存在v-cloak属性，加载成功会自动消失。基于此，可以使代码先隐藏，当属性消失后，就会显示了。
```css
    <style>
        *[v-cloak]{
            display: none;
        }
    </style>
```


### vue原理

#### 数据同步
通过proxy代理，获知数据的修改

#### 虚拟dom
* 合并请求


### computed 计算属性
* 带缓存，性能好，不会主动重新计算，只有当数据变了的时候才会计算，而methods是主动的，每使用一次就会计算一次。
* 方便，可以使用读写的方式
```html
    <div>
        姓<input type="text" v-model="famllyName">
        名<input type="text" v-model="name" >
        姓名：<input type="text" v-model="names">
    </div>
    <script src="js/vue.js"></script>
    <script>
        new Vue({
            el: "div",
            data: {
                famllyName: "张",
                name: "三"
            },
            computed: {
                names:{
                    get(){
                        return this.famllyName+this.name;
                    },
                    set(value){
                        this.famllyName = value.substring(0,1);
                        this.name = value.substring(1);
                    }                    
                }
            }
        })
    </script>
```


### watch 监听
1. 基础形式
```html
    <div>
        <input type="text" v-model="name">
    </div>
    <script src="js/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "div",
            data: {
                name: "blue"
            },
            watch: {
                name(){
                    console.log("变了");
                }
            }
        });
    </script>
```
2. 监听某个数据，可以灵活使用
```html
    <div>
        <input type="text" v-model="user.age">
    </div>
    <script src="js/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "div",
            data: {
                user: {
                    name: "lulu",
                    age: 18
                }
            },
            watch: {
                "user.age": ()=>{
                    console.log("age变了");
                }
            }
        });
    </script>
```


### vue-router 路由
1. 需要容器
```html
    <div>
        xxx
        <!-- vue组件:路由容器 -->
        <router-view></router-view>
    </div>
```
2. 路由表
```javascript
    let router = new VueRouter({
        routes: [
            // 路由节点
            {
                path: "/a",
                component: {
                    template: "<div>aaa</div>"
                }
            },
            {
                path: "/b",
                component: {
                    template: "<div>bbb</div>"
                }
            }
        ]
    });
```
3. 添加到vue
```javascript
    let vm = new Vue({
        el: "div",
        data: {},
        // 名字一样可以省略
        // router: {

        // }
        router
    })
```
4. 使用
    * 手动修改路径为path的路径
    * 使用router-link，在页面上会显示为a标签
    ```html
        <!-- <a href="#/a">页面1</a> -->
        <router-link to="/a">页面1</router-link>
        <router-link to="/b">页面2</router-link>
        <router-link to="/c">页面3</router-link>
    ```
5. 好处
    * 不会刷新页面
    * 便于后退
    * 用户体验好
6. 样式
    * 被选中的路由会有`class="router-link-active"`便于设置样式
7. 命名路由
```html
    <router-link :to="{name:'a'}">页面1</router-link>
    <script>
    // 路由表
    let router = new VueRouter({
        routes: [
            // 路由节点
            {
                path: "/a",
                name: "a",
                component: {
                    template: "<div>aaa</div>"
                }
            }
        ]
    });
    // ...
    </script>
```
8. 参数
可以有相同的，例如\a || \:id是一样的，会按顺序，先遇到谁用谁
```html
    <!-- 命名路由 -->
    <router-link class="nav" :to="{name:'a',params:{id:44}}">页面1</router-link>
    <router-link to="/b/58">页面2</router-link>
    
    <script>
    // 路由表
    let router = new VueRouter({
        routes: [
            // 路由节点
            {
                path: "/a",
                name: "a",
                component: {
                    template: "<div>id:{{$route.params.id}}</div>"
                }
            },
            {
                path: "/b/:id",
                name: "b",
                component: {
                    // $route 获取路由信息
                    template: "<div>id:{{$route.params.id}}</div>"
                }
            }
        ]
    });
    // ...
    </script>
```
9. JS控制路由跳转 $router
```html
    <div>
        <div>
            <button @click="fn1">页面1</button>
            <button @click="fn2">页面2</button>
            <button @click="fn3">页面3</button>
        </div>
        <!-- vue组件:路由容器 -->
        <router-view></router-view>
    </div>

    <script src="js/vue.js"></script>
    <script src="js/vue-router.js"></script>
    <script>
        // 路由表
        let router = new VueRouter({
            routes: [
                // 路由节点
                {
                    path: "/a/:id",
                    name: "a",
                    component: {
                        template: "<div>id:{{$route.params.id}}</div>"
                    }
                },
                {
                    path: "/b/:id",
                    name: "b",
                    component: {
                        // $route 当前路由内的信息
                        template: "<div>id:{{$route.params.id}}</div>"
                    }
                },
                {
                    path: "/c",
                    name: "c",
                    component: {
                        template: "<div>ccc</div>"
                    }
                }
            ]
        });

        let vm = new Vue({
            el: "div",
            data: {},
            methods: {
                fn1(){
                    this.$router.push({
                        name:"a",
                        params: {
                            id: 22
                        }
                    });
                },
                fn2(){
                    this.$router.push('/b/39');
                },
                fn3(){
                    this.$router.push('/c');
                }
            },
            router
        })
    </script>
```
10. history
    * 是个栈
    * push(string|Object) 向最后加一条数据
    * replace(string|Object) 替换最后一个历史记录(当前)
    * go(int) 正向后，负向前
11. 监视路由
    * watch，仅能记录，不能干预。
    ```javascript
        watch: {
            // 新->旧
            $route(value,old_value){
                console.log(value,old_value);
            }
        }
    ```
    * 路由守卫


### 多视图
```html
    <div>
        <router-link to="/">首页</router-link>
        <router-link to="/news">新闻</router-link>
        <!-- 多视图，需要name命名(命名视图) -->
        <router-view name="header"></router-view>
        <router-view></router-view>
        <router-view name="footer"></router-view>
    </div>

    <script src="js/vue.js"></script>
    <script src="js/vue-router.js"></script>
    <script>
        // router
        const indexCmp = {
            // 必须要有父标签
            template: "<div>主页</div>"
        }
        const newsCmp = {
            template: "<div>新闻</div>"
        }
        const footerCmp = {
            template: "<div>主页底部</div>"
        }
        const headerCmp = {
            template: "<div>主页头部</div>"
        }
        const footerNewsCmp = {
            template: "<div>新闻底部</div>"
        }
        const headerNewsCmp = {
            template: "<div>新闻头部</div>"
        }

        let router = new VueRouter({
            routes: [
                {
                    path: "/",
                    name: "index",
                    components:{
                        default: indexCmp,
                        header: headerCmp,
                        footer: footerCmp
                    }
                },
                {
                    path: "/news",
                    name: "news",
                    components:{
                        default: newsCmp,
                        header: headerNewsCmp,
                        footer: footerNewsCmp
                    }
                }
            ]
        })

        // vue
        let vm = new Vue({
            el: "div",
            router
        });
    </script>
```


### 数据通信

#### 库(axios)
* vmGet.js
* vmPost.js

#### 原生fetch
* vmFetchGet.js
* vmFetchPost.js


### vue组件(1.0)

#### 全局组件
* 简单版本
```javascript
    Vue.component("cmp1", {
        data(){
            return {
                a: 12,
                b: 3
            }
        },
        template: `
            <div>
                result={{a+b}}
            </div>
        `
    })

    let vm = new Vue({
        el: "div",
        data: {},
        template: `
            <div><cmp1/></div>
        `
    });
```
* 传参
```javascript
    Vue.component("cmp1", {
        // 注册一下，接收哪些参数，不注册收不到
        props:["name"],
        data(){
            return {
                a: 12,
                b: 3
            }
        },
        template: `
            <div>
                result={{a+b}}<br/>
                姓名：{{name}}<br/>
                年龄：{{age+3}}<br/>
                <ul v-for="item in list">
                    <li>{{item}}</li>
                </ul>
            </div>
        `
    })
    // result=15
    // 姓名：blue
    // 年龄：22
    // 1
    // 5
    // 7

    let vm = new Vue({
        el: "div",
        data: {},
        // 传输进去的参数都是字符串
        // 变量前加v-bind(:)则是属性
        template: `
            <div>
                <cmp1 name="blue" :age="19" :list="[1,5,7]"/>
            </div>
        `
    });
```
* component vue自带的组件，可以通过is改变组件，适用于商品搜索
```javascript
    template: `
        <div>
            <component is="cmp1" name="blue" :age="19" :list="[1,5,7]" />
        </div>
    `
    // 修改type改变组件显示
    data: {
        type: ""
    },
    template: `
        <div>
            <input type="text" v-model="type" />
            <component :is="type" name="blue" :age="19" :list="[1,5,7]" />
        </div>
    `
```


#### 局部组件
* 简单版本
```javascript
    // index.html 
    <div>
        <cmp1></cmp1>
    </div>
    // vm.js
    let vm = new Vue({
        el: "div",
        data: {},
        // 局部组件
        components: {
            cmp1: {
                template: `<div>aaa</div>`
            }
        }
    })
```
* 升级版本
```javascript
    // index.html 
    <div></div>
    // vm.js
    let vm = new Vue({
        el: "div",
        data: {},
        // 减少html内标签，提高维护性
        template: `<div><cmp1/></div>`,
        // 局部组件
        components: {
            cmp1: {
                // 组件内也可以有data，但需要创建一个私有空间
                data() {
                return {a:12}
                },
                template: `<div>{{a}}</div>`
            }
        }
    })
```


### 组件间通信

#### 土办法 组件事件 
* $emit 触发一个事件 $on 接收事件 $off 删掉事件 $once 单次绑定 (低耦合)
```javascript
    // parent.js
    import Vue from "vue";
    import Child from "./child1";

    export default Vue.component("parent",{
        data(){
            return {nums: 0}
        },
        methods: {
            fn(){
                // 事件名，参数
                this.$refs.c1.$emit('addNum',1);
            }
        },
        template: `
            <div>
                父级:{{nums}}<button @click="fn">emit +1</button><br>
                ---<child ref="c1"/>
            </div>
        `
    })

    // chiild.js
    import Vue from "vue";

    export default Vue.component("child",{
        data(){
            return {
                num:0
            }
        },
        template: `
            <div>
                子级:{{num}}
            </div>
        `,
        // $on 接收事件
        created(){
            this.$on('addNum',function(n){
                this.num += n;
            })
        }
    })
```
* 通过$refs，父级找子级很容易，this.$refs.cs.xxx (耦合度高)
```javascript
    // vm.js
    import Parent from "./components/parent";

    let vm = new Vue({
        el: "div",
        data: {},
        components: {
            Parent
        },
        template: `
            <div>
                <Parent/>
            </div>
        `

    })

    // parent.js
    // 为子级组件命名c1，通过$refs获取到c1，就获取到了子级组件
    import Vue from "vue";
    import Child from "./child";

    export default Vue.component("parent",{
        methods: {
            fn(){
                // this.$refs.c1.num++;
                this.$refs.c1.sum();
            }
        },
        components: {
            Child
        },
        template: `
            <div>
                父级<button @click="fn">+1</button><br>
                ---<Child ref="c1"/>
            </div>
        `
    })

    // chiild.js
    import Vue from "vue";

    export default Vue.component("child",{
        data(){
            return {
                num:0
            }
        },
        methods: {
            sum(){
                this.num++;
            }
        },
        template: `
            <div>
                子级:{{num}}
            </div>
        `
    })
```
* 子级找父级 传this， `props: ["parent"]`，获取this.parent.xxx (耦合度高)
```javascript
    // parent.js
    import Vue from "vue";
    import Child from "./child1";

    export default Vue.component("parent",{
        data(){
            return {nums: 0}
        },
        methods: {
            add(){
                this.nums++;
            }
        },
        // 传送this
        template: `
            <div>
                父级:{{nums}}
                ---<child :parent="this" ref="c1"/>
            </div>
        `
    })

    // chiild.js
    import Vue from "vue";

    export default Vue.component("child",{
        // 接收参数
        props: ["parent"],
        data(){
            return {}
        },
        methods: {
            fn(){
                // 利用参数，this.parent.xxx
                // this.parent.nums++;
                this.parent.add();
            }
        },
        template: `
            <div>
                子级
                <button @click="fn">+1</button>
            </div>
        `
    })
```


### 组件的生存周期
在vue中 new Vue() 和 Vue.component() 是一样的，一个是主动创建，一个是被动创建。

created 创建完成 --> 数据操作 <br>
mounted 挂载完成 --> 操作组件

* 首先在创建Vue对象之前，会执行beforeCreate事件
* 创建完成，即将去挂载，会执行created()方法
* 监测有无el，有el会主动挂载，没有的话汇之星vm.$mount(el)帮忙挂载
* 监测有无template，有就会编译，没有则会使用标签的HTML作为template
* 挂载之前，会执行beforeMount事件
* 主动挂载，替换el
* mounted()，可以开始操作el
* beforeUpdate事件，还没有update
* updated() 更新完成
* 当更新的组件消失 beforeDestory (不推荐使用)
* 当更新的组件消失完成 destroyed (不推荐使用)


### 钩子
* 可以监控，并且拦截的概念
* 例如生命周期内的created()，mounted()，仅能监听


### 挂载
* 把自己输出到HTML


### 插槽 slot
* 默认插槽，将vm组件内的内容，插到dialog组件内
```javascript
    let vm = new Vue({
        el: "div",
        data: {},
        // 传输进去的参数都是字符串
        // 变量前加v-bind(:)则是属性
        template: `
            <div>
                <my-dialog>
                    xxxxx
                </my-dialog>
            </div>
        `
    });

    export default Vue.component("my-dialog", {
        data(){
            return {}
        },
        template: `
            <div>
                <slot/>result
            </div>
        `
    })

    // xxxxx result
```
* 具名插槽(命名插槽)
* 默认插槽，将vm组件内的内容，插到dialog组件内
```javascript
    let vm = new Vue({
        el: "div",
        data: {},
        // template是slot专用，语义化
        template: `
            <div>
                <my-dialog>
                    <template slot="title">标题</template>
                    xxxxx
                </my-dialog>
            </div>
        `
    });

    export default Vue.component("my-dialog", {
        data(){
            return {}
        },
        // name == slot
        template: `
            <div>
                <h2><slot name="title"/></h2>
                <slot/>result
            </div>
        `
    })
    // 标题
    // xxxxx result
```


### vue2.0

#### 组件
* 新建 cmp2.vue 文件
```html
    <!-- 原来的template，template 支持多种语言 修改lang -->
    <template lang="html">
        <div class="box">
            cmp1
        </div>
    </template>

    <!-- 组件，多了name名 -->
    <script>
    export default {
        // 组件名，调错会报此name名
        name: "cmp2",
        data(){

        },
        methods: {

        }
    }

    </script>

    <!-- scoped 只对当前对象起作用，否则全局起作用 -->
    <style lang="css" scoped>
    .box {
        width: 200px;
        height: 200px;
        background: #888;
    }
    </style>

```
* .vue文件被转义，才能被认识.
    - vue-loader    将vue文件转换成系统认识的
    - vue-style-loader   会将vue文件内的style转换成认识的，并且将外部的合并到vue内
    - vue-html-loader   会将vue中的template中的html转换成字符串
    - vue-template-compiler   编译器，编译成分别的style，html，js
    ```javascript
        module:{
            rules:[
                // 修改style-loader为vue的vue-style-loader
                {
                    test:/\.css$/i,
                    use:["vue-style-loader","css-loader"]
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/i,
                    use: ["file-loader"]
                },
                // 增加vue-loader
                {
                    test: /\.vue$/i,
                    use: ["vue-loader"]
                }
            ]
        },
    ```
    - vue-loader-plugin
    ```javascript
        const HtmlWebpackPlugin = require("html-webpack-plugin");
        // vue-loader-plugin
        const VueLoaderPlugin = require("vue-loader/lib/plugin");

        module.exports = {
            mode: "development",
            output: {
                filename: "bundle.js"
            },
            devtool: "source map",
            plugins: [
                new HtmlWebpackPlugin({
                    template: "index.html"
                }),
                // 增加vue-loader-plugin
                new VueLoaderPlugin()
            ]
            
        }
    ```
* 引入xxx.vue时
```javascript
    // 必须加上.vue
    import Child from "./child.vue";
```

#### 路由表
* 下载 ` npm i vue-router -S`
* 在vm.js中引入路由表，引入总组件app.vue
* 在路由表中，引入vue-router模块，挂载到vue上
* 在总组件app.vue中，写router-link和router-view

#### 数据交互
* 下载 ` npm i axios vue-axios -S`
* 挂载 vm.js
```javascript
    import Axios from "axios";
    import VueAxios from "vue-axios";

    // 挂载axios，注意顺序先处理vue-axios，后处理axios
    Vue.use(VueAxios, Axios);
```
* 在index.vue内使用axios，和之前基本一致
```html
    <template lang="html">
        <div v-if="loader">  
            首页<br>
            姓名：{{name}}
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
        async created(){
            let res = await this.axios.get("http://localhost:8080/data/test.json");
            let {data} = res;
            this.name = data.name;
            this.age = data.age;

            this.loader = true;
        }
    }
    </script>
```

#### vue-resource
* 下载 `npm i vue-resource -S`
* 挂载 vm.js
```javascript
    import VueResource from "vue-resource";
    Vue.use(VueResource);
```


### 补充知识点

#### ES6模块
* 导入和导出只能存在顶级作用域
* require引入是代码执行的时候才加载
* import 和export 都是提前加载 ，加载在代码执行之前

#### 获取DOM元素
* 1: 在template中标识元素 ref="xxxx"
* 2: 在要获取的时候, this.$refs.xxxx 获取元素

#### filter 过滤器
* 组件过滤器，参数使用`{{ 原有数据 | 过滤器名  }}`
```html
<template lang="html">
    <div v-if="loader">  
        姓名：{{name | reverse}}
    </div>
    <!-- 姓名：ulul -->
</template>

<script>
export default {
    name: "index",
    data(){
        return {
            name: "lulu",
            loader: false
        }
    },
    filters: {
        reverse(value){
            return value.split("").reverse().join("");
        }
    }
}
</script>
```
* 全局过滤器，所有组件都可以使用
    - 
    ```javascript
        // 多个参数时，第一个数据在使用的时候省略
        // 在vm.js中增加的全局过滤器
        Vue.filter("myReverse",function(value,symbol){
            return value.split("").reverse().join(symbol);
        });
    ```
    - 使用方式，`{{ 数据 | 过滤器名(参数1,参数2) }}`
    ```html
        <template lang="html">
            <div v-if="loader">
                姓名：{{name | myReverse("|")}}
            </div>
        </template>
        <!-- 姓名：u|l|u|l -->
    ```

#### v-if和v-show的区别 (官网解释)
`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

#### created()和mounted()
* created() 数据，自身的属性方法之类的，可以使用。
* mounted() dom结构搭建完善，可以使用子节点。


### 测试

#### 单元测试
以某一个模块或某一个文件或者某一个函数来测试，单测一个东西，看看有没有问题。

#### 集成测试
几个模块组合起来，看看会不会出问题，在单元测试之后的。

#### 压力测试
前台后台都写完了，就等着上线，主要模拟用户请求，数据量一大就能看出来问题。

#### 回归测试
把库修改一下，改完之后再放回代码仓库的时候，要确定我提交的是正确的，能通过测试的，才能提交。


### vue-cli脚手架(启动器)
* 全局安装 `npm i -g vue-cli`

#### 命令 vue
* 查看可用的模板 `vue list` ，可以在github中搜索vue-template查看更多，一般使用webpack
* 下载模板 `vue init webpack(模板名) test(命名)`，然后会问如下问题，可以回车使用默认
    * 项目名
    * 项目描述
    * 作者
    * 使用哪种打包
        - Runtime + Compiler 运行时加编译器 vue需要编译
        - Runtime-only 运行时，没有编译器
    * 要不要vue-router
    * 要不要ESlint，使用哪种标准
        - 掉头发的标准
        - 想死的标准
        - 自己配
    * 是否用单元测试
        - 轻量级(推荐)
        - 很大
        - 自己配
    * 集成测试，可以测试浏览器的表现
    * 安装模块
        - npm
        - yarn
        - 自己来 (推荐，节省时间)
* 模板
    * build 配置文件
        * webpack


### vue Devtools 调试工具
1. github下载
```
    git clone https://github.com/vuejs/vue-devtools
```
2. vue-devtools目录下安装依赖包
```
    npm i 
```
3. 修改vue-devtools > shells > chrome > manifest.json文件，把"persistent":false改成true
```json
  "devtools_page": "devtools-background.html",
  "background": {
    "scripts": [
      "build/background.js"
    ],
    "persistent": false // true
  },
```
4. 编译代码
```
    npm run build
```
5. 扩展Chrome插件，Chrome浏览器 >  更多工具 > 扩展程序 ，勾选开发者模式，选择 vue-devtools > shells > chrome 放入
6. 重启浏览器，F12看到Vue即为成功


### vuex

#### 好处
1. 全局，存一个，所有地方都能用。
2. 统一，改一个全局变。
3. 单一，只要存储一份就行。

#### 解决问题
1. 数据跨组件共享，不用找父级子级，都可以使用
2. 防止数据被意外修改，父级子级太乱，vuex可以记录是谁改的，什么时候改的

#### 使用
* 下载 `npm i vuex -S`
* 配置
```javascript
    // vuex
    import Vuex from 'vuex'

    // use vuex
    Vue.use(Vuex)

    // vuex 声明store对象
    const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', // 严格模式，防止直接修改state，发布上线要改成false
    state: { // 数据
        a: 23,
        b: 33
    },
    mutations: { // 修改操作的封装
        add (state, n) {
            state.a += n
        }
    },
    actions: { // 调用mutaions
        add (context, n) {
        context.commit('add', n)
        }
    },
    getters: {}, // 读取数据，函数
    modules: {} // 模块，把state拆成模块

    })

    // cmp.vue
    export default {
        name: 'cmp',
        methods: {
            fn(){
                // commit 找 store中的 mutations
                this.$store.commit('add', 5)
                // dispacth 找 store中的 actions
                this.$store.dispatch('add',7);
            }
        }
    }
```