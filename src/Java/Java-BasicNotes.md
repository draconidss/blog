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



基础用法

```java
boolean result = obj instanceof Class
```

其中 `obj` 为一个对象，`Class` 表示一个类或者一个接口，当 `obj` 为 `Class` 的对象，或者是其直接或间接子类，或者是其接口的实现类，结果result 都返回 true，否则返回false。



原理：

> **编译器会检查 `obj` 是否能转换成右边的`class`类型，如果不能转换则直接报错，如果不能确定类型，则通过编译，具体看运行时定。**



#### 其他情况

- obj 必须为引用类型，不能是基本类型

  ```java
  int i = 0;
  System.out.println(i instanceof Integer);//编译不通过
  System.out.println(i instanceof Object);//编译不通过
  ```

  

- obj 为 null

  ```java
  System.out.println(null instanceof Object);//false
  ```

  

- obj 为 class 接口的实现类

  ```java
  
  ```

  

- 我们可以用 `instanceof` 运算符判断 某个对象是否是 `List` 接口的实现类，如果是返回 true，否则返回 false

  ```java
  ArrayList arrayList = new ArrayList();
  System.out.println(arrayList instanceof List);//true
  
  List list = new ArrayList();
  System.out.println(list instanceof ArrayList);//true
  ```

  

- obj 为 class 类的直接或间接子类

  ```java
  public class Person {
   
  }
  
  public class Man extends Person{
       
  }
  
  Person p1 = new Person();
  Person p2 = new Man();
  Man m1 = new Man();
  System.out.println(p1 instanceof Man);//false
  System.out.println(p2 instanceof Man);//true
  System.out.println(m1 instanceof Man);//true
  ```



#### 原理

参考

> - https://docs.oracle.com/javase/specs/jls/se8/html/jls-15.html#jls-15.20.2



伪代码描述

```java
boolean result;
if (obj == null) {
  result = false;
} else {
  try {
      T temp = (T) obj; // checkcast
      result = true;
  } catch (ClassCastException e) {
      result = false;
  }
}
```

所以

```java
Person p1 = new Person();
 
System.out.println(p1 instanceof String);//编译报错
System.out.println(p1 instanceof List);//false
System.out.println(p1 instanceof List<?>);//false
System.out.println(p1 instanceof List<Person>);//编译报错
```

也就是说有表达式 obj instanceof T，instanceof 运算符的 obj 操作数的类型必须是引用类型或空类型; 否则，会发生编译时错误。 

　　如果 obj 强制转换为 T 时发生编译错误，则关系表达式的 instanceof 同样会产生编译时错误。 在这种情况下，表达式实例的结果永远为false。

　　在运行时，如果 T 的值不为null，并且 obj 可以转换为 T 而不引发ClassCastException，则instanceof运算符的结果为true。 否则结果是错误的

　　简单来说就是：**如果 obj 不为 null 并且 (T) obj 不抛 ClassCastException 异常则该表达式值为 true ，否则值为 false 。**



总结

> - https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html#jvms-6.5.instanceof





## 2.4 逻辑运算符

![](./images/Java-BasicNotes/logical_operators_1.jpg)



![](./images/Java-BasicNotes/logical_operators_2.jpg)



## 2.5 三元运算符

**三元运算符格式：**

```
数据类型 变量名 = 布尔类型表达式？结果1：结果2
```



**三元运算符计算方式：**

- 布尔类型表达式结果是true，三元运算符整体结果为结果1，赋值给变量。
- 布尔类型表达式结果是false，三元运算符整体结果为结果2，赋值给变量。



![](./images/Java-BasicNotes/ternary_operator.jpg)





## 2.6 位运算符



- &：按位与。当两位同时为1时才返回1。
- |：按位或。只要有一位为1即可返回1。
- ~：按位非。单目运算符，将操作数的每个位（包括符号位）全部取反。
- ^：按位异或。当两位相同时返回0，不同时返回1。
- <<：左移运算符。
- \>>：右移运算符。
- \>>>：无符号右移运算符。



