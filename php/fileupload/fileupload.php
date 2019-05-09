<?php

    header("Content-Type:text/html;charset=utf-8");

    // 1. 获取文件数据
    /*
            array(1) {
                ["lifephoto"]=&gt;
                array(5) {
                    ["name"]=&gt;
                    string(10) "头像.jpg"
                    ["type"]=&gt;
                    string(10) "image/jpeg"
                    ["tmp_name"]=&gt;
                    string(27) "C:\Windows\Temp\php20E0.tmp"
                    ["error"]=&gt;
                    int(0)
                    ["size"]=&gt;
                    int(8144)
                }
            }

    */
    
    $lifephoto = $_FILES["lifephoto"];   // 文件   

    $filename = $lifephoto["name"];      // 文件名称    
    $tmp_name = $lifephoto["tmp_name"];  // 文件上传后临时路径
        
    // 向images下进行硬盘存储
    move_uploaded_file($tmp_name, "images/".$filename);  // 移动上传文件

    echo "上传成功";
?>