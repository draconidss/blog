---
title: Nginx-动静分离
author: LifeAlsoIsGG
time: 2021-01-03 00:04:05
original: true
categories: 
  - Nginx
tags: 
  - Nginx
---





## 参考





## 介绍





![什么是动静分离](./images/Nginx-Dynamic&static/dynamic&static.jpg)



**Nginx 动静分离简单来说就是把动态跟静态请求分开，不能理解成只是单纯的把动态页面和静态页面物理分离**。严格意义上说应该是`动态请求`跟`静态请求`分开，可以理解成使用 `Nginx` 处理`静态页面`， `Tomcat` 处理`动态页面`。动静分离从目前实现角度来讲大致分为两种：



::: info

1. 一种是纯粹把静态文件独立成单独的域名，放在独立的服务器上，也是目前主流推崇的方案；
2. 另外一种方法就是动态跟静态文件混合在一起发布，通过 nginx 来分开。

:::



通过 location 指定不同的后缀名实现不同的请求转发。通过 `expires` 参数设置，可以使浏览器缓存过期时间，减少与服务器之前的请求和流量。

具体 `Expires` 定义

::: info Expires 定义

是给一个资源设定一个过期时间，也就是说无需去服务端验证，直接通过浏览器自身确认是否过期即可，所以不会产生额外的流量。**此种方法非常适合不经常变动的资源**。（如果经常更新的文件，不建议使用 Expires 来缓存）

若将其设置 3d，表示在这 3 天之内访问这个 URL，发送一个请求，比对服务器该文件最后更新时间没有变化，则不会从服务器抓取，返回状态码304，如果有修改，则直接从服务器重新下载，返回状态码 200。

:::







Nginx的并发能力公式：

::: info 公式

worker_processes * worker_connections / 4 | 2 = Nginx最终的并发能力

:::



动态资源需要/4（因为要访问Nginx后面的服务器），静态资源需要/2（直接通过Nginx访问静态资源）

Nginx通过动静分离来提升Nginx的并发能力，更快的给用户响应





## 配置





### 创建数据卷并映射到docker中

`docker-compose.yml`

将`img`和`html`文件映射

```yaml
version: '3.1'
services:
  nginx:
    restart: always
    image: nginx
    container_name: nginx
    ports:
      - 80:80
    volumes:
      - /usr/local/docker/nginx/conf.d/:/etc/nginx/conf.d
      - /usr/local/docker/nginx/img/:/data/img
      - /usr/local/docker/nginx/html/:/data/html
```



根据配置重新加载docker中的nginx

```sh
docker-compose down
docker-compose up -d
```





### 修改配置文件的location映射

配置如下

```json
location / {
  root 静态资源路径;
  index 默认访问路径下的什么资源;
  autoindex on;#代表展示静态资源的全部内容，以列表的形式展开
}
```



default.conf

```json
location /html {
  root /data;
  index index.html;
}

location /img {
  root /data;
  autoindex on;
}
```





### 访问



访问`http://localhost/html/`或`http://localhost/img/index.html`如下

![访问](./images/Nginx-Dynamic&static/static_html.jpg)



访问`http://localhost/img/`如下（localhost替换为自己的服务器），首先要在img文件夹中放入文件

![访问](./images/Nginx-Dynamic&static/static-img.jpg)





