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