---
icon: 
title: 修改Host以访问Github
author: LifeAlsoIsGG
time: 2020-04-16 23:46:17
description: 修改Host以访问Github
original: true
image: 
categories: 
  - Other
tags: 
  - Other
  - Github
---





修改文件：C:\Windows\System32\drivers\etc\HOST

```
# Github
192.30.253.113 github.com
151.101.185.194 github.global.ssl.fastly.net
203.98.7.65 gist.github.com
13.229.189.0 codeload.github.com
185.199.109.153 desktop.github.com 
185.199.108.153 guides.github.com  
185.199.108.153 blog.github.com
18.204.240.114 status.github.com
185.199.108.153 developer.github.com
185.199.108.153 services.github.com
192.30.253.175 enterprise.github.com   
34.195.49.195 education.github.com    
185.199.108.153 pages.github.com  
34.196.237.103 classroom.github.com
```

然后cmd用`ipconfig/flushdns`刷新