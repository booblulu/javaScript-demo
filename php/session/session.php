<?php

    $username = "lulu";

    // 0. session提供的方法，设置生命周期，必须在session_start()之前调用。但IE6下会有问题，可以使用cookie代替，cookie不好使就使用隐藏表单或者URL，php会将sessionID挂在url，使用$_GET获取。
    // session_set_cookie_params(time()+3600*24);

    // 0.1 手动设置保存目录，，必须在session_start()之前调用。当用户的文件都存在系统临时文件夹时，会造成维护困难，可以将其放在一个web方式不能访问的文件夹，当然要具有读写功能。
    // $savePath = './session_save_dir/';
    // session_save_path($savePath);

    // 1. 开始会话，启动session，系统自动创建session文件
    session_start();

    // 2. 存储登录状态
    $_SESSION["flag"] = true;

    // 3. 销毁
    //  这种方法是将原来注册的某个变量销毁
    // unset($_SESSION['admin']);

    //  这种方法是销毁整个 Session 文件
    // session_destroy();

    // 4. 生命周期
    // 服务器是通过session的id来判断客户端的，也就是session文件名，session文件名是随机生成且唯一的，当未设置有效期时，session会存储在内存中，在浏览器关闭后会被销毁，当重新请求该页面时，会重新注册session。
    // 可以结合cookie来设置生命周期，cookie未被禁用时，设置多长时间session存活多久
    // setcookie(session_name(),session_id(),time()+3600*24,"/");


    echo "登录成功";

?>