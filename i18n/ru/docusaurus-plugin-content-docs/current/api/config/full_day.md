---
sidebar_label: full_day
title: "full_day config"
description: "позволяет устанавливать продолжительность события на весь день"
---

# full_day

### Description

@short: Позволяет устанавливать продолжительность события на весь день

@signature: full_day: boolean

### Example

~~~jsx
scheduler.config.full_day = true;
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");
~~~

**Значение по умолчанию:** false

### Related samples
- [События на весь день](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)

### Details

Если опция установлена в *true*, поля ввода в разделе '**Период времени**' лайтбокса заблокированы, и временной диапазон устанавливается на весь день: с **00.00** текущей даты ячейки до **00.00** следующего дня.

### Change log
- добавлено в версии 2.3