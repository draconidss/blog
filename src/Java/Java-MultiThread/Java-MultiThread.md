---
icon: 
title: Java-多线程并发
author: LifeAlsoIsGG
time: 2020-08-23 20:36:25
description: 
original: true
image: 
categories: 
  - Java
tags: 
  - 学习笔记
  - Java
  - Java-多线程

---



## 1. 线程、程序、进程的基本概念

![线程、程序、进程](./images/Java-MultiThread-1/Thread_program_process.png)



## 2. 使用多线程可能带来什么问题?

并发编程的⽬的就是为了能提⾼程序的执⾏效率提⾼程序运⾏速度，但是并发编程并不总是能提⾼程序 运⾏速度的，⽽且并发编程可能会遇到很多问题，⽐如：**内存泄漏、上下⽂切换、死锁还有受限于硬件 和软件的资源闲置问题**。





## 3. Java多线程的四种实现方式&启动原理

参考

> - https://www.cnblogs.com/felixzh/p/6036074.html
> - https://www.jianshu.com/p/7950ea349dbb



![线程类图](./images/Java-MultiThread-1/Thread_class_diagram.jpg)





**无返回值**，run()返回为void

- 继承Thread类：**重写run()方法**
- 实现Runnable接口：如果自己的类已经extends另一个类，就无法直接**extends Thread**，此时，可以实现一个Runnable接口，**重写run方法**，实现Runnable接口的实现类的实例对象作为Thread构造函数的target



**有返回值**，通过Callable接口，就要实现call方法，这个方法的返回值是Object

- 实现**Callable**接口通过**FutureTask**包装器来创建Thread线程，调用Thread为
- 线程池，使用**ExecutorService**、Callable、Future实现有返回结果的多线程

### 3.1 线程启动原理



参考

> - https://www.jianshu.com/p/8c16aeea7e1a
> - https://www.cnblogs.com/xuyuanpeng/p/11050394.html



Java多线程，皆始于Thread。Thread是多线程的根，每一个线程的开启都始于Thread的`start()`方法



#### 3.1.1 start()方法源码

```java
 /**
     * Causes this thread to begin execution; the Java Virtual Machine
     * calls the <code>run</code> method of this thread.
     * 
     * 1、start方法将导致this thread开始执行。由JVM调用this thread的run方法。
     * 
     * The result is that two threads are running concurrently: the
     * current thread (which returns from the call to the
     * <code>start</code> method) and the other thread (which executes its
     * <code>run</code> method).
     * 
     * 2、结果是 调用start方法的当前线程 和 执行run方法的另一个线程 同时运行。
     * 
     * It is never legal to start a thread more than once.
     * In particular, a thread may not be restarted once it has completed
     * execution.
     *
     * 3、多次启动线程永远不合法。 特别是，线程一旦完成执行就不会重新启动。
     * 
     * @exception  IllegalThreadStateException  if the thread was already started.
     * 如果线程已启动，则抛出异常。
     * @see        #run()
     * @see        #stop()
     */
    public synchronized void start() {
        /**
         * This method is not invoked for the main method thread or "system"
         * group threads created/set up by the VM. Any new functionality added
         * to this method in the future may have to also be added to the VM.
         * 
         * 4、对于由VM创建/设置的main方法线程或“system”组线程，不会调用此方法。 
         *    未来添加到此方法的任何新功能可能也必须添加到VM中。
         * 
         * A zero status value corresponds to state "NEW".
         * 5、status=0 代表是 status 是 "NEW"。
         */
        if (threadStatus != 0)
            throw new IllegalThreadStateException();

        /* Notify the group that this thread is about to be started
         * so that it can be added to the group's list of threads
         * and the group's unstarted count can be decremented. 
         * 
         * 6、通知组该线程即将启动，以便将其添加到线程组的列表中，
         *    并且减少线程组的未启动线程数递减。
         * 
         * */
        group.add(this);

        boolean started = false;
        try {
            //7、调用native方法，底层开启异步线程，并调用run方法。
            start0();
            started = true;
        } finally {
            try {
                if (!started) {
                    group.threadStartFailed(this);
                }
            } catch (Throwable ignore) {
                /* do nothing. If start0 threw a Throwable then it will be passed up the call stack 
                 * 8、忽略异常。 如果start0抛出一个Throwable，它将被传递给调用堆栈。
                 */
            }
        }
    }

 //native方法，JVM创建并启动线程，并调用run方法
 private native void start0();
```



