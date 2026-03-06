---
sidebar_label: "config"
title: "config config"
description: "定义日期、刻度、控件的配置选项"
---

# config

### Description

@short: 定义日期、刻度、控件的配置选项

@signature: config: SchedulerConfigOptions

### Example

~~~jsx
//设置Y轴项目的格式
scheduler.config.hour_date = "%H:%i:%s";
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "month");
~~~

### Details

**config** 对象的属性在主API页面的专门章节中有详细说明，详见 [Scheduler API: Properties](api/overview/properties_overview.md)。
