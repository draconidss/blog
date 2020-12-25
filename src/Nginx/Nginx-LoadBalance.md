---
title: Nginx-负载均衡
author: LifeAlsoIsGG
time: 2020-12-25 00:58:57
original: true
categories: 
  - Nginx
tags: 
  - Nginx
---



负载均衡







## 参考

::: tip 参考

- [Nginx负载均衡的实现和调度算法](https://blog.51cto.com/7424593/1744111)
- [Nginx 负载均衡算法](https://www.cnblogs.com/canflyfish/p/11580417.html)
- [简单了解Nginx七层负载均衡的几种调度算法](https://www.jb51.net/article/173410.htm)

:::





## 算法





| 算法                      | 介绍                                                         |
| ------------------------- | ------------------------------------------------------------ |
| round robin（轮询，默认） | 每个请求按`时间顺序逐一分配`到不同的后端服务，它均衡地对待后端的每一台服务器 |
| weight（加权值轮询）      | 指定轮询几率，weight值(权重)和访问比例成正比，weight的值越大分配到的访问概率越高 |
| least_conn（最小连接数）  | 最小连接数法根据后端服务器当前的连接情况，动态地选取其中当前积压连接数最少的一台服务器来处理当前的请求 |
| ip_hash                   | 每个请求按`访问IP的哈希结果`分配，使来自同一个IP的访客固定访问一台后端服务器，并且可以有效解决动态网页存在的session共享问题。 |
| fair                      | 比 weight、ip_hash更加智能的负载均衡算法，fair算法可以根据页面大小和加载时间长短智能地进行负载均衡，也就是根据`后端服务器的响应时间`来分配请求，响应时间短的优先分配。 |
| url_hash                  | 按`访问的URL的哈希结果`来分配请求，使每个URL定向到一台后端服务器，可以进一步提高后端缓存服务器的效率。 |





### round robin（轮询，默认）

::: info 轮询（默认）

每个请求按`时间顺序逐一分配`到不同的后端服务，它均衡地对待后端的每一台服务器，而不关心服务器实际的连接数和当前的系统负载。如果后端某台服务器死机，自动剔除故障系统，使用户访问不受影响。

**适用于**：后端服务器硬件性能配置完全一致，业务无特殊要求时使用

:::



```bash
upstream backendserver { 
  server 192.168.0.14：80 max_fails=2 fail_timeout=10s; 
  server 192.168.0.15：80 max_fails=2 fail_timeout=10s; 
}
```





### weight（加权值轮询）

::: info weight（轮询权值）

指定轮询几率，weight值(权重)和访问比例成正比，weight的值越大分配到的访问概率越高。或者仅仅为在主从的情况下设置不同的权值，达到合理有效的地利用主机资源。

**适用于**：主要用于后端每台服务器性能不均衡的情况下

:::



```bash
upstream backendserver { 
  server 192.168.0.14:80 weight=5 max_fails=2 fail_timeout=10s; 
  server 192.168.0.15:80 weight=10 max_fails=2 fail_timeout=10s;
}
```







### least_conn（最小连接数）

::: info least_conn

least_connected 方式可以更公平的将负载分配到多个机器上面。由于后端服务器的配置不尽相同，对于请求的处理有快有慢，最小连接数法根据后端服务器当前的连接情况，动态地选取其中当前积压连接数最少的一台服务器来处理当前的请求，尽可能地提高后端服务的利用效率，将负责合理地分流到每一台服务器。

**适用于**：适用于客户端与后端服务器需要保持长连接的业务

:::



```bash
upstream backendserver { 
  least_conn;
  server 192.168.0.14:80 max_fails=2 fail_timeout=10s; 
  server 192.168.0.15:80 max_fails=2 fail_timeout=10s; 
} 
```





### ip_hash

::: info ip_hash

每个请求按`访问IP的哈希结果`分配，使来自同一个IP的访客固定访问一台后端服务器，并且可以有效解决动态网页存在的session共享问题。

**适用于**：适用于需要账号登录的系统，会话连接保持的业务

:::



```bash
upstream backendserver { 
  ip_hash; 
  server 192.168.0.14:80 max_fails=2 fail_timeout=10s; 
  server 192.168.0.15:80 max_fails=2 fail_timeout=10s; 
}
```







### fair

::: info fair

> 需编译安装第三方模块 `ngx_http_upstream_fair_module`

比 weight、ip_hash更加智能的负载均衡算法，fair算法可以根据页面大小和加载时间长短智能地进行负载均衡，也就是根据`后端服务器的响应时间`来分配请求，响应时间短的优先分配。

**适用于**：对访问响应速度有一定要求的业务。



:::

```bash
upstream backendserver {
  fair; 
  server 192.168.0.14:80 max_fails=2 fail_timeout=10s; 
  server 192.168.0.15:80 max_fails=2 fail_timeout=10s; 
}
```





### url_hash

::: info url_hash

> 需编译安装第三方模块 `ngx_http_upstream_hash_module`

按`访问的URL的哈希结果`来分配请求，使每个URL定向到一台后端服务器，可以进一步提高后端缓存服务器的效率。

**适用于**：适用于后端服务器为缓存服务器时比较有效。

:::



```bash
upstream backendserver { 
  server 192.168.0.14:80 max_fails=2 fail_timeout=10s;
  server 192.168.0.15:80 max_fails=2 fail_timeout=10s; 
  hash $request_uri; 
}
```

