---
title: Spring基础笔记
author: LifeAlsoIsGG
time: 2020-09/16 14:57:41
original: true
categories: 
  - Spring
tags: 
  - Spring

---







## 参考

> - 





什么是 Spring 框架? Spring 是⼀种轻量级开发框架，旨在提⾼开发⼈员的开发效率以及系统的可维护性。

Spring 官⽹：ht tps://spring.io/。 

我们⼀般说 Spring 框架指的都是 Spring Framework，它是很多模块的集合，使⽤这些模块可以很⽅ 便地协助我们进⾏开发。这些模块是：核⼼容器、数据访问/集成,、Web、AOP（⾯向切⾯编程）、⼯ 具、消息和测试模块。⽐如：Core Container 中的 Core 组件是Spring 所有组件的核⼼，Beans 组件 和 Context 组件是实现IOC和依赖注⼊的基础，AOP组件⽤来实现⾯向切⾯编程。



## 1. Spring特征

Spring 官⽹列出的 Spring 的 6 个特征:



::: info Spring 的 6 个特征



- **核⼼技术** ：依赖注⼊(DI)，AOP，事件(events)，资源，i18n，验证，数据绑定，类型转换， SpEL。 
- **测试** ：模拟对象，TestContext框架，Spring MVC 测试，WebTestClient。 
- **数据访问** ：事务，DAO⽀持，JDBC，ORM，编组XML。 
- **Web⽀持** : Spring MVC和Spring WebFlux Web框架。 
- **集成** ：远程处理，JMS，JCA，JMX，电⼦邮件，任务，调度，缓存。 
- **语⾔** ：Kotlin，Groovy，动态语⾔。



:::





## 2. Spring七大模块

::: tip 参考



> - https://www.cnblogs.com/lukelook/p/9604609.html
> - https://www.cnblogs.com/xiaobaizhiqian/p/7616453.html



:::



所有模块

![](./images/Spring-bacisNote/Spring_Framework_Runtime.jpg)





七大模块



![七大模块](./images/Spring-bacisNote/seven_module.jpg)



### 2.1 核心容器（Spring Core）

　　Core模块是Spring的核心类库，Spring的所有功能都依赖于该类库，Core主要实现`IOC`功能，Spring的所有功能都是借助`IOC`实现的。核心容器提供Spring框架的基本功能。Spring以bean的方式组织和管理Java应用中的各个组件及其关系。Spring使用`BeanFactory`来产生和管理`Bean`，它是`工厂模式`的实现，并提供`依赖注入（Dependency Injection）`管理`Bean`容器功能。`BeanFactory`它提供对Factory模式的经典实现来消除对程序性`单例模式`的需要，并真正地允许你从程序逻辑中分离出`依赖关系和配置`。`BeanFactory`使用`控制反转(IoC)`模式将`应用的配置和依赖性规范`与`实际的应用程序代码`分开。





### 2.2 应用上下文（Spring Context）

核心模块的`BeanFactory`使`Spring`成为一个`容器`，而`上下文模块`使它成为一个`框架`。Spring上下文是一个配置文件，这个模块扩展了`BeanFactory`的概念，增加了消息、事件传播以及验证的支持。另外，这个模块提供了许多企业服务，例如电子邮件、JNDI访问、EJB集成、远程以及时序调度（scheduling）服务。也包括了对模版框架例如Velocity和FreeMarker集成的支持。





### 2.3 Spring面向切面编程（Spring AOP）

通过配置管理特性，`Spring AOP` 模块直接将面向切面的编程功能集成到了 Spring框架中。所以，可以很容易地使 Spring框架管理的任何对象支持 `AOP`。`Spring AOP` 模块为基于 Spring 的应用程序中的对象提供了事务管理服务。通过使用 `Spring AOP`，不用依赖 EJB 组件，就可以将`声明性事务管理`集成到应用程序中。



Spring在它的AOP模块中提供了对面向切面编程的丰富支持。例如方法拦截器（servletListener ,controller....）和切点，可以有效的防止代码上功能的耦合，这个模块是在Spring应用中实现切面编程的基础。Spring的AOP模块也将`元数据`编程引入了Spring。使用Spring的`元数据支持`，你可以为你的源代码增加注释，指示Spring在何处以及如何应用切面函数。



::: info AOP

AOP = Aspect Oriented Programming   

AOP是OOP的延续，是（Aspect Oriented Programming）的缩写，意思是面向切面（方面）编程。  

主要的功能是：日志记录，性能统计，安全控制，事务处理，异常处理等等

:::  





### 2.4 DAO模块（Spring DAO）

使用`JDBC`经常导致大量的重复代码，取得连接、创建语句、处理结果集，然后关闭连接、旧代码中迁移自定义工具类`JDBCUtil` 也让开发变得繁琐。Spring的`Dao`模块对传统的JDBC进行了抽象，还提供了一种比编程性更好的声明性事务管理方法。JDBC、DAO的抽象层提供了有意义的异常层次结构，可用该结构来管理异常处理，和不同数据库供应商所抛出的错误信息。异常层次结构简化了错误处理，并且极大的降低了需要编写的代码数量，比如打开和关闭链接。





### 2.5 对象实体映射（Spring ORM）

Spring框架插入了若干个`ORM框架`，从而提供了ORM对象的关系工具，其中包括了Hibernate、JDO和 IBatis SQL Map等，所有这些都遵从Spring的通用事物和DAO异常层次结构。通过`ORM`包，可以混合使用所有Spring提供的特性进行“`对象/关系`”映射，方便开发时小组内整合代码。Spring本身并不对ORM进行实现，仅对常见的ORM框架进行封装，并对其进行管理。





