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
            }
        });
    </script>
```

### 指令(directive)
* 补充了html的属性
* v-bind 可以在属性中输出，并且去掉花括号，会当做遍变量处理
    - v-bind:name = "lulu"   简写  :name = "lulu"
    ```html
        <strong v-bind:title="calcBirth()">年龄：{{age+5}}<br></strong>
        <strong :title="calcBirth()">年龄：{{age+5}}<br></strong>
    ```
    - 可以作用任意属性，但有两个属性是另外的写法
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
* v-model 数据双向绑定，仅用于输入组件
    - 对dom进行操作，更快更便捷
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
    - 操作的数据是字符串
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
* v-test 等同于{{name}}
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
* v-html
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

### vue事件 (v-on)
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