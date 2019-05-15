<?php

    header("Content-Type:text/html;charset=utf-8");

    $username = ""; 

    if(isset($_GET["username"])){
        $username = $_GET["username"];
    } else if (isset($_POST["username"])) {
        $username = $_POST["username"];
    } else {
        $username = "";
    }

    echo "服务器已获取用户名 ".$username;

?>