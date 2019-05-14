## HTTP服务


### b/s架构与c/s架构区别

#### b/s(淘宝、天猫)
1. b/s架构基于浏览器，无需安装，无需升级。
2. 性能稍微弱（从浏览器访问的服务器），不够安全。

#### c/s(qq、微信)
1. c/s架构基于安装包的形式，更新不方便，性能高。
2. 相对安全，客户端是自己编写的。


### 客户端
1. 具有向服务器获取服务能力的终端。
1. QQ获取即使通讯服务、通过迅雷获得下载服务器，浏览器获取web服务等。
2. 以浏览器为宿主环境，结合HTML、CSS、JavaScript等技术，而进行的一系列开发，简称前端开发。


### 服务器(对外提供服务的计算机)
1. 可以提供服务能力的终端。
2. 根据不同的划分标准，服务可划分为以下类型：
	* 服务器类型：文件服务器、数据库服务器
	* 操作系统：Linux服务器、Windows服务器
	* 应用软件：Apache服务器、Nginx服务器、IIS服务器、Tomcat服务器、Node服务器
3. 使计算机具备提供某种服务能力的应用软件，称为服务器软件。
4. 通过安装不同类型的应用软件，来提供不同类型的服务，常见的有：
	* 文件服务器：Server-U、FileZilla、VsFTP等
	* 数据库服务器：Oracle、MySQL、PostgreSQL、MSSQL等
	* 邮件服务器：Postfix、Sendmail等
	* web 服务器：Apache、Nginx、IIS、Tomcat、NodeJS等


### Apache

#### 路径
将所有的${SRVROOT}修改为安装路径
```
Define SRVROOT "D:\Data\Apache24"

ServerRoot "D:\Data\Apache24"
```

#### 端口号
端口号默认为80，可能会产生冲突，可修改默认配置为8008(任意)
```
#
# Listen: Allows you to bind Apache to specific IP addresses and/or
# ports, instead of the default. See also the <VirtualHost>
# directive.
#
# Change this to Listen on specific IP addresses as shown below to 
# prevent Apache from glomming onto all bound IP addresses.
#
#Listen 12.34.56.78:80
Listen 8008
```

#### 安装服务
以管理员身份运行控制台，进入到apache下的bin目录，输入以下命令
```
httpd -k install
```

检测是否配置正确，输出Syntax OK的话就说明成功了
```
httpd -t
```

#### 配置根目录结构
```
#
# DocumentRoot: The directory out of which you will serve your
# documents. By default, all requests are taken from this directory, but
# symbolic links and aliases may be used to point to other locations.
#
DocumentRoot "D:\Data\Apache24/htdocs"
<Directory "D:\Data\Apache24/htdocs">

```
在httpd.conf文件内，修改安装路径修改为项目路径
```
#
# DocumentRoot: The directory out of which you will serve your
# documents. By default, all requests are taken from this directory, but
# symbolic links and aliases may be used to point to other locations.
#
DocumentRoot "D:\Program Files\Git\storeroom"
<Directory "D:\Program Files\Git\storeroom">
```

#### 虚拟主机

##### 配置hosts
C:\Windows\System32\drivers\etc\hosts(简称hosts)
```
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host

# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost


127.0.0.1       localhost
127.0.0.1       localhost
```
最后的一句代表了访问localhost就会访问127.0.0.1，也就是本机。

当访问 http://www.jd.com 时就会找到hosts文件，访问该域名的映射，也就是127.0.0.1(本机)，服务器打开时，会直接进入服务器界面。
```
127.0.0.1		www.jd.com
```
只能绑定ip，对端口无效，如端口8008，需要手动敲入 http://www.jd.com:8008

##### 配置虚拟主机

将#号去掉，服务器会解析httpd-vhosts.conf
```
# Virtual hosts
Include conf/extra/httpd-vhosts.conf
```

原文件:httpd-vhosts.conf
```
<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host.example.com
    DocumentRoot "${SRVROOT}/docs/dummy-host.example.com"
    ServerName dummy-host.example.com
    ServerAlias www.dummy-host.example.com
    ErrorLog "logs/dummy-host.example.com-error.log"
    CustomLog "logs/dummy-host.example.com-access.log" common
</VirtualHost>

<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host2.example.com
    DocumentRoot "${SRVROOT}/docs/dummy-host2.example.com"
    ServerName dummy-host2.example.com
    ErrorLog "logs/dummy-host2.example.com-error.log"
    CustomLog "logs/dummy-host2.example.com-access.log" common
</VirtualHost>
```

配置后
```
<VirtualHost *:8008>
   DocumentRoot "D:/Program Files/Git/storeroom/basics/HTTP/test/tianmao"
   ServerName tianmao.com
   ServerAlias www.tianmao.com
</VirtualHost>
```
DocumentRoot 网址文件存放的根目录。<br>
ServerName   网址域名，需要跟DNS指向的域名一致。<br>

**注意要在hosts中加一条相应的映射，否则无效。**


