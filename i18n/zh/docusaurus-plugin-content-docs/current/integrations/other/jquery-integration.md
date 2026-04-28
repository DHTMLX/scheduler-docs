--- 
title: "jQuery 集成"
sidebar_label: "jQuery 集成"
---

# jQuery 集成

从版本 4.0 起，dhtmlxScheduler 可以与 jQuery 集成。

一个使用 jQuery 的标准调度程序可以按如下方式初始化：

~~~js
$(function(){
    $(".myscheduler").dhx_scheduler({
        date:new Date(2027,4,25),
        mode:"month"
    });
        
    scheduler.load("data/events");
});
~~~

其中：

- **".myscheduler"** - 一个与 jQuery 兼容的 CSS 选择器，用于容器，在其中将创建调度程序（在 PRO 版本中，您可以一次在多个容器中初始化调度程序）
- **dhx_scheduler()** 方法用于初始化 dhtmlxScheduler 的一个实例。作为参数，该方法接收一个配置对象：
  - **date** - (*Date*) 调度程序的初始日期（默认是当前日期）
  - **mode** - (*string*) 初始视图的名称（默认值为 "week"）
  - 其他任何配置参数（通常通过 scheduler.config.xxxxx 设置）也可以按如下方式设置
:::note
通过 jQuery 调用初始化的调度程序可以使用与标准调度程序相同的配置和 API
:::

[jQuery 集成](https://docs.dhtmlx.com/scheduler/samples/10_integration/06_jquery.html)