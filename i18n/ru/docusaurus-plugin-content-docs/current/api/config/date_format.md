---
sidebar_label: "date_format"
title: "date_format config"
description: "определяет формат даты, используемый для парсинга данных из набора данных и для отправки дат обратно на сервер"
---

# date_format

### Description

@short: Определяет формат даты, используемый для парсинга данных из набора данных и для отправки дат обратно на сервер

@signature: date_format: string

### Example

~~~jsx
scheduler.config.date_format = "%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(2019,0,10),"week");
scheduler.load("/data/events");
~~~

**Default value:** "%Y-%m-%d %H:%i"

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)

### Details

Этот параметр конфигурации отвечает за генерацию шаблонных функций [parse_date](api/template/parse_date.md) и [format_date](api/template/format_date.md). 
Чтобы использовать пользовательский формат, вы можете либо обновить эту настройку, либо напрямую переопределить шаблоны **parse_date** и **format_date**.

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- [Спецификация формата даты](guides/settings-format.md)
