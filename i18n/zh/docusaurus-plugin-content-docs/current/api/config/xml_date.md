---
sidebar_label: "xml_date"
title: "xml_date config"
description: "定义用于解析数据集中数据的日期格式"
---

# xml_date
:::warning 
此功能已棄用。
:::
### Description

@short: 定义用于解析数据集中数据的日期格式

@signature: xml_date: string

### Example

~~~jsx
gantt.config.xml_date="%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

**Default value:** %m/%d/%Y %H:%i

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)

### Related Guides
- [날짜 형식 지정](guides/settings-format.md)

### Change log
- 自 v5.2 起弃用