> - `start`方法用`synchronized`修饰，为`同步方法`；
> - 虽然为同步方法，但不能避免多次调用问题，用`threadStatus`来记录线程状态，如果线程被多次start会抛出异常；threadStatus的状态由JVM控制。
> - 使用`Runnable`时，主线程无法捕获子线程中的异常状态。线程的异常，应在线程内部解决。



#### 3.1.2 run()方法源码

```java
/**
     * If this thread was constructed using a separate
     * <code>Runnable</code> run object, then that
     * <code>Runnable</code> object's <code>run</code> method is called;
     * otherwise, this method does nothing and returns.
     * <p>
     * Subclasses of <code>Thread</code> should override this method.
     *
     * @see     #start()
     * @see     #stop()
     * @see     #Thread(ThreadGroup, Runnable, String)
     */
    @Override
    public void run() {
        if (target != null) {
            target.run();
        }
    }
```

run方法就很简单了，就是回调了Runable的run()接口。导致Thread写的@Overwrite void run() 方法直接是在主线程执行，导致阻塞了主线程。

到此我们就知道了，start会使重写的run方法被虚拟机调用，是在子线程中执行的run方法。而直接调用线程的run方法，他是内部回调了run接口，导致直接执行了Runable.run的重写内容。相当于直接在主线程中执行。



### 3.2 为什么我们调⽤ start() ⽅法时会执⾏ run() ⽅法，为什么我们不能直接调⽤ run() ⽅法？

new ⼀个 Thread，线程进⼊了新建状态;调⽤ start() ⽅法，会启动⼀个线程并使线程进⼊了就绪状 态，当分配到时间⽚后就可以开始运⾏了。 start() 会执⾏线程的相应准备⼯作，然后⾃动执⾏ run() ⽅法的内容，这是真正的多线程⼯作。 ⽽直接执⾏ run() ⽅法，会把 run ⽅法当成⼀个 main 主线程下的普通⽅法去执⾏，并不会在某个线程中执⾏它，所以这并不是多线程⼯作。 总结： 调⽤ start ⽅法⽅可启动线程并使线程进⼊就绪状态，⽽ run ⽅法只是 thread 的⼀个普通 ⽅法调⽤，还是在主线程⾥执⾏。





### 3.3 继承Thread类创建线程

Thread类本质上是实现了Runnable接口的一个实例，代表一个线程的实例。启动线程的唯一方法就是通过Thread类的start()实例方法。start()方法是一个native方法，它将启动一个新线程，并执行run()方法。这种方式实现多线程很简单，通过自己的类直接extend Thread，并复写run()方法，就可以启动新线程并执行自己定义的run()方法。例如：

```java
public class MyThread extends Thread {  
　　public void run() {  
　　 System.out.println("MyThread.run()");  
　　}  
}  
 
MyThread myThread1 = new MyThread();  
MyThread myThread2 = new MyThread();  
myThread1.start();  
myThread2.start();
```

这种实现方式是显示的继承了Thread，但从类图中我们可以看到，Thread类本身就继承自Runnable，所以继承Thread的本质依然是实现Runnable接口定义的run方法。

需要注意的是继承Thread方式，target对象为null，重写了run方法，导致方式1中的Thread原生的run方法失效，因此并不会调用到target.run()的逻辑，而是直接调用子类重写的run方法。

因为java是单根继承，此方式一般不常用。





### 3.4 实现Runnable接口

实现run方法，接口的实现类的实例作为**Thread**的**target**作为参数传入带参的**Thread**构造函数，通过调用**start()**方法启动线程。适用于已经有继承的父类无法继承Thread类的时候

```java
public class ThreadDemo02 {
 
    public static void main(String[] args){ 
        System.out.println(Thread.currentThread().getName());
        Thread t1 = new Thread(new MyThread());
        t1.start(); 
    }
}
 
class MyThread implements Runnable{
    @Override
    public void run() {
        // TODO Auto-generated method stub
        System.out.println(Thread.currentThread().getName()+"-->我是通过实现接口的线程实现方式！");
    }   
}
```



