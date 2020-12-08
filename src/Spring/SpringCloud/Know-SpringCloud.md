---
title: 认识SpringCloud
author: LifeAlsoIsGG
time: 2020-06-07 17:00:47
original: true
categories: 
  - Spring
  - SpringCloud
tags: 
  - SpringBoot
  - SpringCloud
---



# SpringCloud课程

## 一、微服务和微服务架构

### 1.什么是微服务

> https://martinfowler.com/articles/microservices.html，提出者原文
>
> 维基百科上给出的定义是：微服务（Microservices）是一种软件开发技术，是面向服务的架构（Service-Oriented  Architecture，SOA）的变体，微服务架构将应用程序组成一系列松散耦合的服务集合。在微服务体系结构中，服务是细粒度的，协议是轻量级的。
>
> 传统开发模式下，绝大部分的 Web 应用都是采用单体架构的风格来进行构建的，这意味着 Web  应用是作为单个可部署的软件制品进行交付的，所有的接口、业务逻辑、持久层都被打包在一个 Web  应用中，并且部署在一台服务器上。这种开发模式会带来诸多不便，大多数情况下，一个应用程序是交由多个团队来协同开发的，每个开发团队负责各自不同的模块，并且会有自己的定制组件来服务对应的客户。
>
> 问题就出在这里，随着应用程序的规模和复杂度不断增长，多个团队协同开发一个单体应用程序会变得越来越困难、越来越复杂，假设某个团队需要修改接口，那么其他团队与之对应的代码也需要修改，同时整个应用程序都需要重新构建、测试、部署。
>
> 微服务架构就是为了解决上述问题而生的，它的本质在于分布式、去中心化。简单理解就是分解应用程序的功能，把一个大型服务拆分成很多小服务，使它们完全彼此独立，并且可以相互通信，拆分之后的微服务架构如下图所示。
>
> ![微服务](./images/Know-SpringCloud/Microservice.jpg)


​	**简单点说，微服务化的核心就是将传统的一站式应用，根据业务拆分成一个一个的服务，彻底地去耦合，每一个微服务提供单个业务功能的服务，一个服务做一件事情，从技术角度看就是一种小而独立的处理过程，类似进程的概念，能够自行单独启动或销毁，拥有自己独立的数据库。**

### 2.什么是微服务架构

> https://www.jianshu.com/p/bf3484efa709?utm_source=oschina-app

### 3.微服务架构的4个核心问题

> 1、服务很多，客户端该怎么访问？
>
> 2、这么多服务？服务之间如何通信
>
> 3、这么多服务？如何治理？
>
> 4、服务挂了怎么办？

### 4.微服务的优缺点

#### 优点

- 每个服务足够内聚，足够小，代码容易理解，这样能聚焦一个指定的业务功能或业务需求；
- 开发简单，开发效率提高，一个服务可能就是专一的只干一件事；
- 微服务能够被小团队单独开发，这个小团队是2~5人的开发人员组成；
- 微服务是松耦合的，是有功能意义的服务，无论是在开发阶段或部署阶段都是独立的；
- 微服务能使用不同的语言开发；
- 易于和第三方集成，微服务允许容易且灵活的方式集成自动部署，通过持续集成工具，如jenkins；
- 微服务易于被一个开发人员理解，修改和维护，这样小团队能够更关注自己的工作成果，无需通过合作才能体现价值
- 微服务允许你利用融合最新技术
- 微服务只是业务逻辑的代码，不会和HTML，CSS或其它界面混合
- 每个微服务都有自己的存储能力，可以有自己的数据库，也可以有统一数据库

#### 缺点

- 开发人员要处理分布式系统的复杂性
- 多服务运维难度，随着服务的增加，运维的压力也在增大
- 系统部署依赖
- 服务间通信成本
- 数据一致性
- 系统集成测试
- 性能监控

## 二、微服务解决方案

### 1.Spring Cloud NetFlix

> 18年停更了。

### 2.Apache Dubbo Zookeeper

> api网关：没有，找第三方组件，或自己实现
>
> Dubbo：基于socket通信，一个rpc框架
>
> Zookeeper：服务注册与发现
>
> 熔断机制：没有，使用第三方

### 3.Spring Cloud Alibaba

> 一站式解决方案！使用更简单
>
> Nacos：服务注册与发现，配置中心

### 4.微服务技术栈

