---
icon: 
title: Java-新特性
author: Draco
time: 2020-11-04 17:31:40
description: 
image: 
categories: 
  - Java
tags: 
  - 学习笔记
  - Java
---



## 参考

- [Java8新特性](https://blog.csdn.net/PorkBird/article/details/113727704)



## jdk8

- Lambda表达式
- 函数式接口
- 方法引用/构造器
- Stream流 API
- 接口的增强
- Optiona类
- 新的时间和日期API



![image-20211017210905258](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-NewFeature/jdk8%E6%96%B0%E7%89%B9%E6%80%A7.png)



### Lambda表达式

总结六种情况

- -> 左边：Lambda形参列表的参数类型可以沈省略(类型推断)；如果Lambda形参别表至少是一个参数，括号也可以省略
- -> 右边：Lanmbda应该用`{}`包裹，如果Lambda只有一条执行语句，可以省略return和括号



### 函数式接口

如果一个接口中，只声明了一个抽象方法，则此接口就称为函数式接口。我们可以在一个接口使用`@FunctionalInterface` 注解， 这样做可以检查它是否是一个函数式接口。



> Lambda表达式的本质：作为函数式接口的实例化



- 简单的说，在Java8中，Lambda表达式就是一个函数式接口的实例。这就是Lambda表达式和函数式接口的关系。也就是说，**只要一个对象是函数式接口的实例，那么该对象就可以用Lambda表达式来表示**。
- **所以以前用匿名实现类表示的现在都可以用Lambda表达式来写。**



Java内置核心函数接口

 * 消费型接口 Consumer<T>     void accept(T t)
 * 供给型接口 Supplier<T>     T get()
 * 函数型接口 Function<T,R>   R apply(T t)
 * 断定型接口 Predicate<T>    boolean test(T t)



### 方法引用

当要传递给Lambda体的操作，已经有实现的方法了，可以使用方法引用！
方法引用可以看做是Lambda表达式深层次的表达。换句话说，方法引用就是Lambda表达式，也就是函数式接口的一个实例，通过方法的名字来指向一个方法，可以认为是Lambda表达式的一个语法糖。
要求：实现接口的抽象方法的参数列表和返回值类型，必须与方法引用的方法的参数列表和返回值类型保持一致！
格式：使用操作符“::” 将类(或对象) 与方法名分隔开来。

如下三种主要使用情况：

- 对象::实例方法名
- 类::静态方法名
- 类::实例方法名



### Stream流API

1.Stream关注的是对数据的运算，与CPU打交道

集合关注的是数据的存储，与内存打交道


2.

①Stream 自己不会存储元素。

②Stream 不会改变源对象。相反，他们会返回一个持有结果的新Stream。

③Stream 操作是延迟执行的。这意味着他们会等到需要结果的时候才执行


3.Stream 执行流程

① Stream的实例化

② 一系列的中间操作（过滤、映射、...)

③ 终止操作


4.说明：

4.1 一个中间操作链，对数据源的数据进行处理

4.2 一旦执行终止操作，就执行中间操作链，并产生结果。之后，不会再被使用



![image-20211017210932065](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-NewFeature/stream%E5%A4%84%E7%90%86%E6%B5%81%E7%A8%8B.png)



![操作总览](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-NewFeature/20181223012834784.png)



#### 中间操作：筛选与切片

多个中间操作可以连接起来形成一个流水线，除非流水线上触发终止操作，否则中间操作不会执行任何的处理！而在终止操作时一次性全部处理，称为“惰性求值”。


| 方法                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| filter(Predicate p) | 接收Lambda ，从流中排除某些元素                              |
| distinct()          | 筛选，通过流所生成元素的hashCode() 和equals() 去除重复元素   |
| limit(long maxSize) | 截断流，使其元素不超过给定数量                               |
| skip(long n)        | 跳过元素，返回一个扔掉了前n 个元素的流。若流中元素不足n 个，则返回一个空流。与limit(n)互补 |



#### 中间操作：映射



