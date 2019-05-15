<?php

    header("Content-Type:text/html;charset=utf-8");

    $username= $_POST["username"];
    $password = $_POST["password"];
    $newPassword = $_POST["newPassword"];

    $link = @new mysqli("localhost","root","abc123");
    if($link->connect_error){
        die("Could not connect to the database: " . $link->connect_error);
    }

    $select_db = $link->select_db("test");
    if(!$select_db){
        die("Could not connect to the db: " . $link->error);
    }

    $sql = "update users set password='$newPassword' where username='$username' and password='$password' ";
    $res = $link->query($sql);
    if(!$res){
        die("sql error: " . $link->error);
    } else {
        echo "修改成功，请重新<a href='../login.html'>登录</a>";
    }

    $link->close();
?>