| 微服务条目       | 落地技术                                                     |
| ---------------- | ------------------------------------------------------------ |
| 服务开发         | SpringBoot、SSM                                              |
| 服务配置与管理   | Netflix公司的Archaius、阿里的Diamond等                       |
| 服务注册与发现   | Eureka、Zookeeper、Nacos、Consul等                           |
| 服务调用         | Rest(Http)、RPC、gRPC                                        |
| 服务熔断器       | Hystrix、Envoy、Sentinel等                                   |
| 负载均衡         | Ribbon、Nginx、Feign等                                       |
| 服务接口调用     | Feign                                                        |
| 消息队列         | Kafka、RabbitMQ、ActiveMQ、RocketMQ                          |
| 服务配置中心管理 | config、consul、apollo、nacos                                |
| 服务路由(网关)   | Zuul、Gateway等                                              |
| 服务监控         | Zabbix、Nagios、Metrics、Specatator等                        |
| 全链路追踪       | Zipkin、Brave、Dapper等                                      |
| 服务部署         | Docker、OpenStack、Kubernetes(k8s)等                         |
| 数据流操作开发包 | SpringCloud Stream(封装与Redis、Rabbit、Kafka等发送接收消息) |
| 事件消息总线     | SpringCloud Bus                                              |



## 三、常见面试题

- ### 1.什么是微服务和微服务架构

> 1.微服务
>
> 强调的是服务的大小，它关注的是某一个点，是具体解决某一个问题并提供落地对应服务的一个服务应用，狭义的看，可以看做是IDEA中的一个个微服务工程或者Module
>
> 2.微服务架构
>
> 一种新的架构形式，由Martin Fowler，2014提出。
>
> 它提倡将单一应用程序划分成一组小的服务，服务之间相互协调，互相配合，为用户提供最终价值，每个服务运行在其独立的进程中，服务于服务间采用轻量级的通信机制互相协作，每个服务都围绕着具体的业务进行构建，并且能够被独立的部署到生产环境中，另外，应尽量避免统一的集中式的服务管理机制，对具体的一个服务而言，应根据业务上下文，选择合适的语言，工具对其进行构建。

- ### 2.微服务之间是如何独立通讯的

> Spring Cloud基于http协议通信
>
> Dubbo则是典型的rpc协议通信框架

- ### 3.SpringCloud和Dubbo有哪些区别

> 

- ### 4.SpringBoot和SpringCloud，请你谈谈对他们的理解

> 

- ### 5.什么是服务熔断？什么是服务降级

> 

- ### 6.微服务的优缺点分别是什么？说下你在项目中遇到的坑

> 

- ### 7.你所知道的微服务技术栈有哪些？请列举一二

> 

- ### 8.eureka和zookeeper都可以提供服务注册与发现的功能请说说两都之间的区别

> 

## [四、什么是SpringCloud](http://www.macrozheng.com/#/cloud/springcloud?id=什么是springcloud)

### [目标](http://www.macrozheng.com/#/cloud/springcloud?id=目标)

协调任何服务，简化分布式系统开发。

### [简介](http://www.macrozheng.com/#/cloud/springcloud?id=简介)

构建分布式系统不应该是复杂的，SpringCloud对常见的分布式系统模式提供了简单易用的编程模型，帮助开发者构建弹性、可靠、协调的应用程序。 SpringCloud是在SpringBoot的基础上构建的，使开发者可以轻松入门并快速提高工作效率。 SpringCloud为开发人员提供了快速构建分布式系统架构的工具，例如配置管理，服务发现，断路器，智能路由，微代理，控制总线，一次性令牌，全局锁定，领导选举，分布式会话，集群状态等。 

### [整体架构](http://www.macrozheng.com/#/cloud/springcloud?id=整体架构)


![Springcloud整体架构](./images/Know-SpringCloud/springcloud_Architecture.png)


### [SpringCloud的版本关系](http://www.macrozheng.com/#/cloud/springcloud?id=springcloud的版本关系)

SpringCloud是一个由许多子项目组成的综合项目，各子项目有不同的发布节奏。 为了管理SpringCloud与各子项目的版本依赖关系，发布了一个清单，其中包括了某个SpringCloud版本对应的子项目版本。 为了避免SpringCloud版本号与子项目版本号混淆，SpringCloud版本采用了名称而非版本号的命名，这些版本的名字采用了伦敦地铁站的名字，根据字母表的顺序来对应版本时间顺序，例如Angel是第一个版本, Brixton是第二个版本。 当SpringCloud的发布内容积累到临界点或者一个重大BUG被解决后，会发布一个"service releases"版本，简称SRX版本，比如Greenwich.SR2就是SpringCloud发布的Greenwich版本的第2个SRX版本。

