<?php

    // 获取请求头 getallheaders()
    $arr = getallheaders();
    $User_Agent = $arr["User-Agent"];
    var_dump($User_Agent);

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