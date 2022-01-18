---
icon: 
title: Java-设计模式
author: Draco
time: 2020-08-09 23:57:52
description: 
original: true
image: 
categories: 
  - Java
tags: 
  - 学习笔记
  - Java
  - Java设计模式
---





## 参考



::: tip 参考

- https://www.runoob.com/design-pattern/design-pattern-intro.html
- http://c.biancheng.net/view/1317.html
- [设计模式之禅](TheZen0fDesignPattern_2.pdf)

:::




## 1. 总览





根据设计模式的参考书 **Design Patterns - Elements of Reusable Object-Oriented Software（中文译名：设计模式 - 可复用的面向对象软件元素）** 中所提到的，总共有 23 种设计模式。这些模式可以分为三大类：创建型模式（Creational Patterns）、结构型模式（Structural Patterns）、行为型模式（Behavioral Patterns）。当然，我们还会讨论另一类设计模式：J2EE 设计模式。



- **创建型模式**

  > 这些设计模式提供了一种在创建对象的同时隐藏创建逻辑的方式，而不是使用 new 运算符直接实例化对象。这使得程序在判断针对某个给定实例需要创建哪些对象时更加灵活。

  

- **结构型模式**

  > 这些设计模式关注类和对象的组合。继承的概念被用来组合接口和定义组合对象获得新功能的方式。

  

- **行为型模式**

  > 这些设计模式特别关注对象之间的通信。

  

- **J2EE 模式**

  > 这些设计模式特别关注表示层。这些模式是由 Sun Java Center 鉴定的。



### 1.1 创建型模式

这些设计模式提供了一种在创建对象的同时隐藏创建逻辑的方式，而不是使用 new 运算符直接实例化对象。这使得程序在判断针对某个给定实例需要创建哪些对象时更加灵活。



::: info 创建型模式

- 工厂模式（Factory Pattern）
- 抽象工厂模式（Abstract Factory Pattern）
- 单例模式（Singleton Pattern）
- 建造者模式（Builder Pattern）
- 原型模式（Prototype Pattern）

:::



### 1.2 结构型模式

这些设计模式关注类和对象的组合。继承的概念被用来组合接口和定义组合对象获得新功能的方式。



::: info 结构型模式

- 适配器模式（Adapter Pattern）
- 桥接模式（Bridge Pattern）
- 过滤器模式（Filter、Criteria Pattern）
- 组合模式（Composite Pattern）
- 装饰器模式（Decorator Pattern）
- 外观模式（Facade Pattern）
- 享元模式（Flyweight Pattern）
- 代理模式（Proxy Pattern）

:::





### 1.3 行为型模式

这些设计模式特别关注对象之间的通信。



::: info 行为型模式

- 责任链模式（Chain of Responsibility Pattern）
- 命令模式（Command Pattern）
- 解释器模式（Interpreter Pattern）
- 迭代器模式（Iterator Pattern）
- 中介者模式（Mediator Pattern）
- 备忘录模式（Memento Pattern）
- 观察者模式（Observer Pattern）
- 状态模式（State Pattern）
- 空对象模式（Null Object Pattern）
- 策略模式（Strategy Pattern）
- 模板模式（Template Pattern）
- 访问者模式（Visitor Pattern）

:::





### 1.4 J2EE 模式

这些设计模式特别关注表示层。这些模式是由 Sun Java Center 鉴定的。



::: info J2EE 模式

- MVC 模式（MVC Pattern）
- 业务代表模式（Business Delegate Pattern）
- 组合实体模式（Composite Entity Pattern）
- 数据访问对象模式（Data Access Object Pattern）
- 前端控制器模式（Front Controller Pattern）
- 拦截过滤器模式（Intercepting Filter Pattern）
- 服务定位器模式（Service Locator Pattern）
- 传输对象模式（Transfer Object Pattern）

:::





## 2. 目录



::: tip 目录

- [Java模式设计之六大原则](Java-DesignPatterns-SixPrinciple.md)
- [Java模式设计之创建型模式](Java-DesignPatterns-CreationalPatterns.md)
- [Java模式设计之结构型模式](Java-DesignPatterns-StructuralPatterns.md)
- [Java模式设计之行为性模式](Java-DesignPatterns-BehavioralPatterns.md)
- [Java模式设计之J2EE模式](Java-DesignPatterns-J2eePattern.md)

:::