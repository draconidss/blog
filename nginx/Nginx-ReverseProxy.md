---
title: Nginx-反向代理
author: Draco
time: 2020-12-25 00:57:51
categories: 
  - Nginx
tags: 
  - Nginx
---





## 参考



::: tip 参考

- [Nginx学习笔记 基于docker](https://blog.csdn.net/m0_49558851/article/details/107786372)
- [Nginx（三）------nginx 反向代理](https://www.cnblogs.com/ysocean/p/9392908.html)

:::





## 1. 介绍



### 1.1 正向代理

::: info 正向代理

局域网中的电脑用户想要直接访问网络是不可行的，只能通过代理服务器来访问，这种代理服务就被称为正向代理。

:::



![正向代理](D:/repository/static-blog/src/Nginx/images/Nginx-ReverseProxy/Forward_proxy.png)







### 1.2 反向代理

::: info 反向代理

客户端无法感知代理，因为客户端访问网络不需要配置，只要把请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据，然后再返回到客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器IP地址。



Nginx在做反向代理时，提供性能稳定，并且能够提供配置灵活的转发功能。Nginx可以根据不同的正则匹配，采取不同的转发策略，比如图片文件结尾的走文件服务器，动态页面走web服务器，只要你正则写的没问题，又有相对应的服务器解决方案，你就可以随心所欲的玩。并且Nginx对返回结果进行错误页跳转，异常判断等。如果被分发的服务器存在异常，他可以将请求重新转发给另外一台服务器，然后自动去除异常服务器。

:::





![反向代理](D:/repository/static-blog/src/Nginx/images/Nginx-ReverseProxy/Reverse_Proxy.png)







### 1.3 正向代理和反向代理的区别

两者的区别在于代理的对象不一样

::: info 区别

**正向代理是为客户端代理，反向代理是为服务端代理。**

:::





## 2. 简单使用



在`location块`中设置

```json
proxy_pass http://47.100.59.153:8080/;
```



```json
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;
    
		#基于反向代理到8080端口的tomcat服务器
    location / {
      proxy_pass http://47.100.59.153:8080/;
    
    }

#    location / {
#       root   /usr/share/nginx/html;
#       index  index.html index.htm;
#   }
}
```



## 3. 关于location的路径映射



优先级关系：
(location = ) > (location /xxx/yyy/zzz) > (location ^~) > (location ~,~*) > (location /起始路径) > (location /)



### 3.1 精准匹配

::: info 精准匹配

```json
# 1. = 匹配
location = / {
	#精准匹配，主机名后面不能带能和字符串
	#例如www.baidu.com不能是www.baidu.com/id=xxx
}
```

:::



### 3.2 通用匹配

```json
#2. 通用匹配
location /xxx {
  #匹配所有以/xxx开头的路径
  #例如127.0.0.1:8080/xxx	xxx可以为空，为空则和=匹配一样
}
```





### 3.3 匹配开头路径

```json
#4. 匹配开头路径
location ^~ /xxx/xx {
  #匹配所有以/xxx/xx开头的路径
}
```





### 3.4 正则匹配

```json
#3. 正则匹配
location ~ /xxx {
#匹配所有以/xxx开头的路径
}
```







### 3.5 匹配结尾路径

```json
#5. 匹配结尾路径
location ~* \.(gif/jpg/png)$ {
  #匹配以.gif、.jpg或者.png结尾的路径
}
```



### 3.6 例子

使用tomcat中的examples为例

`default.conf`

```json
server {
  listen       80;
  listen  [::]:80;
	server_name  localhost;

	location = /index {
		proxy_pass http://47.100.59.153:8080/;
	}

	location ^~ /examples/ {
  	proxy_pass http://47.100.59.153:8080/examples/;
	}

	location / {
  	proxy_pass http://47.100.59.153:8080/;
	}

  #    location / {
  #       root   /usr/share/nginx/html;
  #       index  index.html index.htm;
  #   }
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
  root   /usr/share/nginx/html;
  }
}
```



在docker-compose.yml的文件下执行命令重启

```sh
docker-compose restart
```





## 4. 相关配置



::: tip 参考

- [Nginx（三）------nginx 反向代理](https://www.cnblogs.com/ysocean/p/9392908.html)

:::





