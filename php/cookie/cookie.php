<?php

    echo "向客服端发送cookie";

    // 发送cookie，以键值对的形式，输出到客户端
    setcookie("username","lulu",time()+3600*12);
   
?>