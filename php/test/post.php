<?php


    session_cache_limiter("private, must-revalidate"); 
    session_start(); 
    
    // 1. 接收数据
    $username = $_POST['username'];   // 接收post类型数据
    $password = $_POST['password']; 
    $message = "用户名或密码错误";
   
    // 2. 处理数据
    if ($username == "lulu" && $password == "123456") {
        $message = "欢迎登录 ".$username;
    }
    // 3. 返回响应
    echo $message;

?>