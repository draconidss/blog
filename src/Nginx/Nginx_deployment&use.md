---
title: Nginx部署与使用
author: LifeAlsoIsGG
time: 2020-12-19 16:12:57
original: true
categories: 
  - Nginx
tags: 
  - Nginx
---




## 参考



## 安装（Docker安装）

::: tip 参考

[Docker 安装 Nginx](https://www.runoob.com/docker/docker-install-nginx.html)

:::



### 第一种：直接docker安装



#### 拉取镜像

::: tip

- https://hub.docker.com/_/nginx?tab=tags

:::

```bash
docker pull nginx:latest
```



#### 启动容器

```java
docker run --name nginx -p 80:80 -d nginx
```



#### 修改配置文件

配置文件存放路径：`/etc/nginx/nginx.conf`

修改后重启容器即可



### 第二种：使用docker-compose



在`/usr/local/docker/nginx/`配置好`docker-compose.yml`

```yml
version: '3.1'
services:
  nginx:
    restart: always
    image: nginx
    container_name: nginx
    ports:
      - 80:80
```



下载`docker-compose`

```bash
sudo curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
#或
sudo curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```



添加可执行权限

```bash
sudo chmod +x /usr/local/bin/docker-compose
```



运行`docker-compose.yml`

```bash
docker-compose up -d
```











## 反向代理





## 负载均衡