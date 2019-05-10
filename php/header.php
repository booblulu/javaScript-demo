<?php

    header("Content-Type:text/html;charset=utf-8");

    header("Refresh:10;url=http://www.baidu.com");

    echo "10秒之后跳转到百度，如果没有跳转，请点击<a href='http://www.baidu.com'>百度</a><br>";

    // 获取请求头 getallheaders()
    $arr = getallheaders();
    $User_Agent = $arr["User-Agent"];

    // 当客户端访问服务器，服务器会获取到客户端浏览器的版本，然后返回到客户端浏览器，告知当前浏览器的版本
    // strstr(字符串，目标字符串) 监测是否存在目标字符串
    if (strstr($User_Agent, "OPR")){
        echo "当前使用的是Opera";
    } else if(strstr($User_Agent, "Edge")){
        echo "当前使用的是Edge";
    } else if (strstr($User_Agent, "Firefox")){
        echo "当前使用的是火狐";
    } else if (strstr($User_Agent, "Trident")){
        echo "当前使用的是IE";
    } else if (strstr($User_Agent, "Chrome")){
        echo "当前使用的是谷歌";
    } else {
        echo "当前版本过低，请<a href='http://www.360.cn'>升级</a>";
    }
?>
