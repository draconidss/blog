---
icon: 
title: 听歌识曲开放平台架构手册
author: Draco
time: 2021-03-14 12:29:45
password: tencentmusic
description: 听歌识曲开放平台架构方案
original: true
image: 
categories: 
  - My Project
tags: 
  - My Project
  - Java
---





## 写在前面/声明

我于2021年1月入职腾讯音乐娱乐科技(深圳)有限公司，作为全栈实习生，所在部门为`腾讯音乐娱乐/QQ音乐业务线/基础平台部/多媒体研发中心/听歌识曲算法组`。入职后了解到招我是因为目前有许多其他部门需要批量调用我们的`识曲服务SDK`，有着采用脚本或者临时调用的方式繁琐，不可控，沟通成本高，无法持久化日志等等痛点，所以一直想做一个开放平台中台，通过中台去调用服务。对于需求方来说，可视化，方便，实时查看批量识曲结果，可增量；而对于我们服务提供者兼管理者而言，可以动态查看各个识曲任务调用的SDK的QPS可视化并做到随时动态控制和预警，还能根据需求方那边具体的业务分配QPS并提前扩容(申请机器)等等，最重要的是让我们和需求方的对接规范化，流程化，可监控是最重要的。甚至以后还有可能开放出去面向`toB`，将听歌识曲开放平台推广(可参考其他开放平台[ACRCloud](https://www.acrcloud.com/music-recognition/))；



本文章不会涉及有关开发的真实数据。





## 需求评审/拆分

初次接手让我一个人做的时候需求方面比较模糊，导师只是先让我给了我一个基础流程图和参考网站即[ACRCloud](https://www.acrcloud.com/music-recognition/)



![acrcloud](./images/Music-Recognition/acrcloud.jpg)



并要求拥有基础的用户角色体系，管理员能随时查看和控制每个用户的每个任务调用`识曲服务SDK`的QPS，并能可视化监控和预警。`识曲服务SDK`采用的是http协议，即调用接口API的方式，所以会考虑到并发等问题所以要从我们这边控制好调用的QPS。过了两个月开发功能快完成时，与大部分需求方开了个关于数据源的形式的需求讨论会，发现大部分部门还是希望能简化调用，于是我们提出可以从原来的识曲任务绑定资源库的方式改为识曲任务绑定数据库的形式，需求方提供数据库地址端口号密码等，每次增量数据库就通知识曲任务增量。但在讨论过后发现不同部门一般不会暴露数据库，要做隔离，最后敲定说我们开放API接口的方式供他们调用，进行推送任务，查询结果等，还供给我们回调接口，即每识别一批增量数据后将结果推送到他们的接口。





## 技术栈



### 总览

::: info 技术栈总览

- 【前端】：Vue.js+ElementUi
- 【后端】：Springboot，SpringSecurity，Swagger，JWT(Java Web Token)，Mybatis Plus，Druid数据库连接池，EasyExcel
- 【数据库】：Mysql，Redis
- 【服务器】：Docker，Docker-compose，Nginx
- 【监控】：Grafana+Prometheus

:::





### 前端

::: info 技术栈

Vue.js+组件ElementUi

:::



为了快速开发前端，使用Vue.js搭配组件ElementUi，后面将项目打包后放到Docker部署的Nginx中，进行反向代理。开发难度基本不高。





### 后端

::: info 技术栈

Vue.js+组件ElementUi

:::