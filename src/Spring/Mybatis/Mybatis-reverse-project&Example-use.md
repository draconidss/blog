---
layout: post
title: Mybatis逆向工程&Example类使用
slug: Mybatis逆向工程&Example类使用
date: 2020/10/01 22:35:50
status: publish
author: LifeAlsoIsGG
categories: 
  - Spring
  - Mybatis
tags: 
  - SpringBoot
  - Mybatis
---







# 1. 参考

> - http://mybatis.org/generator/index.html
> - https://blog.csdn.net/for_my_life/article/details/51228098?utm_medium=distribute.pc_relevant.none-task-blog-title-1&spm=1001.2101.3001.4242
> - 视频：https://www.bilibili.com/video/av78230600/





# 2. Demo



通过已经搭建好的项目创建，连接数据库并修改`mybatisGenerator.xml`后Run即可

> - Github：https://github.com/LifeAlsoIsGG/MybatisGenerator-Demo





# 3. 配置`pom.xml`



```xml
        <dependency>
            <groupId>org.mybatis.generator</groupId>
            <artifactId>mybatis-generator-core</artifactId>
            <version>1.3.2</version>
        </dependency>

<build>
        <plugins>
            <plugin>
                <groupId>org.mybatis.generator</groupId>
                <artifactId>mybatis-generator-maven-plugin</artifactId>
                <version>1.3.2</version>
                <configuration>
                    <configurationFile>src/main/resources/mybatisGenerator.xml</configurationFile>
                    <verbose>true</verbose>
                    <overwrite>true</overwrite>
                </configuration>
                <executions>
                    <execution>
                        <id>Generate MyBatis Artifacts</id>
                        <goals>
                            <goal>generate</goal>
                        </goals>
                    </execution>
                </executions>
                <dependencies>
                    <dependency>
                        <groupId>org.mybatis.generator</groupId>
                        <artifactId>mybatis-generator-core</artifactId>
                        <version>1.3.2</version>
                    </dependency>
                    <dependency>
                        <groupId>mysql</groupId>
                        <artifactId>mysql-connector-java</artifactId>
                        <scope>runtime</scope>
                        <version>5.1.47</version>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>
    </build>
```





# 4. 配置`mybatisGenerator.xml`



参考

> - https://blog.csdn.net/for_my_life/article/details/51228098?utm_medium=distribute.pc_relevant.none-task-blog-title-1&spm=1001.2101.3001.4242
> - 视频：https://www.bilibili.com/video/av78230600/



通过已经搭建好的项目创建，连接数据库并修改`mybatisGenerator.xml`后Run即可

> - Github：https://github.com/LifeAlsoIsGG/MybatisGenerator-Demo



在resources下创建`mybatisGenerator.xml`



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
    <context id="DB2Tables" targetRuntime="MyBatis3">

        <!-- optional，旨在创建class时，对注释进行控制 -->
        <commentGenerator>
                <property name="suppressDate" value="true"/>
                <!-- 是否去除自动生成的注释 true：是 ： false:否 -->
                <property name="suppressAllComments" value="true"/>
        </commentGenerator>

        <!--jdbc数据库连接 -->
        <jdbcConnection driverClass="com.mysql.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/database"
                        userId="root"
                        password="root">
        </jdbcConnection>

        <!-- 默认false，把JDBC DECIMAL 和 NUMERIC 类型解析为 Integer，
        为true时把JDBC DECIMAL和NUMERIC类型解析为java.math.BigDecimal -->
        <javaTypeResolver >
            <property name="forceBigDecimals" value="false" />
        </javaTypeResolver>

        <!-- Model模型生成器,用来生成含有主键key的类，记录类 以及查询Example类
            targetPackage     指定生成的model生成所在的包名
            targetProject     指定在该项目下所在的路径
        -->
        <javaModelGenerator targetPackage="com.lifeisgg.springboot_demo.entity" targetProject="src/main/java">
            <!-- 是否允许子包，即targetPackage.schemaName.tableName -->
            <property name="enableSubPackages" value="true" />
            <!-- 是否对model添加 构造函数 -->
            <property name="constructorBased" value="false"/>
            <!-- 是否对类CHAR类型的列的数据进行trim操作 -->
            <property name="trimStrings" value="true" />
        </javaModelGenerator>

        <!--Mapper映射文件生成所在的目录 为每一个数据库的表生成对应的SqlMap文件 -->
        <sqlMapGenerator targetPackage="mapper"  targetProject="src/main/resources">
            <property name="enableSubPackages" value="true" />
        </sqlMapGenerator>

        <!-- 客户端代码，生成易于使用的针对Model对象和XML配置文件 的代码
                type="ANNOTATEDMAPPER",生成Java Model 和基于注解的Mapper对象
                type="MIXEDMAPPER",生成基于注解的Java Model 和相应的Mapper对象
                type="XMLMAPPER",生成SQLMap XML文件和独立的Mapper接口
        -->
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.lifeisgg.springboot_demo.mapper"  targetProject="src/main/java">
            <property name="enableSubPackages" value="true" />
        </javaClientGenerator>

        <table schema="labManagement_demo" tableName="user" domainObjectName="User" />

    </context>
