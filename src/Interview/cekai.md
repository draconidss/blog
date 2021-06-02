---
title: 字节测开面经
author: Draco
time: 2021-05-23 14:41:16
categories: 
  - 面试
tags: 
  - 面经
---



## 算法



### 最长回文子串

`动态规划`

```java
    /*动态规划*/
    public static String longestPalindrome2(String s) {
        if (s == null || s.length() < 2) {
            return s;
        }
        int strLen = s.length();
        //最长回文串的起点
        int maxStart = 0;
        //最长回文串的终点
        int maxEnd = 0;
        //最长回文串的长度
        int maxLen = 1;

        boolean[][] dp = new boolean[strLen][strLen];

        for (int r = 1; r < strLen; r++) {
            for (int l = 0; l < r; l++) {
                if (s.charAt(l) == s.charAt(r) && (r - l <= 2 || dp[l + 1][r - 1])) {
                    dp[l][r] = true;
                    if (r - l + 1 > maxLen) {
                        maxLen = r - l + 1;
                        maxStart = l;
                        maxEnd = r;
                    }
                }
            }
        }
        return s.substring(maxStart, maxEnd + 1);
    }
```



### 最长无重复子串

`滑动窗口`

```java
public static int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int max = 0, start = 0;
    for (int end = 0; end < s.length(); end++) {
        char ch = s.charAt(end);
        if (map.containsKey(ch)){
            start = Math.max(map.get(ch)+1, start);
        }
        max = Math.max(max,end - start + 1);
        map.put(ch,end);
    }
    return max;
}
```



### K个一组翻转链表

```java
public ListNode reverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        ListNode pre = dummy;
        ListNode end = dummy;

        while (end.next != null) {
            for (int i = 0; i < k && end != null; i++){
                end = end.next;
            }
            if (end == null){
                break;
            }
            ListNode start = pre.next;
            ListNode next = end.next;
            end.next = null;
            pre.next = reverse(start);
            start.next = next;
            pre = start;

            end = pre;
        }
        return dummy.next;
    }

    private ListNode reverse(ListNode head) {
        ListNode pre = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = pre;
            pre = curr;
            curr = next;
        }
        return pre;
    }
```



### 反转链表

```java
public static ListNode reverseLinkList_doublePointer(ListNode head) {
    ListNode listNode = null;
    while (head != null) {
        /*先保存head的next结点*/
        ListNode next = head.next;
        /*将head的next指向新链表listNode，使head成为新链表的头结点*/
        head.next = listNode;
        /*最后使新链表listNode指向head，这样listNode就包含head了，后续加入的结点会成为新链表的头结点最终完成反转*/
        listNode = head;
        /*将head指向一开始保存的head的next，开始下一步循环*/
        head = next;
    }
    return listNode;
}
```



### 买卖股票的最佳时刻

```java
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        // 特殊判断
        if (len < 2) {
            return 0;
        }
        int[][] dp = new int[len][2];

        // dp[i][0] 下标为 i 这天结束的时候，不持股，手上拥有的现金数
        // dp[i][1] 下标为 i 这天结束的时候，持股，手上拥有的现金数

        // 初始化：不持股显然为 0，持股就需要减去第 1 天（下标为 0）的股价
        dp[0][0] = 0;
        dp[0][1] = -prices[0];

        // 从第 2 天开始遍历
        for (int i = 1; i < len; i++) {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
            dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
        }
        return dp[len - 1][0];
    }
}
```