### 3.5 实现Callable接口通过FutureTask包装器来创建Thread线程

- 创建Callable接口的实现类 ，并实现Call方法 
- 创建Callable实现类的实现，使用FutureTask类包装Callable对象，该FutureTask对象封装了Callable对象的Call方法的返回值 
- 使用FutureTask对象作为Thread对象的target创建并启动线程 
- 调用FutureTask对象的get()来获取子线程执行结束的返回值

```java
public class DemoCallable implements Callable<String>{
    @Override
    public String call() throws Exception {
        // TODO Auto-generated method stub
        return null;
    }
    
    public static void main(String[] args) throws Exception {
        DemoCallable c = new DemoCallable();
        FutureTask<String> future = new FutureTask<>(c); 
        Thread t = new Thread(future);
        t.start();
        ...
        String result = future.get(); //同步获取返回结果
        System.out.println(result);
    }
}
```

这个方法里，明明没有看到run方法，没有看到Runnable，为什么说本质也是实现Runnable接口呢？

回看开篇的类图，`FutureTask`实现了`RunnableFuture`，`RunnableFuture`则实现了`Runnable`和`Future`两个接口。因此构造Thread时，`FutureTask`还是被转型为`Runnable`使用。**因此其本质还是实现Runnable接口。**





### 3.6 通过线程池创建线程

ExecutorService、Callable都是属于Executor框架。返回结果的线程是在JDK1.5中引入的新特征，还有Future接口也是属于这个框架，有了这种特征得到返回值就很方便了。 
通过分析可以知道，他同样也是实现了Callable接口，实现了Call方法，所以有返回值。这也就是正好符合了前面所说的两种分类

执行Callable任务后，可以获取一个Future的对象，在该对象上调用get就可以获取到Callable任务返回的Object了。get方法是阻塞的，即：线程无返回结果，get方法会一直等待。

```java
public class ThreadDemo05{
 
    private static int POOL_NUM = 10;     //线程池数量
 
    /**
     * @param args
     * @throws InterruptedException 
     */
    public static void main(String[] args) throws InterruptedException {
        // TODO Auto-generated method stub
        ExecutorService executorService = Executors.newFixedThreadPool(5);  
        for(int i = 0; i<POOL_NUM; i++)  
        {  
            RunnableThread thread = new RunnableThread();
 
            //Thread.sleep(1000);
            executorService.execute(thread);  
        }
        //关闭线程池
        executorService.shutdown(); 
    }   
 
}
 
class RunnableThread implements Runnable  
{     
    @Override
    public void run()  
    {  
        System.out.println("通过线程池方式创建的线程：" + Thread.currentThread().getName() + " ");  
 
    }  
}  
```







## 4. 线程的⽣命周期和状态?

Java 线程在运⾏的⽣命周期中的指定时刻只可能处于下⾯ 6 种不同状态的其中⼀个状态（图源《Java 并发编程艺术》4.1.4 节）。



![线程生命周期状态](./images/Java-MultiThread-1/Thread_life_cycle_state.jpg)



线程在⽣命周期中并不是固定处于某⼀个状态⽽是随着代码的执⾏在不同状态之间切换。Java 线程状 态变迁如下图所示（图源《Java 并发编程艺术》4.1.4 节）：

![线程生命周期状态2](./images/Java-MultiThread-1/Thread_life_cycle_state_2.jpg)



由上图可以看出：线程创建之后它将处于 **NEW（新建） 状态**，**调⽤ start() ⽅法后开始运⾏**，线程 这时候处于 **READY（可运⾏） 状态**。可运⾏状态的线程获得了 **CPU 时间⽚（timeslice）**后就处于 **RUNNING（运⾏）** 状态。



当线程执⾏ wait() ⽅法之后，线程进⼊ WAITING（等待） 状态。进⼊等待状态的线程需要依靠其他 线程的通知才能够返回到运⾏状态，⽽ TIME_WAITING(超时等待) 状态相当于在等待状态的基础上增加 了超时限制，⽐如通过 sleep（long millis） ⽅法或 wait（long millis） ⽅法可以将 Java 线程置于 TIMED WAITING 状态。当超时时间到达后 Java 线程将会返回到 RUNNABLE 状态。当线程调 ⽤同步⽅法时，在没有获取到锁的情况下，线程将会进⼊到 BLOCKED（阻塞） 状态。线程在执⾏ Runnable 的 run() ⽅法之后将会进⼊到 TERMINATED（终⽌） 状态。



