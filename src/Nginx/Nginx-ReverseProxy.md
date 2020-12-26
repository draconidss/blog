---
title: Nginx-反向代理
author: LifeAlsoIsGG
time: 2020-12-25 00:57:51
original: true
categories: 
  - Nginx
tags: 
  - Nginx
---





## 参考



## 介绍



### 正向代理

::: info 正向代理

局域网中的电脑用户想要直接访问网络是不可行的，只能通过代理服务器来访问，这种代理服务就被称为正向代理。

:::



![正向代理](D:/repository/static-blog/src/Nginx/images/Nginx-ReverseProxy/Forward_proxy.png)







### 反向代理

::: info 反向代理

客户端无法感知代理，因为客户端访问网络不需要配置，只要把请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据，然后再返回到客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器IP地址。



Nginx在做反向代理时，提供性能稳定，并且能够提供配置灵活的转发功能。Nginx可以根据不同的正则匹配，采取不同的转发策略，比如图片文件结尾的走文件服务器，动态页面走web服务器，只要你正则写的没问题，又有相对应的服务器解决方案，你就可以随心所欲的玩。并且Nginx对返回结果进行错误页跳转，异常判断等。如果被分发的服务器存在异常，他可以将请求重新转发给另外一台服务器，然后自动去除异常服务器。

:::





![反向代理](D:/repository/static-blog/src/Nginx/images/Nginx-ReverseProxy/Reverse_Proxy.png)







### 正向代理和反向代理的区别

两者的区别在于代理的对象不一样

::: info 区别

**正向代理是为客户端代理，反向代理是为服务端代理。**

:::





## 使用



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

