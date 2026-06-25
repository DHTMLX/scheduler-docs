---
sidebar_label: xml_date
title: "xml_date конфигурация"
description: "определяет форматы даты, которые используются для разбора данных из набора данных и для отправки данных на сервер"
---

# xml_date
:::warning 
Свойство устарело
:::
### Description

@short: определяет форматы даты, которые используются для разбора данных из набора данных и для отправки данных на сервер

@signature: xml_date: string

### Example

~~~jsx
gantt.config.xml_date="%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

**Значение по умолчанию:** %m/%d/%Y %H:%i

### Details
Свойство xml_date устарело. Используйте вместо этого `date_format`:

### Related Guides
- [Date Format Specification](guides/settings-format.md)

### Change log
- устарело с версии v6.2, удалено с версии v7.0