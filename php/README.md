## PHP

### 查看php
```php
     print phpinfo();
```

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
    $flag = true; # 1,当为false不会输出

    echo $flag;

    # 2. 定义数组
    
    # 2.1 普通数组
    $arrs = array("3", "4", "33");

    # 2.2 关联数组
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

    # 3.2 输出数组、对象之类的复合型变量
    /*
        相同：都用于输出数组、对象之类的复合型变量
        区别：print_r 只能打印易于理解的
              var_dump 输出信息比较详细，多用于调试
    */
    $array = array(1, 3, "name"=>"lulu", "age"=>22);

    var_dump($array); # array(2) { ["name"]=> string(4) "lulu" ["age"]=> int(22) } 
    print_r($array); # Array ( [name] => lulu [age] => 22 )
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
    # 5.1 in_array()是否在数组中
    $arr = array(1,3,5,"name"=>"ttt");
    echo in_array(3, $arr); # 1
    echo in_array(4, $arr); # 空

    # 5.2 count()计算数组长度
    echo count($arr); # 4

    # 5.3 array_key_exists()检查数组中是否存在key
    echo array_key_exists("name",$arr); # 1
    echo array_key_exists("age",$arr);  # 空

    # 5.4 file_get_contents读取文件，可以读取网络资源
    echo file_get_contents("1.txt");
    echo file_get_contents("http://www.baidu.com");
```
6. 数据接收
```php
    # $_GET/POST['name']
    # 接收get类型数据
    $username = $_GET['username'];   
    $age = $_GET['age']; 

    # 接收post类型数据
    $username = $_POST['username'];   
    $age = $_POST['age']; 
```
7. 文件
```php
    # 通过$_FILES获取上传后的文件数据
    $lifephoto = $_FILES["lifephoto"];   # 文件   

    $filename = $lifephoto["name"];      # 文件名称    
    $tmp_name = $lifephoto["tmp_name"];  # 文件上传后临时路径
        
    # 向images下进行硬盘存储
    # 移动上传文件方法，参数1：临时文件夹，参数2：上传后的路径+文件名
    move_uploaded_file($tmp_name, "images/".$filename);  

    echo "上传成功";
```
8. 请求头
```php
    # 获取请求头 getallheaders()
    $arr = getallheaders();
    $User_Agent = $arr["User-Agent"];

    # 当客户端访问服务器，服务器会获取到客户端浏览器的版本，然后返回到客户端浏览器，告知当前浏览器的版本
    # strstr(字符串，目标字符串) 监测是否存在目标字符串
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
9. 注释
* 单行 # or //
* 多行 /**/
10. cookie
```php
    // 发送cookie，以键值对的形式，输出到客户端
    // setcookie( string name,[string value],[int expire],[string path],[string domain]);
    // expire 过期时间
    // path 服务器端有效路径，默认为当前设置cookie时的页面路径，'/'表示整个域名有效，'/A'表示A分类目录下的页面有效。只有设置的路径包含的页面才可以拿到cookie值
    // domain 该cookie有效的域名，指定域名才可以拿到
    ssetcookie("username","lulu",time()+3600*12);

    // 接收cookie
    $username = "";
    // 判断是否已经设置cookie
    if(isset($_COOKIE["username"])){
        $username = $_COOKIE["username"];
    }

    // 销毁cookie，可以通过设置cookie过期时间为以前的时间点来销毁，或者直接设置-1
    setcookie("username","",time()-2000);
    setcookie("username","",-1);
```

```js
    // 客户端获取cookie
    console.log(document.cookie);
```
11.session
```php
    // 0. session提供的方法，设置生命周期，必须在session_start()之前调用。
    session_set_cookie_params(time()+3600*24);

    // 但IE6下会有问题，可以使用cookie代替，cookie不好使就使用隐藏表单或者URL，php会将sessionID挂在url，使用$_GET获取。
    $sessionName = session_name();  //  取得当前 Session 名，默认为 PHPSESSID
    $sessionID = $_GET[$sessionName]; //  取得 Session ID   
    session_id($sessionID); //  使用 session_id() 设置获得的 Session ID
    session_set_cookie_params(time()+3600*24);
    
    // 1. 启动session，系统自动创建session文件
    session_start();

    // 2. 存储登录状态
    $_SESSION["flag"] = true;

    // 3. 销毁
    //  这种方法是将原来注册的某个变量销毁
    unset($_SESSION['admin']);

    //  这种方法是清空session中的全部数据
    // session_unset() || $_SESSION = array()
    
    //  这种方法是销毁整个session文件
    session_destroy();
    
    // 4. 生命周期
    // 服务器是通过session的id来判断客户端的，也就是session文件名，session文件名是随机生成且唯一的，当未设置有效期时，session会存储在内存中，在浏览器关闭后会被销毁，当重新请求该页面时，会重新注册session。 
    // 可以结合cookie来设置生命周期，cookie未被禁用时，设置多长时间session存活多久
    setcookie(session_name(),session_id(),time()+3600*24,"/");
```
12. 数据库
```php
    # 获取数据
    $username = $_POST["username"];
    $password = $_POST["password"];
    $loginName = $_POST["loginName"];
   
    # 与mysql建立连接
    $link = @new mysqli("localhost","root","abc123");

    # 诊断连接错误
    if($link->connect_error) {
        die("Could not connect to the database: " . $link->connect_error);
    }

    # 与数据库建立连接
    $select_db = $link->select_db("test");
    if(!$select_db) {
        die("could not connect to the db: " . $link->error);
    }

    # sql语句
    $sql = "insert into users(username,password,loginName) values('$username','$password','$loginName')";

    # 执行sql语句
    $res = $link->query($sql);
    if(!$res) {
        die("sql error: " . $link->error);
    }

    # 关闭连接
    $link->close();

    # 返回响应
    echo $loginName." 注册成功";

```