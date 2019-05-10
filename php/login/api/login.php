<?php

    header("Content-Type:text/html;charset=utf-8");
    header("Refresh:5;url:'../person.html'");

    $username = $_POST["username"];
    $password = $_POST["password"];

    $link = @new mysqli("localhost","root","abc123");
    if($link->connect_error){
        die("Could not connect to the database: " . $link->connect_error);
    }

    $select_db = $link->select_db("test");
    if(!$select_db){
        die("Could not connect to the db: " . $link->error);
    }

    $sql = "select * from users where username = '$username' and password = '$password'";
    $res = $link->query($sql);
    if(!$res){
        die("sql error: " . $link->error);
    }
    
    if($res->num_rows > 0){
        $row = $res->fetch_assoc();

        echo $row["loginName"]." 登陆成功，五秒后跳转到<a href='../person.html'>管理首页</a>";
    } else {
        echo "登录失败";
    }
    
?>