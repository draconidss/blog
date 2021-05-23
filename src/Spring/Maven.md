---
title: Maven笔记
author: Draco
time: 2021-05-22 22:37:47
categories: 
  - Spring
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





## Maven构建多模块项目





### Maven多环境打包