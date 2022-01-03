---
icon: 
title: Java多线程-2
author: Draco
time: 2021-08-04 21:18:29
description: 
image: 
categories: 
  - Java
tags: 
  - 学习笔记
  - Java
  - 多线程

---


## Java线程同步机制



### 同步机制简介

对于同一个个许可证所保护的共享数据而言，任何线程访问这些共享数据前必须先持有该许可证。

- 一个线程只有在持有许可证的情况下才能够对这些共享数据进行访问；
- 一个许可证一 一次只能够被个线程持有；
- 许可证的持有线程在其结束对这些共享数据的访问后必须让出（释放） 其持有的许可证， 以便其他线程能够对这些共享数据进行访问。

一个线程在访间共享数据前必须申请相应的锁（许可证）， 线程的这个动作被称为锁的获得 (Acquire)。一个线程获得某个锁（持有许可证），我们就称该线程为相应锁的持 有线程（线程持有许可证），一个锁一次只能被一个线程持有。锁的持有线程可以对该锁所保护的共享数据进行访问，访问结束后该线程必须释放 (Release) 相应的锁。锁的持有 线程在其获得锁之后和 释放锁之前这段时间内所执行的代码被称为临界区 (Critical Section)。因此，共享数据只允许在临界区内进行访问，临界区一次只能被一个线程执行。



### 临界区

锁的持有线程在获得锁之后和释放锁之前这段时间内所执行的代码被称为临界区。共享数据只能在临界区内进行访问，临界区一次只能被一个线程执行。



### 锁简介

锁具有``排他性``，一次只能被一个线程持有，被称为``排它锁``或``互斥锁``。

按照虚拟机对锁的实现划分，分为

- 内部锁（Intrinsic Lock）：非公平锁，例如`sychronized`
- 显示锁（Explicit Lock）支持``非公平锁``和``公平锁``，例如JUC包下的`Lock`等实现类`ReentrenLock`



![互斥锁示意图](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/%E4%BA%92%E6%96%A5%E9%94%81%E7%A4%BA%E6%84%8F%E5%9B%BE.png)





## 锁的概念



### 可重入性

一个线程在持有一个锁的时候还能够继续成功申请该锁，就称该锁具有可重入性，反之则称为非可重入性。

```java
void methodA() { 
  acquireLock(lock);／／申请锁lock
  ／／省略其他代码
  methodB(); 
  releaseLock(lock);／／释放锁lock
}

void methodB() { 
  acquireLock(lock);／／申请锁lock
  releaseLock(lock);／／释放锁lock
}
```

方法methodA使用了锁lock，该锁引导的临界区代码又调用了另外一个方法methodB,而方法methodB也使用了lock。那么， 这就产生了一个问题：methodA的执行线程持有锁 lock 的时候调用了methodB, 而methodB执行的时候又去申请锁lock, 而lock此时正被当前线程持有（未被释放）。那么，此时methodB究竟能否获得（申请成功） lock呢？可重入性就描述了这样一个问题。



#### 实现原理

可重入锁可以被理解为一个对象，该对象包含一个``计数器属性``。计数器属性的初始值为 0, 表示相应的锁还没有被任何线程持有。 

- 每次线程获得一个可重入锁的时候， 该锁的 计数器值会被增加1。 
- 每次一个线程释放锁的时候， 该锁的计数器属性值就会被减1。 

可重入锁的持有线程初次获得该锁时相应的开销相对大，这是因为该锁的持有线程必须与其他线程 ”竞争” 以获得锁。 

可重入锁的持有线程继续荻得相应锁所产生的开销要小得 多，这是因为此时Java虚拟机只需要将相应锁的计数器属性值增加1即可以实现锁的获得。



### 锁的粒度

一个锁实例可以保护一个或者多个共享数据，一个实例所保护的共享数据的数量大小就被称为该锁的粒度，锁保护的共享数据越大，我们就称该锁的粒度越粗，反之则称粒度细。



## 锁的开销



- 锁的申请和释放所产生的开销（主要是时间开销）
- 锁的上下文切换（主要是时间开销）：锁作为一种排他性资源，一旦被争用就可能导致上下文切换，而没有被争用的锁则可能不会导致上下文切换
- 锁泄露
- 死锁锁死活锁饿死等线程其他活性故障。



### 锁泄露

锁泄露指一个线程获得该锁之后，由于程序的错误、缺陷导致该锁一直无法被释放而其他线程一直无法获得该锁的现象。因此，锁泄露会导致同步在该锁上的所有线程都无法进展。





## Sychronized（内部锁）



### 参考

