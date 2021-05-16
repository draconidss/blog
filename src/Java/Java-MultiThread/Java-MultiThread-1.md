---
icon: 
title: Java-多线程-1
author: LifeAlsoIsGG
time: 2021-05-11 21:18:29
description: 
original: true
image: 
categories: 
  - Java
tags: 
  - 学习笔记
  - Java
  - 多线程

---



## 进程 | 线程 | 任务

![线程、程序、进程](./images/Thread_program_process.png)





## 线程的创建

Java多线程，皆始于Thread。Thread是多线程的根，每一个线程的开启都始于Thread的`start()`方法

参考

> - https://www.cnblogs.com/felixzh/p/6036074.html
> - https://www.jianshu.com/p/7950ea349dbb





![线程类图](./images/Thread_Class_diagram.jpg)



一共有四种

::: info

**无返回值**，run()返回为void

- 继承Thread类创建线程（Thread本身就实现Runnable）
- 实现Runnable接口，并实例作为`Thread(Runnable r)`构造器的参数



**有返回值**，通过Callable接口，就要实现call方法，这个方法的返回值是Object

- 实现Callable接口通过FutureTask包装器来创建Thread线程
- 线程池，使用**ExecutorService**、Callable、Future实现有返回结果的多线程

:::



### 第一种：继承Thread类创建线程

​	Thread类本质上是实现了Runnable接口的一个实例，代表一个线程的实例。启动线程的唯一方法就是通过Thread类的start()实例方法。start()方法是一个native方法，它将启动一个新线程，并执行run()方法。这种方式实现多线程很简单，通过自己的类直接extend Thread，并复写run()方法，就可以启动新线程并执行自己定义的run()方法。例如：

```java
public class MyThread extends Thread {  
   @Override
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



### 第二种：实现Runnable接口

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

是较常用且最本质实现。此构造方法相当于对Runnable实例进行一层包装，在`线程t`启动时，调用Thread的run方法从而间接调用target.run()：

```java
public class Thread implements Runnable {
    /* What will be run. */
    private Runnable target;