#### [SpringCloud和SpringBoot版本对应关系](http://www.macrozheng.com/#/cloud/springcloud?id=springcloud和springboot版本对应关系)

| SpringCloud Version | SpringBoot Version |
| ------------------- | ------------------ |
| Hoxton              | 2.2.x              |
| Greenwich           | 2.1.x              |
| Finchley            | 2.0.x              |
| Edgware             | 1.5.x              |
| Dalston             | 1.5.x              |

#### SpringCloud和SpringBoot关系

- SpringBoot专注于快速方便的开发单个个体微服务，SpringCloud关注全局的服务治理框架
- SpringCloud是关注全局的微服务协调整理治理框架，它将SpringBoot开发的一个个单体微服务整合并管理起来，为各个微服务之间提供：配置管理，服务发现，断路器，路由，微代理，事件总线，全局锁，决策竞选，分布式会话等集成服务。
- SpringBoot可以离开SpringCloud独立使用，开发项目，但是SpringCloud离不开SpringBoot，属于依赖关系

#### [SpringCloud和各子项目版本对应关系](http://www.macrozheng.com/#/cloud/springcloud?id=springcloud和各子项目版本对应关系)

| Component              | Edgware.SR6    | Greenwich.SR2 |
| ---------------------- | -------------- | ------------- |
| spring-cloud-bus       | 1.3.4.RELEASE  | 2.1.2.RELEASE |
| spring-cloud-commons   | 1.3.6.RELEASE  | 2.1.2.RELEASE |
| spring-cloud-config    | 1.4.7.RELEASE  | 2.1.3.RELEASE |
| spring-cloud-netflix   | 1.4.7.RELEASE  | 2.1.2.RELEASE |
| spring-cloud-security  | 1.2.4.RELEASE  | 2.1.3.RELEASE |
| spring-cloud-consul    | 1.3.6.RELEASE  | 2.1.2.RELEASE |
| spring-cloud-sleuth    | 1.3.6.RELEASE  | 2.1.1.RELEASE |
| spring-cloud-stream    | Ditmars.SR5    | Fishtown.SR3  |
| spring-cloud-zookeeper | 1.2.3.RELEASE  | 2.1.2.RELEASE |
| spring-boot            | 1.5.21.RELEASE | 2.1.5.RELEASE |
| spring-cloud-task      | 1.2.4.RELEASE  | 2.1.2.RELEASE |
| spring-cloud-gateway   | 1.0.3.RELEASE  | 2.1.2.RELEASE |
| spring-cloud-openfeign | 暂无           | 2.1.2.RELEASE |

**注意：Greenwich版本是基于SpringBoot 2.1.x版本构建的，不适用于1.5.x版本。随着2019年8月SpringBoot 1.5.x版本停止维护，Edgware版本也将停止维护。**

### [SpringCloud子项目简介](http://www.macrozheng.com/#/cloud/springcloud?id=springcloud子项目简介)

#### [Spring Cloud Config](http://www.macrozheng.com/#/cloud/springcloud?id=spring-cloud-config)

集中配置管理工具，分布式系统中统一的外部配置管理，默认使用Git来存储配置，可以支持客户端配置的刷新及加密、解密操作。

#### [Spring Cloud Netflix](http://www.macrozheng.com/#/cloud/springcloud?id=spring-cloud-netflix)

Netflix OSS 开源组件集成，包括Eureka、Hystrix、Ribbon、Feign、Zuul等核心组件。

- Eureka：服务治理组件，包括服务端的注册中心和客户端的服务发现机制；
- Ribbon：负载均衡的服务调用组件，具有多种负载均衡调用策略；
- Hystrix：服务容错组件，实现了断路器模式，为依赖服务的出错和延迟提供了容错能力；
- Feign：基于Ribbon和Hystrix的声明式服务调用组件；
- Zuul：API网关组件，对请求提供路由及过滤功能。

#### [Spring Cloud Bus](http://www.macrozheng.com/#/cloud/springcloud?id=spring-cloud-bus)

用于传播集群状态变化的消息总线，使用轻量级消息代理链接分布式系统中的节点，可以用来动态刷新集群中的服务配置。

