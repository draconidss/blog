---
icon: 
title: Java-基础知识笔记
author: LifeAlsoIsGG
time: 2020-08-08 12:39:22
description: Java-基础知识笔记
original: true
image: 
categories: 
  - Java
tags: 
  - 学习笔记
  - Java
---



# 参考

> - [JavaSchool](http://www.51gjie.com/)



# 1 数据类型

Java的数据类型分为两大类： 

- **基本数据类型**：包括 整数 、 浮点数 、 字符 、 布尔 。 

- **引用数据类型**：包括 类 、 数组 、 接口 。

  

![](./images/Java-BasicNotes/dataType.jpg)



![](./images/Java-BasicNotes/data_type_exercise.jpg)





## 1.1 整型

整型用于表示没有小数部分的数值， 它允许是负数。Java 提供了 4 种整型，具体内容如下



![xx](./images/Java-BasicNotes/Java_Integer.jpg)



### 注意

int类型声明为L时会报错，需要向下转型。long类型声明时可以加或不加`L或l`

```java
int a = 10L;//报错
int b = (int)10L;//正确
long c = 10L;//正确
long d = 10;//正确,相当于向上转型
```







## 1.2 浮点类型

浮点类型用于表示有小数部分的数值。在 Java 中有两种浮点类型



![](./images/Java-BasicNotes/float.jpg)



​		double 表示这种类型的数值精度是 float 类型的两倍（有人称之为双精度数值)。**绝大部分应用程序都采用 double 类型**。在很多情况下，**float 类型的精度很难满足需求**。实际上，只有很少的情况适合使用 float 类型，例如，需要单精度数据的库， 或者需要存储大量数据。 float 类型的数值有一个后缀 F 或 f (例如，3.14F。) 没有后缀 F 的浮点数值（如 3.14 ) 默 认为 double 类型。当然，也可以在浮点数值后面添加后缀 D 或 d (例如，3.14D) 。



### 注意

声明`float`时必须要加`F或f`，但是如果是整数则不用

```java
float a = 10;//正确
float b = 10.5F;//正确
float c = 10.5;//报错
```

`double`类型可加可不加D或d，因为声明为小数时，小数默认是double类型

```java
double a = 10;//正确
double b = 10.5;//正确
double c = 10.5D;//正确,D可加可不加
```





## 1.3 char类型

​		char 类型原本用于表示单个字符。不过，现在情况已经有所变化。 如今，有些 Unicode 字符可以用一个 chai•值描述，另外一些 Unicode 字符则需要两个 char 值。有关的详细信息请 阅读下一节。 char 类型的字面量值要用单引号括起来。例如：W 是编码值为 65 所对应的字符常量。 它与 "A" 不同，"A" 是包含一个字符 A 的字符串, char 类型的值可以表示为十六进制值，其 范围从 \u0000 到 \Uffff。例如：W2122 表示注册符号 ( ), \u03C0 表示希腊字母 it。 除了转义序列 \u 之外， 还有一些用于表示特殊字符的转义序列， 请参看表 3-3。所有这 些转义序列都可以出现在加引号的字符字面量或字符串中。例如，’ \02丨22' 或 "1 110\11”。转 义序列 \u还可以出现在加引号的字符常量或字符串之外（而其他所有转义序列不可以）。例 如： public static void main(String\u005B\ u00SD args) 就完全符合语法规则， \u005B 和 \u005D 是 [ 和 ] 的编码



![特殊字符的转义序列](./images/Java-BasicNotes/Escape_sequence_for_special_characters.jpg)



## 1.4 boolean类型

boolean (布尔）类型有两个值：false 和 true, 用来判定逻辑条件 整型值和布尔值之间 不能进行相互转换。



# 2 运算符



## 2.1 算术运算符



![](./images/Java-BasicNotes/arithmetic_operator_1.jpg)



Java中，整数使用以上运算符，无论怎么计算，也不会得到小数。



![](./images/Java-BasicNotes/arithmetic_operator_2.jpg)



++ 运算，变量自己增长1。反之， -- 运算，变量自己减少1，用法与 ++ 一致。 

- 独立运算： 

  - 变量在独立运算时， 前++ 和 后++ 没有区别 。 
  - 变量 前++ ：例如 ++i 。 
  - 变量 后++ ：例如 i++ 。

- 混合运算： 

  - 和其他变量放在一起， 前++ 和 后++ 就产生了不同。 

    ![](./images/Java-BasicNotes/++Calculation_1.jpg)

  - 变量 前++ ：变量a自己加1，将加1后的结果赋值给b，也就是说a先计算。a和b的结果都是2。

    ![](./images/Java-BasicNotes/++Calculation_2.jpg)



在 Java 中，使用算术运算符 + 、-、 * 、/ 表示加、减、 乘、除运算。 **当参与 / 运算的两个 操作数都是整数时， 表示整数除法；否则， 表示浮点除法**。 整数的求余操作（有时称为取模) 用 ％ 表示。例如，15/2 等于 ，7 15%2 等于 1 , 15.0/2 等于 7.50 需要注意， 整数被 0 除将会产生一个异常， 而浮点数被 0 除将会得到无穷大或 NaN 结果。



## 2.2 赋值运算符



![](./images/Java-BasicNotes/assignment_operator_1.jpg)



![](./images/Java-BasicNotes/assignment_operator_2.jpg)



## 2.3 比较运算符

![](./images/Java-BasicNotes/Comparison_operator_1.jpg)



![](./images/Java-BasicNotes/Comparison_operator_2.jpg)



### instanceof：比较一个对象是否为一个类的实例/或某个接口的实现类

参考

> - https://www.cnblogs.com/ysocean/p/8486500.html