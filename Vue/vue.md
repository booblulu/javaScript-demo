## Vue

### 开发模式

* MVC 数据(后台接口)，表现(视图)，行为(js)
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
            // 根元素(挂载点)，只在el内起作用
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
</body>
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