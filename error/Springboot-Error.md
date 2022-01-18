---
title: Spring错误笔记
author: Draco
time: 2021-03-04 20:29:53
original: true
categories: 
  - 错误笔记
tags: 
  - 错误笔记
  - Spring
---







## 解决SpringBoot无法注入service的原因之一TestController required a bean of type ‘com.yifeng.study.service.UserService’ that could not be found.报错

参考

::: tip

[参考](https://blog.csdn.net/xzxToney/article/details/105248704?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.control)

:::



#### 原因

### 如果此时service上已经加了注解`@Service`或者没有其他基本问题，那么可能是**主启动类与被扫描的文件夹不在同一路径**下，所以扫描不到。





### 解决办法

将启动器类放在与扫描包同级即可，一般是和controller包的上一层的包的同一级。例如

> 我在这里多了一层web,将主启动类放入study文件夹下，和web同级即可。












## 将枚举类型输出时转换为JSON类型

加上注解

```java
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
```









## Nginx在做反向代理时添加一层访问根路径

修改`application.yml`

```shell
server:
  port: 8889
  servlet:
    context-path: /api
```



这样访问时底层加一层根路径访问