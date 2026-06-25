---
sidebar_label: "api_date"
title: "api_date config"
description: "<strong>api_date</strong> 템플릿에서 사용되는 날짜 형식을 설정합니다."
---

# api_date

### Description

@short: <strong>api_date</strong> 템플릿에서 사용되는 날짜 형식을 설정합니다.

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
- ["날짜 형식 지정"](guides/settings-format.md)