### 网络基础

#### IP地址(等同于电话号码)
每个连接在互联网上的主机分配的一个32位的IP地址。<br>
查看本机的IP地址可以使用：ping、ipconfig、ifconfig。<br>
公网ip，需要到电信局申请，可以对外提供服务

#### 域名(类似于电话本中电话号码的备注)
由于IP地址基于数字，不方便记忆，于是便用域名来代替IP地址，域名是一个IP地址的“面具”

#### DNS服务
记录IP和域名的映射关系

#### 端口号
端口号是计算机与外界通讯交流的出口，每个端口对应不同的服务。<br>
查看端口占用情况 netstat -an。<br>
要对外提供服务，必须占用一个端口。<br>
一台计算机大概有5w+个端口


### 部署
购买服务器-->购买域名-->远程桌面连接(mstsc)-->安装服务器-->公网ip即可访问


### 资源

#### 静态资源
可以直接被浏览器解析的，例html,css,js,img,video...

#### 动态资源
例如，php,jsp,asp

#### 静态资源与动态资源的区别
客户端去请求服务器，实际上请求的是服务器上面的资源，资源就是一些文件，服务器会根据我访问的地址进行查找。<br>
如果找到静态资源，就直接响应给浏览器客户端。<br>
如果找到动态资源，就会在服务器把动态资源转换成静态资源，响应给客户端浏览器。<br>

静态资源是在客户端浏览器运行的。<br>
动态资源是在服务器被解析运行的。


### http，超文本传输协议
> http协议是约束客户端浏览器和服务器之间通讯的标准。<br>
> 客户端与服务器通讯是基于请求与响应的，客户端发送请求到服务器，服务器接收到请求返回响应。<br>
> 客户端和浏览器的交互是通过数据，而http协议就是数据格式。<br>
> http协议的数据格式分为两种进行分析，客户端发送请求的数据格式，服务器返回响应的数据格式。<br>

#### get请求
```
request
/*
    首行
    GET  请求的提交方式
    /basics/php/fileupload/fileupload.html  根据地址去找服务器的资源
    HTTP/1.1  协议版本
*/
GET /basics/php/fileupload/fileupload.html HTTP/1.1

// 主机地址
Host	localhost:8008

// 缓存机制
Cache-Control	max-age=0

// 客户端向服务器表示支持升级机制，http->https
Upgrade-Insecure-Requests	1

// 告诉浏览器的版本，以及操作系统的版本
User-Agent	Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36

// 告诉服务器，客户端接收的数据格式
Accept	text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8

// 请求来自于哪个页面，告诉服务器我是从哪个页面链接过来的，比如外部的网址调用
Referer	http://localhost:8008/basics/php/fileupload/

// 接收的服务器的压缩类型
Accept-Encoding	gzip, deflate, br

// 接收的语言
Accept-Language	zh-CN,zh;q=0.9
Cookie	PHPSESSID=jiu07r7vpk3af02lkg4cipjn8c

// 决定当前的事务完成后，是否会关闭网络连接。值是“keep-alive”，网络连接就是持久的，不会关闭，使得对同一个服务器的请求可以继续在该连接上完成。
Connection	keep-alive
```

#### post请求
```
request

POST /basics/php/fileupload/fileupload.php HTTP/1.1
Host	localhost:8008

// 发送给接收方的消息主体的大小，即用十进制数字表示的八位元组的数目
Content-Length	8333
Cache-Control	max-age=0

// 请求来自于哪个站点
Origin	http://localhost:8008
Upgrade-Insecure-Requests	1

// post提交，有一个默认的请求头 Content-Type:application/x-www-form-urlencoded
Content-Type	multipart/form-data; boundary=----WebKitFormBoundarywjOy0XOgmW0UEHnK
User-Agent	Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
Accept	text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Referer	http://localhost:8008/basics/php/fileupload/fileupload.html
Accept-Encoding	gzip, deflate, br
Accept-Language	zh-CN,zh;q=0.9
Cookie	PHPSESSID=jiu07r7vpk3af02lkg4cipjn8c
Connection	keep-alive

response
// 响应首行

// 协议版本 状态码 成功
HTTP/1.1 200 OK

// 服务器的时间
Date	Thu, 09 May 2019 13:17:46 GMT

// 使用的服务器版本，语言版本
Server	Apache/2.4.38 (Win64) PHP/7.2.16

// 告知网站是用何种语言或框架编写的
X-Powered-By	PHP/7.2.16

// 告诉客户端浏览器，响应体的长度
Content-Length	12

// 在一次TCP连接中可以持续发送多份数据而不会断开连接,长时间的tcp连接容易导致系统资源无效占用,会等待timeout秒关闭连接
Keep-Alive	timeout=5, max=100

// 响应的数据格式
Content-Type	text/html;charset=utf-8

// 来协商浏览器和代理之间的链接
Proxy-Connection	keep-alive

响应头
响应空行
响应体 --> 代码
```

