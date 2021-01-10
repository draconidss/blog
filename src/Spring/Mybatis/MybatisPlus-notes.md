---
title: Mybatis-Plus基础笔记
author: LifeAlsoIsGG
time: 2021-01-10 14:26:01
original: true
categories: 
  - Spring
  - Mybatis
tags: 
  - SpringBoot
  - Mybatis
  - Mybatis-Plus
---







## 参考

::: tip 参考

- [Mybatis-Plus官网](https://mybatis.plus/)
- [视频：【最新版】4小时学会MyBatis Plus通俗易懂，从入门到部署上线](https://www.bilibili.com/video/BV1yA411t782)

:::



## 1. 快速上手



### 1.1 创建表

```sql
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
	id BIGINT(20) NOT NULL COMMENT '主键ID',
	name VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名',
	age INT(11) NULL DEFAULT NULL COMMENT '年龄',
	email VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱',
	PRIMARY KEY (id)
);

DELETE FROM user;

INSERT INTO user (id, name, age, email) VALUES
(1, 'Jone', 18, 'test1@baomidou.com'),
(2, 'Jack', 20, 'test2@baomidou.com'),
(3, 'Tom', 28, 'test3@baomidou.com'),
(4, 'Sandy', 21, 'test4@baomidou.com'),
(5, 'Billie', 24, 'test5@baomidou.com');
```



| id   | name   | age  | email              |
| ---- | ------ | ---- | ------------------ |
| 1    | Jone   | 18   | test1@baomidou.com |
| 2    | Jack   | 20   | test2@baomidou.com |
| 3    | Tom    | 28   | test3@baomidou.com |
| 4    | Sandy  | 21   | test4@baomidou.com |
| 5    | Billie | 24   | test5@baomidou.com |



### 1.2 创建Springboot项目



### 1.3 引入依赖

```xml
<!-- https://mvnrepository.com/artifact/com.baomidou/mybatis-plus-boot-starter -->
<dependency>
  <groupId>com.baomidou</groupId>
  <artifactId>mybatis-plus-boot-starter</artifactId>
  <version>3.4.1</version>
</dependency>

<!-- 其他基本的springboot依赖 -->
```



::: warning 小坑注意

配合分页插件`page helper`时比较老的版本会导致无法注入等问题，可以使用最新的

```xml
<!-- page helper -->
<dependency>
  <groupId>com.github.pagehelper</groupId>
  <artifactId>pagehelper-spring-boot-starter</artifactId>
  <version>1.3.0</version>
</dependency>
```

:::



### 1.4 配置数据源dataSource

```yaml
spring:
  application:
    name: dao
  datasource:
     # 特别注意：java 9以后需要将com.mysql.jdbc.Driver  改为  com.mysql.cj.jdbc.Driver即可
     # 否则报错：Loading class `com.mysql.jdbc.Driver'. This is deprecated.
     driver-class-name: com.mysql.cj.jdbc.Driver
     #基本属性
     url: jdbc:mysql://localhost:3306/music_recognition?
     username: root
     password: root
```





### 1.5 创建实体

```java
@Data
public class UserDemo {
    private Integer id;
    private String username;
    private String password;
}
```



### 1.6 创建mapper

```java
//继承BaseMapper，User作为泛型参数类
public interface UserMapper extends BaseMapper<User> {
}
```



### 1.7 启动器加扫描mapper的注解

`@MapperScan("com.tme.musicrecognition.dao")`

```java {2}
@SpringBootApplication
@MapperScan("com.tme.musicrecognition.dao")
public class WebApplication {
    public static void main(String[] args) {
        SpringApplication.run(WebApplication.class, args);
    }
}
```





### 1.8 在测试类中运行

```java
@SpringBootTest
class WebApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testSelect() {
        System.out.println(("----- selectAll method test ------"));
        userMapper.selectList(null).forEach(System.out::println);
    }
}
```



::: info 结果

> ----- selectAll method test ------
> Creating a new SqlSession
> SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@47cf65f1] was not registered for synchronization because synchronization is not active
> JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2ad80cf6] will not be managed by Spring
> ==>  Preparing: SELECT id,name,age,email FROM user
> ==> Parameters: 
> <==    Columns: id, name, age, email
> <==        Row: 1, Jone, 18, test1@baomidou.com
> <==        Row: 2, Jack, 20, test2@baomidou.com
> <==        Row: 3, Tom, 28, test3@baomidou.com
> <==        Row: 4, Sandy, 21, test4@baomidou.com
> <==        Row: 5, Billie, 24, test5@baomidou.com
> <==      Total: 5
> Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@47cf65f1]
> User(id=1, name=Jone, age=18, email=test1@baomidou.com)
> User(id=2, name=Jack, age=20, email=test2@baomidou.com)
> User(id=3, name=Tom, age=28, email=test3@baomidou.com)
> User(id=4, name=Sandy, age=21, email=test4@baomidou.com)
> User(id=5, name=Billie, age=24, email=test5@baomidou.com)

:::





### 1.9 其他配置

::: tip 参考

[mybatis-plus 3.X yml配置](https://blog.csdn.net/u012153904/article/details/106134902)

:::



`application.yml`

```yml
#mybatis-plus
mybatis-plus:
  mapper-locations: classpath:mapper/*
  type-aliases-package: com.tme.musicrecognition.entity
  # MyBatis 原生支持的配置
  configuration:
    # 是否开启自动驼峰命名规则（camel case）映射
    mapUnderscoreToCamelCase: true
    # 在控制台打印SQL命令并打印执行结果
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  # 全局策略配置
  global-config:
    db-config:
      logic-delete-field: deleted  # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```





## 2. 常用注解

::: tip 参考

- [https://mybatis.plus/guide/annotation.html](https://mybatis.plus/guide/annotation.html)

:::



### 2.1 @TableName

> 描述：表名注解

|       属性       |   类型   | 必须指定 | 默认值 | 描述                                                         |
| :--------------: | :------: | :------: | :----: | ------------------------------------------------------------ |
|      value       |  String  |    否    |   ""   | 表名                                                         |
|      schema      |  String  |    否    |   ""   | schema                                                       |
| keepGlobalPrefix | boolean  |    否    | false  | 是否保持使用全局的 tablePrefix 的值(如果设置了全局 tablePrefix 且自行设置了 value 的值) |
|    resultMap     |  String  |    否    |   ""   | xml 中 resultMap 的 id                                       |
|  autoResultMap   | boolean  |    否    | false  | 是否自动构建 resultMap 并使用(如果设置 resultMap 则不会进行 resultMap 的自动构建并注入) |
| excludeProperty  | String[] |    否    |   {}   | 需要排除的属性名(@since 3.3.1)                               |



### 2.2 @TableId

> 描述：主键注解

| 属性  |  类型  | 必须指定 |   默认值    |    描述    |
| :---: | :----: | :------: | :---------: | :--------: |
| value | String |    否    |     ""      | 主键字段名 |
| type  |  Enum  |    否    | IdType.NONE |  主键类型  |



IdType

|         值          | 描述                                                         |
| :-----------------: | :----------------------------------------------------------- |
|        AUTO         | 数据库ID自增。即使手动指定了Id，存入数据库还是按数据库字段最大值来自增 |
|        NONE         | 无状态,该类型为未设置主键类型(注解里等于跟随全局,全局里约等于 INPUT)。MP set主键，使用雪花算法自动生成随机数 |
|        INPUT        | insert前自行set主键值。                                      |
|      ASSIGN_ID      | 分配ID(主键类型为Number(Long和Integer)或String)(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextId`(默认实现类为`DefaultIdentifierGenerator`雪花算法) |
|     ASSIGN_UUID     | 分配UUID,主键类型为String(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextUUID`(默认default方法) |
|   ID_WORKER(弃用)   | 分布式全局唯一ID 长整型类型(please use `ASSIGN_ID`)          |
|     UUID(弃用)      | 32位UUID字符串(please use `ASSIGN_UUID`)                     |
| ID_WORKER_STR(弃用) | 分布式全局唯一ID 字符串类型(please use `ASSIGN_ID`)          |

