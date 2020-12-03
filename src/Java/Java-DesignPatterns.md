---
icon: 
title: Java-设计模式
author: LifeAlsoIsGG
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






## 1. 总览



参考

> - https://www.runoob.com/design-pattern/design-pattern-intro.html



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



- 工厂模式（Factory Pattern）
- 抽象工厂模式（Abstract Factory Pattern）
- 单例模式（Singleton Pattern）
- 建造者模式（Builder Pattern）
- 原型模式（Prototype Pattern）



### 1.2 结构型模式

这些设计模式关注类和对象的组合。继承的概念被用来组合接口和定义组合对象获得新功能的方式。



- 适配器模式（Adapter Pattern）
- 桥接模式（Bridge Pattern）
- 过滤器模式（Filter、Criteria Pattern）
- 组合模式（Composite Pattern）
- 装饰器模式（Decorator Pattern）
- 外观模式（Facade Pattern）
- 享元模式（Flyweight Pattern）
- 代理模式（Proxy Pattern）



### 1.3 行为型模式

这些设计模式特别关注对象之间的通信。



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



### 1.4 J2EE 模式

这些设计模式特别关注表示层。这些模式是由 Sun Java Center 鉴定的。



- MVC 模式（MVC Pattern）
- 业务代表模式（Business Delegate Pattern）
- 组合实体模式（Composite Entity Pattern）
- 数据访问对象模式（Data Access Object Pattern）
- 前端控制器模式（Front Controller Pattern）
- 拦截过滤器模式（Intercepting Filter Pattern）
- 服务定位器模式（Service Locator Pattern）
- 传输对象模式（Transfer Object Pattern）





## 2. 单例模式

`创建型模式`



参考

> - https://www.runoob.com/design-pattern/singleton-pattern.html



单例模式（Singleton Pattern）是 Java 中最简单的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。

这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建。这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象。

单例模式保证了系统内存中只存在一个对象，节省了系统资源,对于一些需要`频繁创建销毁`的对象,使用单例模式可以提高系统性能。当想实例化一个单例类的时候,必须要记住使用相应的获取对象的方法,而不是使用new

单例模式使用的场景:

> 需要频繁的进行创建和销毁的对象，创建对象时耗时过多或耗费资源过多(即:重量级对象),但又经常用到的对象、工具类对象、频繁访问数据库或文件的对象(比如数据源、 session工厂等)  



- 1、单例类只能有一个实例。
- 2、单例类必须自己创建自己的唯一实例。
- 3、单例类必须给所有其他对象提供这一实例。



### 2.1 步骤



#### 步骤 1：创建一个 `Singleton` 类



```java
public class SingleObject {
 
   //创建 SingleObject 的一个对象
   private static SingleObject instance = new SingleObject();
 
   //让构造函数为 private，这样该类就不会被实例化
   private SingleObject(){}
 
   //获取唯一可用的对象
   public static SingleObject getInstance(){
      return instance;
   }
 
   public void showMessage(){
      System.out.println("Hello World!");
   }
}
```



#### 步骤 2：从 `singleton` 类获取唯一的对象



```java
public class SingletonPatternDemo {
   public static void main(String[] args) {
 
      //不合法的构造函数
      //编译时错误：构造函数 SingleObject() 是不可见的
      //SingleObject object = new SingleObject();
 
      //获取唯一可用的对象
      SingleObject object = SingleObject.getInstance();
 
      //显示消息
      object.showMessage();
   }
}
```









### 2.2 懒汉式，线程不安全



| 名称             | 描述 |
| ---------------- | ---- |
| 是否 Lazy 初始化 | 是   |
| 是否多线程安全   | 否   |
| 实现难度         | 易   |



描述

> 这种方式是最基本的实现方式，这种实现最大的问题就是不支持多线程。因为没有加锁 `synchronized`，所以严格意义上它并不算单例模式。这种方式 lazy loading 很明显，不要求线程安全，在多线程不能正常工作。**实际不推荐使用**



```java
public class Singleton {  
    private static Singleton instance;  
    private Singleton (){}  
  
    public static Singleton getInstance() {  
    if (instance == null) {  
        instance = new Singleton();  
    }  
    return instance;  
    }  
}
```



### 2.3 懒汉式，线程安全



