---
title: RabbitMQ
author: Draco
time: 2021-08-13 00:04:05
categories: 
  - 消息队列
  - RabbitMQ
tags: 
  - 消息队列
  - RabbitMQ
---



## 大纲

![RabbitMQ大纲](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/RabbitMQ.png)



## 参考

- [RabbitMQ官方文档](https://www.rabbitmq.com/)
- [rabbitmqctl文档](https://www.rabbitmq.com/rabbitmqctl.8.html)



- 尚硅谷
- [尚硅谷笔记](https://zhangc233.github.io/2021/07/23/RabbitMQ/)
- 《RabbitMQ实战指南》



## 什么是消息中间件

消息、（Message）是指在应用间传送的数据。消息可以非常简单，比如只包含文本字符串、JSON等，也可以很复杂，比如内嵌对象。

消息队列中间件（Message Queue Middleware，简称为MQ）是指利用高效可靠的消息传递机制进行与平台无关的数据交流，并基于数据通信来进行分布式系统的集成。通过提供消息传递和消息排队模型，它可以在分布式环境下扩展进程间的通信。

消息队列中间件，也可以称为消息队列或者消息中间件。它一般有两种传递模式：点对点（PP，Point-to-Point）模式和发布/订阅（Pub/Sub）模式。

- 点对点模式是基于队列的，消息生产者发送消息到队列，消息消费者从队列中接收消息，队列的存在使得消息的异步传输成为可能。
- 发布订阅模式定义了如何向一个内容节点发布和订阅消息，这个内容节点称为主题（topic），主题可以认为是消息传递的中介，消息发布者将消息发布到某个主题，而消息订阅者则从主题中订阅消息。主题使得消息的订阅者与消息的发布者互相保持独立，不需要进行接触即可保证消息的传递，发布/订阅模式在消息的一对多广播时采用。



## 消息中间件作用

- 解耦：在项目启动之初来预测将来会碰到什么需求是极其困难的。消息中间件在处理过程中间插入了一个隐含的、基于数据的接口层，两边的处理过程都要实现这一接口，这允许你独立地扩展或修改两边的处理过程，只要确保它们遵守同样的接口约束即可。
- 冗余（存储）：有些情况下，处理数据的过程会失败。消息中间件可以把数据进行持久化直到它们已经被完全处理，通过这一方式规避了数据丢失风险。在把一个消息从消息中间件中删除之前，需要你的处理系统明确地指出该消息已经被处理完成，从而确保你的数据被安全地保存直到你使用完毕。
- 扩展性：因为消息中间件解耦了应用的处理过程，所以提高消息入队和处理的效率是很容易的，只要另外增加处理过程即可，不需要改变代码，也不需要调节参数。
- 削峰：在访问量剧增的情况下，应用仍然需要继续发挥作用，但是这样的突发流量并不常见。如果以能处理这类峰值为标准而投入资源，无疑是巨大的浪费。使用消息中间件能够使关键组件支撑突发访问压力，不会因为突发的超负荷请求而完全崩溃。
- 可恢复性：当系统一部分组件失效时，不会影响到整个系统。消息中间件降低了进程间的耦合度，所以即使一个处理消息的进程挂掉，加入消息中间件中的消息仍然可以在系统恢复后进行处理。
  顺序保证：在大多数使用场景下，数据处理的顺序很重要，大部分消息中间件支持一定程度上的顺序性。
- 缓冲：在任何重要的系统中，都会存在需要不同处理时间的元素。消息中间件通过一个缓冲层来帮助任务最高效率地执行，写入消息中间件的处理会尽可能快速。该缓冲层有助于控制和优化数据流经过系统的速度。
- 异步通信：在很多时候应用不想也不需要立即处理消息。消息中间件提供了异步处理机制，允许应用把一些消息放入消息中间件中，但并不立即处理它，在之后需要的时候再慢慢处理。



## RabbitMQ特点

- 可靠性：RabbitMQ使用一些机制来保证可靠性，如持久化、传输确认及发布确认等。
- 灵活的路由：在消息进入队列之前，通过交换器来路由消息。对于典型的路由功能，RabbitMQ已经提供了一些内置的交换器来实现。针对更复杂的路由功能，可以将多个交换器绑定在一起，也可以通过插件机制来实现自己的交换器。



## 常用消息中间件

- ActiveMQ
  优点：单机吞吐量万级，时效性 ms 级，可用性高，基于主从架构实现高可用性，较低的概率丢失数据。

  缺点：官方社区现在对 ActiveMQ 5.x 维护越来越少，高吞吐量场景较少使用。

- Kafka
  大数据的杀手锏，谈到大数据领域内的消息传输，则绕不开 Kafka，这款为大数据而生的消息中间件，以其百万级 TPS 的吞吐量名声大噪，迅速成为大数据领域的宠儿，在数据采集、传输、存储的过程中发挥着举足轻重的作用。目前已经被 LinkedIn，Uber, Twitter, Netflix 等大公司所采纳。

  优点：性能卓越，单机写入 TPS 约在百万条 / 秒，最大的优点，就是吞吐量高。时效性 ms 级，可用性非常高，kafka 是分布式的，一个数据多个副本，少数机器宕机，不会丢失数据，不会导致不可用，消费者采用 Pull 方式获取消息，消息有序，通过控制能够保证所有消息被消费且仅被消费一次；有优秀的第三方 Kafka Web 管理界面 Kafka-Manager；在日志领域比较成熟，被多家公司和多个开源项目使用；功能支持：功能较为简单，主要支持简单的 MQ 功能，在大数据领域的实时计算以及日志采集被大规模使用。

  缺点：Kafka 单机超过 64 个队列 / 分区，Load 会发生明显的飙高现象，队列越多，load 越高，发送消息响应时间变长，使用短轮询方式，实时性取决于轮询间隔时间，消费失败不支持重试；支持消息顺序，但是一台代理宕机后，就会产生消息乱序，社区更新较慢。

- RocketMQ
  RocketMQ 出自阿里巴巴的开源产品，用 Java 语言实现，在设计时参考了 Kafka，并做出了自己的一 些改进。被阿里巴巴广泛应用在订单，交易，充值，流计算，消息推送，日志流式处理，binglog 分发等场景。

  优点：单机吞吐量十万级，可用性非常高，分布式架构，消息可以做到 0 丢失，MQ 功能较为完善，还是分布式的，扩展性好，支持 10 亿级别的消息堆积，不会因为堆积导致性能下降。

  缺点：支持的客户端语言不多，目前是 java 及 c++，其中 c++ 不成熟；社区活跃度一般，没有在 MQ 核心中去实现 JMS 等接口，有些系统要迁移需要修改大量代码。

- RabbitMQ
  2007 年发布，是一个在 AMQP (高级消息队列协议) 基础上完成的，可复用的企业消息系统，是当前最主流的消息中间件之一。

  优点：由于 erlang 语言的高并发特性，性能较好；吞吐量到万级，MQ 功能比较完备，健壮、稳定、易用、跨平台、支持多种语言。如：Python、Ruby、.NET、Java、JMS、C、PHP、ActionScript、XMPP、STOMP 等，AJAX 文档齐全；开源提供的管理界面非常棒，用起来很好用，社区活跃度高；更新频率相当高。

  缺点：商业版需要收费，学习成本较高。


作者: zhangc233
链接: https://zhangc233.github.io/2021/07/23/RabbitMQ/#MQ-%E7%9A%84%E5%88%86%E7%B1%BB
来源: ZC的学习录





## RabbitMQ入门



### 介绍

RabbitMO整体上是一个生产者与消费者模型，主要负责接收、存储和转发消息。可以把消息传递的过程想象成：当你将一个包裹送到邮局，邮局会暂存并最终将邮件通过邮递员送到收件人的手上，RabbitMQ就好比由邮局、邮箱和邮递员组成的一个系统。从计算机术语层面来说，RabbitMQ模型更像是一种交换机模型。



![](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/RabbitMQ%E6%A8%A1%E5%9E%8B%E6%9E%B6%E6%9E%84.png)



![RabbitMQ-00000007](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/RabbitMQ%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86png)





### 核心概念

- Producer：生产者创建消息，然后发布到RabbitMO中。消息一般可以包含2个部分：**消息体和标签（Label）**。消息体也可以称之为**payload**，在实际应用中，消息体一般是一个带有业务逻辑结构的数据，比如一个JON字符串。当然可以进一步对这个消息体进行序列化操作。消息的标签用来表述这条消息，比如一个交换器的名称和一个路由键。生产者把消息交由RabbitMQ，RabbitMQ之后会根据标签把消息发送给感兴趣的消费者（Consumer）。
- Consumer：消费者，就是接收消息的一方。消费者连接到RabbitMQ服务器，并订阅到队列上。当消费者消费一条消息时，只是消费消息的消息体（payload）。在消息路由的过程中，**消息的标签会丢弃**，存入到队列中的消息只有消息体，**消费者也只会消费到消息体，也就不知道消息的生产者是谁**，当然消费者也不需要知道。
- Broker：消息中间件的服务节点。对于RabbitMQ来说，一个RabbitMQ Broker可以简单地看作一个RabbitMQ服务节点，或者RabbitMQ服务实例。大多数情况下也可以将一个RabbitMQ Broker看作一台RabbitMQ服务器。



![image-20220101153843047](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97%E7%94%9F%E4%BA%A7%E6%B6%88%E8%B4%B9%E6%B5%81%E7%A8%8B.png)



- Connection：publisher／consumer 和 broker 之间的 TCP 连接。

- Channel：如果每一次访问 RabbitMQ 都建立一个 Connection，在消息量大的时候建立 TCP Connection 的开销将是巨大的，效率也较低。Channel 是在 connection 内部建立的逻辑连接，如果应用程序支持多线程，通常每个 thread 创建单独的 channel 进行通讯，AMQP method 包含了 channel id 帮助客户端和 message broker 识别 channel，所以 channel 之间是完全隔离的。Channel 作为轻量级的 Connection 极大减少了操作系统建立 TCP connection 的开销。

![image-20220101212952076](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E8%BF%9E%E6%8E%A5%E5%92%8C%E4%BF%A1%E9%81%93.png)





- Queue：用于存储消息用于存储消息

- Exchange：交换器。在图2-中我们暂时可以理解成生产者将消息投递到队列中，实际上这个在RabbitMQ中不会发生。真实情况是，生产者将消息发送到Exchange（交换器，通常也可以用大写的“Ⅹ”来表示），由交换器将消息路由到一个或者多个队列中。如果路由不到，或许会返回给生产者，或许直接丢弃。有四种交换器

- RoutingKey：路由键。生产者将消息发给交换器的时候，一般会指定一个RoutingKey，用来指定这个消息的路由规则，而这个Routing Key需要与交换器类型和绑定键（BindingKey）联合使用才能最终生效。在交换器类型和绑定键（BindingKey）固定的情况下，生产者可以在发送消息给交换器时，通过指定RoutingKey来决定消息流向哪里。
- Binding：绑定。RabbitMQ中通过绑定将交换器与队列关联起来，在绑定的时候一般会指定一个绑定键BindingKey



![image-20220101155411425](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E7%BB%91%E5%AE%9A.png)



生产者将消息发送给交换器时，需要一个RoutingKey，**当BindingKey和RoutingKey相匹配时，消息会被路由到对应的队列中**。在绑定多个队列到同一个交换器的时候，这些绑定允许使用相同的BindingKey。BindingKey并不是在所有的情况下都生效，它依赖于交换器类型，比如fanout类型的交换器就会无视BindingKey，而是将消息路由到所有绑定到该交换器的队列中。



路由键和绑定

- 在使用绑定的时候，其中需要的路由键是BindingKey。涉及的客户端方法如：channel.exchangeBind、channel.queueBind，对应的AMQP命令（详情参见
  2.2节）为Exchange.Bind、Queue.Bind。
- 在发送消息的时候，其中需要的路由键是RoutingKey。涉及的客户端方法如
  channel.basicPublish，对应的AMQ命令为Basic.Publish。





### 交换器类型（路由规则）

- fanout：它会把所有发送到该交换器的消息路由到所有与该交换器绑定的队列中。
- direct：它会把消息路由到那些BindingKey和RoutingKey完全匹配的队列中。
- topic：也是消息路由到绑定和路由相匹配的队列，但不同的是
  - RoutingKey为一个点号“.”分隔的字符串（被点号“.”分隔开的每一段独立的字符串称为一个单词），如“com.rabbitmq.client'”、“java.util.concurrent”、“com.hidden.client”；
  - BindingKey和RoutingKey一样也是点号“.”分隔的字符串；
  - BindingKey中可以存在两种特殊字符串a星号和“#”，用于做模糊匹配，其中星号用于匹配一个单词，”#“用于匹配多个
- headers：headers类型的交换器不依赖于路由键的匹配规则来路由消息，而是根据发送的消息内容中的headers属性进行匹配。在绑定队列和交换器时制定一组键值对，当发送消息到交换器时，RabbitMQ会获取到该消息的headers（也是一个键值对的形式），对比其中的键值对是否完全匹配队列和交换器绑定时指定的键值对，如果完全匹配则消息会路由到该队列，否则不会路由到该队列。headers类型的交换器性能会很差，而且也不实用，基本上不会看到它的存在。



topic举例

- 路由键为“com.rabbitmg.client”的消息会同时路由到Queuel和Queue2；
- 路由键为“com.hidden.client”的消息只会路由到Queue2中；
- 路由键为“com.hidden.demo”的消息只会路由到Queue2中；
- 路由键为“java.rabbitmg.demo”的消息只会路由到Queuel中；
- 路由键为“java.util.concurrent”的消息将会被丢弃或者返回给生产者（需要设置mandatory参数），因为它没有匹配任何路由键。

![](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/topic%E8%B7%AF%E7%94%B1%E4%BA%A4%E6%8D%A2%E5%99%A8.png)







## 客户端开发向导



### 连接

指定

- IP
- HOST
- USERNAME
- PASSWORD

创建**Connection**，并创建**Channel**实例，Channel不能在线程间共享会有线程安全问题

通过isOpen判断是否处于开启状态



### 使用交换器和队列

```java
//创建一个type="direct"非排它非自动删除的交换器
channel.exchangeDeclare(EXCHANGE_NAME, "direct", true, false, null);
//创建一个持久化非排它非自动删除的交队列
channel.queueDeclare(QUEUE_NAME, true, false, false, null);
//将交换器与队列通过路由键进行绑定
channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
```

- 
  上面的代码也展示了如何使用路由键将队列和交换器绑定起来。
- 上面声明的队列具备如下特性：只对当前应用中同一个Connection层面`可用`，同一个Connection的不同Channel可共用，并且也会在应用连接断开时自动删除。
- 如果其他生产消费者声明一样的交换器或队列名字相同时只要属性相同就什么都不做，否则抛出异常



### 交换器声明方法属性

![image-20220101231901431](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E4%BA%A4%E6%8D%A2%E6%9C%BA%E6%96%B9%E6%B3%95%E5%B1%9E%E6%80%A7_1.png)

> autoDelete指的是当交换器至少有一个绑定的队列或交换器，且与之解绑时且autoDelete为true时自动删除，而不是与客户端断开连接就删除



### 队列申明方法属性

![image-20220102001031566](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E9%98%9F%E5%88%97%E5%A3%B0%E6%98%8E%E5%B1%9E%E6%80%A7.png)

> 生产者和消费者都能够使用queueDeclare来声明一个队列，但是如果消费者在同一个信道上订阅了另一个队列，就无法再声明队列了。必须先取消订阅，然后将信道置为“传输”，才能声明队列





### 交换器队列绑定方法属性

![image-20220102002534960](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E4%BA%A4%E6%8D%A2%E5%99%A8%E9%98%9F%E5%88%97%E7%BB%91%E5%AE%9A%E6%96%B9%E6%B3%95%E5%B1%9E%E6%80%A7.png)





### 交换器与交换器绑定

```java
channel.exchangeDeclare("source", BuiltinExchangeType.DIRECT);
channel.exchangeDeclare("destination", BuiltinExchangeType.FANOUT);
channel.exchangeBind("destination", "source", "exKey");
channel.queueBind(channel.queueDeclare().getQueue(), "destination", "");
channel.basicPublish("source", "exKey", null, "exToExDemo".getBytes());
```

生产者发送消息至交换器source中，交换器source根据路由键找到与其匹配的另一个交换器destination，并把消息转发到destination中，进而存储在destination绑定的队列queue中，可参考图3-1。

![image-20220102003824898](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/i%E4%BA%A4%E6%8D%A2%E5%99%A8%E4%B8%8E%E4%BA%A4%E6%8D%A2%E5%99%A8%E7%BB%91%E5%AE%9A.png)





### 发送消息方法属性

```java
//发送属性示例
channel.basicPublish(EXCHANGE_NAME, ROUTING_NAME, true, new AMQP.BasicProperties().builder()
                     .headers(Maps.newHashMap())
                     .contentType("text/plain")
                     .deliveryMode(2)
                     .priority(1)
                     .userId("hidden")
                     .expiration("6000")
                     .build(), "message_demo".getBytes());
```



![image-20220102183618810](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E6%96%B9%E6%B3%95%E5%B1%9E%E6%80%A7.png)



### 消费消息

RabbitMQ的消费模式分两种：

- 推（Push）模式：推模式采用Basic.Consume进行消费
- 和拉（Pull）模式：拉模式则是调用Basic.Get进行消费



常用一个Channel对应一个消费者



#### 推模式（订阅模式）

推模式可以通过持续订阅的方式等待消息队列推送消息并消费信息，相关类：

```java
import com.rabbitmq.client.Consumer;
import com.rabbitmg.client.DefaultConsumer;
```

接收消息一般通过实现Consumer接口或者继承DefaultConsumer类来实现。当调用与Consumer相关的API方法时，不同的订阅采用不同的消费者标签（consumerTag）来区分彼此，在同一个Channel中的消费者也需要通过唯一的消费者标签以作区分，关键消费代码如代码清单3-9所示。



Channel类中的basicConsume方法有如下形式

![image-20220102200123744](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E6%B6%88%E8%B4%B9%E6%B6%88%E6%81%AF%E6%8E%A8%E6%A8%A1%E5%BC%8F%E6%96%B9%E6%B3%95%E5%B1%9E%E6%80%A7.png)





#### 拉模式（主动消费）

这里讲一下拉模式的消费方式。通过channel.basicGet方法可以单条地获取消息，其返回值是GetRespone。Channel类的basicGet方法没有其他重载方法，只有：
GetResponse basicGet (String queue,boolean autoAck)throws IOException;其中queue代表队列的名称，如果设置autoAck为false，那么同样需要调用channel.basicAck来确认消息已被成功接收。拉模式的关键代码如代码清单3-10所示。

```java
Channel channel = RabbitMqUtils.getChannel();
GetResponse response = channel.basicGet(QUEUE, false);
System.out.println(new String(response.getBody()));
//设置autoAck为false需要basicAck来确认消息接收成功
channel.basicAck(response.getEnvelope().getDeliveryTag(), false);
```

> Basic.Consume将信道（Channel）置为接收模式即推模式，直到取消队列的订阅为止。在接收模式期间，RabbitMQ会不断地推送消息给消费者，当然推送消息的个数还是会受到Basic.Qos的限制。如果只想从队列获得单条消息而不是持续订阅，建议还是使用Basic.Get进行消费。但是不能将Basic.Get放在一个循环里来代替Basic.Consume，这样做会严重影响RabbitMQ的性能。如果要实现高吞吐量，消费者理应使用Basic.Consume方法。





### 消费者端确认与拒绝autoAck

为了保证消息从队列可靠地达到消费者，RabbitMQ提供了消息确认机制（messageacknowledgement）。消费者在订阅队列时，可以指定autoAck参数，

- 当autoAck等于false时，RabbitMQ会等待消费者显式地回复确认信号后才从内存（或者磁盘）中移去消息、（实质上是先打上删除标记，之后再删除）。
- 当autoAck等于true时，RabbitMQ会自动把发送出去的消息置为确认，然后从内存（或者磁盘）中删除，而不管消费者是否真正地消费到了这些消息。

采用消息确认机制后，只要设置autoAck参数为false，消费者就有足够的时间处理消息（任务），不用担心处理消息过程中消费者进程挂掉后消息丢失的问题，因为RabbitMQ会一直等待持有消息直到消费者显式调用Basic.Ack命令为止。

当autoAck参数置为false，对于RabbitMQ服务端而言，队列中的消息分成了两个部分：

- 一部分是等待投递给消费者的消息

- 一部分是已经投递给消费者

但是还没有收到消费者确认信号的消息。如果RabbitMQ一直没有收到消费者的确认信号，并且消费此消息的消费者已经断开连接，则RabbitMQ会安排该消息重新进入队列，等待投递给下一个消费者，当然也有可能还是原来的那个消费者。且RabbitMQ不会为其设置过期时间

![image-20220102212838391](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E6%9F%A5%E7%9C%8Bready.png)



#### 消息拒绝

RabbitMQ在2.O.0版本开始引入了Basic.Reject这个命令，消费者客户端可以调用与其对应的channel.basicReject方法来告诉RabbitMQ拒绝这个消息。

Channel类中的basicReject方法定义如下：void basicReject (long deliveryTag,boolean requeue)throws IOException;

其中deliveryTag可以看作消息的编号，它是一个64位的长整型值，最大值是9223372036854775807。

- 如果requeue参数设置true，则RabbitMQ会重新将这条消息存入队列，以便可以发送给下一个订阅的消费者；
- 如果requeue参数设置为false，则RabbitMQ立即会把消息从队列中移除，而不会把它发送给新的消费者。

Basic.Reject命令一次只能拒绝一条消息，如果想要批量拒绝消息，则可以使用

Basic.Nack这个命令。消费者客户端可以调用channel.basicNack方法来实现，方法定义如下：

```java
void basicNack (long deliveryTag,boolean multiple,boolean requeue)
```

其中 deliverytag和 requeue的含义可以参考 basicreject方法。 

- multiple参数设置为 false则表示拒绝编号为 deliverytag的这一条消息，这时候 basicnack和basicreject方法一样； 
- multiple参数设置为tue则表示拒绝 deliverytag编号之前所有未被当前消费者确认的消息。



#### 消息恢复

这个 channel. basicrecover方法用来请求 Rabbitmq重新发送还未被确认的消息。如果 requeue参数设置为true，则未被确认的消息会被重新加入到队列中，这样对于同一条消息来说，可能会被分配给与之前不同的消费者。如果 requeue参数设置为 false，那么同一条消息会被分配给与之前相同的消费者。默认情况下，如果不设置 requeue这个参数，相当于channe. basicrecover（true），即 requeue默认为tue



### 关闭连接

```java
channel.close()
//conn关闭channel也会关闭
conn.close()
```

连接和信道状态

- Open：开启状态，代表当前对象可以使用。
- Closing：正在关闭状态。当前对象被显式地通知调用关闭方法（ shutdown），这样就产生了一个关闭请求让其内部对象进行相应的操作，并等待这些关闭操作的完成。
- Closed：已经关闭状态。当前对象已经接收到所有的内部对象已完成关闭动作的通知，并且其也关闭了自身。



同时还有对应的其他方法



## 消息何去何从（未路由消息处理）



### mandatory&immediate

mandatory和 immediate是 `channel.basicpublish`方法中的两个参数，它们都有当消息传递过程中不可达目的地时将消息返回给生产者的功能。 

概括来说：

- mandatory：参数告诉服务器至少将该消息路由到一个队列中，否则将消息返回给生产者。
- immediate：参数告诉服务器，如果该消息关联的队列上有消费者，则立刻投递如果所有匹配的队列上都没有消费者，则直接将消息返还给生产者，不用将消息存入队列而等待消费者了。



Rabbitmq提供的备份交换器（ Alternate Exchange）可以将未能被交换器路由的消息（没有绑定队列或者没有匹配的绑定）存储起来，而不用返回给客户端



### mandatory

- true：交换器无法根据自身类型和路由键找到符合的队列，那么 Rabbitmq会调用 Basic.Return命令将消息返回给生产者
- false：当 mandatory参数设置为 false时，出现上述情形，则消息直接被丢弃。



拿回返回来的消息可以用`channel.addReturnListener`添加`ReturnListener`监听器来实现

```java
@Test
public void mandatory() throws Exception {
  Channel channel = RabbitMqUtils.getChannel();
  //- true：交换器无法根据自身类型和路由键找到符合的队列，那么 Rabbitmq会调用 Basic.Return命令将消息返回给生产者
  //- false：当 mandatory参数设置为 false时，出现上述情形，则消息直接被丢弃。
  channel.basicPublish(EXCHANGE_NAME, "54343", true, MessageProperties.PERSISTENT_TEXT_PLAIN, "mandatory_msg".getBytes());
  channel.addReturnListener((replyCode, replyText, exchange, routingKey, properties, body) -> {
    String message = new String(body);
    System.out.println("Basic.Return返回的结果是 ：" + message);
  });
}
```



![image-20220103131152641](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/mandatory%E5%8F%82%E6%95%B0.png)



### immediate

已不支持，影响镜像队列性能，建议采用TTL和DLX方法替代





### 备份交换机

生产者在发送消息的时候如果不设置 mandatory参数，那么消息在未被路由的情况下将会丢失；如果设置了 mandatory参数，那么需要添加 Returnlistener的编程逻辑，生产者的代码将变得复杂。

如果既不想复杂化生产者的编程逻辑，又不想消息丢失，那么可以使用备份交换器，这样可以将未被路由的消息存储在 Rabbitmq中，再在需要的时候去处理这些消息。

```java
@Test
public void alternateExchange() throws Exception {
  Channel channel = RabbitMqUtils.getChannel();
  HashMap<String, Object> args = Maps.newHashMap();
  args.put("alternate-exchange", "alternate_exchange");
  channel.exchangeDeclare("normal_exchange", BuiltinExchangeType.DIRECT, true, false, args);
  channel.exchangeDeclare("alternate_exchange", BuiltinExchangeType.FANOUT, true, false, null);
  channel.queueDeclare("normal_queue", true, false, false, null);
  channel.queueBind("normal_queue", "normal_exchange", "normal_key");
  channel.queueDeclare("unRoute_queue", true, false, false, null);
  channel.queueBind("unRoute_queue", "alternate_exchange", "");

}
```

声明了两个交换机normal和alternate，分别绑定队列normal和unroute，同时将alternate设置为normal的备份交换机。如果发送消息到Normal上未路由到正确队列，则会发送给备用交换机的队列。为了方便使用备份交换机设置为`fanout`类型

> 消息被重新您发送到备份时的`路由键`和从生产者发出的路由键一样，如果设置备份交换机为direct且没有路由到队列消息也会丢失

![image-20220103141226407](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E5%A4%87%E4%BB%BD%E4%BA%A4%E6%8D%A2%E6%9C%BA.png)



可能的情况

- 如果设置的备份交换器不存在，客户端和 Rabbitmq服务端都不会有异常出现，此时消息会丢失。

- 如果备份交换器没有绑定任何队列，客户端和 Rabbitmq服务端都不会有异常出现，此时消息会丢失。
- 如果备份交换器没有任何匹配的队列，客户端和 Rabbitmq服务端都不会有异常出现，此时消息会丢失。
- 如果备份交换器和`mandatory`参数一起使用，那么mandatory参数`无效`。



## 过期时间(TTL)

RabbitMQ可以对消息和队列设置TTL。

- 消息的过期：指限定时间内没有被消费
- 队列的过期：指删除前除于未使用状态的时间



### 设置消息TTL

目前有两种方法可以设置消息的TTL。

- 第一种方法是通过队列属性设置，队列中所有消息都有相同的过期时间。
- 第二种方法是对消息本身进行单独设置，每条消息的TTL可以不同。

如果两种方法一起使用，则消息的TTL以`两者之间较小的那个数值为准`。消息在队列中的生存时间一旦超过设置的TTL值时，就会变成`死信（ Dead Message）`，消费者将无法再收到该消息（这点不是绝对的，可以参考4.3节）。



设置方法一：

```java
@Test
public void timeToLive() throws Exception {
  Channel channel = RabbitMqUtils.getChannel();
  HashMap<String, Object> args = Maps.newHashMap();
  args.put("x-message-ttl", 6000);
  //1.声明队列过期
  channel.queueDeclare(QUEUE_NAME, true, false, false, args);
}
```

还可以通过Policy和HTTP API接口设置。

- 如果不设置TTL，则表示此消息不会过期；
- 如果将TTL设置为0，则表示除非此时可以直接将消息投递到消费者，否则该消息会被立即丢弃，这个特性可以部分替代 Rabbitmq3.0版本之前的 immediate参数，之所以部分代替，是因为 immediate参数在投递失败时会用Basic. Return将消息返回（这个功能可以用死信队列来实现，详细参考4.3节）。



设置方法二：

针对每条消息设置TTL的方法是在 channel. basicpublish方法中加入 expiration的属性参数，单位为毫秒。

```java
channel.basicPublish("", "ttl_queue", new AMQP.BasicProperties().builder()
                     .deliveryMode(2)
                     .expiration("6000")
                     .build(), MSG.getBytes());
```



判定时机的区别：

- 对于第一种设置队列TL属性的方法，一旦消息过期，就会从队列中抹去
- 而在第二种方法中，即使消息过期，也不会马上从队列中抹去，因为考虑到可能各个消息TTL不同需要扫描整个队列，所以在即将投递到消费者之前判定是否过期然后抹掉

区别原因：

- 因为第一种方法里，队列中己过期的消息肯定在队列头部， Rabbitmq只要定期从队头开始扫描是否有过期的消息即可。
- 而第二种方法里，每条消息的过期时间不同，如果要删除所有过期消息势必要扫描整个队列，所以不如等到此消息即将被消费时再判定是否过期，如果过期再进行删除即可即懒加载



### 设置队列TTL

通过声明队列时的参数`x-expires`参数可以控制队列被自动删除前处于`未使用状态`的时间。未使用的意思是：

- 队列上没有任何的消费者
- 队列也没有被重新声明
- 在过期时间段内也未调用过 Basic.Get命令

设置队列里的TTL可以应用于类似RPC方式的回复队列，在RPC中，许多队列会被创建出来，但是却是未被使用的。

Rabbitmq会确保在过期时间到达后将队列删除，但是不保障删除的动作有多及时。在Rabbitmq重启后，持久化的队列的过期时间会被重新计算。

用于表示过期时间的x- expires参数以毫秒为单位，并且服从和x- message-ttl一样的约束条件，不过不能设置为0。比如该参数设置为1000，则表示该队列如果在1秒钟之内未使用则会被删除





## 死信队列

DLX，全称为 Dead-letter-Exchange，可以称之为死信交换器，也有人称之为死信邮箱。当消息在一个队列中变成死信（ dead message）之后，它能被重新被发送到另一个交换器中，这个交换器就是DLX，绑定DLX的队列就称之为死信队列。



### 消息成为死信的情况

- 消息被拒绝（ Basic.Reject/ Basic.Nack）并且设置 requeue参数为 false
- 消息过期
- 队列达到最大长度。



DLX也是一个正常的交换器，和一般的交换器没有区别，它能在任何的队列上被指定，实际上就是设置某个队列的属性。当这个队列中存在死信时， Rabbitmq就会自动地将这个消息重新发布到设置的DLX上去，进而被路由到另一个队列，即死信队列。

可以监听这个队列中的消息以进行相应的处理，这个特性与将消息的TTL设置为0配合使用可以弥补 `immediate`参数的功能。

通过在 `channe.queuedeclare`方法中设置`x-dead-letter-exchange`参数来为这个队列添加DLX（代码清单4-7中的d1_exchange）

```java
@Test
public void dlx() throws Exception {
  Channel channel = RabbitMqUtils.getChannel();
  //声明死信交换器
  channel.exchangeDeclare("dlx_exchange", BuiltinExchangeType.DIRECT);
  HashMap<String, Object> args = Maps.newHashMap();
  args.put("x-dead-letter-exchange", "dlx_exchange");
  //死信交换器的路由，不指定则用生产者发送消息是的路由
  args.put("x-dead-letter-routing-key", "dlx_routing_key");
  //给队列添加DLX
  channel.queueDeclare("dlx_queue", true, false, false, args);

}
```



### 示例

```java
/**
     * @description: ttl和dlx示例,消息过期后会被发送到死信交换器绑定的死信队列
     **/
@Test
public void ttlAndDlx() throws Exception {
  Channel channel = RabbitMqUtils.getChannel();
  //声明死信交换器
  channel.exchangeDeclare("exchange.dlx", BuiltinExchangeType.DIRECT, true);
  //声明普通交换机
  channel.exchangeDeclare("exchange.normal", BuiltinExchangeType.FANOUT, true);
  HashMap<String, Object> args = Maps.newHashMap();
  args.put("x-message-ttl", 10000);
  args.put("x-dead-letter-exchange", "exchange.dlx");
  args.put("x-dead-letter-routing-key", "routingKey");
  channel.queueDeclare("queue.normal", true, false, false, args);
  channel.queueBind("queue.normal", "exchange.normal", "");
  channel.queueDeclare("queue.dlx", true, false, false, null);
  channel.queueBind("queue.dlx", "exchange.dlx", "routingKey");
  channel.basicPublish("exchange.normal", "", MessageProperties.PERSISTENT_TEXT_PLAIN, "dlx_1".getBytes());
}
```



![image-20220103211442199](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E6%AD%BB%E4%BF%A1%E9%98%9F%E5%88%97.png)



对于 Rabbitmq来说，DLX是一个非常有用的特性。它可以处理异常情况下，消息不能够被消费者正确消费（消费者调用了 Basic.Nack或者 Basic. Reject）而被置入死信队列中的情况，后续分析程序可以通过消费这个死信队列中的内容来分析当时所遇到的异常情况，进而可以改善和优化系统。DLX配合TTL使用还可以实现延迟队列的功能，详细请看下一节。



## 延迟队列

延迟队列存储的对象是对应的延迟消息，所谓“延迟消息”是指当消息被发送以后，并不想让消费者立刻拿到消息，而是等待特定时间后，消费者才能拿到这个消息进行消费。延迟队列的使用场景有很多，比如：

- 在订单系统中，一个用户下单之后通常有30分钟的时间进行支付，如果30分钟之内没有支付成功，那么这个订单将进行异常处理，这时就可以使用延迟队列来处理这些订单了。
- 用户希望通过手机远程遥控家里的智能设备在指定的时间进行工作。这时候就可以将用户指令发送到延迟队列，当指令设定的时间到了再将指令推送到智能设备。



在AMQP中本身不支持延迟队列，但是可以通过DLX和TTL模拟延迟队列，即消费者订阅死信队列，然后生产者发送消息指定TTL到TTL后消息就能进入死信队列，消费者刚好能消费这个延迟了TTL的消息

![image-20220108184812049](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/image-20220108184812049.png)



## 优先级队列

指队列和消息的优先级，优先级高的消息具备优先被消费的特权

- 消息队列优先级：可以通过`x-max-priority`设置
- 消息优先级：通过prop参数设置，默认最低优先级0，最高位队列设置的最大优先级，优先级高可以被优先消费，这里的优先级比较是队列中的值而不包括准备发送的消息

```java
/**
     * @description: 优先级队列
     **/
@Test
public void priorityQueue() throws Exception {
  Channel channel = RabbitMqUtils.getChannel();
  Map<String, Object> args = Maps.newHashMap();
  //声明优先级
  args.put("x-max-priority", 10);
  channel.queueDeclare("queue.priority", true, false, false, args);
  //设置消息优先级
  channel.basicPublish("", "",
                       new AMQP.BasicProperties().builder()
                       //默认最小是0
                       .priority(5)
                       .build(), "message".getBytes());
}
```

![image-20220108233051589](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E4%BC%98%E5%85%88%E7%BA%A7%E9%98%9F%E5%88%97.png)



## RPC实现

一般在RabbitMQ中进行RPC是很简单。客户端发送请求消息，服务端回复响应的消息。

为了接收响应的消息，我们需要在请求消息中发送一个回调队列（参考下面代码中的`replyTo`）。可以使用默认的队列，具体示例代码如代码清单4-11所示。

```java
/**
     * @description: rpc调用且回调
     **/
@Test
public void rpc() throws Exception {
  Channel channel = RabbitMqUtils.getChannel();
  String callbackQueueName = channel.queueDeclare().getQueue();
  channel.basicPublish("", "rpc_queue", new AMQP.BasicProperties.Builder()
                       //回调队列接收响应的消息
                       .replyTo(callbackQueueName)
                       .build(),
                       "message".getBytes());
}
```



对于代码中涉及的BasicProperties这个类，这里就用到两个属性。

- replyTo：通常用来设置一个回调队列。
- correlationId：用来关联请求（request）和其调用RPC之后的回复（response）。

如果像上面的代码中一样，为每个RPC请求创建一个回调队列，则是非常低效的。但是幸运的是这里有一个通用的解决方案——**可以为每个客户端创建一个单一的回调队列**。这样就产生了一个新的问题，对于回调队列而言，在其接收到一条回复的消息之后，它并不知道这条消息应该和哪一个请求匹配。

这里就用到`correlationId`这个属性了，我们应该为每一个请求设置一个唯一的`correlationId`。之后在回调队列接收到回复的消息时，可以根据这个属性匹配到相应的请求。如果回调队列接收到一条未知`correlationId`的回复消息，可以简单地将其丢弃。

![image-20220109180122979](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/rabbitmq-rpc.png)

RPC处理流程如下：

- 当客户端启动时，创建一个匿名的回调队列（名称由RabbitMQ自动创建）。
- 客户端为RPC请求设置2个属性：replyTo用来告知RPC服务端回复请求时的目的队列，即回调队列；correlationId用来标记一个请求。
- 请求被发送到rpc queue队列中。
- RPC服务端监听rpc_queue队列中的请求，当请求到来时，服务端会处理并且把带有结果的消息发送给客户端。接收的队列就是replyTo设定的回调队列。
- 客户端监听回调队列，当有消息时，检查correlationId属性，如果与请求匹配，那就是结果了。



## 持久化



- 交换机持久化：声明时设置`durable`参数为true，不设置持久化重启关闭时消息不会丢失，但是相关的交换器元数据会丢失，不能将消息发送到这个交换器了
- 队列持久化：声明时设置`durable`参数为true，不设置持久化重启关闭时消息会丢失
- 消息持久化：投递时将消息的`deliveryMode`属性设置为2即可持久化，如果只是队列持久化当重启后消息会丢失，如果消息持久化但是队列没持久化name消息也会丢失

> 可以将所有的消息都设置为持久化，但是这样会严重影响RabbitMO的`性能`（随机）。写入磁盘的速度比写入内存的速度慢得不只一点点。对于可靠性不是那么高的消息可以不采用持久化处理以提高整体的吞吐量。在选择是否要将消息持久化时，需要在可靠性和吐吞量之间做一个权衡



如果都设置持久化并不意味着数据不会丢失，当订阅消息队列时设置`autoAck`为true时消费者这边没及时消费那么就会丢失消息



### 镜像队列

其次，在持久化的消息正确存入RabbitMQ之后，还需要有一段时间（虽然很短，但是不可忽视）才能存入磁盘之中。RabbitMQ并不会为每条消息都进行同步存盘（调用内核的fsync方法）的处理，可能仅仅保存到`操作系统缓存`之中而不是物理磁盘之中。如果在这段时间内RabbitMQ服务节点发生了宕机、重启等异常情况，消息保存还没来得及落盘，那么这些消息将丢失。



RabbitMQ的镜像队列机制相当于配置了副本主节点和从节点，实际生产环境的关键业务业务队列也会设置镜像队列，还可以在发送端引入`事务机制`或者`发送方确认机制`来保证消息已经正确地发送并存储至RabbitMQ中，前提还要保证在调用`channel.basicPublish`方法的时候交换器能够将消息正确路由到相应的队列之中。



## 生产者确认

除了消费者确认应答机制，还要确保生产者这边到底有没有正确把消息发送到`消息队列的交换器`中去，默认情况生产者发送消息服务器不会返回任何消息给生产者，有以下方式



- 通过事务机制
- 通过发送方确认机制



> - 两者不能共存
> - 这里的确认消息发送到RabbitMQ是指消息被正确的发往RabbitMQ的交换器，如果交换器没有匹配的队列消息也可能会丢失，配合mandory参数或备份交换器使用



### 事务机制

相关的方法有三个

- channel.txSelect：将当前信道设置成事务模式
- channel.txCommit：用于提交事务
- channel.txRollback：用于事务回滚

在通过channel.txSelect方法开启事务之后，我们便可以发布消息给RabbitMQ了：

- 如果事务提交成功，则消息一定到达了RabbitMQ中
- 如果在事务提交执行之前由于RabbitMQ异常崩溃或者其他原因抛出异常，这个时候我们便可以将其捕获，进而通过执行channel.txRollback方法来实现事务回滚。

> 注意这里的RabbitMQ中的事务机制与大多数数据库中的事务概念并不相同，需要注意区分。
>
> 事务机制在一条消息发送后会使发送端阻塞，以等待Rabbitmq回应，之后才能发送下一条消息

```java
/**
     * @description: 事务
     **/
@Test
public void transaction() throws Exception {
  Channel channel = RabbitMqUtils.getChannel();
  //将信道设置为事务模式
  channel.txSelect();
  channel.basicPublish(EXCHANGE_NAME, ROUTING_KEY, MessageProperties.PERSISTENT_TEXT_PLAIN, "transaction".getBytes());
  //提交事务
  channel.txCommit();
}
```



流程如下

![image-20220110154800172](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/rabbitmq%E4%BA%8B%E5%8A%A1.png)



- 客户端发送Tx.Select，将信道置为事务模式：
- Broker回复Tx.Select-Ok，确认已将信道置为事务模式；
- 在发送完消息之后，客户端发送Tx.Commit提交事务；
- Broker回复Tx.Commit-Ok，确认事务提交。



#### 事务回滚

```java
/**
     * @description: 事务
     **/
@Test
public void transaction() throws Exception {
  Channel channel = RabbitMqUtils.getChannel();
  //将信道设置为事务模式
  channel.txSelect();
  for (int i = 0; i < 10; i++) {
    try {
      channel.basicPublish(EXCHANGE_NAME, ROUTING_KEY, MessageProperties.PERSISTENT_TEXT_PLAIN, "transaction".getBytes());
      //异常
      int result = 1 / 0;
      //提交事务
      channel.txCommit();
    } catch (Exception e) {
      e.printStackTrace();
      //在事务提交之前铺捉到异常并回滚
      channel.txRollback();
    }
  }

}
```



![image-20220110160010989](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E4%BA%8B%E5%8A%A1%E5%9B%9E%E6%BB%9A.png)





### 发送确认机制

使用事务机制会使RabbitMQ性能有损失造成吞吐量下降，所以有发送确认机制。

生产者将信道设置成`confirm（确认）模式`，一旦信道进入confirm模式，所有在该信道上面发布的消息都会被指派一个唯一的ID（从1开始），一旦消息被投递到所有匹配的队列之后，RabbitMQ就会发送一个确认（Basic.Ack）给生产者（包含消息的唯一ID），这就使得生产者知晓消息已经正确到达了目的地了。

> 如果消息和队列是可持久化的，那么确认消息会在消息写入磁盘之后发出。

RabbitMQ回传给生产者的确认消息中的`deliveryTag`包含了确认消息，此外RabbitMQ也可以设置channel.basicAck方法中的`multiple`参数，表示到这个序号之前的所有消息都已经得到了处理，可以参考图4-10。注意辨别这里的确认和消费时候的确认之间的异同。



![image-20220110171845530](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E5%8F%91%E9%80%81%E6%96%B9%E7%A1%AE%E8%AE%A4%E6%9C%BA%E5%88%B6.png)

事务机制在一条消息发送之后会使发送端阻塞，以等待RabbitMQ的回应，之后才能继续发送下一条消息。

相比之下，发送方确认机制最大的好处在于它是`异步`的，一旦发布一条消息，生产者应用程序就可以在等信道返回确认的同时继续发送下一条消息，当消息最终得到确认之后，生产者应用程序便可以通过`回调方法`来处理该确认消息，如果RabbitMQ因为自身内部错误导致消息丢失，就会发送一条`nack（Basic.Nack）`命令，生产者应用程序同样可以在回调方法中处理该nack命令。



#### 使用

- 生产者通过调用`channel.confirmSelect`方法（即Confirm.Select命令）将信道设置为`confirm`模式
- 之后RabbitMQ会返回Confirm.Select-Ok命令表示同意生产者将当前信道设置为confirm模式。
- 所有被发送的后续消息都被ack或者nack一次，不会出现一条消息既被ack又被nack的情况，并且RabbitMQ也并没有对消息被confirm的快慢做任何保证。



确认方式

- 单个同步确认：每发送一个消息就调用`channel.waitForConfirms`，这时候是同步串行化的
- 批量确认：每发送一批消息后，再调用`channel.waitForConfirms`方法，等待服务器确认返回。当出现Nack或超时情况，客户端需要将这一批次消息重发，带来明显的重复消息数量，且经常消息丢失时，批量confirm性能不升反降
- 异步确认：提供回调方法，服务端确认了一条或者多条消息后客户端会回调方法处理



单个同步确认&批量确认：

```java
/**
     * @description: 发送者确认：发送确认机制(单个同步确认，批量确认)
     **/
@Test
public void confirm() throws Exception {
  Channel channel = RabbitMqUtils.getChannel();
  //设置为确认模式
  channel.confirmSelect();

  //单个同步确认
  for (int i = 0; i < 5; i++) {
    String message = i + "producer confirm";
    channel.basicPublish(EXCHANGE_NAME, ROUTING_KEY, null, message.getBytes());
    //服务端返回 false 或超时时间内未返回，生产者可以消息重发
    if (channel.waitForConfirms()) {
      System.out.println("消息发送成功");
    } else {
      System.out.println("消息发送失败");
    }
  }

  //批量确认
  for (int i = 0; i < 5; i++) {
    String message = i + "producer confirm";
    channel.basicPublish(EXCHANGE_NAME, ROUTING_KEY, null, message.getBytes());
  }
  if (channel.waitForConfirms()) {
    System.out.println("消息批量发送成功");
  } else {
    System.out.println("消息批量发送失败");
    //重新批量发送消息
  }
}
```



![image-20220110181136940](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E5%8F%91%E9%80%81%E5%A4%9A%E6%9D%A1%E6%B6%88%E6%81%AF%E5%8F%91%E9%80%81%E7%A1%AE%E8%AE%A4%E6%A8%A1%E5%BC%8F.png)



异步确认：

异步confirm方法的编程实现最为复杂。在客户端Channel接口中提供的`addConfirmListener`方法可以添加`ConfirmListener`这个回调接口，这个ConfirmListener接口包含两个方法：`handleAck`和`handleNack`，分别用来处理
RabbitMQ回传的`Basic.Ack`和`Basic.Nack`。在这两个方法中都包含有一个参数`deliveryTag`（在publisher confirm模式下用来标记消息的唯一有序序号）。我们需要为每一个信道维护一个已发送未确认的消息序号集合，

- 在发送时根据channel.getNextPublishSeqNo()获取发送消息时的`deliveryTag`并插入
- 在回调方法中根据返回的`deliveryTag`去移除集合中的消息或标记其已确认

集合最好采用`SortedSet`维护消息序号，`waitForConfirms`也是通过`Sortedset`来维护消息序号

```java
/**
     * @description: 发送者确认：发送确认机制(异步确认)
     **/
@Test
public void confirmAsync() throws Exception {
  Channel channel = RabbitMqUtils.getChannel();
  channel.queuePurge(QUEUE_NAME);
  channel.confirmSelect();
  /*
         * 线程安全跳跃表
         * 1.map能将序号与消息进行关联
         * 2.轻松批量删除条目根据序号
         * 3.线程安全并发
         * */
  //已发送未确认的消息
  ConcurrentSkipListMap<Long, String> outstandingConfirm = new ConcurrentSkipListMap<Long, String>();

  // 消息确认成功，回调函数
  ConfirmCallback ackCallback = (deliverTag, multiple) -> {
    // 如果是批量的,就批量清除
    if (multiple) {
      outstandingConfirm.headMap(deliverTag, true).clear();
    } else {
      outstandingConfirm.remove(deliverTag);
    }
    System.out.println("消息确认成功：" + deliverTag);
  };
  /*
         * 1. 消息的标记
         * 2. 是否为批量确认
         * */
  ConfirmCallback nackCallback = (deliverTag, multiple) -> {
    String message = outstandingConfirm.get(deliverTag);
    System.out.println("未确认的消息：" + deliverTag);
  };

  /*
         * 消息监听器
         * 1. 监听那些成功了
         * 2. 监听那些失败了
         * */
  channel.addConfirmListener(ackCallback, nackCallback);
  for (int i = 0; i < 10; i++) {
    String message = String.valueOf(i);
    outstandingConfirm.put(channel.getNextPublishSeqNo(), message);
    channel.basicPublish(EXCHANGE_NAME, ROUTING_KEY, null, message.getBytes());
  }
  System.out.println("发布" + 10 + "个异步确认消息");
}

```





#### watiForConfirm

如果没有开启confirm模式调用任何watiForConfirm都会报错。

```java
/**
 * Wait until all messages published since the last call have been
 * either ack'd or nack'd by the broker.  Note, when called on a
 * non-Confirm channel, waitForConfirms throws an IllegalStateException.
 * @return whether all the messages were ack'd (and none were nack'd)
 * @throws java.lang.IllegalStateException
 */
boolean waitForConfirms() throws InterruptedException;

/**
 * Wait until all messages published since the last call have been
 * either ack'd or nack'd by the broker; or until timeout elapses.
 * If the timeout expires a TimeoutException is thrown.  When
 * called on a non-Confirm channel, waitForConfirms throws an
 * IllegalStateException.
 * @return whether all the messages were ack'd (and none were nack'd)
 * @throws java.lang.IllegalStateException
 */
boolean waitForConfirms(long timeout) throws InterruptedException, TimeoutException;

/** Wait until all messages published since the last call have
 * been either ack'd or nack'd by the broker.  If any of the
 * messages were nack'd, waitForConfirmsOrDie will throw an
 * IOException.  When called on a non-Confirm channel, it will
 * throw an IllegalStateException.
 * @throws java.lang.IllegalStateException
 */
 void waitForConfirmsOrDie() throws IOException, InterruptedException;

/** Wait until all messages published since the last call have
 * been either ack'd or nack'd by the broker; or until timeout elapses.
 * If the timeout expires a TimeoutException is thrown.  If any of the
 * messages were nack'd, waitForConfirmsOrDie will throw an
 * IOException.  When called on a non-Confirm channel, it will
 * throw an IllegalStateException.
 * @throws java.lang.IllegalStateException
 */
void waitForConfirmsOrDie(long timeout) throws IOException, InterruptedException, TimeoutException;
```

`waitForConfirmsOrDie`在接收到RabbitMQ返回的Basic.Nack之后会抛出`IoException`异常



### 比较

四种方式比较

![image-20220110223704926](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E7%94%9F%E4%BA%A7%E8%80%85%E7%A1%AE%E8%AE%A4%E5%9B%9B%E7%A7%8D%E6%96%B9%E5%BC%8FQPS%E6%AF%94%E8%BE%83.png)



可以看到批量confirm和异步confirm这两种方式所呈现的性能要比其余两种好得多。

事务机制和普通confirm的方式吐吞量很低，但是编程方式简单，不需要在客户端维护状态（这里指的是维护deliveryTag及缓存未确认的消息）

批量confirm方式的问题在于遇到RabbitMQ服务端返回Basic.Nack需要重发批量消息而导致的性能降低。异步confirm方式编程模型最为复杂，而且和批量confirm方式一样需要在客户端维护状态。

在实际生产环境中采用何种方式，这里就仁者见仁智者见智了，不过**强烈建议读者使用异步confirm的方式**。





## 消费端要点

对于消费者有几点要注意

- 消息分发
- 消息顺序性
- 弃用QueueingConsumer



### 消息分发

当RabbitMQ队列拥有多个消费者时，队列收到的消息将以`轮询（round-robin）`的分发方式发送给消费者。每条消息只会发送给订阅列表里的一个消费者。这种方式非常适合扩展，而且它是专门为并发程序设计的。如果现在负载加重，那么只需要创建更多的消费者来消费处理消息即可。   

轮询的方式在消费者处理性能方面不能做到好的均衡，有些消费者处理慢有些处理快造成整体吞吐量下降，可以用到`channel.basicQos(int prefetchCount)`这个方法，**允许限制信道上的消费者所能保持的最大未确认消息数量**。

举例说明，在订阅消费队列之前，消费端程序调用了`channel.basicQos(5)`，之后订阅了某个队列进行消费。RabbitMO会保存一个消费者的列表，每发送一条消息都会为对应的消费者计数，如果达到了所设定的上限，那么RabbitMQ就不会向这个消费者再发送任何消息。直到消费者确认了某条消息之后，RabbitMQ将相应的计数减l，之后消费者可以继续接收消息，直到再次到达计数上限。这种机制可以类比于TCP/IP中的“滑动窗口”。

> basicQos对于拉模式无效
>
> basicQos设置为0则无上限



channel.basicQos方法

![image-20220114140010010](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/basicQos.png)

参数

- prefetchCount：允许限制信道上的消费者所能保持的最大未确认消息数量，设置为0无上限

- prefetchCount：消息本身大小限制，设置为0无上限

- grobal：

  对于一个信道来说，它可以同时消费多个队列，当设置了`prefetchCount`大于0时，这个信道需要和各个队列协调以确保发送的消息都没有超过所限定的prefetchCount的值，这样会使RabbitMQ的性能降低，尤其是这些队列分散在集群中的多个Broker节点之中。RabbitMQ为了提升相关的性能，在AMQP0-9-1协议之上重新定义了global这个参数，对比如表4-1所示。

  ![image-20220114141718769](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/grobal%E5%8F%82%E6%95%B0%E5%AF%B9%E6%AF%94.png)

> global为true时是对整个信道的未确认数量总和做限制和共享



示例

![image-20220114150921343](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E5%A4%9A%E4%B8%AAglobal.png)

那么这里每个消费者最多只能收到`3个`未确认的消息，两个消费者能收到的未确认的消息个数之和的上限为`5个`。在未确认消息的情况下，如果consumerl接收到了消息、1、2和3，那么consumer2至多只能收到11和12.如果像这样同时使用两种global的模式，则会增加RabbitMQ的负载，因为RabbitMQ需要更多的资源来协调完成这些限制。

如无特殊需要，最好只使用global为false的设置，这也是默认的设置。





### 消息顺序性

指消费者消费到的消息和发送者发布的消息顺序一致。

理想情况下消息是顺序性的，下面一些情况RabbitMQ的顺序性会被打破：

- 生产者使用`事务机制`或`确认模式`，发送消息后遇到异常进行消息补偿发送，此时需要重新补偿发送消息，补偿消息是另一个线程实现此时顺序就会打乱
- 生产者设置不同的消息TTL且设置死信队列，此时消费者消息死信队列的消费顺序和生产者发送消息的顺序不一致
- 生产者设置不同的消息优先级
- 多个消费者消费时，有消费者拒绝且设置requeue为true，此时其他消费者会消费这个被拒绝重新入队的消息



解决办法

需要业务方使用RabbitMQ做进一步处理，比如在消息体内添加全局有序标识符(类似Sequence ID)





### 弃用QueueingConsumer

内存溢出问题，底层使用的是`LinkedBlockingQueue`，通过设置BasicQos来解决，除此之外还有其他缺陷：

- QueueingConsumer会拖累同一个Connection下的所有信道，使其性能降低；
- 同步递归调用QueueingConsumer会产生死锁；
- RabbitMQ的自动连接恢复机制（automatic connection recovery）不支持QueueingConsumer的这种形式；
- QueueingConsumer不是事件驱动的。

为了避免不必要的麻烦，建议在消费的时候尽量使用继承DefaultConsumer的方式，





## 消息传输保障

消息传输保障分为三个层级

- At most once：最多一次。消息可能会丢失，但绝不会重复传输。
- At least once：最少一次。消息绝不会丢失，但可能会重复传输。
- Exactly once：恰好一次。每条消息肯定会被传输一次且仅传输一次。



RabbitMQ支持最多一次和最少一次，投递要考虑以下几个方面内容去保障消息

- 生产者要开启事务机制或者生产者确认机制，确保消息可靠地传输到RabbitMQ中
- 生产者需要配合使用mandatory参数或者备份交换器来确保消息能够从交换器路由到队列中，进而保存下来不被丢弃
- 消息和队列都要持久化处理，以确保RabbitMQ服务器在遇到异常情况时不会消息丢失
- 消费者在消费消息的同时需要将`autoAck`设置为`false`，然后通过手动确认的方式去确认已经正确消费的消息，避免在消费端消息丢失



### 恰好一次

RabbitMQ无法保障恰好一次，有两种情况重复消费情况

- 消费者这边发送Basic.Ack的这时候网络断开，此时RabbitMQ没有收到命令且断开后就会重新将消息入队，此时这条消息就会被`重复消费`
- 生产者使用生产者确认机制时，此时网络断开，生产者做异常处理重新发送消息，此时RabbitMQ就会有两个一样的消息，造成`重复消费`



目前主流消息中间件没有去重机制，去重处理一般在客户端实现，比如`GUID`，可能需要借助集中式缓存去存储然后去重





## RabbitMQ管理



### 多用户和权限

每一个RabbitMO服务器都能创建虚拟的消息服务器，我们称之为虚拟主机（virtual host），简称为vhost.

每一个vhost本质上是一个独立的小型RabbitMQ服务器，拥有自己独立的队列、交换器及绑定关系等，并且它拥有自己独立的权限。vhost就像是虚拟机与物理服务器一样，它们在各个实例间提供逻辑上的分离，为不同程序安全保密地运行数据，它既能将同一个RabbitMQ中的众多客户区分开，又可以避免队列和交换器等命名冲突。

vhost之间是`绝对隔离`的，无法将vhostl1中的交换器与vhost2中的队列进行绑定，这样既保证了安全性，又可以确保可移植性

如果在使用RabbitMQ达到一定规模的时候，建议用户对业务功能、场景进行归类区分，并为之分配独立的vhost。

vhost是AMQP概念的基础，客户端在连接的时候必须制定一个vhost。RabbitMQ默认创建的vhost为`“/”`，如果不需要多个vhost或者对vhost的概念不是很理解，那么用这个默认的vhost也是非常合理的，使用默认的用户名guest和密码guest就可以访问它。但是为了安全和方便，建议重新建立一个新的用户来访问它。



vhost有关命令

创建vhost

```bash
//创建vhost
rabbitmqctl add_vhost vhost1
```

查询vhost

```bash
//tracing是否使用了trace功能
rabbitmqctl list_vhost [name] [tracing]
```

删除vhost

```bash
rabbitmqctl delete_bhost [name]
```

vhost权限

AMQP协议中并没有指定权限在vhost级别还是在服务器级别实现，由具体的应用自定义。在RabbitMQ中，权限控制则是`以vhost为单位`的。当创建一个用户时，用户通常会被指派给至少一个vhost，并且只能访问被指派的vhost内的队列、交换器和绑定关系等。因此，RabbitMQ中的授予权限是指在vhost级别对用户而言的权限授予。

![image-20220114213316862](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/rabbitmq%E6%8E%88%E4%BA%88%E6%9D%83%E9%99%90%E5%91%BD%E4%BB%A4.png)

> - 可配置：指的是队列和交换器的创建及删除之类的操作；
> - 可写：指的是发布消息；
> - 可读：指与消息有关的操作，包括读取消息及清空整个队列等。



AMQP命令与权限的映射关系

![image-20220114213500746](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/AMQP%E5%91%BD%E4%BB%A4%E4%B8%8E%E6%9D%83%E9%99%90%E7%9A%84%E6%98%A0%E5%B0%84%E5%85%B3%E7%B3%BB.png)

vhost权限分配示例

```bash
//授予root用户可访问虚拟主机vhostl，并在所有资源上都具备可配置、可写及可读的权限
rabbitmqctl set_permissions -p vhost1 root ".*" ".*" ".*"

//授予root用户可访问虚拟主机vhost2，在以“queue”开头的资源上具备可配置权限，并在所有资源上拥有可写、可读的权限
rabbitmqctl set_permissions -p vhost2 root "^queue.*" ".*" ".*"

//清除权限
rabbitmqctl clear_permissions -p vhost2 root

//列举vhost的相关用户权限
rabbitmqctl list_permissions -p vhost1
  Listing permissions for vhost "vhost1" ...
  user	configure	write	read
  root	.*	.*	.*

//列举用户的权限
rabbitmqctl list_user_permissions root
  Listing permissions for user "root" ...
  vhost	configure	write	read
  /	.*	.*	.*
  vhost1	.*	.*	.*
```





### 用户管理

罗列用户

```bash
rabbitmqctl list_users
  Listing users ...
  user	tags
  guest	[administrator]
  root	[administrator]
```

创建用户

```bash
rabbitmqctl add_user {username} {password}
```

设置角色

- none：无任何角色，默认角色
- management：可以访问web管理界面
- policymaker：包含management权限，并且可管理策略policy和参数
- monitoring：包含management权限，并且可以看到所有连接，信道以及节点
- administrator：包含management权限，并且可以管理用户，虚拟主机，权限，策略，参数等，最高权限

```
rabbitmqctl set_user_tags {username} {tag...}
```

改密码

```bash
rabbitmqctl change_password {username} {password}
```

用户验证

```bash
rabbitmqctl authenticate_user {username} {password}
  Authenticating user "root1" ...
  Success
```

删除用户

```bash
rabbitmqctl delete_user
```





### Web端管理



## 应用与集群



### 应用

```bash
//停止运行rabbitMQ的Erlang虚拟机和RabbitMQ服务应用,如果指定pid文件还需要等待指定进程结束
rabbitmqctl stop {pid.file}

//停止运行rabbitMQ的Erlang虚拟机和RabbitMQ服务应用
rabbitmqctl shutdown

//停止RabbitMQ应用但是Erlang虚拟机还是运行状态。一般用于管理操作前停止RabbitMQ
rabbitmqctl stop_app

//启动RabbitMQ应用
rabbitmqctl start_app

//等待RabbitMQ应用启动，会等到pid_file创建且pid_file中的进程启动
rabbitmqctl wait {pid_file}

//将RabbitMQ节点重置还原到最初状态，包括用户，vhost，所有数据等
rabbitmqctl reset/force_reset
```





### 集群

```bash
//将节点加入到指定集群
rabbitmqctl join_cluster {cluster_node}

//集群状态
rabbitmqctl cluster_status

//修改集群节点类型,这个命令前需要停止RabbitMQ应用
rabbitmqctl change_cluster_node_type {disc|ram}

//将节点从集群中删除,允许离线执行
rabbitmqctl forget_cluster_node [--offline]

//在集群的节点应用启动前咨询clusternode节点的最新消息，并更新相应的集群消息
rabbitmqctl update_cluster_nodes {clusternode}

//确保节点可以启动，通常集群关闭时再启动的第一个节点是最后关闭的节点
//在特殊情况下所有节点都认为自己是最后一个节点，使用该命令告诉节点可以无条件启动节点
rabbitmqctl force_boot

//指示未同步队列queue的slave镜像可以同步master镜像行的内容，前提是queue配置了镜像
//未同步队列中的消息被耗尽后，也会变成同步，主要用于为耗尽队列
rabbitmqctl sync_queue [-p vhost] {queue}

//取消队列同步镜像
rabbitmqctl cancel_sync_queue [-p vhost] {queue}
```



### 服务端状态



#### 队列查询

```
//没指定vhost则默认为/，queueInfoItem显示的属性
rabbitmqctl list_queues [-p vhost] [queueInfoItem]
```



显示属性示例

![image-20220115214336053](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/queue%E6%98%BE%E7%A4%BA%E5%B1%9E%E6%80%A71.png)



#### 交换器

```
rabbitmqctl list_exchanges [-p vhost] [exchangeInfoItem]
```

可选显示参数

![image-20220115214725834](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E4%BA%A4%E6%8D%A2%E5%99%A8%E5%8F%AF%E6%98%BE%E7%A4%BA%E5%8F%82%E6%95%B0.png)



#### 绑定

```
rabbitmqctl list_bindings [-p vhost] [bindingInfoItem]
```



![image-20220115215014713](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/RabbitMQ/%E7%BB%91%E5%AE%9A%E5%8F%AF%E9%80%89%E6%98%BE%E7%A4%BA%E5%8F%82%E6%95%B0.png)



#### 连接

获取TCP/IP连接信息

```
rabbitmqctl list_connections [-p vhost] [connectionInfoItem]
```



其他更多参考官方文档



### HTTPAPI管理

接口列表可以在web管理界面的左下角的HTTP API

[http://localhost:15672/api/index.html](http://localhost:15672/api/index.html)



如果单纯使用curl方式可以用`rabbitmqadmin`工具来调用，该工具只是一种用于访问 rabbitmq-server api 便捷方式

[官方文档参考](https://www.rabbitmq.com/management-cli.html)
