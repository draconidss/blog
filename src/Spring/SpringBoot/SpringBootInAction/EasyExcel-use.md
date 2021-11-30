---
title: EasyExcel导入导出Excel
author: Draco
time: 2020-10-01 22:35:50
categories: 
  - Spring
  - SpringBoot
  - SpringBootInAction
tags: 
  - SpringBoot
  - EasyExcel
---






## 参考

> - 官方文档：https://www.yuque.com/easyexcel/doc/easyexcel
> - 封装类：https://www.cnblogs.com/proper128/p/12827495.html





## 实体类



### DemoData

```java
@Data
public class DemoData {
    @ExcelProperty(value = "id")
    private Integer id;

    @ExcelProperty(value = "title")
    private String title;

    @ExcelProperty(value = "date")
    private Date date;

    @ExcelProperty(value = "doubleData")
    private Double doubleData;
}
```





## 简单写

```java
//要写出来的路径
private final static String PATH = "C:\\Users\\a1138\\OneDrive\\桌面\\simpleWrite.xlsx";
//从数据库查询出来的List
List<DemoData> list = demoDataMapper.selectByExample(null);
//调用方法
EasyExcel.write(PATH, DemoData.class).sheet("sheet名字").doWrite(list);
```





## 简单读

监听类，用于分析读出来的每条数据和批量插入。Dao方法可以作为参数接收进来



### DemoDataListener

```java
// 有个很重要的点 DemoDataListener 不能被spring管理，要每次读取excel都要new,然后里面用到spring可以构造方法传进去
public class DemoDataListener extends AnalysisEventListener<DemoData> {
    private static final Logger LOGGER = LoggerFactory.getLogger(DemoDataListener.class);
    /**
     * 每隔5条存储数据库，实际使用中可以3000条，然后清理list ，方便内存回收
     */
    private static final int BATCH_COUNT = 5;
    List<DemoData> list = new ArrayList<DemoData>();
    /**
     * 假设这个是一个DAO，当然有业务逻辑这个也可以是一个service。当然如果不用存储这个对象没用。
     */
    private DemoDataMapper demoDataMapper;

    /**
     * 如果使用了spring,请使用这个构造方法。每次创建Listener的时候需要把spring管理的类传进来
     *
     * @param demoDataMapper
     */
    public DemoDataListener(DemoDataMapper demoDataMapper) {
        this.demoDataMapper = demoDataMapper;
    }
    /**
     * 这个每一条数据解析都会来调用
     *
     * @param data
     *            one row value. Is is same as {@link AnalysisContext#readRowHolder()}
     * @param context
     */
    @Override
    public void invoke(DemoData data, AnalysisContext context) {
        LOGGER.info("解析到一条数据:{}", JSON.toJSONString(data));
        list.add(data);
        // 达到BATCH_COUNT了，需要去存储一次数据库，防止数据几万条数据在内存，容易OOM
        if (list.size() >= BATCH_COUNT) {
            System.out.println("插入一次数据库");
            saveData();
            // 存储完成清理 list
            list.clear();
        }
    }
    /**
     * 所有数据解析完成了 都会来调用
     *
     * @param context
     */
    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {
        // 这里也要保存数据，确保最后遗留的数据也存储到数据库
        saveData();
        LOGGER.info("所有数据解析完成！");
    }
    /**
     * 加上存储数据库
     */
    private void saveData() {
        LOGGER.info("{}条数据，开始存储数据库！", list.size());
        demoDataMapper.batchInsert(list);
        LOGGER.info("存储数据库成功！");
    }
}
```



之后调用方法

```java
// 要读的文件。映射方式是标题
private final static String PATH = "C:\\Users\\a1138\\OneDrive\\桌面\\simpleWrite.xlsx";
// 这里 需要指定读用哪个class去读，然后读取第一个sheet 文件流会自动关闭。将Dao方法作为构造参数传入
EasyExcel.read(PATH, DemoData.class, new DemoDataListener(demoDataMapper)).sheet().doRead();
```





## Web导出下载



### controller

```java
    @GetMapping("/exportExcel")
    public void exportExcel(HttpServletResponse response) throws IOException {
        demoDataService.exportExcel(response);
    }
```



### serviceImpl

```java
    @Override
    public void exportExcel(HttpServletResponse response) throws IOException {
        // 这里注意 有同学反应使用swagger 会导致各种问题，请直接用浏览器或者用postman
        response.setContentType("application/vnd.ms-excel");
        response.setCharacterEncoding("utf-8");
        // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
        String fileName = "导出demoData";
        response.setHeader("Content-disposition", "attachment;filename=" + fileName + ".xlsx");
        List<DemoData> list = demoDataMapper.selectByExample(null)
        EasyExcel.write(response.getOutputStream(), DemoData.class).sheet("模板").doWrite(list);
    }
```





## Web导入



### controller

```java
    @PostMapping("/importExcel")
    public void importExcel(MultipartFile file) throws IOException {
        demoDataService.importExcel(file);
    }
```



### serviceImpl

```java
    @Override
    public void importExcel(MultipartFile file) throws IOException {
        EasyExcel.read(file.getInputStream(), DemoData.class, new DemoDataListener(demoDataMapper)).sheet(0).doRead();
    }
```