| 方法                            | 描述                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| map(Function f)                 | 接收一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新的元素。 |
| mapToDouble(ToDoubleFunction f) | 接收一个函数作为参数，该函数会被应用到每个元素上，产生一个新的DoubleStream。 |
| mapToInt(ToIntFunction f)       | 接收一个函数作为参数，该函数会被应用到每个元素上，产生一个新的IntStream。 |
| mapToLong(ToLongFunction f)     | 接收一个函数作为参数，该函数会被应用到每个元素上，产生一个新的LongStream。 |
| flatMap(Function f)             | 接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流 |



#### 中间操作：排序

| 方法                   | 描述                               |
| ---------------------- | ---------------------------------- |
| sorted()               | 产生一个新流，其中按自然顺序排序   |
| sorted(Comparator com) | 产生一个新流，其中按比较器顺序排序 |



#### 终止操作：匹配与查找


| 方法                   | 描述                                                         |
| ---------------------- | ------------------------------------------------------------ |
| allMatch(Predicate p)  | 检查是否匹配所有元素                                         |
| anyMatch(Predicate p)  | 检查是否至少匹配一个元素                                     |
| noneMatch(Predicate p) | 检查是否没有匹配所有元素                                     |
| findFirst()            | 返回第一个元素                                               |
| findAny()              | 返回当前流中的任意元素                                       |
| count()                | 返回流中元素总数                                             |
| max(Comparator c)      | 返回流中最大值                                               |
| min(Comparator c)      | 返回流中最小值                                               |
| forEach(Consumer c)    | 内部迭代(使用Collection 接口需要用户去做迭代，称为外部迭代。相反，Stream API 使用内部迭代——它帮你把迭代做了) |



#### 终止操作：归约

| 方法                             | 描述                                                 |
| -------------------------------- | ---------------------------------------------------- |
| reduce(T iden, BinaryOperator b) | 可以将流中元素反复结合起来，得到一个值。返回T        |
| reduce(BinaryOperator b)         | 可以将流中元素反复结合起来，得到一个值。返回Optional |

> map 和reduce 的连接通常称为map-reduce 模式，因Google 用它来进行网络搜索而出名。



#### 终止操作：收集

| 方法                 | 描述                                                         |
| -------------------- | ------------------------------------------------------------ |
| collect(Collector c) | 将流转换为其他形式。接收一个Collector接口的实现，用于给Stream中元素做汇总的方法 |

![img](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-NewFeature/Collectors1.png)



![img](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-NewFeature/Collectors2.png)



### Optional

- Optional 类(java.util.Optional) 是一个容器类，它可以保存类型T的值，代表这个值存在。或者仅仅保存null，表示这个值不存在。原来用null 表示一个值不存在，现在Optional 可以更好的表达这个概念。并且可以避免空指针异常。Optional类的Javadoc描述如下：这是一个可以为null的容器对象。如果值存在则isPresent()方法会返回true，调用get()方法会返回该对象。
- Optional提供很多有用的方法，这样我们就不用显式进行空值检测。
- 创建Optional类对象的方法：
  - `Optional.of(T t)`: 创建一个Optional 实例，t必须非空，否则抛NP异常
  - `Optional.empty()` : 创建一个空的Optional 实例
  - `Optional.ofNullable(T t)`：t可以为null
- 判断Optional容器中是否包含对象
  - `boolean isPresent()` : 判断是否包含对象
  - `void ifPresent(Consumer<? super T> consumer)` ：如果有值，就执行Consumer接口的实现代码，并且该值会作为参数传给它。
- 获取Optional容器的对象：
  - `T get()`: 如果调用对象包含值，返回该值，否则抛异常
  - `T orElse(T other)` ：如果有值则将其返回，否则返回指定的other对象。
  - `T orElseGet(Supplier<? extends T> other)` ：如果有值则将其返回，否则返回由Supplier接口实现提供的对象。
  - `T orElseThrow(Supplier<? extends X> exceptionSupplier)` ：如果有值则将其返回，否则抛出由Supplier接口实现提供的异常。



of()和get()搭配使用，ofNullable()和orElse()搭配使用

