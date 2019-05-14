

<?php

    // 接收cookie
    $username = "";
    // 判断是否已经设置cookie
    if(isset($_COOKIE["username"])){
        $username = $_COOKIE["username"];
    }

    echo $username;

    setcookie("username","",time()-2000);

?>


<script>
    // 客户端获取cookie
    console.log(document.cookie);
</script>