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

#### v-test 等同于{{name}}
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

#### v-html
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
1. 带缓存，性能好，不会主动重新计算，只有当数据变了的时候才会计算，而methods是主动的，每使用一次就会计算一次。
2. 方便，可以使用读写的方式
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

### vue-router 
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
        <router-link to="/a">页面1</router-link>
        <router-link to="/b">页面2</router-link>
        <router-link to="/c">页面3</router-link>
    ```