## 5. 什么是上下文切换?



- 多线程编程中⼀般线程的个数都⼤于 CPU 核⼼的个数，⽽⼀个 CPU 核⼼在任意时刻只能被⼀个线程使 ⽤，为了让这些线程都能得到有效执⾏，CPU 采取的策略是为每个线程分配时间⽚并轮转的形式。当⼀ 个线程的时间⽚⽤完的时候就会重新处于就绪状态让给其他线程使⽤，这个过程就属于⼀次上下⽂切 换。 
- 概括来说就是：当前任务在执⾏完 CPU 时间⽚切换到另⼀个任务之前会先保存⾃⼰的状态，以便下次 再切换回这个任务时，可以再加载这个任务的状态。**任务从保存到再加载的过程就是⼀次上下⽂切换**。 
- 上下⽂切换通常是计算密集型的。也就是说，它需要相当可观的处理器时间，在每秒⼏⼗上百次的切换 中，每次切换都需要纳秒量级的时间。所以，上下⽂切换对系统来说意味着消耗⼤量的 CPU 时间，事 实上，可能是操作系统中时间消耗最⼤的操作。 
- Linux 相⽐与其他操作系统（包括其他类 Unix 系统）有很多的优点，其中有⼀项就是，其上下⽂切换 和模式切换的时间消耗⾮常少。





## 6. 什么是线程死锁?如何避免死锁?



线程死锁描述的是这样⼀种情况：多个线程同时被阻塞，它们中的⼀个或者全部都在等待某个资源被释 放。由于线程被⽆限期地阻塞，因此程序不可能正常终⽌。 如下图所示，线程 A 持有资源 2，线程 B 持有资源 1，他们同时都想申请对⽅的资源，所以这两个线 程就会互相等待⽽进⼊死锁状态。



### 6.1 产⽣死锁必须具备以下四个条件



- **互斥条件：**该资源任意⼀个时刻只由⼀个线程占⽤。 
- **请求与保持条件：**⼀个进程因请求资源⽽阻塞时，对已获得的资源保持不放。
- **不剥夺条件：**线程已获得的资源在末使⽤完之前不能被其他线程强⾏剥夺，只有⾃⼰使⽤完毕后 才释放资源。 
- **循环等待条件：**若⼲进程之间形成⼀种头尾相接的循环等待资源关系。



### 6.2 如何避免线程死锁?

只要破坏产⽣死锁的四个条件中的其中⼀个就可以了



1. **破坏互斥条件 ：**这个条件我们没有办法破坏，因为我们⽤锁本来就是想让他们互斥的（临界资 源需要互斥访问）。 
2. **破坏请求与保持条件 ：**⼀次性申请所有的资源。
3. **破坏不剥夺条件 ：**占⽤部分资源的线程进⼀步申请其他资源时，如果申请不到，可以主动释放 它占有的资源。 
4. **破坏循环等待条件 ：**靠按序申请资源来预防。按某⼀顺序申请资源，释放资源则反序释放。破 坏循环等待条件。





## 7. 说说 sleep() ⽅法和 wait() ⽅法区别和共同点?



- 两者最主要的区别在于：**sleep ⽅法没有释放锁，⽽ wait ⽅法释放了锁 。** 
- 两者都可以暂停线程的执⾏。 Wait 通常被⽤于线程间交互/通信，sleep 通常被⽤于暂停执⾏。 
- wait() ⽅法被调⽤后，线程不会⾃动苏醒，需要别的线程调⽤同⼀个对象上的 notify() 或者 notifyAll() ⽅法。sleep() ⽅法执⾏完成后，线程会⾃动苏醒。或者可以使⽤ wait(long timeout)超时后线程会⾃动苏醒。



### 7.1 详细

