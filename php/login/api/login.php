<?php
    
    //给客户端一个响应头，响应json 格式的数据.
    header('Content-Type:application/json;charset=utf-8');

    // 将用户名放到cookie中
    // setcookie("username",$_POST["username"],time()+3600*24*7,"/");

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
    
    $link->close();
    
    if($res->num_rows > 0){
        $row = $res->fetch_assoc();

        // 保存用户数据
        $user = array(
            "username" => $row["username"],
            "password" => $row["password"],
            "loginName" => $row["loginName"]
        );

        // 开启session存储用户数据
        session_start();
        $_SESSION["user"] = $user;

        header("Refresh:3;url=query.php");
        echo $row["loginName"]." 登陆成功，3秒后跳转首页";

        // 跳转到首页
    } else {
        header("Refresh:3;url=../page/login.html");
        echo "登录失败，3秒后跳转到登录页面";
        
    }
    
?>

