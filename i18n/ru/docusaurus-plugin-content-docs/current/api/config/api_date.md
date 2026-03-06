---
sidebar_label: "api_date"
title: "api_date config"
description: "задаёт формат даты, используемый в шаблоне <strong>api_date</strong>"
---

# api_date

### Description

@short: Задаёт формат даты, используемый в шаблоне <strong>api_date</strong>

@signature: api_date: string

### Example

~~~jsx
scheduler.config.api_date="%Y-%m-%d %H:%i";

scheduler.init("scheduler_here",new Date(2009,10,1),"week");
~~~

**Default value:** "%d-%m-%Y %H:%i"

### Related samples
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Related API
- [api_date](api/template/api_date.md)

### Related Guides
- [Спецификация формата даты](guides/settings-format.md)
