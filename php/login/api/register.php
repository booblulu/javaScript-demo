<?php

    header("Connent-Type:text/html;charset=utf-8");

    # 获取数据
    $username = $_POST["username"];
    $password = $_POST["password"];
    $loginName = $_POST["loginName"];
   
    # 与mysql建立连接
    $link = @new mysqli("localhost","root","abc123");

    # 诊断连接错误
    if($link->connect_error) {
        die("Could not connect to the database: " . $link->connect_error);
    }

    # 与数据库建立连接
    $select_db = $link->select_db("test");
    if(!$select_db) {
        die("could not connect to the db: " . $link->error);
    }

    # sql语句
    $sql = "insert into users(username,password,loginName) values('$username','$password','$loginName')";

    # 执行sql语句
    $res = $link->query($sql);
    if(!$res) {
        die("sql error: " . $link->error);
    }

    # 关闭连接
    $link->close();

    # 返回响应
    echo $loginName." 注册成功";

?>