| 名称             | 描述 |
| ---------------- | ---- |
| 是否 Lazy 初始化 | 是   |
| 是否多线程安全   | 是   |
| 实现难度         | 易   |



描述

> 这种方式具备很好的 lazy loading，能够在多线程中很好的工作，但是，效率很低，只有第一次创建的时候需要同步，99% 情况下不需要同步。优点：第一次调用才初始化，避免内存浪费。缺点：必须加锁 `synchronized` 才能保证单例，但加锁会影响效率。getInstance() 的性能对应用程序不是很关键（该方法使用不太频繁）。**实际不推荐使用**



```java
public class Singleton {  
    private static Singleton instance;  
    private Singleton (){}  
    public static synchronized Singleton getInstance() {  
    if (instance == null) {  
        instance = new Singleton();  
    }  
    return instance;  
    }  
}
```



### 2.3 饿汉式

| 名称             | 描述 |
| ---------------- | ---- |
| 是否 Lazy 初始化 | 否   |
| 是否多线程安全   | 是   |
| 实现难度         | 易   |



描述

> 这种方式比较常用，但容易产生垃圾对象。它基于 classloader 机制避免了多线程的同步问题，不过，instance 在类装载时就实例化，虽然导致类装载的原因有很多种，在单例模式中大多数都是调用 getInstance 方法， 但是也不能确定有其他的方式（或者其他的静态方法）导致类装载，这时候初始化 instance 显然没有达到 lazy loading 的效果。
>
> 优点：没有加锁，执行效率会提高。
>
> 缺点：类加载时就初始化，浪费内存。





```java
public class Singleton {
    private static Singleton instance = new Singleton();  
    private Singleton (){}  
    public static Singleton getInstance() {  
    return instance;  
    }  
}


```



静态代码块写法

```java
public class Singleton_Hungry {
    private static Singleton_Hungry instance;
    static {
        instance = new Singleton_Hungry();
    }
    private Singleton_Hungry() {
    }
    public static Singleton_Hungry getInstance() {
        return instance;
    }
}
```



### 2.4 双重校验锁懒汉式（DCL，即 double-checked locking）



| 名称             | 描述   |
| ---------------- | ------ |
| 是否 Lazy 初始化 | 是     |
| 是否多线程安全   | 是     |
| 实现难度         | 较复杂 |



描述

> JDK1.5 起。这种方式采用双锁机制，安全且在多线程情况下能保持高性能。`getInstance()` 的性能对应用程序很关键。推荐使用



```java
public class Singleton {  
    private volatile static Singleton singleton;  
    private Singleton (){}  
    public static Singleton getSingleton() {  
    if (singleton == null) {  
        synchronized (Singleton.class) {  
        if (singleton == null) {  
            singleton = new Singleton();  
        }  
        }  
    }  
    return singleton;  
    }  
}
```



另外，需要注意 uniqueInstance 采⽤ `volatile` 关键字修饰也是很有必要。`volatile`作用是防止在new实例的时候,还没初始化完,有其他线程进来,实例此时已经不为空.多线程拿到的实例数据就不一致,加了该关键字后,先初始化完成后在赋值给实例。 uniqueInstance = new Singleton(); 这段代码其实是分为三步执⾏： 

1. 为 uniqueInstance 分配内存空间 
2. 初始化 uniqueInstance 
3. 将 uniqueInstance 指向分配的内存地址 



但是由于 JVM 具有指令重排的特性，执⾏顺序有可能变成 1>3>2。指令重排在单线程环境下不会出 现问题，但是在多线程环境下会导致⼀个线程获得还没有初始化的实例。例如，线程 T1 执⾏了 1 和 3，此时 T2 调⽤ getUniqueInstance() 后发现 uniqueInstance 不为空，因此返回 uniqueInstance，但此时 uniqueInstance 还未被初始化。 使⽤ volatile 可以禁⽌ JVM 的指令重排，保证在多线程环境下也能正常运⾏。





### 2.5 静态内部类

参考

> - https://blog.csdn.net/mnb65482/article/details/80458571



| 名称             | 描述   |
| ---------------- | ------ |
| 是否 Lazy 初始化 | 是     |
| 是否多线程安全   | 是     |
| 实现难度         | 较复杂 |



描述

