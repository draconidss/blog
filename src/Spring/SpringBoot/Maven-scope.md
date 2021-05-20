---
title: Maven中依赖的scope总结
author: Draco
time: 2020-10-08 15:56:11
categories: 
  - Spring
  - SpringBoot
tags: 
  - SpringBoot
  - Maven
---





## 参考

> - [Maven POM中的各种scope的行为总结](https://blog.csdn.net/cnweike/article/details/52221410?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param)





## compile

默认的scope。任何定义在compile scope下的依赖将会在所有的class paths下可用。maven工程会将其打包到最终的artifact中。如果你构建一个WAR类型的artifact，那么在compile scope下引用的JAR文件将会被集成到WAR文件内。





## provided

这个scope假定对应的依赖会由运行这个应用的JDK或者容器来提供。最好的例子就是servlet API。任何在provided scope下定义的依赖在构建时的类路径里是可用的，但是不会被打包到最终的artifact中。如果是一个WAR的文件，servlet API在构建时的类路径里是可用的，但是并不会被打包到WAR文件中。



## runtime

在runtime scope下定义的依赖只会在运行期可用，而在构建期的类路径下不可用。这些依赖将会被打包到最终的artifact中。比如你有一个基于web的应用需要在运行时访问MySQL数据库。你的代码没有任何MySQL数据库驱动的硬依赖。你的代码仅仅是基于JDBC API来编写，在构建期并不需要MySQL数据库驱动。然而，在运行期，就需要相应的驱动来操作MySQL数据库了。因此，这个驱动应该被打包到最终的artifact中。



## test

只用于测试变异的依赖（比如JUnit），execution必须定义在test scope下。这些依赖不会被打包到最终的artifact中。



## system

于provided scope很像。唯一的区别在于，在system scope中，你需要告诉Maven如何去找到这个依赖。如果你要引用的依赖在Maven仓库中不存在时，就可以用这个scope。不推荐使用system依赖。



## import

从其它的pom文件中导入依赖设置。