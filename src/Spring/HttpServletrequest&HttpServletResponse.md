---
title: HttpServletrequest与HttpServletResponse
author: LifeAlsoIsGG
time: 2020-10-07 21:36:51
original: true
categories: 
  - Spring
tags: 
  - Spring
  - SpringMVC
---




## 参考



> - https://www.cnblogs.com/liu1459310172/p/9551722.html
> - https://www.cnblogs.com/liu1459310172/p/9551722.html



## 1. 概念

Web服务器收到一个http请求，会针对每个请求创建一个`HttpServletRequest`和`HttpServletResponse`对象，向客户端发送数据`HttpServletResponse`,从客户端取数据找`HttpServletRequest`.





## 2. HttpServletRequest



公共接口类`HttpServletRequest`继承自`ServletRequest`.客户端浏览器发出的请求被封装成为一个`HttpServletRequest`对象。所有的信息包括：

> - 请求的地址
> - 请求的参数
> - 提交的数据
> - 上传的文件客户端的ip
> - 客户端操作系统都包含在其内。





### 2.1 客户端请求信息



| 名称              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| getRequestURL()   | 浏览器发出请求时的完整URL，包括协议 主机名 端口(如果有)      |
| getRequestURI()   | 浏览器发出请求的资源名部分，去掉了协议和主机名               |
| getRemoteAddr()   | 获取客户端的IP地址                                           |
| getRemoteHost()   | 获取客户端的主机名                                           |
| getRemotePort()   | 浏览器所处于的客户机使用的网络端口                           |
| getRemoteUser()   | 获取客户端的用户                                             |
| getHeader(String) | 获取浏览器传递过来的头信息,“user-agent”可以判断浏览器        |
| getMethod()       | 客户机请求方式一般是GET或者POST                              |
| getQueryString()  | 请求行中的参数部分，只能显示以get方式发出的参数，post方式的看不到 |





### 2.2 服务器端信息



|        名称         |               描述               |
| :-----------------: | :------------------------------: |
|   getLocalAddr()    |          服务器的IP地址          |
|   getLocalName()    |          服务器的主机名          |
|   getLocalPort()    | 获取服务器端口号，即Tomcat端口号 |
|   getServerName()   |    返回接受请求的服务器的名字    |
|   getServerPath()   |       获取请求的文件的路径       |
|  getContextPath()   |           context路径            |
|   getServerPort()   |            服务器端口            |
|  getServletPath()   |           Servlet路径            |
| getServletContext() |                                  |



### 2.3 获取客户端请求参数

|              名称               |                             描述                             |
| :-----------------------------: | :----------------------------------------------------------: |
|    getParameter(String name)    |            获取请求中的参数，该参数是由name指定的            |
| getParameterValues(String name) |        获取请求中的参数，该参数是由name指定下的所有值        |
|        getParameterMap()        |                    获取请求参数的Map集合                     |
|       getParameterNames()       |     获取一个包含请求消息中的所有参数名的 Enumeration对象     |
|       getAttributeNames()       |               返回当前请求的所有属性的名字集合               |
|    getAttribute(String name)    |                     返回name指定的属性值                     |
|          getCookies()           |                    返回客户端发送的Cookie                    |
|          getSession()           | 返回和客户端相关的session，如果没有给客户端分配session，则返回null |
|   getsession(boolean create)    | 返回和客户端相关的session，如果没有给客户端分配session，则创建一个session并返回 |







### 2.4 设置响应编码



1. response.setContentType(“text/html; charset=UTF-8”);
2. response.setCharacterEncoding(“UTF-8”);

这两种方式都需要在response.getWriter调用之前执行才能生效。第一种不仅发送到浏览器的内容会使用UTF-8编码，而且还通知浏览器使用UTF-8编码方式进行显示。所以总能正常显示中文