1. 原理不同，**sleep（）方法是Thread类的静态方法**，是线程用来控制自身流程的，它会使此线程暂停执行一段时间，而把执行机会让给其他线程，等到计时时间一到，此线程会自动“苏醒”。例如，当线程执行报时功能时，每一秒钟打印一个时间，那么此时就需要在打印方法前面加上一个Sleep()方法，以便让自己每隔1s执行一次，该过程如同闹钟一样，**而wait（）方法是object类的方法，用于线程间的通信**，这个方法会使当前拥有该对象锁的进程等待，直到其它线程调用notify()方法（或notifyALL方法）时才“醒过来”，不过，开发人员也可以给它指定一个时间，自动“醒”过来。与wait()方法配套的方法还有notify（）方法和notifyALL()方法。
2. 对锁的处理机制不同，由于sleep（）方法的主要作用是让线程暂停执行一段时间，时间一到则自动恢复，不涉及线程间的通信，因此，调用sleep（）方法并不会释放锁， 而wait()方法则不同，当调用wan()方法后，线程会释放掉它所占用的锁，从而使线程所在对象中的其他synchronized数据可被别的线程使用。举个简单的例子，如果小明拿遥控器的期间，可以用自己的sleep()方法每隔10min调一次频道，而在这10min里，遥控器还在他的手里。
3. 使用的区域不同。由于wait()方法的特殊意义，因此，它必须放在同步控制方法或同步语句块中使用，而 sleep（）方法则可以放在任何地方使用。
   sleep（）方法必须捕获异常，而wait（）、notify（）以及notifyALL()不需要捕获异常，在sleep()的过程中，有可能被其他对象调用它的interrupt（），产生interruptException异常。
   由于sleep不会释放“锁标志”，容易导致死锁问题的发生，因此，一般情况下，不推荐使用sleep（）方法，而推荐使用wait（）方法。



new ⼀个 Thread，线程进⼊了新建状态;调⽤ start() ⽅法，会启动⼀个线程并使线程进⼊了就绪状 态，当分配到时间⽚后就可以开始运⾏了。 start() 会执⾏线程的相应准备⼯作，然后⾃动执⾏ run() ⽅法的内容，这是真正的多线程⼯作。 ⽽直接执⾏ run() ⽅法，会把 run ⽅法当成⼀个 main 线程下的普通⽅法去执⾏，并不会在某个线程中执⾏它，所以这并不是多线程⼯作。 总结： 调⽤ start ⽅法⽅可启动线程并使线程进⼊就绪状态，⽽ run ⽅法只是 thread 的⼀个普通 ⽅法调⽤，还是在主线程⾥执⾏。











## 9. synchronized 关键字

​	synchronized关键字解决的是多个线程之间访问资源的同步性，synchronized关键字可以保证被它修饰 的⽅法或者代码块在任意时刻只能有⼀个线程执⾏。另外，在 Java 早期版本中，synchronized属于重量级锁，效率低下，**因为监视器锁（monitor）是依 赖于底层的操作系统的 Mutex Lock 来实现的，Java 的线程是映射到操作系统的原⽣线程之上的**。如 果要挂起或者唤醒⼀个线程，都需要操作系统帮忙完成，⽽操作系统实现线程之间的切换时需要从⽤户 态转换到内核态，这个状态之间的转换需要相对⽐较⻓的时间，时间成本相对较⾼，这也是为什么早期 的 synchronized 效率低的原因。庆幸的是在 Java 6 之后 Java 官⽅对从 JVM 层⾯对synchronized 较⼤优化，所以现在的 synchronized 锁效率也优化得很不错了。JDK1.6对锁的实现引⼊了⼤量的优化，如**⾃旋锁、适应性⾃旋锁、锁消除、锁粗化、偏向锁、轻量级锁**等技术来减少锁操作的开销。



### 9.1 三种使用方式

- **修饰实例方法，**作用于当前对象实例加锁，进入同步代码前要获得当前对象实例的锁
- **修饰静态方法，**作用于当前类对象加锁，进入同步代码前要获得当前类对象的锁 。也就是给当前类加锁，会作
  用于类的所有对象实例，因为静态成员不属于任何一个实例对象，是类成员（ static 表明这是该类的一个静态
  资源，不管new了多少个对象，只有一份，所以对该类的所有对象都加了锁）。所以如果一个线程A调用一个实
  例对象的非静态 synchronized 方法，而线程B需要调用这个实例对象所属类的静态 synchronized 方法，是允
  许的，不会发生互斥现象，因为访问静态 synchronized 方法占用的锁是当前类的锁，而访问非静态
  synchronized 方法占用的锁是当前实例对象锁。