#### [Spring Cloud Consul](http://www.macrozheng.com/#/cloud/springcloud?id=spring-cloud-consul)

基于Hashicorp Consul的服务治理组件。

#### [Spring Cloud Security](http://www.macrozheng.com/#/cloud/springcloud?id=spring-cloud-security)

安全工具包，对Zuul代理中的负载均衡OAuth2客户端及登录认证进行支持。

#### [Spring Cloud Sleuth](http://www.macrozheng.com/#/cloud/springcloud?id=spring-cloud-sleuth)

SpringCloud应用程序的分布式请求链路跟踪，支持使用Zipkin、HTrace和基于日志（例如ELK）的跟踪。

#### [Spring Cloud Stream](http://www.macrozheng.com/#/cloud/springcloud?id=spring-cloud-stream)

轻量级事件驱动微服务框架，可以使用简单的声明式模型来发送及接收消息，主要实现为Apache Kafka及RabbitMQ。

#### [Spring Cloud Task](http://www.macrozheng.com/#/cloud/springcloud?id=spring-cloud-task)

用于快速构建短暂、有限数据处理任务的微服务框架，用于向应用中添加功能性和非功能性的特性。

#### [Spring Cloud Zookeeper](http://www.macrozheng.com/#/cloud/springcloud?id=spring-cloud-zookeeper)

基于Apache Zookeeper的服务治理组件。

#### [Spring Cloud Gateway](http://www.macrozheng.com/#/cloud/springcloud?id=spring-cloud-gateway)

API网关组件，对请求提供路由及过滤功能。

#### [Spring Cloud OpenFeign](http://www.macrozheng.com/#/cloud/springcloud?id=spring-cloud-openfeign)

基于Ribbon和Hystrix的声明式服务调用组件，可以动态创建基于Spring MVC注解的接口实现用于服务调用，在SpringCloud 2.0中已经取代Feign成为了一等公民。

### 为什么要选择SpringCloud

#### 1.选择依据

- 整体解决方案和成熟度

- 社区热度

- 可维护性

- 学习曲线

#### 2.当前各大IT公司用的微服务框架有哪些

- 阿里：Dubbo + HFS
- 京东：JSF
- 新浪：Motan
- 当当网：DubboX

## 五、什么是Dubbo

### 1.dubbo简介

> Dubbo是阿里巴巴公司开源的一个高性能优秀的服务框架，使得应用可通过高性能的RPC实现服务的输
>
> 出和输入功能，可以和Spring框架无缝集成。
>
> Dubbo是一款高性能、轻量级的开源Java RPC框架，它提供了三大核心能力：面向接口的远程方法调
>
> 用，智能容错和负载均衡，以及服务自动注册和发现。
>
> 现已发展成为Apache的顶级孵化开源项目，详见官网：http://dubbo.apache.org/en-us/

### 2.dubbo组织架构图

官网的dubbo组织架构图

![dubbo架构](./images/Know-SpringCloud/dubbo_architecture.png)

详细介绍

> 1. Registry:服务注册与发现中心，作为服务提供者和消费者注册与发现的中心。
>
> 2. Provider:服务提供者，在注册中心注册作为服务提供的一方，发布服务到服务注册中心。
>
> 3. Consumer:服务消费者，通过注册中心协调，订阅可用的已注册的服务。
>
> 4. Container:服务运行容器，独立的容器类似于tomcat/jboss的作用，作为服务运行的容器。
>
> 5. Monitor:dubbo的监控中心，用来显示接口暴露、注册情况，也可以看接口的调用明细，调用时
>
>    间等。

### 3.dubbo的优势

> 1. 单一应用架构，当网站流量很小时，只需一个应用，将所有功能都部署在一起，以减少部署节点和 成本。此时，用于简化增删改查工作量的 数据访问框架(ORM)是关键。
> 2. 垂直应用架构，当访问量逐渐增大，单一应用增加机器带来的加速度越来越小，将应用拆成互不相 干的几个应用，以提升效率。此时，用于加速前端页面开发的 Web框架(MVC)是关键。
> 3. 分布式服务架构，当垂直应用越来越多，应用之间交互不可避免，将核心业务抽取出来，作为独立 的服务，逐渐形成稳定的服务中心，使前端应用能更快速的响应多变的市场需求。此时，用于提高业务复用及整合的 分布式服务框架(RPC)是关键。
> 4. 流动计算架构当服务越来越多，容量的评估，小服务资源的浪费等问题逐渐显现，此时需增加一个调度中心基于访问压力实时管理集群容量，提高集群利用率。此时，用于提高机器利用率的 资源 调度和治理中心(SOA)是关键。

