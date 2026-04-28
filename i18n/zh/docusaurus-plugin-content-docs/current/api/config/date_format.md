---
sidebar_label: "date_format"
title: "date_format config"
description: "定义用于从数据集中解析数据以及向服务器发送日期时使用的日期格式"
---

# date_format

### Description

@short: 定义用于从数据集中解析数据以及向服务器发送日期时使用的日期格式

@signature: date_format: string

### Example

~~~jsx
scheduler.config.date_format = "%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
scheduler.load("/data/events");
~~~

**Default value:** "%Y-%m-%d %H:%i"

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)

### Details

此配置选项负责生成 [parse_date](api/template/parse_date.md) 和 [format_date](api/template/format_date.md) 模板函数。 
要使用自定义格式，您可以更新此设置，或直接覆盖 **parse_date** 和 **format_date** 模板。

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- [날짜 형식 지정](guides/settings-format.md)