|          符号          |                                                    |
| :--------------------: | -------------------------------------------------- |
|       &：按位与        | 当两位同时为1时才返回1，否则返回0                  |
|       \|：按位或       | 只要有一位为1即可返回1                             |
|       ~：按位非        | 单目运算符，将操作数的每个位（包括符号位）全部取反 |
|      ^：按位异或       | 当两位相同时返回0，不同时返回1                     |
|     <<：左移运算符     | 左移运算符                                         |
|    \>>：右移运算符     | 右移运算符，例如 \>> 2则代表除于2                  |
| \>>>：无符号右移运算符 | 无符号右移运算符                                   |





## 2.7 数学函数与常量Math

在 Math类中，包含了各种各样的数学函数。在编写不同类别的程序时，可能需要的函数也不同。

![](./images/Java-BasicNotes/math_methods_1.jpg)



![](./images/Java-BasicNotes/math_methods_2.jpg)



```java
/**
         *Math.sqrt()//计算平方根
         *Math.cbrt()//计算立方根
         *Math.pow(a, b)//计算a的b次方
         *Math.max( , );//计算最大值
         *Math.min( , );//计算最小值
         */
 
        System.out.println(Math.sqrt(16));   //4.0
        System.out.println(Math.cbrt(8));    //2.0
        System.out.println(Math.pow(3,2));     //9.0
        System.out.println(Math.max(2.3,4.5));//4.5
        System.out.println(Math.min(2.3,4.5));//2.3
 
        /**
         * abs求绝对值
         */
        System.out.println(Math.abs(-10.4));    //10.4
        System.out.println(Math.abs(10.1));     //10.1
 
        /**
         * ceil天花板的意思，就是返回大的值
         */
        System.out.println(Math.ceil(-10.1));   //-10.0
        System.out.println(Math.ceil(10.7));    //11.0
        System.out.println(Math.ceil(-0.7));    //-0.0
        System.out.println(Math.ceil(0.0));     //0.0
        System.out.println(Math.ceil(-0.0));    //-0.0
        System.out.println(Math.ceil(-1.7));    //-1.0
 
        /**
         * floor地板的意思，就是返回小的值
         */
        System.out.println(Math.floor(-10.1));  //-11.0
        System.out.println(Math.floor(10.7));   //10.0
        System.out.println(Math.floor(-0.7));   //-1.0
        System.out.println(Math.floor(0.0));    //0.0
        System.out.println(Math.floor(-0.0));   //-0.0
 
        /**
         * random 取得一个大于或者等于0.0小于不等于1.0的随机数
         */
        System.out.println(Math.random());  //小于1大于0的double类型的数
        System.out.println(Math.random()*2);//大于0小于1的double类型的数
        System.out.println(Math.random()*2+1);//大于1小于2的double类型的数
 
        /**
         * rint 四舍五入，返回double值
         * 注意.5的时候会取偶数    异常的尴尬=。=
         */
        System.out.println(Math.rint(10.1));    //10.0
        System.out.println(Math.rint(10.7));    //11.0
        System.out.println(Math.rint(11.5));    //12.0
        System.out.println(Math.rint(10.5));    //10.0
        System.out.println(Math.rint(10.51));   //11.0
        System.out.println(Math.rint(-10.5));   //-10.0
        System.out.println(Math.rint(-11.5));   //-12.0
        System.out.println(Math.rint(-10.51));  //-11.0
        System.out.println(Math.rint(-10.6));   //-11.0
        System.out.println(Math.rint(-10.2));   //-10.0
 
        /**
         * round 四舍五入，float时返回int值，double时返回long值
         */
        System.out.println(Math.round(10.1));   //10
        System.out.println(Math.round(10.7));   //11
        System.out.println(Math.round(10.5));   //11
        System.out.println(Math.round(10.51));  //11
        System.out.println(Math.round(-10.5));  //-10
        System.out.println(Math.round(-10.51)); //-11
        System.out.println(Math.round(-10.6));  //-11
        System.out.println(Math.round(-10.2));  //-10
```