- [关键字: synchronized详解](https://www.pdai.tech/md/java/thread/java-thread-x-key-synchronized.html)
- [jvm：ObjectMonitor源码](https://blog.csdn.net/zwjyyy1203/article/details/106217887)
- [Java并发基石——所谓“阻塞”：Object Monitor和AQS（1）](https://blog.csdn.net/yinwenjie/article/details/84922958)
- [锁升级过程](https://blog.csdn.net/zzti_erlie/article/details/103997713?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control)



### 简介

Java平台中的任何一个对象都有唯一一个与之关联的锁。 这种锁被称为``监视器 (Monitor)``或者``内部锁 (Intrinsic Lock)``。内部锁是一种``排他锁``，它能够保障

- 原子性
- 可见性
- 有序性

内部锁是通过 synchronized 关键字实现的。



### 使用方法

- synchronized修饰的实例方法：多线程并发访问时，只能有一个线程进入，获得``对象内置锁``，其他线程阻塞等待，但在此期间线程仍然可以访问其他方法。
- synchronized修饰的静态方法：多线程并发访问时，只能有一个线程进入，获得``类锁``，其他线程阻塞等待，但在此期间线程仍然可以访问其他方法。
- synchronized修饰的代码块，：多线程并发访问时，只能有一个线程进入，根据``括号中的对象或者是类``，获得相应的对象内置锁或者是类锁
- 同步方法的整个方法体就是一个临界区。



> 每个类都有一个类锁，类的每个对象也有一个内置锁，它们是互不干扰的，也就是说一个线程可以同时获得``类锁``和该类实例化``对象的内置锁``，当线程访问非synchronzied修饰的方法时，并不需要获得锁，因此不会产生阻塞。



```java
Synchronized(锁句柄){
    //在此代码块访问共享数据
}
```

synchronized关键字所引导的代码块就是临界区 。锁句柄是一个对象的引用（或者能够返回对象的表达式）。例如，锁句柄可以填写为this 关键字（表示当前对象）。

习惯上我们也直接称锁句柄为锁。锁句柄对应的监视器就被称为相应同步块的引导锁。相应地， 我们称呼相应的同步块为该锁引导的同步块。

> 锁句柄通常采用final修饰（private final）。这是因为锁句柄的值一旦改变，会导致同一个代码块的多个线程实际上使用不同的锁，而导致竞态。



### 同步静态方法

```java
public class SynchronizedMethodExample {
    public static sysnchronized void staticMethod(){
        //在此访问共享数据
    }
    //...
}

//相当于
public class SynchronizedMethodExample {
    public static void staticMethod(){
        sysnchronized(SynchronizedMethodExample.class){
             //在此访问共享数据
        }
    }
    //...
}
```

线程在执行临界区代码的时候必须持有该临界区的``引导锁``。一个线程执行到同步代码块必须申请该同步块的引导锁，只有申请成功该锁的线程才能够执行相的应临界区。

一旦执行完临界区代码，引导该临界区的锁就会被自动释放。整个内部锁申请和释放的过程都是由``java虚拟机``负责实施的，所以synchronized实现的锁被称为``内部锁``。

**内部锁不会导致锁泄露**，java编译器在将同步代码块编译成字节码的时候，对临界区可能抛出的异常（未被捕获）进行了处理，所以即使临界区代码抛出异常也不会妨碍内部锁的释放。





### 内部锁的调度

概念

- 监控区（Entry Set）：锁已被其他线程获取，期待获取锁的线程就进入Monitor对象的监控区
- 待授权区（Wait Set）：曾经获取到锁，但是调用了wait方法，线程进入待授权区



Java虚拟机会为每个内部锁分配一个``入口集(Entry List)``， 用于记录等待获得相应内部锁的线程。

多个线程申请同一个锁的时候，只有一个申请者能够成为该锁的持有线程（即申请锁的操作成功）， 而其他申请者的申请操作会失败。 这些申请失败的线程并不会抛出异常， 而是会被暂停（生命周期状态变为`BLOCKED`) 并被存入相应锁的入口集中等待再次申请锁的机会。 

入口集中的线程就被称为相应内部锁的等待线程。当这些线程申请的锁被其持有线程释放的时候， **该锁的入口集中的一个任意线程会被Java虚拟机唤醒**， 从而得到再次申请锁的机会。 

由于Java虚拟机对内部锁的调度``仅支持非公平调度``， 被唤醒的等待线程占用处理器运行时可能还有其他新的活跃线程 （处于 RUNNABLE状态，且未进入过入口集）与该线程抢占这个被释放锁， 因此被唤醒的线程不一定就能成为该锁的持有 线程。

另外，Java虚拟机如何从一个锁的入口集中选择一个等待线程，作为下一个可以参与再次申请相应锁的线程，这个细节与Java虚拟机的具体实现有关：这个被选中的线程有可能是入口集中等待时间最长的线程， 也可能是等待时间最短的线程，或者完全是随机。



![img](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/%E5%86%85%E9%83%A8%E9%94%81%E7%8A%B6%E6%80%81%E8%BD%AC%E6%8D%A2%E5%9B%BE.png)



### 锁原理

//TODO:monitor markword objectMonitor

![img](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/Mark%20Word.png)



### 锁升级过程

- [锁升级过程](https://blog.csdn.net/zzti_erlie/article/details/103997713?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control)
- https://blog.csdn.net/zwjyyy1203/article/details/106217887



![preview](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/%E9%94%81%E5%8D%87%E7%BA%A7%E8%BF%87%E7%A8%8B.jpg)







## Lock接口（显示锁）

jdk1.5引入的排他锁，其作用于内部锁相同， 但是它提供了一些内部锁所不具备的特性。显示锁是`java.util.concurrent.locks.Lock`接口的实例，`java.util.concurrent.locks.Lock`是它的默认实现类



### 常用方法

|                                    |                                                        |
| ---------------------------------- | ------------------------------------------------------ |
| void lock()                        | 获取锁                                                 |
| void lockInterruptibly()           | 如果当前线程未被中断，则获取锁                         |
| newCondition()                     | 返回绑定到此Lock实例的新Conditon实例                   |
| tryLock()                          | 仅在调试时锁为空闲状态才获取锁                         |
| tryLock(long time, TimeUnit uinit) | 如果说在给定的时间空闲，并且当前线程未被中断，则获取锁 |
| unlock()                           | 释放锁                                                 |



### 显示锁的调度

可以根据``ReentrantLock(boolean fail)`` 指定公平和非公平锁，true为公平锁

公平锁保障锁调度的公平性往往是以增加上下文切换为代价的，因此显式锁默认非公平调度策略，适合``````锁被持有时间相对长``和``线程申请锁的平均间隔时间相对长``的情形。

总的来说，公平锁开销大于非公平锁.





## Synchronized 和 ReenTrantLock



### 对比

**1. 锁的实现**

synchronized 是 JVM 实现的，而 ReentrantLock 是 JDK 实现的。



**2. 性能**

新版本 Java 对 synchronized 进行了很多优化，例如自旋锁等，synchronized 与 ReentrantLock 大致相同。



**3. 等待可中断**

ReentrantLock 可中断，而 synchronized 不行

当持有锁的线程长期不释放锁的时候，正在等待的线程可以选择放弃等待，改为处理其他事情。



**4. 公平锁**

synchronized 中的锁是非公平的，ReentrantLock 默认情况下也是非公平的，但是也可以是公平的。

公平锁是指多个线程在等待同一个锁时，必须按照申请锁的时间顺序来依次获得锁。



**5. 锁绑定多个条件**

一个 ReentrantLock 可以同时绑定多个 Condition 对象，通过调用``newCondition()``方法来创建。



**6. 是否可重入**

两者都是可重入锁。

“可重入锁”概念是：自己可以再次获取自己的内部锁。比如一个线程获得了某个对象的锁，此时这个对象锁还没有释放，当其再次想要获取这个对象的锁的时候还是可以获取的，如果不可锁重入的话，就会造成死锁。同一个线程每次获取锁，锁的计数器都自增1，所以要等到锁的计数器下降为0时才能释放锁。



**7. 异常处理&锁泄露**

synchronized 异常就会自动释放锁来避免``锁泄露``，而 ReenTrantLock 异常需要在 finally 里 unlock。

通过反编译可以看到sychronized有两个释放锁标志`monitorexit`，最后一个`monitorexit`是用于如果同步代码块中出现``Exception或者Error`，则会调用第二个`monitorexit`指令来保证释放锁



**8. 灵活性**

内部锁是基于代码块的锁，灵活性较差，要么使用，用么不使用；

而显示锁是基于对象的锁，灵活性强，比如可以在一个方法内申请锁，在另一个方法释放锁，而内部锁是无法做到的。

还有如果一个内部锁的持有线程一直不释放这个锁(这通常是由于代码错误导致的),那 么同步在该锁之上的所有线程就会一直被暂停而使其任务无法进展。而显式锁则可以轻松 地避免这样的问题。Lock接口定义了一个 `try Lock`方法。该方法的作用是尝试申请相应 Lock实例锁表示的锁。如果相应的锁未被其他任何线程持有,那么该方法会返回true,表 示其获得了相应的锁;否则,该方法并不会导致其执行线程被暂停而是直接返回 false, 表示其未获得相应的锁。更高级可以使用带参数超时等待的try lock方法。



**9. 监控定位**

在问题定位方面,尤其是定位生产环境上的问题的时候,`线程转储( Thread dump 参见第1章)`就像是线程的“工作报告”一样可以告诉我们Java虚拟机中关于线程的详 细信息。

线程转储中会包含内部锁的相关信息,包括一个线程等待哪些锁以及这些锁的当 前(获取相应线程转储那一刻)持有线程。

而在JDK1.5下,线程转储中并不包含显式锁 的相关信息。不过,JDK1.6提供的工具 `jstack`所产生的线程转储中可以包含显式锁的信 息5。



### ReenTrantLock的高级功能

ReenTrantLock 比 synchronized 增加了一些高级功能。主要有三点

1. 等待可中断
2. 可指定公平和非公平锁
3. 可实现选择性通知（锁可以绑定多个条件）





- **ReenTrantLock提供了一种能够中断等待锁的线程的机制**，通过**lock.lockInterruptibly()**来实现这个机制。也就是说正在等待的线程可以选择放弃等待，改为处理其他事情。
- **ReenTrantLock可以指定是公平锁还是非公平锁。而synchronized只能是非公平锁。所谓的公平锁就是先等待的线程先获得锁。** ReenTrantLock默认情况是非公平的，可以通过 ReenTrantLock类的`ReentrantLock(boolean fair)`构造方法来制定是否是公平的。
- **synchronized关键字与wait()和notify/notifyAll()方法相结合可以实现等待/通知机制**，ReentrantLock类当然也可以实现，但是需要借助于Condition接口与newCondition() 方法。Condition是JDK1.5之后才有的，它具有很好的灵活性，比如可以实现多路通知功能也就是在一个Lock对象中可以创建多个Condition实例（即对象监视器），**线程对象可以注册在指定的Condition中，从而可以有选择性的进行线程通知，在调度线程上更加灵活。 在使用notify/notifyAll()方法进行通知时，被通知的线程是由 JVM 选择的，用ReentrantLock类结合Condition实例可以实现“选择性通知”** ，这个功能非常重要，而且是Condition接口默认提供的。而synchronized关键字就相当于整个Lock对象中只有一个Condition实例，所有的线程都注册在它一个身上。如果执行notifyAll()方法的话就会通知所有处于等待状态的线程这样会造成很大的效率问题，而Condition实例的signalAll()方法 只会唤醒注册在该Condition实例中的所有等待线程。

如果你想使用上述功能，那么选择ReenTrantLock是一个不错的选择。



### 使用选择

除非需要灵活的使用锁，去使用 ReentrantLock 的高级功能，否则优先使用 synchronized。这是因为 synchronized 是 JVM 实现的一种锁机制，JVM 原生地支持它，而 ReentrantLock 不是所有的 JDK 版本都支持。并且使用 synchronized 不用担心没有释放锁而导致死锁或锁泄露问题，因为 JVM 会确保锁的释放。



内部锁的优点是简单易用,显式锁的优点是功能强大,这两种锁各自都存在一些弱势。 

- 一般来说,新开发的代码中我们可以选用显式锁。但是选用显式锁的时候需要注意 显式锁的不正确使用会导致锁泄漏这样严重的问题;线程转储可能无法包含显式锁的相关 信息,从而导致问题定位的困难。
-  另外,我们也可以使用相对保守的策略——默认情况下选用内部锁,仅在需要显式锁 所提供的特性的时候才选用显式锁。比如,在多数线程持有一个锁的时间相对长或者线程 申请锁的平均时间间隔相对长的情况下使用非公平锁是不太恰当的,因此我们可考虑使用 公平锁(显式锁)。





### 性能已不是选择标准

在JDK1.6之前，synchronized 的性能是比 ReenTrantLock 差很多。**具体表示为：synchronized 关键字吞吐量随线程数的增加，下降得非常严重。而ReenTrantLock 基本保持一个比较稳定的水平**。我觉得这也侧面反映了， synchronized 关键字还有非常大的优化余地。后续的技术发展也证明了这一点，我们上面也讲了在 JDK1.6 之后 JVM 团队对 synchronized 关键字做了很多优化。**JDK1.6 之后，synchronized 和 ReenTrantLock 的性能基本是持平了。所以网上那些说因为性能才选择 ReenTrantLock 的文章都是错的！JDK1.6之后，性能已经不是选择synchronized和ReenTrantLock的影响因素了！而且虚拟机在未来的性能改进中会更偏向于原生的synchronized，所以还是提倡在synchronized能满足你的需求的情况下，优先考虑使用synchronized关键字来进行同步！优化后的synchronized和ReenTrantLock一样，在很多地方都是用到了CAS操作**。





## 锁优化与选择

![img](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/%E9%94%81%E4%BC%98%E5%8C%96.png)



## 改进锁：读写锁

读写锁( Read/Write Lock)是一种改进型的排他锁,也被称为共享/排他( Shared Exclusive)锁。读写锁允许多个线程可以同时读取(只读)共享变量,但是一次只允许个线程对共享变量进行更新(`包括读取后再更新`)。任何线程读取共享变量的时候,其他 线程无法更新这些变量;一个线程更新共享变量的时候,其他任何线程都无法访问该变量。

![读写锁的两种角色](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/%E8%AF%BB%E5%86%99%E9%94%81%E7%9A%84%E4%B8%A4%E7%A7%8D%E8%A7%92%E8%89%B2.png)



总的来说,**读锁之间可以变法访问，读锁和写锁直接互斥，写锁和写锁之间互斥**

- 读锁对于读线 程来说起到保护其访问的共享变量在其访问期间不被修改的作用,并使多个读线程可以同 时读取这些变量从而提高了并发性;
- 而写锁保障了写线程能够以独占的方式安全地更新共 享变量。写线程对共享变量的更新对读线程是可见的。



### 对比

与普通的排他锁(如内部锁和 Reentrantlock)相比,读写锁在排他性方面比较弱(这是我们所期望的)。在原子性、可见性和有序性保障方面,它所起到的作用与普通的排他锁是一致的，

- 写线程`释放写锁`所起到的作用相当于一个线程释放一个普通排他锁;
- 读线程`获得读锁`所起到的作用相当于一个线程获得一个普通排他锁。



### 适用场景

由于内部实现较为复杂， 只有同时满足下面两个条件的时候,读写锁才是适宜的选择。否则,使用读写锁会得 不偿失(开销)。

- 只读操作比写(更新)操作要频繁得多
- 读线程持有锁的时间比较长



### 读写锁的升级降级

ReentrantReadWriteLock所实现的读写锁是个`可重入锁`。 

- 锁降级：支持。即一个线程持有读写锁的`写锁`的情况下可以继续获得相应的`读锁`。
- 锁升级：不支持。目前获取`读锁`后需要释放`读锁`才能获取`写锁`。



**锁降级**

```java
//锁降级
public void downGrade() {
  boolean readLockAcquired = false;
  writeLock.lock();
  try {
    //在此区域访问(读，写)共享变量
    //...
    //当线程在持有写锁的情况下申请读锁readLock
    readLock.lock();
    readLockAcquired = true;
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    writeLock.unlock();
  }

  if(readLockAcquired){
    try {
      //读取共享数据

    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      readLock.unlock();
    }
  }
}
```



**锁升级**

```java
//锁升级
public void upGrade() {
  readLock.lock();
  try {
    // Must release read lock before acquiring write lock
    readLock.unlock();
    writeLock.lock();
    try {
      //在此区域访问(读，写)共享变量
      System.out.println(Thread.currentThread().getName() + "写操作正在执行。。。");
      Thread.sleep(1000);
      System.out.println(Thread.currentThread().getName() + "写操作结束。。。");
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      writeLock.unlock();
    }
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    readLock.unlock();
  }
}
```



## 内存屏障

可见性的两个动作

- **刷新处理器**：获得锁前，保证了该锁的当前持有线程能够读取到前一个持有线程对这些数
  据所做的更新
- **冲刷处理器**：释放锁后，保证了该锁的持有线程对这些数据所做的更新对该锁的后续持
  有线程可见

底层是借助`内存屏障`实现的上述动作。



### 定义

内存屏障是对一类仅针对内存读丶写操作指令的跨处理器架构的比较底层的抽象。`内存屏障`是被插入到`两个指令之间`使用的，其作用是禁止编译器丶处理器重排序从而保证`有序性`，但放的位置不同作用也有不同。

它在指令序列(如指令1;指令2;指令3)中就像是一堵墙(因此被称为屏障)一样使其两侧(之前和之后)的指令无法“穿越”它(一旦穿越了就是重排序了)。

但是,为了实现禁止重排序的功能,这些指令也往往具有一个副作用——刷新处理器缓存、冲刷处理器缓存,从而保证可见性。不同微架构的处理器所提供的这样的指令是不同的,并且出于不同的目的使用的相应指令也是不同的。



### 按可见性保障划分

- 加载屏障：刷新处理器缓存
- 存储屏障：冲刷处理器缓存



#### 加载屏障

- 用法：Java虚拟机会在 `Monitorenter(申请锁)`对应的机器码指令之后`临界区开始之前`的地方插人一个`加载屏障`。
- 作用：这使得读线程的执行处理器能够将写线程对相应共享变量所做的更新从其他处理器同步到该处理器的高速缓存中。



#### 存储屏障

- 用法：Java虚拟机会在 `MonitorExit(释放锁)`对应的`机器码指令之后`插入一个`存储屏障`
- 作用：这就保障了写线程在释放锁之前在临界区中对共享变量所做的更新对读线程的执行处理器来说是可同步的



**因此,可见性的保障是通过写线程和读线程成对地使用`存储屏障`和`加载屏障`实现的。**



这有点像高考成绩查询:高考阅卷完毕之后虽然每个考生的分数都已经确定,但是这些分数对于考生来说仍然是未知的。只有当分数公布的时候,考生才能够去查询自己的分数。这里

- 考试成绩就相当于阅卷方和考生之间需要共享的数据:
- 阅卷方公布成绩相当于执行存储屏障,它使得考生的分数可以被查询;
- 考生查询其考试成绩相当于执行加载屏障,它使得考生可以得知自己的考试成绩



### 按有序性保障划分

- 获取屏障
- 释放屏障



#### 获取屏障

- 用法：Java虚拟机会在 `Monitorenter之后`(它包含了读操作)和`临界区开始之前`的地方插人一个`获取屏障`
- 作用：其作用是禁止该读操作与其后的任何读写操作之间进行`重排序`，这相当于在进行后续操作`之前`先要获得相应共享数据的`所有权`(这也是该屏障的名称来源)，`获取屏障`禁止了临界区中的任何读、写操作被重排序到`临界区之前`的可能性,



#### 释放屏障

- 用法：`Monitorexit之前`(它包含了写操作)和`临界区之后`的地方插入一个`释放屏障`。
- 作用：禁止该写操作与其前面的任何读写操作之间进行`重排序`，这相当于在对相应共享数据`操作结束后`释放所有权(这也是该屏障的名称来源)，`释放屏障`又禁止了临界区中的任何读、写操作被重排序到`临界区之后`的可能性。



因此,这两种屏障就像是三明治的两层面包片把火腿夹住一样把临界区中 的代码(指令序列)包括起来,如图3-4所示

![内存屏障在锁中的使用](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/%E5%86%85%E5%AD%98%E5%B1%8F%E9%9A%9C%E5%9C%A8%E9%94%81%E4%B8%AD%E7%9A%84%E4%BD%BF%E7%94%A8.png)



### 总结

因此临界 区内的任何读、写操作都无法被重排序到临界区之外。在锁的排他性的作用下,这使得临 界区中执行的操作序列具有`原子性`。因此,写线程在临界区中对各个共享变量所做的更新 会同时对读线程可见,即在读线程看来各个共享变量就像是“一下子”被更新的,于是这 些线程无从(也无必要)区分这些共享变量是以何种顺序被更新的。这使得写线程在临界 区中执行的操作自然而然地具有有序性—读线程对这些操作的感知顺序与源代码顺序一致

**可见,锁对有序性的保障是通过写线程和读线程配对使用释放屏障与加载屏障实现的**



## 轻量级同步机制：volatile关键字



### 定义

volatile字面有“易挥发”的意思,引申开来就是有“不稳定”的意思。

volatile关键字用于修饰共享可变变量,即没有使用 `final`关键字修饰的实例变量或静态变量,如下所示 

```java
private volatile int logLevel
```



- volatile关键字表示被修饰的变量的值容易变化(即被其他线程更改),因而不稳定。 
- volatile变量的不稳定性意味着对这种变量的读和写操作都必须从`高速缓存`或者`主内存` （也是通过高速缓存读取）中读取，以读取`变量的相对新值`。
- 因此, volatile变量不会被编译器分配到`寄存器`进行存储，对volatile变量的读写操作都是内存访问(访问高速缓存相当于主内存)操作。



保证了

- 可见性
- 有序性
- 原子性：仅能保障`写volatile`变量操作的原子性，但没有锁的排他性，所以不会引起`上下文切换`（因为变量在主内存）



### 作用

- 可见性
- 有序性
- 保障long/double型变量的`读写操作`的原子性



当有“中间结果”进行操作，比如使用共享变量count2的赋值操作

```java
private volatile int count1;
private int count2;
count1 = count2 + 1;
```

该赋值操作为`read-modify-write`操作，在执行过程可能有其他线程更新了`count2`的值，但如果`count2`是`局部变量`那么整个就是`原子性`的。

volatile仅仅保障对其修饰的变量的写操作(以及读操作)本身的原子性，如果赋值操作的是局部变量，那么也认为是`原子性`的。



- 写线程对 volatile变量的写操作会产生类似于释放锁的效果。
- 读线程对 volatile变量的读操作会产生类似于获得锁的效果。

因此, volatile具有保障有性和可见性的作用



### 存储屏障

#### 写操作

- 该操作`之前`插入一个`释放屏障`
- 在该操作`之后`插入一个`存储屏障`

![volatile写操作屏障.png](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/volatile%E6%8F%92%E5%85%A5%E5%B1%8F%E9%9A%9C.png)

其中,`释放屏障`禁止了 volatile写操作与该操作之前的仼何读、写操作进行重排序 从而保证了 volatile写操作之前的任何读、写操作会先于 volatile写操作被提交,即其他线 程看到写线程对 volatile变量的更新时,写线程在更新 volatile变量之前所执行的内存操作 的结果对于读线程必然也是可见的。这就保障了读线程对写线程在更新 volatile变量前对 共享变量所执行的更新操作的感知顺序与相应的源代码顺序一致,即保障了有序性。



volatileε虽然能够保障有序性,但是它不像锁那样具备排他性,所以并不能保障其他操作的原子性,而`只能够保障对被修饰变量的写操作的原子性`。因此, volatile变量写操作之前的操作如果涉及共享可变变量,那么竞态仍可能产生。这是因为共享变量被赋值给volatile变量的时候其他线程可能已经更新了该共享变量的值。



#### 读操作

- 该操作`之前`插入一个`加载屏障`
- 在该操作`之后`插入一个`获取屏障`

![volatile读操作屏障](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/volatile%E8%AF%BB%E6%93%8D%E4%BD%9C%E5%B1%8F%E9%9A%9C.png)



综上所述

- 写 volatile变量操作与该操作之前的任何读、写操作不会被重排序
- 读 volatile变量操作与该操作之后的任何读、写操作不会被重排序。

volatile关键字的作用体现在对修饰变量的读写操作上。



### 数组

如果被修饰的变量是个数组,那么 volatile关键字只能够对`数组引用本`身的操作(读 取数组引用和更新数组引用)起作用，而无法对`数组元素的操作(读取、更新数组元素)` 起作用。 

对数组的操作可分为读取数组元素、写数组元素和读取数组引用这几种类型 

```java
inti= anArray[0];//操作类型①:读取数组元素

aRray[1]=1;//操作类型②:写数组元素

volatile int[] anotherArray= anArray;//操作类型③:读取数组引用
```

仅能保证第一个操作读取到的引用内存地址是最新的，但不能保证操作二读取到的数组元素是最新的。



如果要保证数组的读取元素也是最新的，可以用`AtomicIntegerArray`等



### 开销

- 写：介于普通写取和临界区写之间，不用申请锁和上下文切换
- 读：介于普通写取和临界区写之间，需要从主内存中读取





### 适用场景

条件

- 对变量的写操作不依赖于当前值。
- 该变量没有包含在具有其他变量的不变式中



> volatile关键字在可见性方面仅仅是保证读线程能够读取到共享变量的相对新值。 对于`引用型变量`和`数组变量`, volatile关键字并不能保证读线程能够读取到相应对象的 字段(实例变量、静态变量)、元素的相对新值。



场景

- 状态标志：不用申请锁，且同步
- 保证可见性：其他线程能在不加锁的情况下看到变量的更新
- 替代锁：对volatile变量的写操作是原子性的，比较适合多线程共享`一个`状态变量而不是多线程共享`一组`变量。某些情形下,我们可以将多个线程共享的一组状态变量合并成一个对象,用个 volatile变量来引用该对象,从而使我们不必要使用锁。
- 简易的读写锁：在该场景中,读写锁是通过混合使用 锁和 volatile变量而实现的,其中锁用于保障共享变量写操作的原子性, volatile 变量用于保障共享变量的可见性。因此,与 Reentrantread writelock所实现的读 写锁不同的是,这种简易版读写锁仅涉及一个共享变量并且允许一个线程读取这 个共享变量时其他线程可以更新该变量(这是因为读线程并没有加锁)。因此 这种读写锁允许读线程可以读取到共享变量的非最新值。该场景的一个典型例子 是实现一个计数器,如清单3-7所示3。

```java
public class Counter{
    private volatile long count;
    public long vaule(){
        return count;
    }
    public void increment(){
        synchronized (this){
            count++;
        }
    }
}
```





## CAS

参考

> - https://blog.csdn.net/v123411739/article/details/79561458
> - https://www.jianshu.com/p/ab2c8fce878b





### 概述

`CAS（Compare-and-Swap）`，即比较并替换，是一种实现并发算法时常用到的技术，Java并发包中的很多类都使用了`CAS`技术。CAS是一种`无锁算法`，CAS有3个操作数

> - 内存值V
> - 旧的预期值A
> - 要修改的新值B



当且仅当`预期值A`和`内存值V`相同时(说明此时内存中的值没有被其他线程改变)，将`内存值V`修改为`B`，否则什么都不做。



CAS比较与交换的伪代码可以表示为：

> do{
>
> 	备份旧数据；
> 			
> 	基于旧数据构造新数据；
>
> }while(!CAS( 内存地址，备份的旧数据，新数据 ))





![CAS算法理解](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/CAS_algorithm.jpg)



参考`getAndAddInt`方法源码

```java
    public final int getAndAddInt(Object var1, long var2, int var4) {
        int var5;
        do {
            var5 = this.getIntVolatile(var1, var2);
        } while(!this.compareAndSwapInt(var1, var2, var5, var5 + var4));

        return var5;
    }
```





注：t1，t2线程是同时更新`同一变量56的值`

因为t1和t2线程都同时去访问`同一变量56`，所以他们会把**主内存的值完全拷贝一份到自己的工作内存空间**，所以t1和t2线程的预期值都为`56`。

假设t1在与t2线程竞争中线程t1能去更新变量的值，而其他线程都失败。（失败的线程并不会被挂起，而是被告知这次竞争中失败，并可以再次发起尝试）。t1线程去更新变量值改为57，然后写到内存中。此时对于t2来说，内存值变为了57，与预期值56不一致，就操作失败了（想改的值不再是原来的值）。

（上图通俗的解释是：CPU去更新一个值，但如果想改的值不再是原来的值，操作就失败，因为很明显，有其它操作先改变了这个值。）



就是指当两者进行比较时

> - 如果相等，则证明共享数据没有被修改，替换成新值，然后继续往下运行；
> - 如果不相等，说明共享数据已经被修改，放弃已经所做的操作，然后重新执行刚才的操作。



容易看出 CAS 操作是基于共享数据不会被修改的假设，采用了类似于数据库的`commit-retry` 的模式。当同步冲突出现的机会很少时，这种假设能带来较大的性能提升。





### 使用例子/源码

创建一个`AtomicInteger`类型来测试多线程多同一个变量的自增操作

```java
    public static AtomicInteger race = new AtomicInteger(0);

    public static void increase() {
        /*race++;并非原子操作，经过下面三个步骤，取值，+1，写值*/
        race.getAndIncrement();
    }
```



getAndIncrement()源码

```java
    public final int getAndIncrement() {
        return unsafe.getAndAddInt(this, valueOffset, 1);
    }
```



getAndAddInt源码

```java
    public final int getAndAddInt(Object var1, long var2, int var4) {
        int var5;
        do {
            var5 = this.getIntVolatile(var1, var2);
        } while(!this.compareAndSwapInt(var1, var2, var5, var5 + var4));

        return var5;
    }
```



可以看到最后底层调用的是`compareAndSwapInt()`，如果 CAS 失败，会一直进行尝试





### CAS缺点

CAS虽然很高效的解决了原子操作问题，但是CAS仍然存在三大问题。



::: info CAS缺点



1. **循环时间长开销很大**：CAS 通常是配合无限循环一起使用的，我们可以看到 `getAndAddInt` 方法执行时，如果 CAS 失败，会一直进行尝试。如果 CAS 长时间一直不成功，可能会给 CPU 带来很大的开销。

2. **只能保证一个变量的原子操作**：当对一个变量执行操作时，我们可以使用`循环 CAS` 的方式来保证原子操作，但是对`多个变量`操作时，CAS 目前无法直接保证操作的原子性。但是我们可以通过以下两种办法来解决：1）使用互斥锁来保证原子性；2）将多个变量封装成对象，通过 `AtomicReference` 来保证原子性。

3. **ABA问题**：CAS 的使用流程通常如下：1）首先从地址 V 读取值 A；2）根据 A 计算目标值 B；3）通过 CAS 以原子的方式将地址 V 中的值从 A 修改为 B。

   但是在第1步中读取的值是A，并且在第3步修改成功了，我们就能说它的值在第1步和第3步之间没有被其他线程改变过了吗?

   **如果在这段期间它的值曾经被改成了B，后来又被改回为A**，那CAS操作就会误认为它从来没有被改变过。这个漏洞称为CAS操作的“ABA”问题。Java并发包为了解决这个问题，提供了一个带有标记的原子引用类“`AtomicStampedReference`”，它可以通过控制`变量值的版本`来保证CAS的正确性。

   因此，在使用CAS前要考虑清楚“ABA”问题是否会影响`程序并发的正确性`，如果需要解决ABA问题，改用`传统的互斥同步`可能会比原子类更高效。



:::



### CAS在JDK中的应用

在原子类变量中，如`java.util.concurrent.atomic`中的`AtomicXXX`，都使用了这些底层的JVM支持为数字类型的引用类型提供一种高效的CAS操作，而在`java.util.concurrent`中的大多数类在实现时都直接或间接的使用了这些原子变量类。



Java 1.8中`AtomicInteger.incrementAndGet()`的实现源码为：

```java
    public final int incrementAndGet() {
        return unsafe.getAndAddInt(this, valueOffset, 1) + 1;
    }


    public final int getAndAddInt(Object var1, long var2, int var4) {
        int var5;
        do {
            var5 = this.getIntVolatile(var1, var2);
        } while(!this.compareAndSwapInt(var1, var2, var5, var5 + var4));

        return var5;
    }
```



由此可见，`AtomicInteger.incrementAndGet`的实现用了`乐观锁`技术，调用了类`sun.misc.Unsafe`库里面的 `CAS`算法，用`CPU指令`来实现`无锁自增`。所以，`AtomicInteger.incrementAndGet`的自增比用`synchronized`的锁效率倍增。



## 原子变量（Atomic）

原子变量类( Atomics)是基于CAS实现的能够保障对共享变量进行read- modify- write 更新操作的原子性和可见性的一组工具类。这里所谓的read- modify- write更新操作,是指 对共享变量的更新不是一个简单的赋值操作,而是变量的新值依赖于变量的旧值,例如自 增操作“ count-+”。由于 volatile无法保障自增操作的原子性,而原子变量类的内部实现通 常借助一个 volatile变量并保障对该变量的read- modify-wite更新操作的原子性,因此它可以 被看作`增强型的 volatile变量`。原子变量类一共有12个,可以被分为4组。

![image-20211113154800436](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/%E5%8E%9F%E5%AD%90%E5%8F%98%E9%87%8F%E7%B1%BB.png)



- 字段更新器：解决ABA问题，[参考](https://www.cnblogs.com/54chensongxia/p/12167772.html)
- 引用型：主要针对引用的对象是否是原来的



### AtomicLong常用方法

![image-20211113155240337](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/AtomicLong%E5%B8%B8%E7%94%A8%E6%96%B9%E6%B3%95.png)



### 字段更新器

原子类型字段更新器在内部通过Unsafe类的native方法保证操作的原子性。

关于原子类型字段更新器的使用需要注意以下几个方面：

- 字段必须是volatile类型的，用于保证可见性。
- 字段和字段更新器的访问类型(public/protected/private)必须一致。
- 字段只能是实例变量，不能是类变量(static)。
- 字段不能是final的变量，这样的字段不可修改。
- 如果要处理Integer和Long类型，则需要使用AtomicReferenceFieldUpdater



### set和lazySet

参考

- [lazySet](https://blog.csdn.net/szhlcy/article/details/102561224?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link)

普通Atomic下的set保证了原子性和可见性，而lazySet只保证了原子性不保证可见性，目的是在有些情况下减少内存屏障所需要优化性能，底层只是简单地对变量普通写。



set方法的设置操作在写操作的前后都加了内存屏障，因为AtomicInteger中的value是volatile修饰的，具体可以看前面的一篇博文Java并发volatile关键字的作用和汇编原理。而lazySet方法并不是直接的操作value字段，而是通过Unsafe类的putOrderedInt方法先通过初始化时候计算出的vlaue字段的偏移变量找到字段地址，然后调用本地方法进行操作的，在本地方法中只在写操作前面加了一个屏障，而后面没有加。



## 对象的发布和逸出



## Java线程同步机制总结

![image-20211113202234366](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Java-MultiThread-2/java%E7%BA%BF%E7%A8%8B%E5%90%8C%E6%AD%A5%E6%9C%BA%E5%88%B6%E6%80%BB%E7%BB%93.png)







## 线程池

### 线程池复用原理

在线程池中，线程会从 workQueue 中读取任务来执行，最小的执行单位就是 Worker，Worker 实现了 Runnable 接口，重写了 run 方法，这个 run 方法是让每个线程去执行一个循环，在这个循环代码中，去判断是否有任务待执行，若有则直接去执行这个任务，因此线程数不会增加。