> 静态内部类的优点是：上升为顶级类，外部类加载时并不需要立即加载内部类，内部类不被加载则不去初始化`INSTANCE`，故而不占内存。即当`SingleTon`第一次被加载时，并不需要去加载`SingletonInstance`，只有当`getInstance()`方法第一次被调用时，才会去初始化`INSTANCE`,第一次调用`getInstance()`方法会导致虚拟机加载`SingleTonHoler`类，这种方法不仅能确保线程安全，也能保证单例的唯一性，同时也延迟了单例的实例化。
>
> 这种方式采用了类装载的机制来保证初始化实例时只有一个线程。静态内部类方式在 `Singleton`类被装载时并不会立即`实例化`,而是在需要实例化时,调用 `getInstance`方法,才会装载 `Singletoninstance`类,从而完成 `Singleton`的实例化。类的静态属性只会在第一次加载类的时候初始化,所以在这里,帮助我们保证了线程的安全性,在类进行初始化时,别的线程是无法进入的。优点:避免了线程不安全,利用静态内部类特点实现延迟加载,效率高。结论:推荐使用  



```java
public class Singleton{
    private Singleton() {
    }

    private static class SingletonInstance{
        private static final Singleton INSTANCE = new Singleton();
    }


    public static Singleton getInstance() {
        return SingletonInstance.INSTANCE;
    }
}
```



> 我们再回头看下getInstance()方法，调用的是SingleTonHoler.INSTANCE，取的是SingleTonHoler里的INSTANCE对象，跟上面那个DCL方法不同的是，getInstance()方法并没有多次去new对象，故不管多少个线程去调用getInstance()方法，取的都是同一个INSTANCE对象，而不用去重新创建。当getInstance()方法被调用时，SingleTonHoler才在SingleTon的运行时常量池里，把符号引用替换为直接引用，这时静态对象INSTANCE也真正被创建，然后再被getInstance()方法返回出去，这点同饿汉模式。那么INSTANCE在创建过程中又是如何保证线程安全的呢？在《深入理解JAVA虚拟机》中，有这么一句话:
>
> 虚拟机会保证一个类的<\clinit>()方法在多线程环境中被正确地加锁、同步，如果多个线程同时去初始化一个类，那么只会有一个线程去执行这个类的<\clinit>()方法，其他线程都需要阻塞等待，直到活动线程执行<\clinit>()方法完毕。如果在一个类的<\clinit>()方法中有耗时很长的操作，就可能造成多个进程阻塞(需要注意的是，其他线程虽然会被阻塞，但如果执行<\clinit>()方法后，其他线程唤醒之后不会再次进入<\clinit>()方法。同一个加载器下，一个类型只会初始化一次。)，在实际应用中，这种阻塞往往是很隐蔽的。
>
> 故而，可以看出INSTANCE在创建过程中是线程安全的，所以说静态内部类形式的单例可保证线程安全，也能保证单例的唯一性，同时也延迟了单例的实例化。
>
> 那么，是不是可以说静态内部类单例就是最完美的单例模式了呢？其实不然，静态内部类也有着一个致命的缺点，就是传参的问题，由于是静态内部类的形式去创建单例的，故外部无法传递参数进去，例如Context这种参数，所以，我们创建单例时，可以在静态内部类与DCL模式里自己斟酌。







### 2.6 枚举式

```java
public enum SingleTon{
  INSTANCE;
        public void method(){
        //TODO
     }
}

SingleTon.INSTANCE
```



描述

> 枚举在java中与普通类一样，都能拥有字段与方法，而且枚举实例创建是线程安全的，在任何情况下，它都是一个单例。还能防止反序列化重新创建新的对象







## 3. 工厂/抽象工厂模式

`创建型模式`



工厂模式（Factory Pattern）是 Java 中最常用的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。

在工厂模式中，我们在创建对象时不会对客户端暴露创建逻辑，并且是通过使用一个共同的接口来指向新创建的对象。



参考

> - https://www.runoob.com/design-pattern/factory-pattern.html
> - 反射在工厂模式的使用：https://www.cnblogs.com/ssrs-wanghao/articles/8993338.html



用反射的工厂

```java
    public static <T extends Shape> T getShape(Class<T> clz){
        T t = null;
        try {
            t = (T) Class.forName(clz.getName()).newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return t;

    }
```