- **修饰代码块，**指定加锁对象，对给定对象加锁，进入同步代码库前要获得给定对象的锁。 和 synchronized 方
  法一样，synchronized(this)代码块也是锁定当前对象的。synchronized 关键字加到 static 静态方法和
  synchronized(class)代码块上都是是给 Class 类上锁。这里再提一下：synchronized关键字加到非 static 静态
  方法上是给对象实例上锁。



### 9.2 synchronized底层实现



#### 9.2.1 synchronized 同步语句块的情况

```java
public class SynchronizedDemo {
 public void method() {
 synchronized (this) {
 System.out.println("synchronized 代码块");
 }
 }
}
```



![synchronized反编译](./images/Java-MultiThread-1/synchronized_decompilation.jpg)



synchronized 同步语句块的实现使⽤的是 **monitorenter** 和 **monitorexit** 指令，其中 **monitorenter** 指令指向同步代码块的开始位置，**monitorexit** 指令则指明同步代码块的结束位置。 当执⾏ monitorenter 指令时，线程试图获取锁也就是获取 monitor(**monitor对象存在于每个Java对象的对象 头中，synchronized 锁便是通过这种⽅式获取锁的，也是为什么Java中任意对象可以作为锁的原因**) 的持有权。当计数器为0则可以成功获取，获取后将锁计数器设为1也就是加1。相应的在执⾏ monitorexit 指令后，将锁计数器设为0，表明锁被释放。如果获取对象锁失败，那当前线程就要阻塞 等待，直到锁被另外⼀个线程释放为⽌。



#### 9.2.2 synchronized 修饰⽅法的的情况

```java
public class SynchronizedDemo2 {
 public synchronized void method() {
 System.out.println("synchronized ⽅法");
 }
}
```

![synchronized方法反编译](./images/Java-MultiThread-1/synchronized_method_decompilation.jpg)



		synchronized 修饰的⽅法并没有 monitorenter 指令和 monitorexit 指令，取得代之的确实是 ACC_SYNCHRONIZED 标识，该标识指明了该⽅法是⼀个同步⽅法，**JVM 通过该 ACC_SYNCHRONIZED 访问 标志来辨别⼀个⽅法是否声明为同步⽅法**，从⽽执⾏相应的同步调⽤。







### 9.3 说说 JDK1.6 之后的synchronized 关键字底层做了哪些优化，可以详细介绍⼀下这些优化吗

参考

> - https://gitee.com/SnailClimb/JavaGuide/blob/master/docs/java/Multithread/synchronized.md



		JDK1.6 对锁的实现引入了大量的优化，如**偏向锁、轻量级锁、自旋锁、适应性自旋锁、锁消除、锁粗化**等技术来减少锁操作的开销。

锁主要存在四中状态，依次是：

- **无锁状态**
- **偏向锁状态**
- **轻量级锁状态**
- **重量级锁状态**

他们会随着竞争的激烈而逐渐升级。注意锁可以升级不可降级，这种策略是为了提高获得锁和释放锁的效率。



#### ①偏向锁

**引入偏向锁的目的和引入轻量级锁的目的很像，他们都是为了没有多线程竞争的前提下，减少传统的重量级锁使用操作系统互斥量产生的性能消耗。但是不同是：轻量级锁在无竞争的情况下使用 CAS 操作去代替使用互斥量。而偏向锁在无竞争的情况下会把整个同步都消除掉**。

偏向锁的“偏”就是偏心的偏，它的意思是会偏向于第一个获得它的线程，如果在接下来的执行中，该锁没有被其他线程获取，那么持有偏向锁的线程就不需要进行同步！关于偏向锁的原理可以查看《深入理解Java虚拟机：JVM高级特性与最佳实践》第二版的13章第三节锁优化。

但是对于锁竞争比较激烈的场合，偏向锁就失效了，因为这样场合极有可能每次申请锁的线程都是不相同的，因此这种场合下不应该使用偏向锁，否则会得不偿失，需要注意的是，偏向锁失败后，并不会立即膨胀为重量级锁，而是先升级为轻量级锁。



#### ② 轻量级锁

