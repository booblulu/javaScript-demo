<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>首页</title>
</head>
<body>


<?php

    header("Content-Type:text/html;charset=utf-8");

    // 获取登录信息
    $user = array();
    session_start();
    if(isset($_SESSION["user"])){
        $user = $_SESSION["user"];
    }

    // 判断是否登录信息准确度，登录之后查看全部信息
    if(array_key_exists("username",$user) && isset($user["loginName"])){
        echo "欢迎你".$user["loginName"];

        $link = @new mysqli("localhost","root","abc123");
        if($link->connect_error){
            die("Could not connect to the database: " . $link->connect_error);
        }

        $select_db = $link->select_db("test");
        if(!$select_db){
            die("Could not connect to the db: " . $link->error);
        }

        $sql = "select * from users";
        $res = $link->query($sql);
        if(!$res){
            die("sql error: " . $link->error);
        }

        $list = array();
        // 游标
        while($row = $res->fetch_assoc()){
            $item = array(
                "id" => $row["Id"],
                "username" => $row["username"],
                "password" => $row["password"],
                "loginName" => $row["loginName"]
            );
            array_push($list,$item);
        }

        $link->close();
    } else {
        echo "请先<a href='../page/login.html'>登录</a>";
    }

    

    
?>
<?php if(isset($list)){ ?>
<table>
    <thead>
        <tr>
            <td>ID编号</td> 
            <td>用户名</td>
            <td>密码</td>
            <td>登录名</td>
        </tr>
    </thead>
    <tbody>
        <?php for($i=0; $i<count($list); $i++){ ?>
            <tr>
                <td><?php echo $list[$i]["id"];  ?></td> 
                <td><?php echo $list[$i]["username"]; ?></td>
                <td><?php echo $list[$i]["password"]; ?></td>
                <td><?php echo $list[$i]["loginName"]; ?></td>
            </tr>
        <?php } ?>
    </tbody>
</table>
<?php } ?>
</body>
</html>