### 2.6 Web模块（Spring Web）

Web上下文模块建立在应用程序上下文模块之上，为基于web的应用程序提供了上下文。所以Spring框架支持与Struts集成，web模块还简化了处理多部分请求以及将请求参数绑定到域对象的工作。





### 2.7 MVC模块（Spring Web MVC）

　　MVC框架是一个全功能的构建Web应用程序的MVC实现。通过策略接口，MVC框架变成为高度可配置的。MVC容纳了大量视图技术，其中包括JSP、POI等，模型来有JavaBean来构成，存放于m当中，而视图是一个街口，负责实现模型，控制器表示逻辑代码，由c的事情。Spring框架的功能可以用在任何J2EE服务器当中，大多数功能也适用于不受管理的环境。Spring的核心要点就是支持不绑定到特定J2EE服务的可重用业务和数据的访问的对象，毫无疑问这样的对象可以在不同的J2EE环境，独立应用程序和测试环境之间重用。





## 3. IoC（Inverse of Control：控制反转）| DC（Dependency Injection：依赖注入）

IoC（Inverse of Control:控制反转）是⼀种设计思想，就是 将原本在程序中⼿动创建对象的控制 权，交由Spring框架来管理。 IoC 在其他语⾔中也有应⽤，并⾮ Spring 特有。 IoC 容器是 Spring ⽤来实现 IoC 的载体， IoC 容器实际上就是个Map（key，value）,Map 中存放的是各种对象。 

将对象之间的相互依赖关系交给 IoC 容器来管理，并由 IoC 容器完成对象的注⼊。这样可以很⼤程度 上简化应⽤的开发，把应⽤从复杂的依赖关系中解放出来。 IoC 容器就像是⼀个⼯⼚⼀样，当我们需 要创建⼀个对象的时候，只需要配置好配置⽂件/注解即可，完全不⽤考虑对象是如何被创建出来的。 在实际项⽬中⼀个 Service 类可能有⼏百甚⾄上千个类作为它的底层，假如我们需要实例化这个 Service，你可能要每次都要搞清这个 Service 所有底层类的构造函数，这可能会把⼈逼疯。如果利⽤ IoC 的话，你只需要配置好，然后在需要的地⽅引⽤就⾏了，这⼤⼤增加了项⽬的可维护性且降低了开 发难度。 

Spring 时代我们⼀般通过 XML ⽂件来配置 Bean，后来开发⼈员觉得 XML ⽂件来配置不太好，于是 SpringBoot 注解配置就慢慢开始流⾏起来。



::: tip 参考



- https://www.zhihu.com/question/23277575/answer/169698662
- https://www.cnblogs.com/xdp-gacl/p/4249939.html
- https://www.awaimai.com/2596.html



IOC源码阅读

- https://javadoop.com/post/spring-ioc



:::









## 4. AOP（Aspect-Oriented Programming）：面向切面编程



AOP(Aspect-Oriented Programming):⾯向切⾯编程)能够将那些与业务⽆关，却为业务模块所共同调⽤ 的逻辑或责任（例如事务处理、⽇志管理、权限控制等）封装起来，便于减少系统的重复代码，降低模 块间的耦合度，并有利于未来的可拓展性和可维护性。 



::: tip 参考





:::



### Spring AOP 和 AspectJ AOP 有什么区别？

Spring AOP 属于运⾏时增强，⽽ AspectJ 是编译时增强。 Spring AOP 基于代理(Proxying)，⽽ AspectJ 基于字节码操作(Bytecode Manipulation)。 

Spring AOP 已经集成了 AspectJ ，AspectJ 应该算的上是 Java ⽣态系统中最完整的 AOP 框架了。 AspectJ 相⽐于 Spring AOP 功能更加强⼤，但是 Spring AOP 相对来说更简单。

 如果我们的切⾯⽐᫾少，那么两者性能差异不⼤。但是，当切⾯太多的话，最好选择 AspectJ ，它⽐ Spring AOP 快很多。







## 5. Spring bean



::: tip 参考



- https://www.awaimai.com/2596.html
- https://blog.csdn.net/qq_39411208/article/details/88395875



:::



### 5.1 什么是bean

Spring 官方文档对 bean 的解释是：

> In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container.

翻译过来就是：

> 在 Spring 中，构成应用程序`主干`并由`Spring IoC容器`管理的`对象`称为`bean`。bean是一个由`Spring IoC`容器实例化、组装和管理的对象。



### 5.1 Spring 中的 bean 的作⽤域有哪些?



::: info Spring 中的 bean 的作⽤域有哪些?



- ==singleton== : 唯⼀ bean 实例，Spring 中的 bean 默认都是单例的。 
- ==prototype== : 每次请求都会创建⼀个新的 bean 实例。 
- ==request== : 每⼀次HTTP请求都会产⽣⼀个新的bean，该bean仅在当前HTTP request内有效。 
- ==session== : 每⼀次HTTP请求都会产⽣⼀个新的 bean，该bean仅在当前 HTTP session 内有效。 
- ==global-session==： 全局session作⽤域，仅仅在基于portlet的web应⽤中才有意义，Spring5已 经没有了。Portlet是能够⽣成语义代码(例如：HTML)⽚段的⼩型Java Web插件。它们基于 portlet容器，可以像servlet⼀样处理HTTP请求。但是，与 servlet 不同，每个 portlet 都有 不同的会话



:::