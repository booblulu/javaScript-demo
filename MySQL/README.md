## MySQL

### 语法命令
1. 登录
```
    mysql -uroot -p密码
```
2. 建库
```
    create Database 库名;
```
3. 查看表
```
    // 查看所有库
    show databases;

    // 查看所有表，use后
    show tables;

    // 查看表结构
    desc 表名;

    // 查看建表语句
    show create table 表名;
```
4. 使用库
```
    user 库名;
```
5. 建表
```
    create table 表名(
        列名1 数据类型1，
        列名2 数据类型2，
        ...
        列名n 数据类型n
    )
```
6. 删除 
```
    // 删除表结构
    drop table 表名;

    // 删除表中所有数据
    delete from 表名;

    // 按条件删除，id为1的
    delete from 表名 where id = 1;  
```
7. 增加
```
    // 增加一条，表内有多少列就写多少
    insert into 表名 values(参数1,参数2...参数n);

    // 选择性添加
    insert into 表名(列2) values(参数2);
```
8. 修改
```
    // 修改整列，将username全部修改为null
    update 表名 set username = "null";

    // 按条件修改，将小张改为小李
    updata 表名 set username = "小李" where username = "小张";
    
```
9. 查询
```
    // 查询整表
    select * from 表名;

    // 按列查找
    select 列1,列2 from 表名;

    // 按条件查找
    select * from 表名 where 条件;

    // 查看表中数据的数量
    select count(*) from 表名;
```



### 解决MySQL无法连接本地地址localhost

#### (10061)
未开启MySQL服务，cmd输入services.msc回车->找到MySQL开启服务

#### (10060)
检查防火墙是否放行3306端口，防火墙->入站规则->新建规则->点击端口填写3306->完成重启MySQL


### 修改密码
```
    set password for 用户名@localhost = password('密码')
```