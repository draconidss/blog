---
icon: 
title: 实验室出入管理小程序
author: Draco
time: 2020-08-07 00:24:30
description: 实验室出入管理小程序
original: true
image: 
categories: 
  - My Project
tags: 
  - My Project
  - Vue
---





<div align=center><img src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/logo.png"/></div>


原文链接

> https://wiki.lifeisgg.online/archives/MyProject-AttendanceMiniprogram/

Github

> https://github.com/LifeAlsoIsGG/MyProject-AttendanceMiniprogram-2.0



## 1. 小程序二维码



<div align=center><img width="70%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/实验室出入管理小程序二维码.jpg"/></div>




此小程序获得了[2020中国微信官方小程序大赛](https://developers.weixin.qq.com/community/competition)华南赛区二等奖🎉

<div align=center><img width="70%"src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/2020微信小程序应用开发赛华南赛区二等奖.jpg"/></div>


赛区奖项比例

> - 一等奖：5%
> - 二等奖：10%
> - 三等奖：15
>



<div align=center><img src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/华南赛区.png"/></div>




## 2. 在开发之前

​	这个项目原本是结合物联网硬件指纹和人脸识别的一款实验室出入管理的项目，主要也是为诸如**中国大学生计算机设计大赛，挑战杯，互联网+**等比赛准备的。我在三人团队中担任的职责是**小程序前后端开发**，之后恰巧看到这个微信小程序比赛的时候就想着拿来参赛了，当然线下的硬件只能用模拟的方式去进行。



## 3. 关于小程序&需求分析

​	实验室作为安全性较高的重要封闭场所，对于其它诸如公共封闭场所教室，办公室等场所，实验室的安全性，人员限制性，人员出入管理更为重要。某些实验室还是用着**古老的人员登记表和进入前提前报备管理员**，所以为了使实验室的管理，透明化，智能化，方便化，我们将管理系统放在移动端小程序上，无论是发布公告，管理人员，控制实验室开关，查看实验室人员情况等都能快速掌握。

​	对于普通用户来说，查看实验室开放状态，申请进入实验室，查看在某间实验室的时长和实验室公告，查看自己的日志，以及时长排行榜等。

​	在安全性方面，实验室出入采用指纹和人脸识别，生物识别中的人脸识别及指纹识别，利用其唯一性，可采集性和稳定性。唯一性指的是特征是独一无二的，每个人所有属于自己的唯一属性；可采集性指的是易于被采集；稳定性指的是不会轻易地被外在或内在因素改变。其特征更具有安全性、可靠性和有效性。

​	在国内已有类似的通过指纹及人脸等技术，对开发性活动室或实验室实现智能化的管理，类似的研究已趋近成熟，但是做成H5端和APP不够方便，且大材小用，相对小程序这种轻量级的还是不足。



## 4. 技术方案



### 4.1 前端(小程序端)

> - 使用了第三方组件库ColorUi,uView组件作为前端设计的组件库
> - IDE：微信开发者工具，HbuilderX
> - 框架：[uniapp](https://uniapp.dcloud.io/)(一款能发布到多端的Vue框架)，并没有用开发者工具去写，因为开发者工具的语法微信自定义太多了，按照[uniapp官方原话](https://ask.dcloud.net.cn/article/35947)来说，就是不伦不类的语法，两个我都有试过，自己的确更喜欢接近Vue原生的语法。在HbuilderX写好后能自动编译在开发者工具。



### 4.2 后端

> - 服务器：阿里云，腾讯云
> - 框架：SpringBoot，SpringCloud简单部署，Mybatis
> - 云函数：腾讯云云开发(获取openid，发送腾讯云短信，发送订阅消息等)
> - 数据库：Mysql5.7
> - 环境：java1.8
> - IDE：IDEA

​	后端采用的SSM框架和spring的微服务使业务模块化。而使用云函数是为了方便地获取用户openid以及发送订阅消息

`获取openid`

<div align=center><img src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/获取openid.jpg"/></div>


`订阅消息`

<div align=center><img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/订阅消息.jpg"/></div>



### 4.3 硬件

> - 树莓派，Arduino平台，指纹器，摄像头
> - 腾讯云物联网开发平台





## 5. 页面功能展示说明

​	共有5个页面，与底部dock栏一一对应

<div align=center><img src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/dock栏.jpg"/></div>


> 1. 首页
> 2. 日志
> 3. 仪表盘
> 4. 排行榜
> 5. 我的





### 架构图

<div align=center> <img src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/实验室出入管理小程序架构图.png"/></div>




### 5.1 首页Home

当进入页面时会判断你当前在哪个实验室，如果不在则可以**模拟选择教室进入**，模拟进入后会发送打卡通知

<div align=center>  <table><tr>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/home7.jpg"/>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/订阅消息.jpg"/>    </tr></table></div>	




如果你在进入实验室后点击打开通知，则展示目前所在实验室的状态，可以查看如下

- **顶部可以查看在线时长**
- **这间教室的出入日志，公告，文件，概览等**
- **实验室成员(已进入人员，已离开成员，管理员)**
- **还有提醒在实验室时长超过六小时**



<div align=center>  <table><tr>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/home1.jpg"/>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/home2.jpg"/>   </tr></table></div>
<div align=center>  <table><tr>   <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/home3.jpg"/> <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/home4.jpg"/>    </tr></table></div>
<div align=center>  <table><tr>     <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/home5.jpg"/>  <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/home6.jpg"/>  </tr></table></div>


之后点击右下角的按钮则可以**模拟退出实验室**，成功后也会发送打卡通知

<div align=center>  <table><tr>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/home6.jpg"/>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/订阅消息.jpg"/>    </tr></table></div>






### 5.2 日志Log

在这里可以查看自己进出实验室的日志记录，日志记录采用逆序显示，还可以根据时间选择区段查看

<div align=center>  <table><tr>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/log1.jpg"/>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/log2.jpg"/>    </tr></table></div>




点击Tab栏中**我的实验室**可以查看我去过的实验室，点击实验室卡片可以看到**我在这间实验室的日志**

<div align=center>  <table><tr>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/log3.jpg"/>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/log4.jpg"/>    </tr></table></div>




### 5.3 控制台Dashboard

控制台涉及比较多的CURD事务，也是小程序的核心功能，为了将复杂笨重的管理系统移植到小程序上，做了许多页面简化处理和友好的用户交互体验(但貌似还是过于笨重🏃) 

|       权限/身份       |    超管    |  普通用户  |
| :-------------------: | :--------: | :--------: |
|    查看实验室详细     | 所有实验室 | 自己管理的 |
|    关闭/开放实验室    | 所有实验室 | 自己管理的 |
|      添加实验室       |     ✔️      |     ❌      |
| 添加/删除实验室管理员 |     ✔️      |     ❌      |
|  添加/删除实验室公告  | 所有实验室 | 自己管理的 |
|   查看用户/用户详细   |     ✔️      |     ❌      |
|   查看所有用户日志    |     ✔️      |     ❌      |



> - 超级管理员：可以查看所有实验室，用户，日志，增加关闭教室，赋予用户为某个实验室的管理员，撤销某个实验室的管理员等等
> - 管理员：能查看自己管理的实验室日志用户等，能发布公告在自己管理的实验室，总之基于自己管理的实验室。
> - 普通用户：其实就理解为没有管理实验室的用户，可以查看自己的日志，自己所在教室的动态以及活跃时长排行榜



- 控制台查看实验室，**点击卡片可以查看实验室详情**，超管可以查看所有实验室详情，普通用户只能查看自己管理的

<div align=center>  <table><tr>    <img width="30%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/admin1.jpg"/>    <img width="30%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/room1.jpg"/>  <img width="30%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/room2.jpg"/>  </tr></table></div>


在**概览**页面

- 超管：**查看监控(TODO)**，**关闭开放实验室(如果实验室有人会提醒)**，**添加删除此房间管理员**，超管默认为管理员，没分配时不会显示，分配后会头像会显示**超管**
- 管理员：**查看监控(TODO)**，**关闭开放实验室(如果实验室有人会提醒)**



<div align=center>  <table><tr>    <img width="30%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/room3.jpg"/>    <img width="30%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/room4.jpg"/>  <img width="30%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/room5.jpg"/>  </tr></table></div>


### 5.4 排行榜Rank

排行榜类似`微信运动`，可以查看目前谁的活跃时长最高，可以查看**当前周和当前月的活跃度排行榜**💯

> TODO：图表显示，历史周和历史月排名



<div align=center>  <table><tr>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/rank1.jpg"/>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/rank2.jpg"/>    </tr></table></div>




### 5.5 我的Profile

我的界面，需要在这里实名手机绑定，在学校用基本调用接口输入学号密码，但这里为了方便只能模拟用手机绑定。在这里也可以主动申请服务消息的打卡通知，滑动接收消息的Switch即可。

<div align=center>  <table><tr>    <img width="30%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/profile1.jpg"/>    <img width="30%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/profile2.jpg"/>  <img width="30%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/profile3.jpg"/>  </tr></table></div>


点击最下方的**介绍&使用手册**可以帮助您更快地了解并使用小程序。

<div align=center>  <table><tr>    <img width="50%" src="https://cdn.jsdelivr.net/gh/lifealsoisgg/MyProject-AttendanceMiniprogram-2.0/images/readme/refe.jpg"/>   </tr></table></div>




# 6. 后记

​	由于小程序比较复杂，这也造成了评委体验时对我的小程序有点懵的状况，在大家在群里都开始评审的时候我的小程序老师只是来踩了踩点便没了动静，得亏我反馈并说明后才有老师使用，后来在群里也看到有几个人说小程序没有被评审。主办方那边也算挺负责，及时组织评委去使用只是踩了踩点的小程序。除了评委老师可能疏漏的原因(作品数还是比较多的)，我也吸取了教训，就是一开始的用户体验和引导非常重要，能做到手把手教那种更好，避免一上来就要登录或者填写一大推表单的情况（真的会让人瞬间感到烦躁）。还有就是要符合小程序轻量，方便的特点，有些地方做做减法反而效果更好(我也参考了那些入围全国比赛的小程序)。但这些属于前端的灵魂的东西，包括独特的UI设计那些，对于作为后端狗的我来说貌似不太感冒。我在想，或许那些优雅的用户体验前端设计的背后一定是一个温柔细致体贴的人吧😇。

​	最后还是想说，这个比赛有一定的水分，自己也看了看获奖的小程序，有些真的是过于简单，比如调用第三方接口识图，还有那些综合科普信息展示答题类，更多的是纯静态信息显示，并没有多少难度，比赛结果后也没有分数。再者，有些小程序背靠团队企业资源，名校倾向啥的我也不谈。在答辩过程中准备的PPT那些商业计划啥的准备的很完整，而比赛规定中有一条是没有参加过其他省级以上比赛的项目，而这些却很难去求证了。再者还有条规定，核心功能在19年9月份前开发的小程序算违规，这些也很难去求证了。但是比赛过程中，比赛方的态度都很好，也都有耐心回答我们的问题，群里面也有人展示小程序然后一起讨论，也算不错的比赛体验了。最后拿了个华南赛区二等奖也算是对我那几个星期熬夜的慰问了吧(也不知道对找工作有没有用😂)。

