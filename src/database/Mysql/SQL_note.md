---
icon: 
title: SQL学习笔记
author: LifeAlsoIsGG
time: 2020-10-12 20:47:17
description: SQL学习笔记
original: true
image: 
categories: 
  - 数据库
tags: 
  - 数据库
  - Mysql
---







# 参考

> - [MYSQL菜鸟教程](https://www.runoob.com/mysql/mysql-tutorial.html)

























# 索引

参考

> - https://www.runoob.com/mysql/mysql-index.html
> - https://www.cnblogs.com/songzhixue/p/11160201.html



| 名称     | 描述                                                 |
| -------- | ---------------------------------------------------- |
| 普通索引 | 普通索引                                             |
| 唯一索引 | 不允许有俩行具有相同的值，允许空值                   |
| 主键索引 | 为了保持数据库表与表之间的关系，不允许空值           |
| 全文索引 | 全文索引为在字符串数据中进行复杂的词搜索提供有效支持 |





## 创建表时

```sql
CREATE TABLE 表名 (
  字段名1  数据类型 [完整性约束条件…],
  字段名2  数据类型 [完整性约束条件…],
  [UNIQUE | FULLTEXT | SPATIAL ]   INDEX | KEY [索引名]  (字段名[(长度)]  [ASC |DESC]) 
  
);
```



普通索引直接

```sql
INDEX 索引名 [索引名]  (字段名[(长度)]  [ASC |DESC]) 
```



主键索引标注索引时自动为主键索引





## CREATE在已存在的表上创建索引

```sql
CREATE  [UNIQUE | FULLTEXT | SPATIAL ]  INDEX  索引名 ON 表名 (字段名[(长度)]  [ASC |DESC]) ;
```





## ALTER TABLE

```sql
ALTER TABLE 表名 ADD  [UNIQUE | FULLTEXT | SPATIAL ] INDEX 索引名 (字段名[(长度)]  [ASC |DESC]) ;
```





## 删除索引

```sql
DROP INDEX 索引名 ON 表名字
```

删除主键索引

```sql
ALTER TABLE 表名 DROP PRIMARY KEY
```





## 显示索引信息

你可以使用 SHOW INDEX 命令来列出表中的相关的索引信息。可以通过添加 \G 来格式化输出信息。

```sql
SHOW INDEX FROM table_name; \G
```

