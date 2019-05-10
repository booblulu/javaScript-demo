## PHP

### 语法

1. 格式
```php
    <?php

    ?>
```
2. 变量，以$开头，参数决定类型，不能以数字开头，区分大小写，可重复定义
```php
    $username="lulu";
    $age = 11;
    $flag = true; // 1,当为false不会输出

    echo $flag;

    // 2. 定义数组
    
    // 2.1 普通数组
    $arrs = array("3", "4", "33");

    // 2.2 关联数组
    $array = array("name"=>"lulu","age"=>22);

    echo $flag;
```
3. 输出
```php
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
```
4. 连接符，php中为.
```php
    function doubleKill ($username = "no") {
        return $username." success";
    }
    echo doubleKill($username);
```
5. 常见函数
```php
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
```
6. 数据接收
```php
    // $_GET/POST['name']
    // 接收get类型数据
    $username = $_GET['username'];   
    $age = $_GET['age']; 

    // 接收post类型数据
    $username = $_POST['username'];   
    $age = $_POST['age']; 
```
7. 文件
```php
    // 通过$_FILES获取上传后的文件数据
    $lifephoto = $_FILES["lifephoto"];   // 文件   

    $filename = $lifephoto["name"];      // 文件名称    
    $tmp_name = $lifephoto["tmp_name"];  // 文件上传后临时路径
        
    // 向images下进行硬盘存储
    // 移动上传文件方法，参数1：临时文件夹，参数2：上传后的路径+文件名
    move_uploaded_file($tmp_name, "images/".$filename);  

    echo "上传成功";
```
8. 请求头
```php
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
```