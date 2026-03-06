---
title: "jQuery 集成"
sidebar_label: "jQuery 集成"
---

# jQuery 集成

从 4.0 版本开始，dhtmlxScheduler 支持与 jQuery 集成。

以下是如何使用 jQuery 初始化一个标准调度器的方法:

~~~js
$(function(){
    $(".myscheduler").dhx_scheduler({
        date:new Date(2019,4,25),
        mode:"month"
    });
        
    scheduler.load("data/events");
});
~~~

在此示例中:

- **".myscheduler"** - 一个 jQuery 兼容的 CSS 选择器，用于指定调度器要创建的容器（在 PRO 版本中，可以同时在多个容器中初始化调度器）。
- **dhx_scheduler()** 方法用于创建 dhtmlxScheduler 的实例。它接受一个配置对象作为参数:
  - **date** - (*Date*) 设置调度器的初始日期（默认为当前日期）
  - **mode** - (*string*) 指定初始视图（默认为 "week"）
  - 其他配置项（通常通过 scheduler.config.xxxxx 设置）也可以通过这种方式传递
:::note
通过 jQuery 方法初始化的调度器支持与标准调度器相同的配置和 API。
:::


[JQuery integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/06_jquery.html)