</generatorConfiguration>
```





# 5. 配置Run mybatis-generator



点击右上角`Edit Configuration`

![配置Run-mybatis-generator](./images/Mybatis-reverse-project&Example-use/deploy_Run-mybatis-generator.jpg)



```shell
mybatis-generator:generate
```





点击Run后会生成三个文件夹，以表User为例子

> - entity
>
>   > - User.java
>   > - UserExample.java
>
> - mapper
>
>   > - UserMapper.java
>
> - resources/mapper
>
>   > - UserMapper.xml



之后自己创建`Service`，`ServiceImpl`，`Controller`即可，也可以用`EasyCode`插件创建





# 6. Example类的使用



参考

> - https://www.cnblogs.com/wxywxy/p/10697173.html





## mapper接口中方法



| 方法                                                         | 功能说明                                                     |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| int countByExample(UserExample example) thorws SQLException  | 按条件计数                                                   |
| int deleteByPrimaryKey(Integer id) thorws SQLException       | 按主键删除                                                   |
| int deleteByExample(UserExample example) thorws SQLException | 按条件查询                                                   |
| String/Integer insert(User record) thorws SQLException       | 插入数据（返回值为ID）                                       |
| User selectByPrimaryKey(Integer id) thorws SQLException      | 按主键查询                                                   |
| List\<T> selectByExample(UserExample example) thorws SQLException | 按条件查询                                                   |
| List\<T> selectByExampleWithBLOGs(UserExample example) thorws SQLException | 按条件查询（包括BLOB字段）。只有当数据表中的字段类型有为二进制的才会产生。 |
| int updateByPrimaryKey(User record) thorws SQLException      | 按主键更新                                                   |
| int updateByPrimaryKeySelective(User record) thorws SQLException | 按主键更新值不为null的字段                                   |
| int updateByExample(User record, UserExample example) thorws SQLException | 按条件更新                                                   |
| int updateByExampleSelective(User record, UserExample example) thorws SQLException | 按条件更新值不为null的字段                                   |



## example实例解析

| 方法                                       | 说明                                          |
| :----------------------------------------- | :-------------------------------------------- |
| example.setOrderByClause(“字段名 ASC”);    | 添加升序排列条件，DESC为降序                  |
| example.setDistinct(false)                 | 去除重复，boolean型，true为选择不重复的记录。 |
| criteria.andXxxIsNull                      | 添加字段xxx为null的条件                       |
| criteria.andXxxIsNotNull                   | 添加字段xxx不为null的条件                     |
| criteria.andXxxEqualTo(value)              | 添加xxx字段等于value条件                      |
| criteria.andXxxNotEqualTo(value)           | 添加xxx字段不等于value条件                    |
| criteria.andXxxGreaterThan(value)          | 添加xxx字段大于value条件                      |
| criteria.andXxxGreaterThanOrEqualTo(value) | 添加xxx字段大于等于value条件                  |
| criteria.andXxxLessThan(value)             | 添加xxx字段小于value条件                      |
| criteria.andXxxLessThanOrEqualTo(value)    | 添加xxx字段小于等于value条件                  |
| criteria.andXxxIn(List<？>)                | 添加xxx字段值在List<？>条件                   |
| criteria.andXxxNotIn(List<？>)             | 添加xxx字段值不在List<？>条件                 |
| criteria.andXxxLike(“%”+value+”%”)         | 添加xxx字段值为value的模糊查询条件            |
| criteria.andXxxNotLike(“%”+value+”%”)      | 添加xxx字段值不为value的模糊查询条件          |
| criteria.andXxxBetween(value1,value2)      | 添加xxx字段值在value1和value2之间条件         |
| criteria.andXxxNotBetween(value1,value2)   | 添加xxx字段值不在value1和value2之间条件       |



## 注意

`updateByExample`需要将表的条件全部给出，比如一个一个表有三个字段，就必须给三个字段给他，不给会设为null。

`updateByExampleSelective`不同，当某一实体类的属性为null时，mybatis会使用动态sql过滤掉，不更新该字段