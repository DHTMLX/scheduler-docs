---
sidebar_label: api_date
title: "конфигурация api_date"
description: "Определяет формат даты для шаблона <strong>api_date</strong>"
---

# api_date

### Description
@short: Определяет формат даты для шаблона <strong>api_date</strong>

@signature: api_date: string

### Example

~~~jsx
scheduler.config.api_date="%Y-%m-%d %H:%i";

scheduler.init("scheduler_here",new Date(2027,10,1),"week");
~~~

**Значение по умолчанию:** "%d-%m-%Y %H:%i"

### Related samples
- [События только для чтения](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Related API
- [api_date](api/template/api_date.md)

### Related Guides
- [Спецификация форматов дат](guides/settings-format.md)