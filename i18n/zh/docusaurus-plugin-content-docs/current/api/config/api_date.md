---
sidebar_label: "api_date"
title: "api_date config"
description: "设置 <strong>api_date</strong> 模板使用的日期格式"
---

# api_date

### Description

@short: 设置 <strong>api_date</strong> 模板使用的日期格式

@signature: api_date: string

### Example

~~~jsx
scheduler.config.api_date="%Y-%m-%d %H:%i";

scheduler.init("scheduler_here",new Date(2027,10,1),"week");
~~~

**Default value:** "%d-%m-%Y %H:%i"

### Related samples
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Related API
- [api_date](api/template/api_date.md)

### Related Guides
- [날짜 형식 지정](guides/settings-format.md)
