### 相关常用命令(nginx根目录)

   * ```
     nginx -c /path/to/nginx.conf  #以特定目录下的配置文件启动nginx:

     nginx -s  reload  #修改配置后重新加载生效

     nginx -s  reopen   #重新打开日志文件

     nginx -s stop  #快速停止nginx,暴力停止,可能造成数据丢失

     nginx -s quit  #完整有序的停止nginx

     nginx -t    #测试当前配置文件是否正确

     nginx -t -c /path/to/nginx.conf #测试特定的nginx配置文件是否正确
     ```