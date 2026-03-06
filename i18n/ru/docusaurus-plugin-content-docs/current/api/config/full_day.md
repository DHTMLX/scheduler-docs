---
sidebar_label: "full_day"
title: "full_day config"
description: "позволяет установить событие на весь день"
---

# full_day

### Description

@short: Позволяет установить событие на весь день

@signature: full_day: boolean

### Example

~~~jsx
scheduler.config.full_day = true;
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");
~~~

**Default value:** false

### Related samples
- [Full day events](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)

### Details

Когда эта опция включена (*true*), поля для выбора времени в лайтбоксе отключаются, и длительность события автоматически устанавливается на весь день - с **00:00** выбранной даты до **00:00** следующего дня.

### Change log
- added in version 2.3
