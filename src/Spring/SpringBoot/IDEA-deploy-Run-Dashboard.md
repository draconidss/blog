---
title: IDEA配置Run Dashboard
author: Draco
time: 2020-10-02 00:04:29
categories: 
  - Spring
  - SpringBoot
tags: 
  - IDEA
---





在`.idea`中的`workplace.xml`中加入

```java
<component name="RunDashboard"> 
	<option name="configurationTypes">
	 	<set> 
	 		<option value="SpringBootApplicationConfigurationType" />
	 	</set> 
 	</option> 
 	<option name="ruleStates"> 
 		<list> 
 			<RuleState> 
 				<option name="name" value="ConfigurationTypeDashboardGroupingRule" /> 
 			</RuleState> 
 			<RuleState> 
 				<option name="name" value="StatusDashboardGroupingRule" /> 
 			</RuleState> 
 		</list>
 	</option> 
</component>
```

