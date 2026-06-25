---
sidebar_label: init
title: "init 方法"
description: "dhtmlxScheduler 对象的构造函数"
---

# init

### Description

@short: 这是用于创建 dhtmlxScheduler 实例的构造函数。

@signature: init: (container: string|HTMLElement, date?: Date, view?: string) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* - 一个 HTML 容器（或其 ID），将在其中初始化一个 dhtmlxScheduler 对象
- `date` - (optional) *Date* - 调度器的初始日期，默认情况下为当前日期
- `view` - (optional) *string* - 初始视图的名称，默认值为 "week"

### Example

~~~jsx
scheduler.init("scheduler_here", new Date(2027, 0, 6), "month");
~~~

### Related samples
- [基础初始化](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [议程视图](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)