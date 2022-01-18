---
icon: 
title: Docker deployment
author: Draco
time: 2020-05-31 15:39:08
description: Docker deployment
image: 
categories: 
  - Docker
tags: 
  - Docker
---





环境

CentOs 7



## 1. Docker常用命令

```shell
#0.搜索收藏数不⼩于10的镜像
docker search -s 10 名称

#1.下载镜像
docker pull 名称:tag

#2.查看下载的镜像
docker images;

#3.查看正在运⾏的容器
docker ps

#4.查看所有容器
docker ps -a

#5.运⾏容器
docker start/restart 容器名称/id

#6.停⽌容器
docker stop 容器名称/id

#7.在使⽤ -d 参数时，容器启动后会进⼊后台。此时想要进⼊容器，可以通过以下指令进⼊
docker attach 容器名称/id #不推荐使⽤，因为退出时会导致容器的停⽌
docker exec -it 容器名称/id /bin/bash #在进⼊容器后可使⽤linux命令，退出使⽤exit

#8.导出
docker export 容器名称/id > 名称.tar

#9.导⼊，可以使⽤ docker import 从容器快照⽂件中再导⼊为镜像，以下实例将快照⽂件指定
路径的tar 导⼊到镜像 test/test:v1:
cat tar路径 | docker import - test/test:v1
#也可以通过指定 URL 或者某个⽬录来导⼊
docker import http://example.com/exampleimage.tgz example/imagerepo

#10.删除容器
docker rm -f 容器名称/id

#11.启动&停止docker
service docker start#启动docker
service docker stop#停止docker
service docker restart#重启docker

#12.开机自启动docker
systemctl enable docker

```



## 2. 卸载旧版本

```shell
sudo yum remove docker \
 docker-client \
 docker-client-latest \
 docker-common \
 docker-latest \
 docker-latest-logrotate \
 docker-logrotate \
 docker-engine
```



## 3. 安装 Docker Engine-Community

在新主机上⾸次安装Docker Engine-Community之前，需要设置Docker 仓库。之后，您可以从仓库安装和更新 Docker。 



### 3.1 设置仓库 

安装所需的软件包。yum-utils 提供了 yum-config-manager ，并且 device mapper 存储驱动程序需要 device-mapper-persistent-data 和 lvm2。

```shell
sudo yum install -y yum-utils \
 device-mapper-persistent-data \
 lvm2
```

![](./images/Docker-deployment/setup_repository.jpg)

使⽤以下命令来设置稳定的仓库

```shell
#官⽅默认下载
sudo yum-config-manager \
 --add-repo \
https://download.docker.com/linux/centos/docker-ce.repo

#阿⾥云下载
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/dockerce/linux/centos/docker-ce.repo
```



### 3.2 安装 Docker Engine-Community

安装最新版本

```shell
sudo yum install docker-ce docker-ce-cli containerd.io
```

要安装特定版本的 Docker Engine-Community，请在存储库中列出可⽤版本，然后选择并安装： 

- 列出并排序您存储库中可⽤的版本。此示例按版本号（从⾼到低）对结果进⾏排序

  ```shell
  yum list docker-ce --showduplicates | sort -r
  ```

- 通过其完整的软件包名称安装特定版本，该软件包名称是软件包名称（docker-ce）加上版本字符串 （第⼆列），从第⼀个冒号（:）⼀直到第⼀个连字符，并⽤连字符（-）分隔。例如：docker-ce18.09.1。

  ```shell
  sudo yum install docker-ce- docker-ce-cli- containerd.io
  ```



### 3.3 启动Docker

```shell
sudo systemctl start docker
```



### 3.4 查看Docker命令

![](./images/Docker-deployment/docker_command.jpg)



### 3.5 镜像加速

```shell
vim /etc/docker/daemon.json

{ 
	"registry-mirrors": ["http://hub-mirror.c.163.com"] 	
} 
```

推荐使⽤阿⾥云加速，参考教程https://help.aliyun.com/document_detail/60750.html

更改后重启服务:

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```





## Docker-compose





## 参考Reference

[CentOs Docker Install](https://www.runoob.com/docker/centos-docker-install.html)