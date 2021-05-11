---
icon: 
title: ElasticSearch
author: LifeAlsoIsGG
time: 2021-05-07 20:06:38
description: 
original: true
image: 
categories: 
  - ElasticSearch
tags: 
  - ElasticSearch
---



## 参考

::: tips 参考

- [尚硅谷视频](https://www.bilibili.com/video/BV1hh411D7sb?from=search&seid=13278230873440832054)
- [尚硅谷笔记](https://blog.csdn.net/u011863024/article/details/115721328)

:::



## 安装

官网：[https://www.elastic.co/cn/elasticsearch/](https://www.elastic.co/cn/elasticsearch/)





## 学习路线

- 第1章 Elasticsearch概述
- 第2章 Elasticsearch入门
- 第3章 Elasticsearch环境
- 第4章 Elasticsearch进阶
- 第5章 Elasticsearch集成
- 第6章 Elasticsearch优化
- 第7章 Elasticsearch面试题



## 概述

Elaticsearch，简称为 ES， ES 是一个**开源的高扩展的分布式全文搜索引擎**， 是整个 ElasticStack 技术栈的核心。





## 部署

Windows 版的 Elasticsearch 压缩包，解压即安装完毕，解压后的 Elasticsearch 的目录结构如下 ：

| 目录    | 含义           |
| ------- | -------------- |
| bin     | 可执行脚本目录 |
| config  | 配置目录       |
| jdk     | 内置 JDK 目录  |
| lib     | 类库           |
| logs    | 日志目录       |
| modules | 模块目录       |
| plugins | 插件目录       |

解压后，进入 bin 文件目录，点击 elasticsearch.bat 文件启动 ES 服务 。

注意： 9300 端口为 Elasticsearch 集群间组件的通信端口， 9200 端口为浏览器访问的 http协议 RESTful 端口。

打开浏览器，输入地址： http://localhost:9200，测试返回结果，返回结果如下：

```json
{
  "name" : "DESKTOP-LNJQ0VF",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "nCZqBhfdT1-pw8Yas4QU9w",
  "version" : {
    "number" : "7.8.0",
    "build_flavor" : "default",
    "build_type" : "zip",
    "build_hash" : "757314695644ea9a1dc2fecd26d1a43856725e65",
    "build_date" : "2020-06-14T19:35:50.234439Z",
    "build_snapshot" : false,
    "lucene_version" : "8.5.1",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}

```





## 倒排索引

正排索引（传统）

| id   | content              |
| ---- | -------------------- |
| 1001 | my name is zhang san |
| 1002 | my name is li si     |



倒排索引



| keyword | id         |
| ------- | ---------- |
| name    | 1001, 1002 |
| zhang   | 1001       |



Elasticsearch 是**面向文档型数据库**，一条数据在这里就是一个文档。 为了方便大家理解，我们将 Elasticsearch 里存储文档数据和关系型数据库 MySQL 存储数据的概念进行一个类比



![](https://img-blog.csdnimg.cn/img_convert/146a779da01f53e7f7a8d53132d3c7cf.png)



ES 里的 Index 可以看做一个库，而 Types 相当于表， Documents 则相当于表的行。这里 Types 的概念已经被逐渐弱化， Elasticsearch 6.X 中，一个 index 下已经只能包含一个type， Elasticsearch 7.X 中, Type 的概念已经被删除了。



## 索引









## 操作




### HTTP操作

参考笔记



### Java API操作

参考笔记



### 集群搭建

参考笔记

