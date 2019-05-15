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

    $sql = "insert into users(username,password,loginName) values('$username','$password','$loginName')";
    $res = $link->query($sql);
    if(!$res){
        die("error sql: ".$link->error);
    }  

    session_start();
    $_SESSION["user"] = array(
        "username" => $username,
        "password" => $password,
        "loginName" => $loginName
    );
    echo "注册成功，3秒后跳转到首页";
    setcookie("flag",1,time()+3600*24,"/");
    setcookie("username",$loginName,time()+3600*24,"/");
    header("Refresh:3;url=../page/index.html");
       



?>