## 六、Dubbo与SpringCloud对比

| 核心要素       | Dubbo                   | Spring Cloud                               |
| -------------- | ----------------------- | ------------------------------------------ |
| 服务注册中心   | Zookeeper、Redis、Nacos | Eureka、Consul、Nacos                      |
| 服务调用方式   | RPC                     | Restful api(http)                          |
| 服务网关       | 无                      | Zuul、gateway                              |
| 断路器         | 不完美                  | Hystrix                                    |
| 分布式配置     | 无                      | Config、Apollo、Nacos、Consul              |
| 分布式追踪系统 | 无                      | Sleuth                                     |
| 消息总线       | 无                      | Bus                                        |
| 数据流         | 无                      | Stream基本Redis、Rabbit、Kafka实现消息服务 |
| 指量任务       | 无                      | Task                                       |

### 总结

> 1. dubbo由于是二进制的传输，占用带宽会更少
>
> 2. springCloud是http协议传输，带宽会比较多，同时使用http协议一般会使用JSON报文，消耗会更
>
>    大
>
> 3. dubbo的开发难度较大，原因是dubbo的jar包依赖问题很多大型工程无法解决
>
> 4. springcloud的接口协议约定比较自由且松散，需要有强有力的行政措施来限制接口无序升级
>
> 5. dubbo的注册中心可以选择zk,redis等多种，springcloud的注册中心只能用eureka或者自研

## 七、Spring Cloud Alibaba

### 1.SpringCloud Alibaba简介

> Spring Cloud Alibaba 致力于提供分布式应用服务开发的一站式解决方案。项目包含开发分布式应用服 务的必需组件，方便开发者通过 Spring Cloud 编程模型轻松使用这些组件来开发分布式应用服务。

### 2.主要功能

1. **服务限流降级**:默认支持 Servlet、Feign、RestTemplate、Dubbo 和 RocketMQ 限流降级功能 的接入，可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降级 Metrics 监控。

2. **服务注册与发现**:适配 SpringCloud 服务注册与发现标准，默认集成了 Ribbon的支持。

3. **分布式配置管理**:支持分布式系统中的外部化配置，配置更改时自动刷新。

4. **消息驱动能力**:基于 SpringCloudStream 为微服务应用构建消息驱动能力。

5. **阿里云对象存储**:阿里云提供的海量、安全、低成本、高可靠的云存储服务。支持在任何应用、任

   何时间、任何地点存储和访问任意类型的数据。

6. **分布式任务调度**:提供秒级、精准、高可靠、高可用的定时(基于 Cron 表达式)任务调度服务。

   同时提供分布式的任务执行模型，如网格任务。网格任务支持海量子任务均匀分配到所有 Worker(schedulerx-client)上执行。

### 3.已包括的组件有

- Sentinel:把流量作为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。 
- Nacos:一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。

- RocketMQ:一款开源的分布式消息系统，基于高可用分布式集群技术，提供低延时的、高可靠的消息 发布与订阅服务。

- Dubbo:Apache DubboTM 是一款高性能 Java RPC 框架。 
- Seata:阿里巴巴开源产品，一个易于使用的高性能微服务分布式事务解决方案。

- Alibaba Cloud ACM:一款在分布式架构环境中对应用配置进行集中管理和推送的应用配置中心产品。

- Alibaba Cloud OSS: 阿里云对象存储服务(Object Storage Service，简称 OSS)，是阿里云提供的海 量、安全、低成本、高可靠的云存储服务。您可以在任何应用、任何时间、任何地点存储和访问任意类 型的数据。

- Alibaba Cloud SchedulerX: 阿里中间件团队开发的一款分布式任务调度产品，提供秒级、精准、高可 靠、高可用的定时(基于 Cron 表达式)任务调度服务。

- Alibaba Cloud SMS: 覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客 户触达通道。

### 4.与SpringCloud官方对比

阿里巴巴提供的方案跟Spring官方提供的方案有一些对应关系: 

Nacos = Eureka/Consule + Config + Admin

Sentinel = Hystrix + Dashboard + Turbine

Dubbo = Ribbon + Feign

RocketMQ = RabbitMQ 

Schedulerx = Quartz



![与springcloud对比](./images/Know-SpringCloud/Compared_with_springcloud_official.png)