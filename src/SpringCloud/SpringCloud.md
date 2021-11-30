---
title: SpringCloud笔记
author: Draco
time: 2021-11-13 23:29:44
categories: 
  - Spring
  - SpringCloud
tags: 
  - Spring
  - SpringCloud
---



## 参考

- [尚硅谷SpringCloud教程](https://www.bilibili.com/video/BV18E411x7eT)
- [尚硅谷SpringCloud笔记](https://blog.csdn.net/u011863024/article/details/114298270)
- SpringCloud官方文档
- [SpringCloud中文文档](https://www.bookstack.cn/read/spring-cloud-docs/docs-index.md)



## 整体架构

- 服务注册与发现
- 服务调用
- 熔断
- 均衡
- 降级
- 消息队列
- 配置中心管理
- 网关
- 监控
- 全链路追踪
- 消息总线
- 自动化构建部署
- 服务定时任务调度



## 常用模块

- Eureka：服务治理组件，包括服务端的注册中心和客户端的服务发现机制；
- Ribbon：负载均衡的服务调用组件，具有多种负载均衡调用策略；
- Hystrix：服务容错组件，实现了断路器模式，为依赖服务的出错和延迟提供了容错能力；
- Feign：基于Ribbon和Hystrix的声明式服务调用组件；
- Zuul：API网关组件，对请求提供路由及过滤功能。
- config：分布式配置管理
- Sleuth：服务跟踪
- Stream：构建消息驱动的微服务应用程序的框架
- Bus：消息代理的集群消息总线

![image-20211114002242991](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/SpringCloud/%E5%B8%B8%E7%94%A8%E6%A8%A1%E5%9D%97.png)





## 项目搭建

- Github



## 服务注册与发现中心



![image-20211127214233621](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/SpringCloud/eureka%E4%B8%8Edubbo%E5%AF%B9%E6%AF%94.png)



### Eureka

参考

- [微服务Eureka使用详解](https://www.cnblogs.com/yxth/p/10845640.html)



Eureka是spring cloud中的一个负责服务注册与发现的组件。遵循着CAP理论中的A(可用性)P(分区容错性)。

组件

- Eureka server：服务的注册与发现中心，各个微服务节点通过配置启动后,会在 Eureka Server中进行注册,这样EurekaServer中的服务注册表中将会存储所有可用服务节点的信息,服务节点的信息可以在界面中直观看到
- Eureka client：EurekaClient通过注册中心进行访问是个ava客户端,用于简化 Eureka server的交互,客户端同时也具备个内置的、使用轮峋( (round- robin)负载算法的负载均衡器。在应用启动后,将会向 Eureka server发送心跳(默认周期为30秒)。如果 Eureka Server在多个心跳周期内没有接收到某个节点的心跳, EurekaServer将会从服务注册表中把这个服务节点移除(默认90秒

![img](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/SpringCloud/eureka%E6%9C%8D%E5%8A%A1%E6%9E%B6%E6%9E%84.png)
