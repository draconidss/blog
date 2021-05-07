---
title: Redis理论学习笔记
author: LifeAlsoIsGG
time: 2020-10-12 20:45:07
original: true
categories: 
  - 数据库
  - Redis
tags: 
  - 数据库
  - Redis
---




## 1. 参考

> - [Redis 命令参考 — Redis 命令参考 (redisfans.com)](http://doc.redisfans.com/)
> - [redis 总结——重构版](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247484858&idx=1&sn=8e222ea6115e0b69cac91af14d2caf36&chksm=cea24a71f9d5c367148dccec3d5ddecf5ecd8ea096b5c5ec32f22080e66ac3c343e99151c9e0&token=1082669959&lang=zh_CN&scene=21#wechat_redirect)
> - https://www.cnblogs.com/jasontec/p/9699242.html
> - https://github.com/Snailclimb/JavaGuide
> - [Redis中文文档](http://redisdoc.com/)
> - [【狂神说Java】Redis最新超详细版教程通俗易懂](https://www.bilibili.com/video/BV1S54y1R7SB)





## 2. 简介

Redis的全称是`Remote Dictionary Server`，即`远程字典服务`。官方原话如下：

Redis是一个开源(BSD许可)的,内存中的数据结构存储系统,它可以用作`数据库`、`缓存`和`消息中间件MQ`。它支持多种类型的数据结构,如字符串( strings),散列( hashes),列表( lists),集合(sets),有序集合( sorted sets)与范围查询,bitmaps, hyperloglogs和地理空间( geospatial)索引半径查询。 Redis内置了复制( replication),LUA脚本(Luascripting),LRU驱动事件( LRU eviction),事务( transactions)和不同级别的磁盘持久化( persistence),并通过Reds哨兵( Sentinel)和自动分区( Cluster)提供高可用性( high availability)。



### 2.1 优点

因为是`纯内存`操作, Redis的性能非常出色,每秒可以处理超过`10万次读写操作`是已知性能最快的`Key- Value DB`。Redis的出色之处不仅仅是性能, Redis最大的魅力是支持保存`多种数据结构`,此外`单个value`的最大限制是`1GB`,不像 `memcached`只能保存`1MB`的数据,因此 Redis可以用来实现很多有用的功能。比方说用他的`Lst`来做`FIFO双向链表`,实现一个轻量级的高性能消息队列服务用他的Set可以做高性能的tag系统等等另外 Redis也可以对存入的`Key-Vaue`设置`expire`时间,因此也可以被当作一个功能加强版的 memcached来用。 



### 2.2 缺点

Redis的主要缺点是`数据库容量`受到`物理内存`的限制,不能用作`海量数据的高性能读写`,因此 Redis适合的场景主要局限在较小数据量的高性能操作和运算上。





简单来说 redis 就是⼀个数据库，不过与传统数据库不同的是 redis 的数据是存在内存中的，所以读 写速度⾮常快，因此 redis 被⼴泛应⽤于缓存⽅向。另外，redis 也经常⽤来做`分布式锁`。redis 提 供了多种数据类型来⽀持不同的业务场景。除此之外，redis ⽀持事务 、持久化、LUA脚本、LRU驱动 事件、多种集群⽅案。





## 3. 为什么要用 redis /为什么要用缓存

主要从“`高性能`”和“`高并发`”这两点来看待这个问题。



### 3.1 高性能

假如用户第一次访问数据库中的某些数据。这个过程会比较慢，因为是从硬盘上读取的。将该用户访问的数据存在数缓存中，这样下一次再访问这些数据的时候就可以直接从缓存中获取了。操作缓存就是直接操作内存，所以速度相当快。如果数据库中的对应数据改变的之后，同步改变缓存中相应的数据即可！



![为什么使用redis-高性能](./images/Redis_theory_note/Why_use_redis_high-performance.jpg)



### 3.2 高并发

直接操作缓存能够承受的请求是远远大于直接访问数据库的，所以我们可以考虑把数据库中的部分数据转移到缓存中去，这样用户的一部分请求会直接到缓存这里而不用经过数据库。

![为什么使用redis-高并发](./images/Redis_theory_note/Why_use_redis_high-concurrency.jpg)







### 3.3 为什么要⽤ redis ⽽不⽤ map/guava 做缓存?

缓存分为本地缓存和分布式缓存。以 Java 为例，使⽤⾃带的 map 或者 guava 实现的是本地缓存，最主要的特点是轻量以及快速，⽣命周期随着 jvm 的销毁⽽结束，并且在多实例的情况下，每个实例都 需要各⾃保存⼀份缓存，缓存不具有⼀致性。 使⽤ redis 或 memcached 之类的称为分布式缓存，在多实例的情况下，各实例共⽤⼀份缓存数据，缓 存具有⼀致性。缺点是需要保持 redis 或 memcached服务的⾼可⽤，整个程序架构上较为复杂。







## 4. redis 的线程模型

参考

> - https://blog.csdn.net/m0_37524661/article/details/87086267
> - https://baijiahao.baidu.com/s?id=1666100733546359034&wfr=spider&for=pc



![Redis线程模型](./images/Redis_theory_note/Redis_thread_model.png)





### 4.1 redis单线程模型指的是什么

Redis基于`Reactor`模式开发了网络事件处理器，这个处理器被称为`文件事件处理器`。它的组成结构为4部分：

> - 多个套接字
>
> - IO多路复用程序
>
> - 文件事件分派器
>
> - 事件处理器



redis 内部使⽤⽂件事件处理器 `file event handler` ，这个`⽂件事件处理器`是`单线程`的，所以 redis 才叫做`单线程模型`。它采⽤ `IO 多路复⽤机`制同时监听多个 `socket`，根据 `socket` 上的事件 来选择对应的事件处理器进⾏处理



Redis客户端对服务端的每次调用都经历了`发送命令`，`执行命令`，`返回结果`三个过程。其中执行命令阶段，由于Redis是`单线程`来处理命令的，所有每一条到达服务端的命令不会立刻执行，所有的命令都会进入一个队列中，然后逐个被执行。并且多个客户端发送的命令的执行`顺序是不确定`的。但是可以确定的是不会有两条命令被同时执行，不会产生并发问题，这就是Redis的单线程基本模型。



> 目前redis的网络处理方面时多线程，但是核心模块方面还是单线程



### 4.2 redis是单线程模型为什么效率还这么高？



> 1. **纯内存访问**：数据存放在内存中，内存的响应时间大约是100纳秒，这是Redis每秒万亿级别访问的重要基础。
> 2. **非阻塞I/O**：Redis采用epoll做为I/O多路复用技术的实现，再加上Redis自身的事件处理模型将epoll中的连接，读写，关闭都转换为了时间，不在I/O上浪费过多的时间。
> 3. 单线程避免了线程切换和竞态产生的消耗。
> 4. Redis采用单线程模型，每条命令执行如果占用大量时间，会造成其他线程阻塞，对于Redis这种高性能服务是致命的，所以Redis是面向高速执行的数据库





### 4.3 rector模式简介

参考

> - https://www.cnblogs.com/crazymakercircle/p/9833847.html





### 4.4 为什么网络处理要引入多线程？

之前的段落说了，Redis 的瓶颈并不在 CPU，而在`内存`和`网络I/O`。

内存不够的话，可以加内存或者做数据结构优化和其他优化等，但网络的性能优化才是大头，网络 IO 的读写在 Redis 整个执行期间占用了大部分的 CPU 时间，如果把网络处理这部分做成多线程处理方式，那对整个 Redis 的性能会有很大的提升。





![redis单多线程GET性能对比](./images/Redis_theory_note/Redis_single_multi-threaded_GET_performance_comparison.jpg)





![redis单多线程SET性能对比](./images/Redis_theory_note/Redis_single_multi-threaded_SET_performance_comparison.jpg)











## 5.常⻅数据结构以及使⽤场景分析



| 数据结构           | 常用命令                     |
| ------------------ | ---------------------------- |
| String             | set,get,decr,incr,mget       |
| Hash               | hget,hset,hgetall            |
| List               | lpush,rpush,lpop,rpop,lrange |
| Set                | sadd,spop,smembers,sunion    |
| ZSet（Sorted Set） | zadd,zrange,zrem,zcard       |



### 5.1 String

> 常⽤命令: set,get,decr,incr,mget 等。



String数据结构是简单的key-value类型，value其实不仅可以是String，也可以是数字。 常规keyvalue缓存应⽤； 常规计数：微博数，粉丝数等。

string类型是二进制安全的。意思是redis的string可以包含任何数据。比如jpg图片或者序列化的对象 。





### 5.2 Hash 

> 常⽤命令： hget,hset,hgetall 等。

hash 是⼀个 string 类型的 `field` 和 `value` 的映射表，hash 特别适合⽤于存储对象，后续操作的时 候，你可以直接仅仅修改这个对象中的某个字段的值。 ⽐如我们可以 hash 数据结构来存储⽤户信 息，商品信息等等。⽐如下⾯我就⽤ hash 类型存放了我本⼈的⼀些信息：

```json
key=JavaUser293847
value={
 “id”: 1,
 “name”: “SnailClimb”,
 “age”: 22,
 “location”: “Wuhan, Hubei”
}
```





### 5.3 List 

> 常⽤命令: lpush,rpush,lpop,rpop,lrange等 



Redis list 的实现为⼀个`双向链表`。Redis list 的应⽤场景⾮常多，也是Redis最重要的数据结构之⼀，⽐如微博的关注 列表，粉丝列表，消息列表等功能都可以⽤Redis的 list 结构来实现。 Redis list 的实现为⼀个双向链表，即可以⽀持反向查找和遍历，更⽅便操作，不过带来了部分额外 的内存开销。 另外可以通过 lrange 命令，就是从某个元素开始读取多少个元素，可以基于 list 实现分⻚查询，这 个很棒的⼀个功能，基于 redis 实现简单的⾼性能分⻚，可以做类似微博那种下拉不断分⻚的东⻄ （⼀⻚⼀⻚的往下⾛），性能⾼。



在 key 对应 list 的头部添加字符串元素

```java
lpush name value
```



在 key 对应 list 的尾部添加字符串元素

```java
rpush name value
```



key 对应 list 中删除 count 个和 value 相同的元素

```java
lrem name index
```



返回 key 对应 list 的长度

```java
llen name 
```





### 5.4 Set

> 常⽤命令： sadd,spop,smembers,sunion 等 



set 对外提供的功能与list类似是⼀个列表的功能，特殊之处在于 set 是可以⾃动排重的。 当你需要存储⼀个列表数据，⼜不希望出现重复数据时，set是⼀个很好的选择，并且set提供了判断某 个成员是否在⼀个set集合内的重要接⼝，这个也是list所不能提供的。可以基于 set 轻易实现交集、 并集、差集的操作。 ⽐如：在微博应⽤中，可以将⼀个⽤户所有的关注⼈存在⼀个集合中，将其所有粉丝存在⼀个集合。 Redis可以⾮常⽅便的实现如共同关注、共同粉丝、共同喜好等功能。这个过程也就是求交集的过程， 具体命令如下：



```json
sinterstore key1 key2 key3 将交集存在key1内
```



### 5.5 ZSet（Sorted Set） 

> 常⽤命令： zadd,zrange,zrem,zcard等 



和set相⽐，sorted set增加了⼀个权重参数score，使得集合中的元素能够按score进⾏有序排列。 举例： 在直播系统中，实时排⾏信息包含直播间在线⽤户列表，各种礼物排⾏榜，弹幕消息（可以理 解为按消息维度的消息排⾏榜）等信息，适合使⽤ Redis 中的 Sorted Set 结构进⾏存储。



### 5.6 HyperLogLog



### 5.7 Bitmap

;:: tips 参考

- https://www.jianshu.com/p/4c8e119f35db
- https://blog.csdn.net/u011957758/article/details/74783347

:::



### 5.8 底层数据结构（重要）

::: tips 参考

- https://www.cnblogs.com/ysocean/p/9080942.html

:::







## 6. Redis过期时间

Redis中有个设置时间过期的功能，即对存储在 redis 数据库中的值可以设置⼀个过期时间。作为⼀个 缓存数据库，这是⾮常实⽤的。如我们⼀般项⽬中的 token 或者⼀些登录信息，尤其是短信验证码都 是有时间限制的，按照传统的数据库处理⽅式，⼀般都是⾃⼰判断过期，这样⽆疑会严重影响项⽬性 能。



我们 set key 的时候，都可以给⼀个 `expire time`，就是过期时间，通过过期时间我们可以指定这个 key 可以存活的时间。 也可以在运行时给存在的键设置剩余的生存时间，不设置则默认为`-1`，设置为-1时表示`永久存储`。



如果假设你创建一个 `Timer`，设置了⼀批 key 只能存活1个⼩时，那么接下来1⼩时后，redis是怎么对这批key进⾏删除 的？ 



> - **定期删除**：redis默认是每隔 `100ms` 就随机抽取⼀些设置了过期时间的key，检查其是否过期， 如果过期就删除。注意这⾥是随机抽取的。为什么要随机呢？你想⼀想假如 redis 存了⼏⼗万 个 key ，每隔100ms就遍历所有的设置过期时间的 key 的话，这时候需要的是Cpu处理能力，而不是内存，就会给 CPU 带来很⼤的负载！ 
> - **惰性删除** ：定期删除可能会导致很多过期 key 到了时间并没有被删除掉。所以就有了惰性删除。假如你的过期 key，靠定期删除没有被删除掉，还停留在内存⾥，除⾮你的系统去查⼀下那 个 key，才会被redis给删除掉。这就是所谓的惰性删除，也是够懒的哈！ 但是仅仅通过设置过期时间还是有问题的。



但是仅仅通过设置过期时间还是有问题的。我们想⼀下：如果定期删除漏掉了很多过期 key，然后你也 没及时去查，也就没⾛惰性删除，此时会怎么样？如果⼤量过期key堆积在内存⾥，导致redis内存块耗 尽了。怎么解决这个问题呢？ redis 内存淘汰机制。





## 7. Redis内存淘汰机制

参考

> - https://blog.csdn.net/weixin_43184769/article/details/90523923
> - https://blog.csdn.net/qq_28018283/article/details/80764518
> - 配置文件： http://download.redis.io/redis-stable/redis.conf



思考一下，如果定期删除漏掉了很多过期的key，而我们也没有再去访问它，如果不加处理，很可能导致内存耗尽。



什么时候触发

Redis配置文件中可以设置`maxmemory`，内存的最大使用量，到达限度时会执行`内存淘汰机制`





### 7.1 内存置换策略

没有配置时，`默认为no-eviction`

| 名称                        | 描述                                                     |
| --------------------------- | -------------------------------------------------------- |
| volatile-lru                | 从`已设置过期时间的数据集`中挑选`最近最少使用`的数据淘汰 |
| volatile-lfu（4.0版本）     | 从`已设置过期时间的数据集`中挑选`最不经常`使用的数据淘汰 |
| volatile-ttl                | 从`已设置过期时间的数据集`中挑选`将要过期`的数据淘汰     |
| volatile-random             | 从`已设置过期时间的数据集`中挑选`任意数据`淘汰           |
| allkeys-lru                 | 当`内存不足`写入新数据时淘汰`最近最少`使用的Key          |
| allkeys-random              | 当`内存不足`写入新数据时`随机选择`key淘汰                |
| allkeys-lfu（4.0版本）      | 当`内存不足`写入新数据时移除`最不经常使用`的Key          |
| no-eviction（禁止驱逐数据） | 当`内存不足`写入新数据时，写入操作会报错，同时不删除数据 |



> - volatile为前缀的策略都是从已过期的数据集中进行淘汰。
> - allkeys为前缀的策略都是面向所有key进行淘汰。
> - LRU（least recently used）最少最近用到的。
> - LFU（Least Frequently Used）最不常用的。
> - TTL（Time To Live）
> - 它们的触发条件都是Redis使用的内存达到阈值时。





### 7.2 淘汰机制的实现

既然是淘汰，那就需要把这些数据给删除，然后保存新的。Redis 删除失效主键的方法主要有两种：





#### 消极方法( passive way)

在主键被访问时如果发现它已经失效,那么就删除它。 redis在实现`GET`、`MGET`、`HGET`、 LRANGE等所有涉及到读取数据的命令时都会调`expirelfNeeded`,它存在的意义就是在读取数据之前先检查一下它有没有失效,如果失效了就删除  



`expirelfNeeded`函数中调用的另外一个函数 `propagateExpire`,这个函数用来在正式删除`失效主键`,并且`广播`告诉其他地方,目的地有俩

> - `AOF`文件,将删除失效主键的这一操作以 DEL Key的标准命令格式记录下来
> - 另一个就是发送到当前 Redis服务器的所有 `Slave`,同样将删除失效主键的这操作以 `DEL Key`的标准命令格式告知这些`Slave`删除各自的失效主键





#### 积极方法( active way)

周期性地探测,发现失效就删除。消极方法的缺点是,如果keγ迟迟不被访问,就会占用很多内存空间,所以才有积极方式



#### 主动删除

当內存超过 `maxmemoryl`限定时,触发主动清理策略,该策略由启动参数的配置决定







## 8. Redis持久化机制

> 怎么保证 redis 挂掉之后再重启数据可以进⾏恢复



参考

> - https://baijiahao.baidu.com/s?id=1654694618189745916&wfr=spider&for=pc





很多时候我们需要持久化数据也就是将内存中的数据写⼊到硬盘⾥⾯，⼤部分原因是为了之后重⽤数据 （⽐如重启机器、机器故障之后恢复数据），或者是为了防⽌系统故障⽽将数据备份到⼀个远程位置。 Redis不同于Memcached的很重⼀点就是，Redis⽀持`持久化`，⽽且⽀持两种不同的持久化操作。当`RDB`和`AOF`文件都存在时，会优先根据`AOF`文件恢复



> - RDB（Redis DataBase 快照）
> - AOF（Append Only File）





### 8.1 RDB（Redis DataBase 快照）

Redis可以通过创建快照来获得存储在内存⾥⾯的数据在某个时间点上的副本。Redis创建快照之后，可 以对快照进⾏备份，可以将快照复制到其他服务器从⽽创建具有相同数据的服务器副本（Redis主从结 构，主要⽤来提⾼Redis性能），还可以将快照留在原地以便重启服务器的时候使⽤。 



优点

> - RDB文件紧凑，全量备份，非常适合用于进行备份和灾难恢复。
> - 在使用bgsave生成RDB文件的时候，redis主进程会fork()一个子进程来处理所有保存工作，主进程不需要进行任何磁盘IO操作。
> - RDB 在恢复大数据集时的速度比 AOF 的恢复速度要快。



缺点

> - RDB快照是一次`全量备份`，存储的是内存数据的`二进制序列化`形式，存储上非常紧凑。当进行快照持久化时，会开启一个子进程专门负责快照持久化，子进程会拥有父进程的`内存数据`，父进程修改内存子进程`不会反应`出来，所以在`快照持久化期间修改的数据不会被保存`，可能丢失数据。





快照持久化是Redis`默认采⽤`的持久化⽅式,触发方式如下：



> - save
> - bgsave
> - 自动化



#### 触发方式：save

该命令会阻塞当前Redis服务器，执行save命令期间，Redis不能处理其他命令，直到RDB过程完成为止。具体流程如下：



![save触发方式](./images/Redis_theory_note/save_trigger_mode.jpg)



执行完成时候如果存在老的`RDB`文件，就把新的替代掉旧的。我们的客户端可能都是几万或者是几十万，这种方式显然不可取。





#### 触发方式：bgsave

执行该命令时，Redis会在后台`异步`进行快照操作，快照同时还可以`响应客户端请求`。具体流程如下：



![bgsave触发方式](./images/Redis_theory_note/bgsave_trigger_mode.jpg)



具体操作是Redis进程执行`fork`操作`创建子进程`，RDB持久化过程由`子进程负责`，完成后自动结束。阻塞只发生在`fork`阶段，一般时间很短。基本上 Redis 内部所有的RDB操作都是采用 `bgsave` 命令。





#### 触发方式：自动触发

自动触发是由我们的配置文件来完成的。在`redis.conf`配置文件中，里面有如下配置，我们可以去设置：



**①save**

这里是用来配置触发 Redis的 `RDB` 持久化条件，也就是什么时候将内存中的数据保存到硬盘。比如“save m n”。表示m秒内数据集存在n次修改时，自动触发`bgsave`。

默认如下配置：

```java
save m n

#在900秒(15分钟)之后，如果⾄少有1个key发⽣变化，Redis就会⾃动触发BGSAVE命令创建快照。
save 900 1 

#在300秒(5分钟)之后，如果⾄少有10个key发⽣变化，Redis就会⾃动触发BGSAVE命令创建快照。
save 300 10 
  
#在60秒(1分钟)之后，如果⾄少有10000个key发⽣变化，Redis就会⾃动触发BGSAVE命令创建快照。
save 60 10000 
```



> - `stop-writes-on-bgsave-error` ：默认值为yes。当启用了RDB且最后一次后台保存数据失败，Redis是否停止接收数据。这会让用户意识到数据没有正确持久化到磁盘上，否则没有人会注意到灾难（disaster）发生了。如果Redis重启了，那么又可以重新开始接收数据了
> - `rdbcompression` ；默认值是yes。对于存储到磁盘中的快照，可以设置是否进行压缩存储。
> - `rdbchecksum` ：默认值是yes。在存储快照后，我们还可以让redis使用CRC64算法来进行数据校验，但是这样做会增加大约10%的性能消耗，如果希望获取到最大的性能提升，可以关闭此功能。
> - `dbfilename` ：设置快照的文件名，默认是 `dump.rdb`
> - `dir`：设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名。





#### save和bgsave的区别



![save和bgsave的区别](./images/Redis_theory_note/The_difference_between_save_and_bgsave.jpg)









### 8.2 AOF（Append Only File）

与`快照持久化`相⽐，`AOF持久化` 的`实时性`更好，因此已成为主流的持久化⽅案。默认情况下Redis没有 开启`AOF（append only file）`⽅式的持久化。



可以通过`appendonly`参数开启：



#### 持久化原理



![AOF运行原理-创建](./images/Redis_theory_note/AOF_running-principle&creation.jpg)



每当有一个`写而非读`命令过来时，就直接追加保存在我们的`AOF`文件中，AOF命令以Redis协议追加保存每次写的操作到文件末尾，Redis还能对AOF文件在后台重写，使得单个AOF文件不至于过大



#### 文件重写原理

AOF的方式也同时带来了另一个问题。持久化文件会变的越来越大。为了压缩`AOF`的持久化文件。redis提供了`bgrewriteaof`命令。将内存中的数据以命令的方式保存到临时文件中，同时会`fork`出一条`新进程`来将文件重写。



![bgrewriteaof文件重写原理](./images/Redis_theory_note/Principle_of_bgrewriteaof_file_rewriting.jpg)



重写`AOF`文件的操作，并没有读取旧的`AOF`文件，而是将整个内存中的数据库内容用命令的方式重写了一个`新的AOF文件`，这点和`快照`有点类似。









```java
appendonly yes
```



开启AOF持久化后每执⾏⼀条会更改Redis中的数据的命令，Redis就会将该命令通过`write`写⼊硬盘中的`AOF`⽂件，通俗的理解就是`日志记录`。 `AOF`⽂件的保存位置和`RDB`⽂件的位置相同，都是通过`dir`参数设置的，默认的⽂件名是 `appendonly.aof`。



```java
appendfsync always #每次有数据修改发⽣时都会写⼊AOF⽂件,这样会严重降低Redis的速度
  
appendfsync everysec #每秒钟同步⼀次，显示地将多个写命令同步到硬盘
  
appendfsync no #让操作系统决定何时进⾏同步
```



为了兼顾数据和写⼊性能，⽤户可以考虑 `appendfsync everysec`选项 ，让Redis每秒同步⼀次AOF⽂ 件，Redis性能⼏乎没受到任何影响。⽽且这样即使出现系统崩溃，⽤户最多只会丢失⼀秒之内产⽣的 数据。当硬盘忙于执⾏写⼊操作的时候，Redis还会优雅的放慢⾃⼰的速度以便适应硬盘的最⼤写⼊速度。



#### 修复AOF文件

可以根据文件`redis-check-aof`文件修复，它会把AOF文件中错误的命令删去，相关命令

```shell
redis-check-aof --fix appendonly.aof
```





### 8.3 Redis 4.0 对于持久化机制的优化

Redis 4.0 开始⽀持 `RDB` 和 `AOF` 的`混合持久化`（默认关闭，可以通过配置项开启）



```shell
aof-use-rdbpreamble yes
```



如果把混合持久化打开，`AOF` 重写的时候就直接把 `RDB` 的内容写到 `AOF ⽂件开头`。这样做的好处是可 以结合 `RDB` 和 `AOF` 的优点, 快速加载同时避免丢失过多的数据。当然缺点也是有的， `AOF` ⾥⾯的 `RDB` 部分是压缩格式不再是 `AOF` 格式，可读性较差。



通过这种，`Redis`会优先载入`AOF`文件，因为通常情况下`AOF`文件保存的数据要比`RDB`完整



## 9. Redis事务

参考

> - https://www.runoob.com/redis/redis-transactions.html



Redis 通过 `MULTI`、`EXEC`、`WATCH` 等命令来实现`事务(transaction)`功能。Redis 事务的本质是一组命令的集合。事务支持一次执行多个命令，一个事务中所有命令都会被序列化。在事务执行过程，会按照顺序串行化执行队列中的命令，其他客户端提交的命令请求不会插入到事务执行命令序列中。



### 9.1 特点

> - Redis事务没有隔离级别的概念：批量操作在发送 `EXEC` 命令前被放入队列缓存，并不会被实际执行，也就不存在事务内的查询要看到事务里的更新，事务外查询不能看到。
> - Redis事务不保证原子性：Redis中，`单条命令是原子性执行的`，但事务不保证`原子性`，且没有回滚。事务中任意命令执行失败，其余的命令仍会被执行。
> - 在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。





### 9.2 阶段



> - 开始事务。
> - 命令入队。
> - 执行事务。





### 9.3 相关命令参考

> - https://www.runoob.com/redis/redis-transactions.html









## 10. 缓存雪崩 | 缓存穿透 | 缓存击穿

参考

> - https://blog.csdn.net/fanrenxiang/article/details/80542580
> - https://www.cnblogs.com/xichji/p/11286443.html



> - **缓存穿透**：key对应的数据在数据源并不存在，每次针对此key的请求从`缓存`获取不到，请求都会到`数据源`，从而可能`压垮数据源`。举个例⼦：某个⿊客故意制造我们缓存中不存在的 key 发起⼤量请求，导致⼤量请 求落到数据库，若黑客利用此漏洞进行攻击可能压垮数据库。
> - **缓存击穿**：是指一个key非常热点，在不停的扛着大并发，大并发集中对这一个点进行访问，当这个`key`在失效的瞬间，持续的大并发就穿破缓存，直接请求数据库，这个时候大并发的请求可能会瞬间把后端DB压垮，就像在一个屏障上凿开了一个洞。
> - **缓存雪崩**：当缓存服务器重启或者大量缓存集中在某一个时间段失效，这样在失效的时候，也会给后端系统(比如DB)带来很大压力，所以，后⾯的请求都会落到数据库上，造成数据库短时间内承受⼤量请求⽽崩掉。





### 10.1 缓存穿透

缓存穿透说简单点就是⼤量请求的 key 根本不存在于缓存中，导致请求直接到了数据库上，根本没有 经过缓存这⼀层。举个例⼦：某个⿊客故意制造我们缓存中不存在的 key 发起⼤量请求，导致⼤量请 求落到数据库。





#### 原理

正常缓存处理流程

![缓存处理流程](./images/Redis_theory_note/Cache_processing_flow.jpg)



缓存穿透处理流程

![缓存穿透处理流程](./images/Redis_theory_note/Cache_penetration_processing_flow.jpg)



#### 解决办法

一个一定不存在缓存及查询不到的数据，由于缓存是不命中时被动写的，并且出于容错考虑，如果从存储层查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到存储层去查询，失去了缓存的意义。



最基本的就是⾸先做好`参数校验`，⼀些`不合法的参数`请求直接抛出异常信息返回给客户端。⽐如查询的 数据库 id 不能⼩于 0、传⼊的邮箱格式不对的时候直接返回错误消息给客户端等等。



如果一个查询返回的数据为空（不管是数据不存在，还是系统故障），我们仍然把这个空结果进行缓存，但它的过期时间会很短，最长不超过五分钟

```java
public Object getObjectInclNullById(Integer id) {
 // 从缓存中获取数据
 Object cacheValue = cache.get(id);
 // 缓存为空
 if (cacheValue == null) {
 // 从数据库中获取
 Object storageValue = storage.get(key);
 // 缓存空对象
 cache.set(key, storageValue);
 // 如果存储数据为空，需要设置⼀个过期时间(300秒)
 if (storageValue == null) {
 // 必须设置过期时间，否则有被攻击的⻛险
 cache.expire(key, 60 * 5);
 }
 return storageValue;
 }
 return cacheValue;
}
```





#### 布隆过滤器（bloom filter）

参考

> - https://github.com/Snailclimb/JavaGuide/blob/master/docs/dataStructures-algorithms/data-structure/bloom-filter.md



布隆过滤器是⼀个⾮常神奇的数据结构，通过它我们可以⾮常⽅便地判断⼀个给定数 据是否存在与海量数据中。我们需要的就是判断 `key` 是否合法，有没有感觉布隆过滤器就是我们想要 找的那个“⼈”。具体是这样做的：把`所有可能存在的请求的值`都存放在布隆过滤器中，当⽤户请求过来，我会先判断⽤户发来的请求的值是否存在于布隆过滤器中。不存在的话，直接返回请求参数错误信 息给客户端，存在的话才会⾛下⾯的流程。





![布隆过滤器](./images/Redis_theory_note/bloom-filter.jpg)







### 10.2 缓存击穿

参考

> - https://www.cnblogs.com/chengege/p/11073166.html



key可能会在某些时间点被超高并发地访问，是一种非常“热点”的数据。这个时候，需要考虑一个问题：缓存被“击穿”的问题。



#### 互斥锁(mutex key)

业界比较常用的做法，是使用`mutex`。简单地来说，就是在缓存失效的时候（判断拿出来的值为空），不是立即去`load db`，而是先使用缓存工具的某些带成功操作返回值的操作（比如`Redis`的`SETNX`或者`Memcache`的`ADD`）去`set`一个`mutex key`，当操作返回成功时，再进行`load db`的操作并`回设缓存`；否则，就重试整个`get`缓存的方法。就是只让一个线程构建`缓存`，其他线程等待构建缓存的线程执行完，重新从缓存获取数据就可以了。





![缓存击穿-互斥锁mutex-key](./images/Redis_theory_note/Cache-breakdown_mutex_key.png)









### 10.3 缓存雪崩



简介：缓存同⼀时间⼤⾯积的失效，所以，后⾯的请求都会落到数据库上，造成数据库短时间内承受⼤ 量请求⽽崩掉。



> - 事前：尽量保证整个 redis 集群的⾼可⽤性，发现机器宕机尽快补上。选择合适的内存淘汰策 略。 
> - 事中：本地ehcache缓存 + hystrix限流&降级，避免MySQL崩掉 
> - 事后：利⽤ redis 持久化机制保存的数据尽快恢复缓存



> - 设置key永不失效（热点数据）；
> - 设置key缓存失效时候尽可能错开；
> - 使用多级缓存机制，比如同时使用redsi和memcache缓存，请求->redis->memcache->db；
> - 购买第三方可靠性高的Redis云服务器；



![缓存雪崩解决方案](./images/Redis_theory_note/Cache_avalanche_solution.jpg)







## 11. Redis发布订阅

参考

> - [订阅与发布 — Redis 设计与实现 (redisbook.readthedocs.io)](https://redisbook.readthedocs.io/en/latest/feature/pubsub.html)



使用场景

> - 实时消息
> - 聊天室（既可以是发送者也可以是订阅者）
> - 订阅，关注推送







## 12. Redis集群

参考

> - [集群教程 — Redis 命令参考 (redisfans.com)](http://doc.redisfans.com/topic/cluster-tutorial.html#cluster-tutorial)
> - [Redis集群详解](https://blog.csdn.net/miss1181248983/article/details/90056960)



三种集群模式

> - 主从复制模式
> - Sentinel（哨兵）模式
> - Cluster（集群）模式





## 13. Redis集群-主从复制模式

参考

> - [Redis集群主从复制（一主两从）搭建配置教程【Windows环境】 - 阿飞云 - 博客园 (cnblogs.com)](https://www.cnblogs.com/aflyun/p/8495561.html)



为了使得集群在一部分节点下线或者无法与集群的大多数节点进行通讯的情况下， 仍然可以正常运作， Redis 集群对节点使用了主从复制功能： 集群中的每个节点都有 1 个至 N 个复制品（replica）， 其中一个复制品为主节点（master）， 而其余的 N-1 个复制品为从节点（slave）。[ **摘自** [Redis 集群中的主从复制](http://doc.redisfans.com/topic/cluster-tutorial.html#id4) ]

那么上面是主从复制呢，简单的来说就是一个主节点master可以拥有一个甚至多个从节点的slave，而一个slave又可以拥有多个slave，如此下去，形成了强大的多级服务器集群架构。



![master&slave](./images/Redis_theory_note/master&slave.png)



### 13.1 特点

> 1. 一个`master`可以有多个`slave`，一个`slave`只能有一个`master`
> 2. 除了多个`slave`连到相同的`master`外，`slave`也可以连接其他`slave`形成图状结构
> 3. 主从复制`不会阻塞master`。也就是说当一个或多个slave与master进行初次同步数据时，master可以继续处理client发来的请求。相反slave在初次同步数据时则会阻塞不能处理client的请求。
> 4. 主数据库`master`对外一般用来`写`，而从数据库`slave`对外一般都是`只读`的，只有接收主数据库同步过来的数据才会`写`。
> 5. 可以在`master`禁用数据持久化，只需要注释掉`master` 配置文件中的所有`save`配置，然后只在`slave`上配置数据持久化。
> 6. `slave`挂了不影响其他`slave`的读和`master`的读和写，重新启动后会将数据从`master`同步过来，`master`挂了以后，不影响`slave`的读，但redis不再提供写服务，`master`重启后`redis`将重新对外提供写服务
> 7. `master`挂了以后，不会在`slave`节点中重新选一个`master`





### 13.2 作用

> 1. ==数据冗余==：主从复制实现了数据的热备份,是`持久化`之外的一种数据冗余方式。
> 2. ==故障恢复==：当主节点出现问题时,可以由从节点提供服务,实现快速的故障恢复，实际上是一种服务的冗余
> 3. ==负载均衡==:在主从复制的基础上,配合`读写分离`,可以由主节点提供写服务,由从节点提供读服务(即写 Redis数据时应用连接主节点,读 Redis数据时应用连接从节点),分担服务器负载;尤其是在写少读多的场景下,通过多个从节点分担读负载,可以大大提高 Redis服务器的井发量。
> 4. ==高可用(集群)基石==：除了上述作用以外,主从复制还是`哨兵`和`集群`能够实施的基础,因此说`主从复制`是 Redis高可用的基础





### 13.3 工作机制



![全量复制](./images/Redis_theory_note/Full_copy.png)



> 1. 当设置好slave服务器后,slave会建立和master的连接，然后发送sync命令。
> 2. Master接到命令启动后台的存盘进程，同时收集所有接收到的用于修改数据集命令，在后台进程执行完毕之后，master将传送整个数据文件到slave,以完成一次完全同步。
> 3. 全量复制：而slave服务在接收到数据库文件数据后，将其存盘并加载到内存中（第一次全量）。只要是重新连接master,一次完全同步（全量复制)将被自动执行。
> 4. 增量复制：Master继续将新的所有收集到的修改命令依次传给slave,完成同步。（之后增量）



当设置好slave服务器后，slave会建立和master的连接，然后发送sync命令。无论是第一次同步建立的连接还是连接断开后的重新连接，master都会启动一个后台进程调用`bgsave`（相对于`save`来说不会阻塞客户端），将数据库快照保存到文件中，同时master主进程会开始收集新的写命令并缓存起来。后台进程完成写文件 后，master就发送文件给slave，slave将文件保存到磁盘上，然后加载到内存恢复数据库快照到slave上。接着master就会把缓存的命令转发给slave。而且后续master收到的写命令都会通过开始建立的连接发送给slave。从master到slave的同步数据的命令和从 client发送的命令使用相同的协议格式。当master和slave的连接断开时slave可以自动重新建立连接。如果master同时收到多个 slave发来的同步连接命令，只会使用启动一个进程来写数据库镜像，然后发送给所有slave。





## 14. Redis集群-Sentinel（哨兵）模式

参考

> - [Redis哨兵（Sentinel）模式 - 简书 (jianshu.com)](https://www.jianshu.com/p/06ab9daf921d)
> - [(23条消息) Redis集群详解_变成习惯-CSDN博客_redis集群](https://blog.csdn.net/miss1181248983/article/details/90056960)



主从模式的弊端就是不具备高可用性，当master挂掉以后，Redis将不能再对外提供写入操作，需要手动重新选举master，这就需要人工干预，费事费力，还会造成一段时间内服务不可用，因此sentinel应运而生。

![哨兵模式](./images/Redis_theory_note/Sentinel_Mode.jpg)



这里的哨兵有两个作用

> - 通过发送命令，让Redis服务器返回监控其运行状态，包括主服务器和从服务器。
> - 当哨兵监测到master宕机，会自动将slave切换成master，然后通过`发布订阅模式`通知其他的从服务器，修改配置文件，让它们切换主机。

然而一个哨兵进程对Redis服务器进行监控，可能会出现问题，为此，我们可以使用多个哨兵进行监控。各个哨兵之间还会进行监控，这样就形成了多哨兵模式。

用文字描述一下**故障切换（failover）**的过程。假设主服务器宕机，哨兵1先检测到这个结果，系统并不会马上进行failover过程，仅仅是哨兵1主观的认为主服务器不可用，这个现象成为**主观下线**。当后面的哨兵也检测到主服务器不可用，并且数量达到一定值时，那么哨兵之间就会进行一次投票，投票的结果由一个哨兵发起，进行failover操作。切换成功后，就会通过发布订阅模式，让各个哨兵把自己监控的从服务器实现切换主机，这个过程称为**客观下线**。这样对于客户端而言，一切都是透明的。





![多哨兵模式](./images/Redis_theory_note/Multiple_sentinels.jpg)







### 14.1 特点

> - sentinel模式是建立在主从模式的基础上，如果只有一个Redis节点，sentinel就没有任何意义
> - 当master挂了以后，sentinel会在slave中选择一个做为master，并修改它们的配置文件，其他slave的配置文件也会被修改，比如slaveof属性会指向新的master 
> - 当master重新启动后，它将不再是master而是做为slave接收新的master的同步数据
> - sentinel因为也是一个进程有挂掉的可能，所以sentinel也会启动多个形成一个sentinel集群
> - 多sentinel配置的时候，sentinel之间也会自动监控
> - 当主从模式配置密码时，sentinel也会同步将配置信息修改到配置文件中，不需要担心
> - 一个sentinel或sentinel集群可以管理多个主从Redis，多个sentinel也可以监控同一个redis 
> - sentinel最好不要和Redis部署在同一台机器，不然Redis的服务器挂了以后，sentinel也挂了





### 14.2 作用

> - `监控`：不间断的检查主从服务是否如预期一样正常工作
> - `事件通知`：对被监视的redis实例的异常，能通知系统管理员，或者以API接口通知其他应用程序。
> - `智能援救`：当被监视的主服务异常时，哨兵会智能的把某个从服务提升为主服务，同时其他从服务与新的主服务之间的关系将得到重新的配置。应用程序将通过redis服务端重新得到新的主服务的地址并重新建立连接。
> - `配置服务`：客户端可连接哨兵的接口，获得主从服务的相关信息，如果发生改变，哨兵新通知客户端。



### 14.2 工作机制

当使用sentinel模式的时候，客户端就不要直接连接Redis，而是连接sentinel的`ip`和`port`，由sentinel来提供具体的可提供服务的Redis实现，这样当master节点挂掉以后，sentinel就会感知并将新的master节点提供给使用者。



> * 每个sentinel以每秒钟一次的频率向它所知的master，slave以及其他sentinel实例发送一个 `PING` 命令 
> * 如果一个实例距离最后一次有效回复 PING 命令的时间超过 `down-after-milliseconds` 选项所指定的值， 则这个实例会被sentinel标记为`主观下线`。 
> * 如果一个master被标记为`主观下线`，则正在监视这个master的所有sentinel要以每秒一次的频率确认master的确进入了主观下线状态
> * 当有足够数量的sentinel（大于等于配置文件指定的值）在指定的时间范围内确认master的确进入了主观下线状态， 则master会被标记为客观下线 
> * 在一般情况下， 每个sentinel会以每 10 秒一次的频率向它已知的所有master，slave发送 INFO 命令 
> * 当master被sentinel标记为客观下线时，sentinel向下线的master的所有slave发送 INFO 命令的频率会从 10 秒一次改为 1 秒一次 
> * 若没有足够数量的sentinel同意master已经下线，master的客观下线状态就会被移除；
> * 若master重新向sentinel的 PING 命令返回有效回复，master的主观下线状态就会被移除





## 15. Redis集群-cluster模式

::: tips 参考

- [Redis-Cluster集群](https://www.jianshu.com/p/813a79ddf932)

:::



### 15.1 介绍

redis最开始使用主从模式做集群，若master宕机需要手动配置slave转为master；

后来为了高可用提出来**哨兵**模式，该模式下有一个哨兵监视master和slave，若master宕机可自动将slave转为master，但它也有一个问题，就是不能动态扩充；

所以在3.x提出cluster集群模式。







### 15.2 设计原理

Redis-Cluster采用`无中心结构`，每个节点保存数据和整个集群状态,每个节点都和其他所有节点连接。



![redis-cluster](./images/Redis_theory_note/redis_cluster.jpg)





### 15.3 特点

* 所有的redis节点彼此互联(PING-PONG机制),内部使用二进制协议优化传输速度和带宽，数据共享
* `节点的fail`是通过集群中`超过半数`的节点检测失效时才生效。
* 所有的节点都是一主一从（也可以是一主多从），其中从不提供服务，仅作为备用
* `不支持同时处理多个key`（如MSET/MGET），因为redis需要把key均匀分布在各个节点上，
  并发量很高的情况下同时创建key-value会降低性能并导致不可预测的行为
* 支持在线增加、删除节点
* 客户端与redis节点直连,不需要中间proxy层.客户端不需要连接集群所有节点,连接集群中任何一个可用节点读写即可。
* Redis集群预分好16384个桶，当需要在 Redis 集群中放置一个 key-value 时，根据 CRC16(key) mod 16384的值，决定将一个key放到哪个桶中。





### 15.4 redis cluster节点分配

现在我们是三个主节点分别是：A, B, C 三个节点，它们可以是一台机器上的三个端口，也可以是三台不同的服务器。那么，采用哈希槽 (hash slot)的方式来分配16384个slot 的话，它们三个节点分别承担的slot 区间是：

- 节点A覆盖0－5460;

- 节点B覆盖5461－10922;

- 节点C覆盖10923－16383.

  获取数据:
   如果存入一个值，按照redis cluster哈希槽的[算法](http://lib.csdn.net/base/datastructure)： CRC16('key')384 = 6782。 那么就会把这个key 的存储分配到 B 上了。同样，当我连接(A,B,C)任何一个节点想获取'key'这个key时，也会这样的算法，然后内部跳转到B节点上获取数据

  新增一个主节点:
   新增一个节点D，redis cluster的这种做法是从各个节点的前面各拿取一部分slot到D上，我会在接下来的实践中实验。大致就会变成这样：

- 节点A覆盖1365-5460

- 节点B覆盖6827-10922

- 节点C覆盖12288-16383

- 节点D覆盖0-1364,5461-6826,10923-12287

同样删除一个节点也是类似，移动完成后就可以删除这个节点了。





### 15.5 redis cluster主从模式

redis cluster 为了保证数据的高可用性，加入了主从模式，一个主节点对应一个或多个从节点，主节点提供数据存取，从节点则是从主节点拉取数据备份，当这个主节点挂掉后，就会有这个从节点选取一个来充当主节点，从而保证集群不会挂掉

上面那个例子里, 集群有ABC三个主节点, 如果这3个节点都没有加入从节点，如果B挂掉了，我们就无法访问整个集群了。A和C的slot也无法访问。

所以我们在集群建立的时候，一定要为每个主节点都添加了从节点, 比如像这样, 集群包含主节点A、B、C, 以及从节点A1、B1、C1, 那么即使B挂掉系统也可以继续正确工作。

B1节点替代了B节点，所以Redis集群将会选择B1节点作为新的主节点，集群将会继续正确地提供服务。 当B重新开启后，它就会变成B1的从节点。

> 集群中至少应该有奇数个节点，所以至少有三个节点，每个节点至少有一个备份节点，所以下面使用6节点。不过需要注意，如果节点B和B1同时挂了，Redis集群就无法继续正确地提供服务了。







## 16. 如何解决 Redis 的并发竞争 Key 问题

参考

> - https://www.jianshu.com/p/41d3a673425d
> - https://blog.csdn.net/qq_42253147/article/details/94446727





这里的并发指的是多个redis的client同时set key引起的并发问题，也就是多个系统同时对⼀个 key 进⾏操作，但是最后执⾏的顺序 和我们期望的顺序不同，这样也就导致了结果的不同！





方案

> - **分布式锁+时间戳**
> - **消息队列MQ**





### 16.1 分布式锁+时间戳



#### 如果对这个key操作，不要求顺序

这种情况下，准备一个分布式锁，大家去抢锁，抢到锁就做`set`操作即可，比较简单。加锁的目的实际上就是把`并行读写`改成`串行读写`的方式，从而来避免资源竞争。



#### 如果对这个key操作，要求顺序

假设有一个`key1`

> - 系统A需要将key1设置为valueA
> - 系统B需要将key1设置为valueB
> - 系统C需要将key1设置为valueC



期望按照key1的value值按照 `valueA–>valueB–>valueC`的顺序变化。这种时候我们在数据写入数据库的时候，需要保存一个`时间戳`。假设`时间戳`如下

> - 系统A key 1 {valueA 3:00}
> - 系统B key 1 {valueB 3:05}
> - 系统C key 1 {valueC 3:10}



那么，假设这会`系统B`先抢到锁，将`key1`设置为`{valueB 3:05}`。接下来系统A抢到锁，发现自己的valueA的时间戳早于缓存中的时间戳，那就不做`set`操作了。以此类推





#### 什么是分布式锁

因为传统的加锁的做法（如java的synchronized和Lock）这里没用，只适合单点。因为这是分布式环境，需要的是分布式锁。

当然，分布式锁可以基于很多种方式实现，比如zookeeper、redis等，

不管哪种方式实现，基本原理是不变的：**用一个状态值表示锁，对锁的占用和释放通过状态值来标识**。







#### 分布式锁的实现

主要用到的redis函数是`setnx()`

利用`SETNX`非常简单地实现`分布式锁`。例如：某客户端要获得一个名字`youzhi`的锁，客户端使用下面的命令进行获取：

```shell
SETNX lock.youzhi<current Unix time + lock timeout + 1>
```



> - 如返回1，则该客户端获得锁，把`lock.youzhi`的键值设置为时间值表示该键已被锁定，该客户端最后可以通过`DEL lock.foo`来释放该锁。
> - 如返回0，表明该锁已被其他客户端取得，这时我们可以先返回或进行重试等对方完成或等待锁超时。







### 16.2 消息队列

在并发量过大的情况下,可以通过`消息中间件`进行处理,把`并行读写`进行`串行化`。

把`Redis.set`操作放在队列中使其串行化,必须的一个一个执行。

这种方式在一些高并发的场景中算是一种通用的解决方案。







## 17. 区别



### 17.1 redis 和 memcached 的区别



> 1. **redis⽀持更丰富的数据类型（⽀持更复杂的应⽤场景）**：Redis不仅仅⽀持简单的k/v类型的数 据，同时还提供list，set，zset，hash等数据结构的存储。memcache⽀持简单的数据类型， String。 
> 2. **Redis⽀持数据的持久化**：可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进⾏使 ⽤,⽽Memecache把数据全部存在内存之中。 
> 3. **集群模式**：memcached没有原⽣的集群模式，需要依靠客户端来实现往集群中分⽚写⼊数据；但 是 redis ⽬前是原⽣⽀持 cluster 模式的. 
> 4. Memcached是多线程，⾮阻塞IO复⽤的⽹络模型；Redis使⽤单线程的多路 IO 复⽤模型。



![](./images/Redis_theory_note/difference_between_redis_and_memcached.jpg)







## 18. Redis命名规则

::: tips 参考

- https://blog.csdn.net/u013521220/article/details/107640977

::


