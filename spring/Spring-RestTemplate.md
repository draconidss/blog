---
title: Spring-RestTemplate
author: Draco
time: 2021-11-30 23:40:09
categories: 
  - Spring
tags: 
  - Spring
---





## Spring-RestTemplate



```java
@Configuration
public class ApplicationContextConfig {

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
```

