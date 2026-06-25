---
sidebar_label: "load_date"
title: "load_date config"
description: "定义动态加载时服务器请求参数 'from' 和 'to' 的格式"
---

# load_date

### Description

@short: 定义动态加载时服务器请求参数 'from' 和 'to' 的格式

@signature: load_date: string

### Example

~~~jsx
scheduler.config.load_date = "%Y.%m.%d";
scheduler.init('scheduler_here',new Date(2027,10,1),"month");

scheduler.setLoadMode("month");
scheduler.load("data/events.php");
~~~

**Default value:** "%Y-%m-%d"

### Related API
- [setLoadMode](api/method/setloadmode.md)
- [load_format](api/template/load_format.md)

### Related Guides
- [데이터 불러오기](guides/loading-data.md#dynamic-loading)
