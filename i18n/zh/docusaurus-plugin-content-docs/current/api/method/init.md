---
sidebar_label: "init"
title: "init method"
description: "这是用于创建 dhtmlxScheduler 实例的构造函数。"
---

# init

### Description

@short: 这是用于创建 dhtmlxScheduler 实例的构造函数。

@signature: init: (container: string | HTMLElement, date?: Date, view?: string) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* - 用于设置 dhtmlxScheduler 的 HTML 容器（或其 ID）。
- `date` - (optional) *Date* - 调度器的起始日期（默认为当前日期）。
- `view` - (optional) *string* - 初始视图模式（默认为 "week"）。

### Example

~~~jsx
scheduler.init("scheduler_here",new Date(2027,0,6),"month");
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)
