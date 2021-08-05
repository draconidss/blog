---
title: Git笔记
author: Draco
time: 2021-07-21 22:39:56
categories: 
  - Git
tags: 
  - Git
---





## 参考

> - [git - 简明指南](https://www.runoob.com/manual/git-guide/)
> - [廖雪峰git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
> - [git merge 与 git rebase的区别](https://blog.csdn.net/liuxiaoheng1992/article/details/79108233)
> - [git merge 与 git rebase的区别](https://blog.csdn.net/u010312474/article/details/89566787?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0.base&spm=1001.2101.3001.4242)





## Git工作机制



实体如下

- `工作目录`：它持有实际文件
- `暂存区（Index）`：它像个缓存区域，临时保存你的改动
- `本地仓库（HEAD）`：它指向你最后一次提交的结果
- `远程仓库（Remote）`



![img](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Git/Git%E5%B7%A5%E4%BD%9C%E6%B5%81.png)



总览

![img](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Git/%E5%B7%A5%E4%BD%9C%E6%B5%812.png)







## Git常用命令

| 命令           | 说明                                 |
| -------------- | ------------------------------------ |
| git config     | 配置签名等                           |
| git init       | 初始化一个本地仓库                   |
| git status     | 查看当前仓库状态                     |
| git add        | 将新的文件或文件上的改动提交到暂存区 |
| git rm --cache | 将add的文件从暂存区移除              |
|                |                                      |
|                |                                      |
|                |                                      |
|                |                                      |
|                |                                      |
|                |                                      |
|                |                                      |
|                |                                      |
|                |                                      |



## 配置签名

> 仅作为签名使用，区分不同开发人员的身份，不验证，与登录远程的代码托管中心无关



````shell
//当前仓库
git config user.name【username】
git config user.email【email】

//系统级别
git config --global user.name【username】
git config --global user.email【email】
````

> 可以在仓库目录``.git/config`查看，全局则在根目录下`~/.gitconfig`文件中查看



## 初始化

```shell
git init
```



## 查看状态（当前分支）

```shell
git status
```

![image-20210724195553706](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Git/%E6%9F%A5%E7%9C%8B%E7%8A%B6%E6%80%81.png)



![查看状态2](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Git/%E6%9F%A5%E7%9C%8B%E7%8A%B6%E6%80%812.png)



## 工作流



### 提交改动到暂存区

```shell
git add [filename]

//提交所有
git add *

//从暂存区中移除
git rm --cache [filename]
```



### 暂存区提交到本地仓库

```shell
git commit -m "提交信息"
```

> 提交信息存储在当前仓库``./git/COMMIT_EDITMSG`中



![image-20210724201352971](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Git/git%20commit.png)

缩略版的版本号为`2b82d69`





## 查看日志（当前分支）

```shell
//可以查看所有分支的所有操作记录（包括commit和reset的操作），包括已经被删除的commit记录
git reflog

//查看commit记录
git log
```



![image-20210724203407199](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Git/%E6%9F%A5%E7%9C%8B%E6%97%A5%E5%BF%97.png)





## 版本穿梭（当前分支）

```shell
//穿梭到某个版本，使HEAD指向该commit
git reset [version id]

//无视更改，强行穿梭到某个版本
git reset --hard [version id]
```



例如

![版本穿梭](https://blog-1300186248.cos.ap-shanghai.myqcloud.com/Git/%E7%89%88%E6%9C%AC%E7%A9%BF%E6%A2%AD.png)



底层原理是将HEAD指针移动





## 分支



### 常用命令

| 常用命令                   | 作用                       |
| -------------------------- | -------------------------- |
| git branch [branch name]   | 创建分支                   |
| git branch -v              | 查看分支                   |
| git checkout [branch name] | 切换分支                   |
| git merge [branch name]    | 把指定分支合并到当前分支上 |
|                            |                            |



### 冲突

当合并分支时，两个分支在同一个文件的同一个位置修改，Git无法决定使用哪个修改



## 分支合并

参考

- [创建与合并分支](https://www.liaoxuefeng.com/wiki/896043488029600/900003767775424)
- 







## 代码托管协作

生成配置本地SSH到Github上后，在Github创建仓库，然后复制仓库地址用于与本地仓库相关联



…or create a new repository on the command line

```shell
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:LifeAlsoIsGG/git-learn2.git
git push -u origin main
```



…or push an existing repository from the command line

```shell
git remote add origin git@github.com:LifeAlsoIsGG/git-learn2.git
git branch -M main
git push -u origin main
```





## IDEA集成Git使用



### 配置忽略文件

创建`xxx.ignore`文件，以.gnore为后缀



### 文件颜色

红色，未加入版本控制

绿色，已经加入暂缓区但未提交

蓝色/黄色，加入，已提交，有改动

白色，加入，已提交，无改动

灰色：版本控制已忽略文件。



## SSH原理

::: tip 参考

- [图解SSH原理](https://www.cnblogs.com/diffx/p/9553587.html)
- https://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html

:::



