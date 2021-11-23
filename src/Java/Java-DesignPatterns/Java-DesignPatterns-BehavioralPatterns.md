---
icon: 
title: 设计模式之行为型设计模式
author: Draco
time: 2020-08-09 23:37:52
description: 
image: 
categories: 
  - Java
tags: 
  - Java
  - Java设计模式
---





## 参考



::: tip 参考

- https://www.runoob.com/design-pattern/design-pattern-intro.html
- http://c.biancheng.net/view/1317.html
- [设计模式之禅](TheZen0fDesignPattern_2.pdf)

:::



## 模板方法模式



### 定义

其定义如下： Define the skeleton of an algorithm in an operation,deferring some steps to subclasses.Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.（定义一个操作中的算法的框架，而将一些步骤延迟到子类中。使得子类可以不改 变一个算法的结构即可重定义该算法的某些特定步骤。）



类图

![image-20211112221050944](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-DesignPatterns-BehavioralPatterns/%E6%A8%A1%E6%9D%BF%E6%96%B9%E6%B3%95%E7%B1%BB%E5%9B%BE.png)



模板方法模式确实非常简单，仅仅使用了Java的继承机制，但它是一个应用非常广泛的 模式。其中，AbstractClass叫做抽象模板，它的方法分为两类：

- 基本方法：基本方法也叫做基本操作，是由子类实现的方法，并且在模板方法被调用。
- 模板方法：可以有一个或几个，一般是一个具体方法，也就是一个框架，实现对基本方法的调度， 完成固定的逻辑。



### 优点

- 封装不变部分，扩展可变部分：把认为是不变部分的算法封装到父类实现，而可变部分的则可以通过继承来继续扩展。 在悍马模型例子中，是不是就非常容易扩展？例如增加一个H3型号的悍马模型，很容易 呀，增加一个子类，实现父类的基本方法就可以了。 
- 提取公共部分代码，便于维护：我们例子中刚刚走过的弯路就是最好的证明，如果我们不抽取到父类中，任由这种散乱 的代码发生，想想后果是什么样子？维护人员为了修正一个缺陷，需要到处查找类似的代 码！ 
- 行为由父类控制，子类实现：基本方法是由子类实现的，因此子类可以通过扩展的方式增加相应的功能，符合开闭原则。



### 应用场景

- 多个子类有公有的方法，并且逻辑基本相同时。
- 重要、复杂的算法，可以把核心算法设计为模板方法，周边的相关细节功能则由各个 子类实现。 
- 重构时，模板方法模式是一个经常使用的模式，把相同的代码抽取到父类中，然后通 过钩子函数（见“模板方法模式的扩展”）约束其行为。



## 中介者模式

中介者模式（Mediator Pattern）是用来降低多个对象和类之间的通信复杂性。这种模式提供了一个中介类，该类通常处理不同类之间的通信，并支持松耦合，使代码易于维护。中介者模式属于行为型模式。在MVC中的C（控制）就充当M（模型）和V（视图）之间的中介者



![image-20211122183621593](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-DesignPatterns-BehavioralPatterns/%E4%B8%AD%E4%BB%8B%E8%80%85%E6%A8%A1%E5%BC%8F%E9%80%9A%E7%94%A8%E7%B1%BB%E5%9B%BE.png)



从类图中看，中介者模式由以下几部分组成： 

- Mediator 抽象中介者角色 抽象中介者角色定义统一的接口，用于各同事角色之间的通信。 
- Concrete Mediator 具体中介者角色 具体中介者角色通过协调各同事角色实现协作行为，因此它必须依赖于各个同事角色。 
- Colleague 同事角色



### 优缺点

- 优点：中介者模式的优点就是减少类间的依赖，把原有的一对多的依赖变成了一对一的依赖， 同事类只依赖中介者，减少了依赖，当然同时也降低了类间的耦合。
- 缺点：中介者模式的缺点就是中介者会膨胀得很大，而且逻辑复杂，原本N个对象直接的相互 依赖关系转换为中介者和同事类的依赖关系，同事类越多，中介者的逻辑就越复杂。



### 使用场景

- 机场调度中心
- MVC框架