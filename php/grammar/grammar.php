<?php

    // 解决乱码
    header("Content-Type:text/html;charset=utf-8");

    // 1. 变量，以$开头，参数决定类型，不能以数字开头，区分大小写
    $username="lulu";
    $age = 11;
    $flag = true; // 1,当为false不会输出

    echo $flag;


    // 2. 定义数组
    
    // 2.1 普通数组
    $arrs = array("3", "4", "33");

    // 2.2 关联数组
    $array = array("name"=>"lulu","age"=>22);


    // 3. 输出

    // 3.1 输出字符串
    /*
        相同：echo 和 print 都只能输出字符串
        区别：echo 可以连续输出多个变量，而 print 只能输出一个变量
              echo 使用比 print 快
              print 可以直接赋值，echo不可以
    */
    echo "<a href='https://www.baidu.com'>百度一下</a>","2222";
    print "aaa";
    $a = print " 123 ";

    // 3.2 输出数组、对象之类的复合型变量
    /*
        相同：都用于输出数组、对象之类的复合型变量
        区别：print_r 只能打印易于理解的
              var_dump 输出信息比较详细，多用于调试
    */
    $array = array(1, 3, "name"=>"lulu", "age"=>22);

    var_dump($array); // array(2) { ["name"]=> string(4) "lulu" ["age"]=> int(22) } 
    print_r($array); // Array ( [name] => lulu [age] => 22 )


    echo "<br>";


    // 4. 连接符，php中为.
    function doubleKill ($username = "no") {
        return $username." success";
    }
    echo doubleKill($username);


    echo "<br>";


    // 5. 常见函数
    
    // 5.1 in_array()是否在数组中
    $arr = array(1,3,5,"name"=>"ttt");
    echo in_array(3, $arr); // 1
    echo in_array(4, $arr); // 空

    // 5.2 count()计算数组长度
    echo count($arr); // 4

    // 5.3 array_key_exists()检查数组中是否存在key
    echo array_key_exists("name",$arr); // 1
    echo array_key_exists("age",$arr); // 空

    // 5.4 file_get_contents读取文件，可以读取网络资源
    echo file_get_contents("1.txt");
    echo file_get_contents("http://www.baidu.com");
?>