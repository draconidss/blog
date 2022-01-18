---
title: Spring错误&坑记录
author: Draco
time: 2021-01-13 12:00:37
categories: 
  - Spring
tags: 
  - Spring
---





## SpringBoot相关



### 解决SpringBoot无法注入service的原因之一TestController required a bean of type ‘com.yifeng.study.service.UserService’ that could not be found.报错

参考

::: tip

[参考](https://blog.csdn.net/xzxToney/article/details/105248704?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.control)

:::



#### 原因

如果此时service上已经加了注解`@Service`或者没有其他基本问题，那么可能是**主启动类与被扫描的文件夹不在同一路径**下，所以扫描不到。

![](./images/Spring-error&hole/springboot_error_1-1.png)



#### 解决办法

将启动器类放在与扫描包同级即可，一般是和controller包的上一层的包的同一级。例如

> 我在这里多了一层web,将主启动类放入study文件夹下，和web同级即可。



![](./images/Spring-error&hole/springboot_error_1-2.png)







### 将枚举类型输出时转换为JSON类型

加上注解

```java
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
```



### security的key最短四个字符

报错

secret key byte array cannot be null or empty.





### 不自动注入dataSource而启动Springboot

参考：[@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)不生效](https://blog.csdn.net/qq_25811101/article/details/109410072)



方案一：在启动方法添加exclude

```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class,
    DataSourceTransactionManagerAutoConfiguration.class,
    DruidDataSourceAutoConfigure.class,
    HibernateJpaAutoConfiguration.class})
```



方案二：在yml文件中配置

```yaml
spring:
  application:
    name: order
  autoconfigure:
    exclude: org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```





## Gradle



### No cached version of com.android.tools.build:gradle:3.6.2 available for offline mode

参考：[No cached version of com.android.tools.build:gradle:3.6.2 available for offlin 解决办法](https://www.cnblogs.com/flay/p/12641381.html)

在IDEA中点击右边Gradle设为非无线模式





## MybatisPlus



### myabtisplus执行方法异常 Cause: java.lang.IndexOutOfBoundsException: Index: 22, Size: 22

调用自带方法  selectById()

### The error occurred while handling results
### Cause: java.lang.IndexOutOfBoundsException: Index: 22, Size: 22

解决办法
方法一：去除@Builder注解。

方法二：增加构造函数，如Lombok提供的@NoArgsConstructor、@AllArgsConstructor。