    public void run() {
        if (target != null) {
            target.run();
        }
   }
     ...
}
```





### 第三种：实现Callable接口通过FutureTask包装器来创建Thread线程

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





### 第四种：通过线程池创建线程

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



### 继承和组合两种创建方式的不同

1. 继承方式和接口方式，后者属于组合的技术，耦合性更低
2. 后者的一个Runnable实例可以被`多个线程实例共享`
3. 继承的方式创建线程，Java虚拟机会为其分配调用栈空间、内核线程等资源，成本更加昂贵





## 线程的启动

::: tips 参考

- [线程启动原理](https://www.jianshu.com/p/8c16aeea7e1a)

:::



### 一些概念

- Java多线程，皆始于Thread。Thread是多线程的根，每一个线程的开启都始于Thread的start()方法。
- start方法调用结束并不意味着相应的线程已经开始运行，**运行时间有线程调度器决定**
- 线程属于“一次性用品”,我们不能通过重新调用一个已经运行结束的线程的`start`方法来使其重新运行。事实上, start方法也只能够被调用一次,多次调用同一个 Thread实例的start方法会导致其抛出`IllegalThreadState Exception`异常。



### 调用start和run方法区别

new ⼀个 Thread，线程进⼊了新建状态;调⽤ start() ⽅法，会启动⼀个线程并使线程进⼊了就绪状 态，当分配到时间⽚后就可以开始运⾏了。 start() 会执⾏线程的相应准备⼯作，然后⾃动执⾏ run() ⽅法的内容，这是真正的多线程⼯作。 ⽽直接执⾏ run() ⽅法，会把 run ⽅法当成⼀个 main 主线程下的普通⽅法去执⾏，并不会在某个线程中执⾏它，所以这并不是多线程⼯作。 总结： 调⽤ start ⽅法⽅可启动线程并使线程进⼊就绪状态，⽽ run ⽅法只是 thread 的⼀个普通 ⽅法调⽤，还是在主线程⾥执⾏。



### Thread.start()

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



### Thread.run()

```java
@Override
public void run() {
    if (target != null) {
        target.run();
    }
}
```

可见, Thread类的run方法中实现的逻辑是如果 target不为null,那么就调用 target. run0,否则它什么也不做。其中,实例变量 target的类型为 Runnable。如果相应的线程实例是通过构造器 Thread( Runnable target)创建的,那么 target的值为构造器中的参数值,否则 target的值为null。因此, Thread类所实现的任务处理逻辑是要么什么也不做( target为nul),
要么直接执行 target所引用的 Runnable实例所实现的任务处理逻辑。 



Thread类的run方法的这种处理逻辑决定了创建线程的两种方式:

- 一种是在 Thread子类的run方法中直接实现任务处理逻辑
- 另一种是在一个 Runnable实例中实现任务处理逻辑,该逻辑由 Thread类的run方法负责调用。



## 线程的属性

线程的属性包括线程的

- 编号(Id)：不可读写
- 名称(Name)：可读写
- 线程类别(Daemon)：可读写
- 优先级(Priority)：可读写



| 属性                | 类型    | 用途                                                         | 只读 | 说明                                                         |
| ------------------- | ------- | ------------------------------------------------------------ | ---- | ------------------------------------------------------------ |
| 编号(ID)            | long    | 用于标识不同的线程，不同的线程拥有 不同的编号                | 是   | 某个编号的线程运行结束后，该编号可能被后续创建的线程使用。不同线程  拥有的编号虽然不同，但是这种编号的唯一性只在Java虚拟机的一次运行有  效。也就是说重启个Java虚拟机(如重启Web服务器)后，某些线程的编号可能 与上次Java虚拟机运行的某个线程的编号一样，因此该属性的值不适合用作  某种唯一标识，特别是作为数据库中的唯一标识(如主键) |
| 名称    (Name)      | String  | 用于区分不同的线程，默认值与线程的 编号有关，默认值的格式为:“Thread-  线程编号”，如“Thread-0” | 否   | Java并不禁止我们将不同的线程的名称属性设置为相同的值，尽管如此，设 置线程的名称属性有助于代码调试和问题定位 |
| 线程类别  (Daemon)  | boolean | 值为tnue表示相应的线程为守护线程， 否则表示相应的线程为用户线程。该属 性的默认值与相应线程的父线程的该属 性的值相同 | 否   | 该属性必须在相应线程启动之前设置，即对setDaemon方法的调用必须在对  start方法的调用之前，否则setDaemon方法会抛出             IllegalThreadStateException异常。负责一些关键任务处理的线程不适宜设 置为守护线程 |
| 优化级   (Priority) | int     | 该属性本质上是给线程调度器的提示， 用于表示应用程序希望哪个线程能够优 先得以运行。Java定义了1~10的10个优 先级，默认值一般为5(表示普通优先级 )。对于具体的一个线程而言，其优先  级的默认值与其父线程(创建该线程的  线程)的优先级值相等。 | 否   | 一般使用默认优先级即可，不恰当地设置该属性值可能导致严重的问题(线程饥饿) |



### 优先级的设定

​	Java线程的优先级属性本质上只是一个给线程调度器的提示信息，以便于线程调度器决定优先调度哪些线程运行。 它并不能保证线程按照其优先级高低的顺序运行。另外，Java线程的优先级使用不当或者滥用则可能导致某些线程永远无法得到运行， 即产生了`线程饥钱(Thread Starvation)`。

因此，线程的优先级并不是设置得越高越好； 一般情况下使用普通优先级即可，即不必设置线程的优先级属性。



### 守护线程和用户线程（非守护线程）

​	按照线程是否会阻止Java虚拟机正常停止,我们可以将Java中的线程分为守护线程( Daemon Thread)和用户线程( User Thread,也称非守护线程)。

线程的 daemon属性用于表示相应线程是否为守护线程。用户线程会阻止Java虚拟机的正常停止,即一个Java虚拟机只有在其所有用户线程都运行结束(即 Thread runo调用未结束)的情况下才能正常停止。而守护线程则不会影响Java虚拟机的正常停止,即应用程序中有守护线程在运行也不影响Java虚拟机的正常停止。

因此,守护线程通常用于执行一些重要性不是很高的任务,例如用于监视其他线程的运行情况。

如果Java虚拟机是被强制停止的,比如在 Linux系统下使用kill命令强制终止一个Java虚拟机进程,那么即使是用户线程也无法阻止Java虚拟机的停止。





## 线程的常用方法

| 方法                               | 功能                                                         | 备注                                                         |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| static Thread    currentThread()   | 返回当前线程，即当前代码的执行线程(对象)                     | 同一段代码在不同时刻对Thread.currentThread的调用,其返回值可能不同 |
| void run()                         | 线程的任务处理逻辑                                           | 该方法是由Java虚拟机直接调用的，一般情况下应用程序不应该调用该方法 |
| void start()                       | 启动线程                                                     | 该方法的返回并不代表相应的线程已经被启动；一个Thread实例的start方法  只能够被调用一次，多次调用会抛出异常 |
| void join()                        | 等待线程运行结束                                             | 线程A调用线程B的join方法，那么线程A的运行会被暂停，直到线程B运行结束 |
| static void     yield()            | 使当前线程主动放弃其对处理器的占用，这可 能导致当前线程被暂停 | 这个方法是不可靠的，该方法被调用时当前线程可能仍然继续运行(视系统当  前的运行状况而定)  。会使线程为READY状态 |
| static void     sleep(long millis) | 使当前线程休眠(暂停运行)指定的时间                           |                                                              |
| isAlive()                          | 判断线程是否处于活动状态                                     | 线程调用start后，即处于活动状态                              |
| interrupt()                        | 中断线程                                                     |                                                              |
| wait()                             | 导致线程等待，进入堵塞状态。                                 | 该方法要在同步方法或者同步代码块中才使用的                   |
| notify()                           | 唤醒当前线程，进入运行状态                                   | 该方法要在同步方法或者同步代码块中才使用的                   |
| notifyAll()                        | 唤醒所有等待的线程。                                         | 该方法要在同步方法或者同步代码块中才使用的                   |



## 线程的层次关系



### 父线程与子线程

Java平台中的线程不是孤立的，线程与线程之间总是存在一些联系。假设线程A所执行的代码创建了线程B， 那么，习惯上我们称线程B为线程A的子线程，相应地线程A就被称为线程B的父线程。不过Java平台中并没有API用于获取一个线程的父线程， 或者获取一个线程的所有子线程。



### 父子线程的Daemon值

默认情况下，父线程是守护线程，则子线程也是守护线程，父线程是用户线程，则子线程也是用户线程。 另外，父线程在创建子线程后启动子线程之前可以调用该线程的`setDaemon`方法，将相应的线程设置为守护线程(或者用户线程)。



### 父子线程的优先级

一个线程的优先级默认值为该线程的父线程的优先级，即如果我们没有设置或者更改一个线程的优先级， 那么这个线程的优先级的值与父线程的优先级的值相等。



### 父子线程的生命周期

父线程和子线程之间的生命周期也没有必然的联系。比如父线程运行结束后，子线程可以继续运行， 子线程运行结束也不妨碍其父线程继续运行。



### 工作者线程

习惯上，我们也称某些子线程为エ作者线程(Worker Thread)或者后台线程(Background Thread)。 工作者线程通常是其父线程创建来用于专门负责某项特定任务的执行的。 例如，Java虚拟机中对内存进行回收的线程通常被称为GC工作者线程。





## 线程的生命周期状态

Java 线程在运⾏的⽣命周期中的指定时刻只可能处于下⾯ 6 种不同状态的其中⼀个状态（图源《Java 并发编程艺术》4.1.4 节）。



![线程生命周期状态](./images/thread_life_cycle_state.jpg)





线程在⽣命周期中并不是固定处于某⼀个状态⽽是随着代码的执⾏在不同状态之间切换。Java 线程状 态变迁如下图所示（图源《Java 并发编程艺术》4.1.4 节）：

![线程生命周期状态2](./images/thread_life_cycle_state_2.jpg)



由上图可以看出：线程创建之后它将处于 **NEW（新建） 状态**，**调⽤ start() ⽅法后开始运⾏**，线程 这时候处于 **READY（可运⾏） 状态**。可运⾏状态的线程获得了 **CPU 时间⽚（timeslice）**后就处于 **RUNNING（运⾏）** 状态。



### NEW

一个已创建而未启动的线程处于该状态。由于一个线程实例只能够被启动次，因此一个线程只可能有一次处于该状态。



### RUNNABLE

该状态可以被看成一个复合状态，它包括两个子状态：`READY`和`RUNNING`。 前者表示处于该状态的线程可以被`线程调度器(Scheduler)`进行调度而使之处于`RUNNING`状态； 后者表示处于该状态的线程正在运行，即相应线程对象的run方法所对应的指令正在由处理器执行。 执行`Thread.yield()`的线程，其状态可能会由`RUNNING`转换为`READY`。处于`READY`子状态的线程也被称为活跃线程。



### BLOCKED

一个线程发起一个阻塞式I/O(Blocking I/O)操作后，或者申请一个由其他线程持有的独占资源(比如锁)时，相应的线程会处于该状态， 处于Blocked状态的线程并不会占用处理器资源。当阻塞式1O操作完成后，或者线程获得了其申请的资源， 该线程的状态又可以转换为RUNNABLE。



### WAITING

一个线程执行了某些特定方法之后，就会处于这种等待其他线程执行另外一些特定操作的状态。 能够使其`执行线程`变更为WAITING状态的方法包括：Object.wait()、Thread.join()和LockSupport.park(Object)。 能够使相应线程从WAITING变更为RUNNABLE的对应方法包括：Object.notify()、notifyAll()和LockSupport.unpark(Objec)



### TIMED WAITING

该状态和WAITING类似，差别在于处于该状态的线程并非无限制地等待其他线程执行特定操作，而是处于带有时间限制的等待状态。 当其他线程没有在指定时间内执行该线程所期望的特定操作时，该线程的状态自动转换为RUNNABLE。



### TERMINATED

已经执行结束的线程处于该状态。由于一个线程实例只能够被启动一次，因此一个线程也只可能有一次处于该状态。 Thread.run()正常返回或者由于抛出异常而提前终止都会导致相应线程处于该状态。



当线程执⾏ wait() ⽅法之后，线程进⼊ WAITING（等待） 状态。进⼊等待状态的线程需要依靠其他 线程的通知才能够返回到运⾏状态，⽽ TIME_WAITING(超时等待) 状态相当于在等待状态的基础上增加 了超时限制，⽐如通过 sleep（long millis） ⽅法或 wait（long millis） ⽅法可以将 Java 线程置于 TIMED WAITING 状态。当超时时间到达后 Java 线程将会返回到 RUNNABLE 状态。当线程调 ⽤同步⽅法时，在没有获取到锁的情况下，线程将会进⼊到 BLOCKED（阻塞） 状态。线程在执⾏ Runnable 的 run() ⽅法之后将会进⼊到 TERMINATED（终⽌） 状态。





## 多线程编程



### 好处坏处

好处

1. 提高系统的吞吐率
2. 提高响应性
3. 充分利用多核处理器资源
4. 最小化对系统资源的使用
5. 简化程序的结构



坏处

1. 线程安全
2. 线程活性
   1. 死锁
   2. 活锁：一个线程一直在尝试某个操作但就是没有进展
3. 上下文切换
   1. 这是属于额外的资源消耗
4. 可靠性