倘若偏向锁失败，虚拟机并不会立即升级为重量级锁，它还会尝试使用一种称为轻量级锁的优化手段(1.6之后加入的)。**轻量级锁不是为了代替重量级锁，它的本意是在没有多线程竞争的前提下，减少传统的重量级锁使用操作系统互斥量产生的性能消耗，因为使用轻量级锁时，不需要申请互斥量。另外，轻量级锁的加锁和解锁都用到了CAS操作。** 关于轻量级锁的加锁和解锁的原理可以查看《深入理解Java虚拟机：JVM高级特性与最佳实践》第二版的13章第三节锁优化。

**轻量级锁能够提升程序同步性能的依据是“对于绝大部分锁，在整个同步周期内都是不存在竞争的”，这是一个经验数据。如果没有竞争，轻量级锁使用 CAS 操作避免了使用互斥操作的开销。但如果存在锁竞争，除了互斥量开销外，还会额外发生CAS操作，因此在有锁竞争的情况下，轻量级锁比传统的重量级锁更慢！如果锁竞争激烈，那么轻量级将很快膨胀为重量级锁！**



#### ③ 自旋锁和自适应自旋

轻量级锁失败后，虚拟机为了避免线程真实地在操作系统层面挂起，还会进行一项称为自旋锁的优化手段。

互斥同步对性能最大的影响就是阻塞的实现，因为挂起线程/恢复线程的操作都需要转入内核态中完成（用户态转换到内核态会耗费时间）。

**一般线程持有锁的时间都不是太长，所以仅仅为了这一点时间去挂起线程/恢复线程是得不偿失的。** 所以，虚拟机的开发团队就这样去考虑：“我们能不能让后面来的请求获取锁的线程等待一会而不被挂起呢？看看持有锁的线程是否很快就会释放锁”。**为了让一个线程等待，我们只需要让线程执行一个忙循环（自旋），这项技术就叫做自旋**。

百度百科对自旋锁的解释：

> 何谓自旋锁？它是为实现保护共享资源而提出一种锁机制。其实，自旋锁与互斥锁比较类似，它们都是为了解决对某项资源的互斥使用。无论是互斥锁，还是自旋锁，在任何时刻，最多只能有一个保持者，也就说，在任何时刻最多只能有一个执行单元获得锁。但是两者在调度机制上略有不同。对于互斥锁，如果资源已经被占用，资源申请者只能进入睡眠状态。但是自旋锁不会引起调用者睡眠，如果自旋锁已经被别的执行单元保持，调用者就一直循环在那里看是否该自旋锁的保持者已经释放了锁，"自旋"一词就是因此而得名。

自旋锁在 JDK1.6 之前其实就已经引入了，不过是默认关闭的，需要通过`--XX:+UseSpinning`参数来开启。JDK1.6及1.6之后，就改为默认开启的了。需要注意的是：自旋等待不能完全替代阻塞，因为它还是要占用处理器时间。如果锁被占用的时间短，那么效果当然就很好了！反之，相反！自旋等待的时间必须要有限度。如果自旋超过了限定次数任然没有获得锁，就应该挂起线程。**自旋次数的默认值是10次，用户可以修改`--XX:PreBlockSpin`来更改**。

另外,**在 JDK1.6 中引入了自适应的自旋锁。自适应的自旋锁带来的改进就是：自旋的时间不在固定了，而是和前一次同一个锁上的自旋时间以及锁的拥有者的状态来决定，虚拟机变得越来越“聪明”了**。



#### ④ 锁消除

锁消除理解起来很简单，它指的就是虚拟机即使编译器在运行时，如果检测到那些共享数据不可能存在竞争，那么就执行锁消除。锁消除可以节省毫无意义的请求锁的时间。



#### ⑤ 锁粗化

原则上，我们在编写代码的时候，总是推荐将同步块的作用范围限制得尽量小，——直在共享数据的实际作用域才进行同步，这样是为了使得需要同步的操作数量尽可能变小，如果存在锁竞争，那等待线程也能尽快拿到锁。

大部分情况下，上面的原则都是没有问题的，但是如果一系列的连续操作都对同一个对象反复加锁和解锁，那么会带来很多不必要的性能消耗。



### 9.4 Synchronized 和 ReenTrantLock 的对比



