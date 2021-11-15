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

- [尚硅谷](https://www.bilibili.com/video/BV18E411x7eT)
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