#### get 方式提交和 post 方式提交的区别
1. get 发送的数据在地址栏中，请求参数在地址栏中不安全
2. get 发送的数据对数据大小有限制，超出会造成数据丢失
3. get 没有请求体，请求参数在地址栏中，所有请求体没有数据
4. post 发送的数据在请求体中，相对安全
5. post 对请求的数据的大小没有限制
6. post 有一个默认的请求头 Content-Type:application/x-www-form-urlencoded
7. get 的请求头相对较少，性能较高

#### 状态码
* 200 ok
* 302 重定向
* 304 后端文件没有任何改变
* 400 没有权限访问
* 404 请求的资源没有找到
* 500 服务器内部错误


### cookie，http规定的规范

#### 定义
> cookie就是服务器端给客户端的一张小纸条，当客户端访问服务器的时候，服务器就可以发送cookie，在cookie里保存数据，而客户端接收到服务器的响应后，会将cookie保存起来，当客户端再次调用服务器的时候，会将保存的cookie发送到服务器。

#### 原理
> 客户端发送一个请求到服务器，服务器对客户端发送cookie，这个cookie会保存在Set-Cookie响应头中，响应头的值是设置的数据，客户端拿到cookie后会根据http的标准进行解析并保存。当客户端再次请求服务器时，会将cookie保存在Cookie请求头中，以name=value的形式发送到服务器。

#### 生命周期
1. 内存cookie，关闭浏览器，cookie就会消失。不设置有效时间。
2. 硬盘cookie，保存在硬盘上，关机也在，只能使用清除记录之类的软件，设置有效时间。
3. 追杀cookie，把之前写到客户端的cookie清除掉。设置一个有效时间之前的时间，清除cookie。

#### 应用场景
1. http是基于请求和响应的，当连接断开的时候，http协议是无状态的，服务器不会记住客户端的状态，cookie就是用来记住状态的，用来多个请求之间的数据共享。

#### 注意点
1. cookie是保存在客户端的，当用户禁用的时候，就没用了。
2. 由于cookie保存在客户端，可能会被伪造修改，可以通过加密(md5)，在服务器端解密来预防欺骗，而且数据必须和数据库进行对应，以防串改。
3. 由于各个浏览器cookie存储标准不一，所有尽量保证cookie在20条内，大小在4k。

#### cookie与Web Storage的区别
1. cookie是在客户端和服务器端进行传递的，而localStorage和sessionStorage是在本地存储的，不会主动发送到服务器
2. 存储大小，cookie只能存储4k大小，并且不能超过20个，而localStorage和sessionStorage支持5M大小，甚至更大。
3. 生命周期，cookie只在有效时间内存活，sessionStorage在关闭浏览器窗口前存活，localStorage永久有效。
4. 作用域，cookie在同源路径下有效，localStorage在所有同源窗口中有效，sessionStorage仅在同源窗口有效，关闭窗口就失效了。

### session

#### 诞生
> 一个网站的会话是由多个http请求组成的，http请求是无状态的，基于请求响应的，每个请求都是独立的，一次会话需要建立数据共享，所以需要使用session。

#### 原理
1. 会话开始是由服务器创建session，当第一次请求的时候，会先执行session_start()，这个方法会通过cookie传递的sessionID，在session池中查找，如果没有传递服务器会创建一个session，然后以关联数组的形式存放sessionID作为key，session作为值进行存储，然后给客户端一个响应头，这个响应头是一个set_cookie，这个set_cookie就是sessionID。
2. 第二次请求，从客户端传递的cookie里面获取到sessionID，然后根据sessionID到session池中获取数据，再将数据存入到$_SESSION(php)中。

#### 生命周期
1. 服务器是通过session的id来判断客户端的，也就是session文件名，session文件名是随机生成且唯一的，当未设置有效期时，session会存储在内存中，在浏览器关闭后会被销毁，当重新请求该页面时，会重新注册session。 
2. session的存储模式是心跳机制，当在有效期内访问服务器，访问session时，会重置有效期，重新开始计时。

#### cookie与session的区别
1. 存储位置，cookie是存储在客户端，session是存储在服务器端的
2. 存储大小，cookie存储大小有限制(4k)，不能超过20个cookie，而session没有。
3. 存储格式，cookie存储的是字符串，session存储的是对象。
4. 作用域，cookie只作用在设置的路径内，session作用在整个网站
5. 对服务器造成的压力，cookie的数据保存在客户端，不占用服务器资源，session保管在服务器，每一个用户生成一个sessionID，并发量高时会消耗大量内存。
6. 安全性，cookie每次请求都会附带，增加不必要的流量，并且服务器还要效验以防诈骗，session只要验证一次即可。
7. 有效期，cookie可以设置一个很长的时间，session基于在cookie之上的，默认有效期是-1，关闭即失效，也可以设置有效时间。

#### 应用场景
1. 记住上次播放时间，阅读记录等等。。
2. 登录
3. 购物车

