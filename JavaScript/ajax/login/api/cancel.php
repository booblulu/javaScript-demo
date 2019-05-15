<?php

    header("Content-Type:text/html;charset=utf-8");
    setcookie("flag","",time()-3600,"/");
    session_start();

    unset($_SESSION["user"]);

    echo "注销成功，3秒后跳转首页";

    header("Refresh:3;url=../page/index.html");

        
    

?>