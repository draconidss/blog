---
icon: 
title: Promise异步调用
author: Draco
time: 2020-07-11 22:10:38
description: Promise异步调用
image: 
categories: 
  - 前端
tags: 
  - 前端
  - JavaScript
---




官方文档

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise



阮一峰ES6文档

> https://es6.ruanyifeng.com/#docs/promise



## 基本使用



### 第一种方法

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
	</head>
	<body>
		<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js">
		</script>
		<script type="text/javascript">
			$(document).ready(function() {
				var form = {
					username: 'admin',
					password: 'macro123'
				}
        
				/*创建promise对象*/
				const promise = new Promise((resolve, reject) => {
					$.ajax({
						type: 'post',
						url: 'http://118.89.176.28:8080/admin/login',
						dataType: 'json',
						contentType: 'application/json;charset=UTF-8',
						data: JSON.stringify(form),
						success: function(res) {
							console.log(res)
							resolve(res)
						}
					});
				})
                
				/*使用promise的then方法*/
				promise.then((res) => {
					let token = res.data.tokenHead + res.data.token
					console.log(token)
					$.ajax({
						headers: {
							"Authorization": token
						},
						type: 'get',
						url: 'http://118.89.176.28:8080/admin/info',
						success: function(res) {
							console.log(res);
						}
					});
				})
			});
		</script>
	</body>
</html>

```



### 第二种方法

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
	</head>
	<body>
		<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js">
		</script>
		<script type="text/javascript">
			$(document).ready(function() {
				var form = {
					username: 'admin',
					password: 'macro123'
				}

        /*创建promise对象*/
				const promise = new Promise((resolve, reject) => {
					$.ajax({
						type: 'post',
						url: 'http://118.89.176.28:8080/admin/login',
						dataType: 'json',
						contentType: 'application/json;charset=UTF-8',
						data: JSON.stringify(form),
            
            /*将结果暴露在then方法里*/
					}).then((res) => {
						console.log(res)
						let token = res.data.tokenHead + res.data.token
						console.log(token)
						$.ajax({
							headers: {
								"Authorization": token
							},
							type: 'get',
							url: 'http://118.89.176.28:8080/admin/info',
							success: function(res2) {
								console.log(res2);
							}
						});
					})
				})
			});
		</script>
	</body>
</html>

```