#### ① 两者都是可重入锁

两者都是可重入锁。“可重入锁”概念是：自己可以再次获取自己的内部锁。比如一个线程获得了某个对象的锁，此时这个对象锁还没有释放，当其再次想要获取这个对象的锁的时候还是可以获取的，如果不可锁重入的话，就会造成死锁。同一个线程每次获取锁，锁的计数器都自增1，所以要等到锁的计数器下降为0时才能释放锁。



#### ② synchronized 依赖于 JVM 而 ReenTrantLock 依赖于 API

synchronized 是依赖于 JVM 实现的，前面我们也讲到了 虚拟机团队在 JDK1.6 为 synchronized 关键字进行了很多优化，但是这些优化都是在虚拟机层面实现的，并没有直接暴露给我们。ReenTrantLock 是 JDK 层面实现的（也就是 API 层面，需要 lock() 和 unlock 方法配合 try/finally 语句块来完成），所以我们可以通过查看它的源代码，来看它是如何实现的。



#### ③ ReenTrantLock 比 synchronized 增加了一些高级功能

相比synchronized，ReenTrantLock增加了一些高级功能。主要来说主要有三点：

> 1. 等待可中断
> 2. 可指定公平和非公平锁
> 3. 可实现选择性通知（锁可以绑定多个条件）



::: info ReenTrantLock 比 synchronized 增加了一些高级功能



- **ReenTrantLock提供了一种能够中断等待锁的线程的机制**，通过**lock.lockInterruptibly()**来实现这个机制。也就是说正在等待的线程可以选择放弃等待，改为处理其他事情。
- **ReenTrantLock可以指定是公平锁还是非公平锁。而synchronized只能是非公平锁。所谓的公平锁就是先等待的线程先获得锁。** ReenTrantLock默认情况是非公平的，可以通过 ReenTrantLock类的`ReentrantLock(boolean fair)`构造方法来制定是否是公平的。
- **synchronized关键字与wait()和notify/notifyAll()方法相结合可以实现等待/通知机制**，ReentrantLock类当然也可以实现，但是需要借助于Condition接口与newCondition() 方法。Condition是JDK1.5之后才有的，它具有很好的灵活性，比如可以实现多路通知功能也就是在一个Lock对象中可以创建多个Condition实例（即对象监视器），**线程对象可以注册在指定的Condition中，从而可以有选择性的进行线程通知，在调度线程上更加灵活。 在使用notify/notifyAll()方法进行通知时，被通知的线程是由 JVM 选择的，用ReentrantLock类结合Condition实例可以实现“选择性通知”** ，这个功能非常重要，而且是Condition接口默认提供的。而synchronized关键字就相当于整个Lock对象中只有一个Condition实例，所有的线程都注册在它一个身上。如果执行notifyAll()方法的话就会通知所有处于等待状态的线程这样会造成很大的效率问题，而Condition实例的signalAll()方法 只会唤醒注册在该Condition实例中的所有等待线程。

如果你想使用上述功能，那么选择ReenTrantLock是一个不错的选择。

**synchronized 异常就会释放锁，而 ReenTrantLock 异常需要在 finally 里 unlock**



:::



#### ④ 性能已不是选择标准

在JDK1.6之前，synchronized 的性能是比 ReenTrantLock 差很多。**具体表示为：synchronized 关键字吞吐量随线程数的增加，下降得非常严重。而ReenTrantLock 基本保持一个比较稳定的水平**。我觉得这也侧面反映了， synchronized 关键字还有非常大的优化余地。后续的技术发展也证明了这一点，我们上面也讲了在 JDK1.6 之后 JVM 团队对 synchronized 关键字做了很多优化。**JDK1.6 之后，synchronized 和 ReenTrantLock 的性能基本是持平了。所以网上那些说因为性能才选择 ReenTrantLock 的文章都是错的！JDK1.6之后，性能已经不是选择synchronized和ReenTrantLock的影响因素了！而且虚拟机在未来的性能改进中会更偏向于原生的synchronized，所以还是提倡在synchronized能满足你的需求的情况下，优先考虑使用synchronized关键字来进行同步！优化后的synchronized和ReenTrantLock一样，在很多地方都是用到了CAS操作**。





> - 