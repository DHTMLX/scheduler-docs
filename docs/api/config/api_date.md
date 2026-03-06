---
sidebar_label: api_date
title: "api_date config"
description: "defines the date format for the <strong>api_date</strong> template"
---

# api_date

### Description

@short: Defines the date format for the <strong>api_date</strong> template

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
- [Date Format Specification](guides/settings-format.md)