### 三数之和

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        int n = nums.length;
        Arrays.sort(nums);
        List<List<Integer>> ans = new ArrayList<List<Integer>>();
        // 枚举 a
        for (int first = 0; first < n; ++first) {
            // 需要和上一次枚举的数不相同
            if (first > 0 && nums[first] == nums[first - 1]) {
                continue;
            }
            // c 对应的指针初始指向数组的最右端
            int third = n - 1;
            int target = -nums[first];
            // 枚举 b
            for (int second = first + 1; second < n; ++second) {
                // 需要和上一次枚举的数不相同
                if (second > first + 1 && nums[second] == nums[second - 1]) {
                    continue;
                }
                // 需要保证 b 的指针在 c 的指针的左侧
                while (second < third && nums[second] + nums[third] > target) {
                    --third;
                }
                // 如果指针重合，随着 b 后续的增加
                // 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环
                if (second == third) {
                    break;
                }
                if (nums[second] + nums[third] == target) {
                    List<Integer> list = new ArrayList<Integer>();
                    list.add(nums[first]);
                    list.add(nums[second]);
                    list.add(nums[third]);
                    ans.add(list);
                }
            }
        }
        return ans;
    }
}
```



### 环形链表

```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }
        ListNode slow = head;
        ListNode fast = head.next;
        while (slow != fast) {
            if (fast == null || fast.next == null) {
                return false;
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        return true;
    }
}
```



### LRU缓存结构









### 下一个更大元素





- 判断一棵树是否是二叉树
- leetcode26
- 翻转字符串（网址的翻转）
- leetcode496
- 双向链表构建二叉树，构建平衡二叉树
- 编程题：链表向右移动K次
- 两个字符串最长公共子串
- [买卖股票的最佳时机](https://www.nowcoder.com/jump/super-jump/word?word=买卖股票的最佳时机)









## 操作系统





### 分页和分段区别

**1.目的**

- 页是信息的物理单位，分页是为实现离散分配方式，以消减内存的外零头，提高内存的利用率。或者说，分页是出于系统管理的需要而不是用户需要。

- 段是信息的逻辑单位，它含有一组其意义相对完整的信息。分段的目的是为了更好地满足用户的需要。



**2.长度**

- 页的大小固定而且由系统决定，由系统把逻辑地址划分为页号和页内地址两部分，是由机器硬件实现的，因而在系统中只能有一种大小的页面。

- 段的长度不固定，决定于用户所编写的程序，通常由编译程序在对程序进行编译时，根据信息的性质来划分。



**3.地址空间**

- 页的地址空间是一维的，即单一的线形地址空间，程序员只要利用一个记忆符就可以表示一个地址。

- 段的作业地址空间是二维的，程序员在标识一个地址时，既需要给出段名，又需给出段内地址。



**4.碎片**

- 分页有内部碎片无外部碎片

- 分段有外部碎片无内部碎片



**5.绝对地址**

- 处理器使用页号和偏移量计算绝对地址

- 处理器使用段号和偏移量计算绝对地址



**6.管理方式**

- 对于分页，操作系统必须为每个进程维护一个页表，以说明每个页对应的的页框。当进程运行时，它的所有页都必须在内存中，除非使用覆盖技术或虚拟技术，另外操作系统需要维护一个空闲页框列表。

- 对于分段，操作系统必须为每个进程维护一个段表，以说明每个段的加载地址和长度。当进程运行时，它的所有短都必须在内存中，除非使用覆盖技术或虚拟技术，另外操作系统需要维护一个内存中的空闲的空洞列表。

- 特别的，当使用虚拟技术是，把一页或一段写入内存时可能需要把一页或几个段写入磁盘。



**7.共享和动态链接**

- 分页不容易实现，分段容易实现



## 计算机网络



### 应用层协议

TCP支持的应用协议主要有：Telnet、FTP、SMTP等；

UDP支持的应用层协议主要有：NFS（网络文件系统）、SNMP（简单网络管理协议）、DNS（主域名称系统）、TFTP（通用文件传输协议）等。

![七层体系结构图](https://my-blog-to-use.oss-cn-beijing.aliyuncs.com/2019/7/%E4%B8%83%E5%B1%82%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84%E5%9B%BE.png)



### OSI七层模型和作用

| OSI七层模型 | 功能                                                         | 对应的网络协议                                               | TCP/IP四层概念模型 |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------ |
| 应用层      | 文件传输，文件管理，电子邮件的信息处理——apdu                 | HTTP、TFTP, FTP, NFS, WAIS、SMTP                             | 应用层             |
| 表示层      | 确保一个系统的应用层发送的消息可以被另一个系统的应用层读取，编码转换，数据解析，管理数据的解密和加密，最小单位——ppdu | Telnet, Rlogin, SNMP, Gopher                                 |                    |
| 会话层      | 负责在网络中的两节点建立，维持和终止通信，在一层协议中，可以解决节点连接的协调和管理问题。包括通信连接的建立，保持会话过程通信连接的畅通，两节点之间的对话，决定通信是否被终端一斤通信终端是决定从何处重新发送，最小单位——spdu | SMTP, DNS                                                    |                    |
| 传输层      | 定义一些传输数据的协议和端口。传输协议同时进行流量控制，或是根据接收方接收数据的快慢程度，规定适当的发送速率，解决传输效率及能力的问题——tpdu | TCP, UDP                                                     | 传输层             |
| 网络层      | 控制子网的运行，如逻辑编址，分组传输，路由选择最小单位——分组（包）报文 | IP, ICMP, ARP, RARP, AKP, UUCP                               | 网络层             |
| 数据链路层  | 主要是对物理层传输的比特流包装，检测保证数据传输的可靠性，将物理层接收的数据进行MAC（媒体访问控制）地址的封装和解封装，也可以简单的理解为物理寻址。交换机就处在这一层，最小的传输单位——帧 | FDDI, Ethernet, Arpanet, PDN, SLIP, PPP，STP。HDLC,SDLC,帧中继 | 数据链路层         |
| 物理层      | 定义物理设备的标准，主要对物理连接方式，电气特性，机械特性等制定统一标准，传输比特流，因此最小的传输单位——位（比特流） | IEEE 802.1A, IEEE 802.2到IEEE 802.                           |                    |





### TCP/HTTP中的keep-alive机制

https://blog.csdn.net/oceanperfect/article/details/51064574



### HTTP请求包含哪些部分

http协议报文

  1.请求报文(请求行/请求头/请求数据/空行)

​    请求行

​      求方法字段、URL字段和HTTP协议版本

​      例如：GET /index.html HTTP/1.1

​        get方法将数据拼接在url后面，传递参数受限

​      请求方法：

​        GET、POST、HEAD、PUT、DELETE、OPTIONS、TRACE、CONNECT

​    请求头(key value形式)

​      User-Agent：产生请求的浏览器类型。

​      Accept：客户端可识别的内容类型列表。

​      Host：主机地址

​    请求数据

​      post方法中，会把数据以key value形式发送请求

​    空行

​      发送回车符和换行符，通知服务器以下不再有请求头

  2.响应报文(状态行、消息报头、响应正文)

​    状态行

​    消息报头

​    响应正文





### URL重写

如果浏览器不支持Cookie或用户阻止了所有Cookie，可以把会话ID附加在HTML页面中所有的URL上，这些页面作为响应发送给客户。这样，当用户单击URL时，会话ID被自动作为请求行的一部分而不是作为头行发送回服务器。这种方法称为URL重写(URL rewriting)。





### URL输入地址栏后的流程







### RIP是什么





## 测试开发



### 编写测试用例有哪些方法

1.**等价类划分**

等价类是指某个输入域的子集合.在该子集合中,各个输入数据对于揭露程序中的错误都是等效的.并合理地假定:测试某等价类的代表值就等于对这一类其它值的测试.因此,可以把全部输入数据合理划分为若干等价类,在每一个等价类中取一个数据作为测试的输入条件,就可以用少量代表性的测试数据.取得较好的测试结果.等价类划分可有两种不同的情况:有效等价类和无效等价类.



2.**边界值分析法**

边界值分析方法是对等价类划分方法的补充。大量的错误是发生在输入或输出范围的边界上,而不是发生在输入输出范围的内部.因此针对各种边界情况设计测试用例,可以查出更多的错误.

使用边界值分析方法设计测试用例,首先应确定边界情况.通常输入和输出等价类的边界,就是应着重测试的边界情况.应当选取正好等于,刚刚大于或刚刚小于边界的值作为测试数据,而不是选取等价类中的典型值或任意值作为测试数据



3.**错误推测法**

基于经验和直觉推测程序中所有可能存在的各种错误,从而有针对性的设计测试用例的方法.错误推测方法的基本思想:列举出程序中所有可能有的错误和容易发生错误的特殊情况,根据他们选择测试用例.例如,在单元测试时曾列出的许多在模块中常见的错误.以前产品测试中曾经发现的错误等,这些就是经验的总结。还有,输入数据和输出数据为0的情况。输入表格为空格或输入表格只有一行.这些都是容易发生错误的情况。可选择这些情况下的例子作为测试用例.



4.**因果图方法**

前面介绍的等价类划分方法和边界值分析方法,都是着重考虑输入条件,但未考虑输入条件之间的联系,相互组合等.考虑输入条件之间的相互组合,可能会产生一些新的情况.但要检查输入条件的组合不是一件容易的事情,即使把所有输入条件划分成等价类,他们之间的组合情况也相当多.因此必须考虑采用一种适合于描述对于多种条件的组合,相应产生多个动作的形式来考虑设计测试用例.这就需要利用因果图（逻辑模型）.因果图方法最终生成的就是判定表.它适合于检查程序输入条件的各种组合情况.



5.**正交表分析法**

有时候，可能因为大量的参数的组合而引起测试用例数量上的激增，同时，这些测试用例并没有明显的优先级上的差距，而测试人员又无法完成这么多数量的测试，就可以通过正交表来进行缩减一些用例，从而达到尽量少的用例覆盖尽量大的范围的可能性。



6.**场景分析方法**

指根据用户场景来模拟用户的操作步骤，这个比较类似因果图，但是可能执行的深度和可行性更好。



### 测试发现bug而开发不认为是bug 你怎么办？

1. 找到需求文档或者是原型图进行匹对

2. 尝试多种`测试环境`和`多种测试方式`来确认是否为bug

3. 整理bug的复现的步骤和出现的频率

4. 开发坚持不认为是bug的时候找项目经理测试经理进行沟通来确认是否为bug

5. 将客户经理 测试 测试经理和项目经理进行开确认会来判定是否为bug

6. 测试人员需要将bug整理并写入测试总结中




### 登录功能测试用例

![img](https://images2017.cnblogs.com/blog/1206554/201801/1206554-20180109141310551-861992986.png)





## 其他



### 转发和重定向区别

::: tip 

- [转发和重定向区别](https://blog.csdn.net/weixin_40001125/article/details/88663468)

:::





### cookie和session区别

