---
sidebar_label: date_format
title: "date_format конфигурация"
description: "Устанавливает формат даты, который используется для разбора данных из набора данных и для отправки дат обратно на сервер"
---

# date_format

### Description

@short: Устанавливает формат даты, который используется для разбора данных из набора данных и для отправки дат обратно на сервер

@signature: date_format: string

### Example

~~~jsx
scheduler.config.date_format = "%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
scheduler.load("/data/events");
~~~

**Значение по умолчанию:** "%Y-%m-%d %H:%i"

### Related samples
- [Базовая инициализация](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Настройка формата оси Y](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)

### Details

Это конфигурационное значение используется для генерации [parse_date](api/template/parse_date.md) и [format_date](api/template/format_date.md) шаблонных функций. 
Если вы хотите использовать свой собственный формат, вы можете либо изменить эту конфигурацию, либо напрямую переопределить шаблоны **parse_date** и **format_date**.

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- [Спецификация формата даты](guides/settings-format.md)