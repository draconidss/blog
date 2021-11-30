---
title: Maven笔记
author: Draco
time: 2021-05-22 22:37:47
categories: 
  - Spring
  - Maven
tags: 
  - Spring
  - Maven
---



## 参考

::: tip 

- [maven学习笔记(超详细总结)](https://www.cnblogs.com/baizihua/p/11519509.html)
- https://blog.csdn.net/qq_44839652/article/details/107709822

:::



## 概述



### 两大核心

1. 依赖管理：也就是对jar包的统一管理
2. 项目构建：在项目编码完成后，原先通过IDE对项目进行编译、测试、打包、部署等一些列操作，都可以通过Maven的命令去完成





## 标准目录结构

- **src**：用于存放项目源码
  - **main**：用于存放运行主要代码
    - **java**：用于存放主体程序源码
    - **resources**：用于存放xml等配置文件的
    - **webapps**：相当于webContent，用于存放WEB-INF、网页页面的素材（html、css、js等）
- **test**：用于存放单元测试代码
  - **java**：用于存放测试代码，单元测试类
  - **resources**：用于存放测试用的配置文件(一般少用)
- **target**：用于存放编译好的字节码文件
  - **classes**：用于存放编译好的字节码文件
- **pom.xml**：Project Object Module，Maven核心配置文件



## pom.xml文件详解

::: tip

[pom.xml文件详解](https://blog.csdn.net/weixin_38569499/article/details/91456988?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control)

:::





## 常用命令

格式：`mvn [plugin]:[command]`



| 命令        | 解释                                                         |
| ----------- | ------------------------------------------------------------ |
| mvn -v      | 查看maven版本                                                |
| mvn compile | 用来将src/main/java下的文件编译为class文件，并输出到target中。 |
| mvn package | 打包,将项目进行打包，如果是jar打包为jar，war打包为war。      |
| mvn install | 将打包jar/war包到本地仓库中，供其他模块使用                  |
| mvn deploy  | 将打包jar/war发布到远程仓库                                  |
| mvn test    | 用来将src/main/test下的测试用例进行编译，同时执行一次        |
| mvn clean   | 删除编译产生的target文件夹                                   |
| mvn site    | 生成项目相关的网站                                           |
| mvn verify  |                                                              |



## 参考

> - [Maven POM中的各种scope的行为总结](https://blog.csdn.net/cnweike/article/details/52221410?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param)





## Maven依赖范围

- **compile，**默认值，适用于所有阶段（开发、测试、部署、运行），本jar会一直存在所有阶段。
- **provided，**只在开发、测试阶段使用，目的是不让Servlet容器和你本地仓库的jar包冲突 。如servlet.jar。
- **runtime，**只在运行时使用，如JDBC驱动，适用运行和测试阶段。
- **test，**只在测试时使用，用于编译和运行测试代码。不会随项目发布。
- **system，**类似provided，需要显式提供包含依赖的jar，Maven不会在Repository中查找它。



### compile

默认的scope。任何定义在compile scope下的依赖将会在所有的class paths下可用。maven工程会将其打包到最终的artifact中。如果你构建一个WAR类型的artifact，那么在compile scope下引用的JAR文件将会被集成到WAR文件内。



### provided

这个scope假定对应的依赖会由运行这个应用的JDK或者容器来提供。最好的例子就是servlet API。任何在provided scope下定义的依赖在构建时的类路径里是可用的，但是不会被打包到最终的artifact中。如果是一个WAR的文件，servlet API在构建时的类路径里是可用的，但是并不会被打包到WAR文件中。



### runtime

在runtime scope下定义的依赖只会在运行期可用，而在构建期的类路径下不可用。这些依赖将会被打包到最终的artifact中。比如你有一个基于web的应用需要在运行时访问MySQL数据库。你的代码没有任何MySQL数据库驱动的硬依赖。你的代码仅仅是基于JDBC API来编写，在构建期并不需要MySQL数据库驱动。然而，在运行期，就需要相应的驱动来操作MySQL数据库了。因此，这个驱动应该被打包到最终的artifact中。



### test

只用于测试变异的依赖（比如JUnit），execution必须定义在test scope下。这些依赖不会被打包到最终的artifact中。



### system

于provided scope很像。唯一的区别在于，在system scope中，你需要告诉Maven如何去找到这个依赖。如果你要引用的依赖在Maven仓库中不存在时，就可以用这个scope。不推荐使用system依赖。



### import

从其它的pom文件中导入依赖设置。



## Maven构建多模块项目





### Maven多环境打包