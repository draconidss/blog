---
title: Spring面试题
author: Draco
time: 2021-10-24 22:03:04
categories: 
  - Spring
tags: 
  - Spring
  - 面试
---



## bean

### bean生命周期

### bean作用域



### 注入私有静态属性

```java
@Autowired
private static RedisHelperManager redisHelperManager;
```



这样肯定是不行，并且在用到该变量时会抛出运行时异常java.lang.NullPointerException,静态变量不属于对象的属性，属于类属性，spring是基于对象层面的注入。

#### 解决方法

- 使用setter方法注入，在setter方法上加@Autowired注解
- @PostConstruct标记的方法手动注入，将会在初始化前调用该方法



### Spring 中的单例 bean 的线程安全问题了解吗？

大部分时候我们并没有在系统中使用多线程，所以很少有人会关注这个问题。

单例 bean 存在线程问题，主要是因为当多个线程操作同一个对象的时候，对这个对象的非静态成员变量的写操作会存在线程安全问题。

常见的有两种解决办法：

::: info 常见的有两种解决办法

1. 在Bean对象中尽量避免定义可变的成员变量（不太现实）。
2. 在类中定义一个`ThreadLocal`成员变量，将需要的可变成员变量保存在 `ThreadLocal` 中（推荐的一种方式）。

:::

### @Component 和 @Bean 的相同和区别是什么？



`@Component`和`@Bean`都是用来注册Bean并装配到`Spring容器`中，但是`Bean`比`Component`的自定义性更强。可以实现一些Component实现不了的自定义加载类。



::: info @Component 和 @Bean 的区别是什么

- 作⽤对象不同: @Component 注解作⽤于`类`，⽽ @Bean 注解作⽤于`⽅法`。 

- @Component （@Controller、@Service、@Repository）通常是通过类路径扫描来⾃动侦测以及⾃动装配到Spring容器中（我们可以使⽤ `@ComponentScan` 注解定义要扫描的路径从中找出标识了需要装配的类⾃动装配到 Spring 的 bean 容器中）。 @Bean 注解通常是我们在标有该注解的⽅法中定义产⽣这个 bean, @Bean告诉了Spring这是某个类的示例，当我需要⽤它的时候还给我。 

- @Bean 注解⽐ Component 注解的⾃定义性更强，⽽且很多地⽅我们只能通过 @Bean 注解 来注册bean。⽐如当我们引⽤第三⽅库中的类需要装配到 Spring 容器时，则只能通过 @Bean 来实现

:::



## 过滤器和拦截器

参考

- [https://blog.csdn.net/yjc0403/article/details/84924548](https://blog.csdn.net/yjc0403/article/details/84924548)
- [https://www.zhihu.com/question/30212464/answer/1786967139](https://www.zhihu.com/question/30212464/answer/1786967139)



![img](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Spring-Interview/%E8%BF%87%E6%BB%A4%E5%99%A8%E4%B8%8E%E6%8B%A6%E6%88%AA%E5%99%A8%E5%8C%BA%E5%88%AB.jpg)



- 实现：过滤器 是基于函数回调的；拦截器 则是基于Java的反射机制（动态代理）实现的。

- 范围：过滤器 实现的是 javax.servlet.Filter 接口，而这个接口是在Servlet规范中定义的，也就是说过滤器Filter 的使用要依赖于Tomcat等容器，导致它只能在web程序中使用；拦截器(Interceptor) 它是一个Spring组件，并由Spring容器管理，并不依赖Tomcat等容器，是可以单独使用的。不仅能应用在web程序中，也可以用于Application、Swing等程序中。

- 触发时机：过滤器Filter是在请求进入容器后，但在进入servlet之前进行预处理，请求结束是在servlet处理完以后；

  拦截器 Interceptor 是在请求进入servlet后，在进入Controller之前进行预处理的，Controller 中渲染了对应的视图之后请求结束。

  





## Spring用到了哪些设计模式

::: tip 参考

- [Spring设计模式](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247485303&idx=1&sn=9e4626a1e3f001f9b0d84a6fa0cff04a&chksm=cea248bcf9d5c1aaf48b67cc52bac74eb29d6037848d6cf213b0e5466f2d1fda970db700ba41&token=255050878&lang=zh_CN%23rd)
- https://zhuanlan.zhihu.com/p/114244039

:::



- 1.简单工厂(非23种设计模式中的一种)
- 2.工厂方法
- 3.单例模式
- 4.适配器模式
- 5.装饰器模式
- 6.代理模式
- 7.观察者模式
- 8.策略模式
- 9.模版方法模式









## SpringMVC



### SpringMVC组件



- `DispatcherServlet`：前端控制器。也称为中央控制器，它是整个请求响应的控制中心，组件的调用由它统一调度。有了他就减少了其他组件之间的耦合度。
- `HandlerMapping`：处理器映射器。它根据用户访问的 URL 映射到对应的后端处理器 Handler。也就是说它知道处理用户请求的后端处理器，但是它并不执行后端处理器，而是将处理器告诉给中央处理器。
- `HandlerAdapter`：处理器适配器。根据传过来不同类型的`Hadnle`它调用后端处理器中的方法，返回逻辑视图 `ModelAndView` 对象给`DispatcherServlet`。
- `ViewResolver`：视图解析器。将 `ModelAndView` 逻辑视图解析为具体的视图（如 JSP）。
- `Handler`：后端处理器。对用户具体请求进行处理，也就是我们编写的 `Controller` 类。需要程序员开发





### SpringMVC工作流程

![Springmvc工作原理图](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Spring-Interview/spring%20mvc%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B.jpg)



::: info 流程详解

1. 用户向服务端发送一次请求，这个请求会先到前端控制器`DispatcherServlet`(也叫中央控制器)。

2. `DispatcherServlet`接收到请求后会调用`HandlerMapping`处理器映射器来，根据配置或注解获取不同的`Handle`，并返回给`DispatcherServlet`。由此得知，该请求该由哪个`Controller`来处理（并未调用Controller，只是得知）

3. `DispatcherServlet`调用`HandlerAdapter`处理器适配器，告诉处理器适配器应该要去执行哪个`Controller`

4. `HandlerAdapter`处理器适配器去执行`Controller`并得到`ModelAndView`(数据和视图)，并层层返回给`DispatcherServlet`

5. `DispatcherServlet`将`ModelAndView`交给`ViewReslover`视图解析器解析，然后返回真正的视图`View`。

6. `DispatcherServlet`将模型数据填充到视图中

7. `DispatcherServlet`将结果响应给用户

:::



