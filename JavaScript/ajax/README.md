## Ajax

### 同步交互
> 客户端给服务器发送请求，服务器返回一个响应，响应回来的数据会把页面覆盖掉，称为同步交互。

### 异步交互
> 客户端给服务器发送请求，服务器返回一个响应，响应回来的数据不会把页面覆盖掉，称为异步交互。

### 概念
实现页面不刷新，直接获取服务端的数据。

### 原理
同步交互：由浏览器直接帮助发送请求，浏览器接收数据后，会把原来的页面覆盖掉。<br>
异步交互：浏览器提供了一个js对象XMLHttpRequest，通过这个对象我们可以进行发送/接收/处理请求。

### 语法
1. 基本语法
```javascript
    // 1. 创建对象
    var xhr = new XMLHttpRequest();

    // 2. 打开连接
    // console.log(xhr.readyState); // 0
    xhr.open("get","login.php?username=lulu");

    // 3. 发送数据
    // console.log(xhr.readyState); // 1
    xhr.send(null);

    // 4. 接收数据 只能通过异步的方式，也就是回调函数
    // onreadystatechange 时刻监听服务器的改变
    xhr.onreadystatechange = ()=>{
        // 服务器数据响应成功会调用我
        // console.log(xhr.readyState);  // 2 3 4
        // 服务进行处理会返回一些状态  0=>初始化 1=>载入 2=>载入完成 3=>解析 4=>完成
        if (xhr.readyState === 4) {
            console.log("服务端数据响应成功");
        }
    }
```
2. readyState
> 0：初始化，XMLHttpRequest对象还没有完成初始化
1：载入，XMLHttpRequest对象开始发送请求
2：载入完成，XMLHttpRequest对象的请求发送完成
3：解析，XMLHttpRequest对象开始读取服务器的响应
4：完成，XMLHttpRequest对象读取服务器响应结束