---
sidebar_label: resize_month_events
title: "Конфигурация resize_month_events"
description: "Позволяет изменять размер многодневных событий в месячном представлении с помощью перетаскивания"
---

# resize_month_events

### Description

@short: Позволяет изменять размер многодневных событий в месячном представлении с помощью перетаскивания

@signature: resize_month_events: boolean

### Example

~~~jsx
scheduler.config.resize_month_events = true;

scheduler.init('scheduler_here',new Date(2027,0,10),"month");
~~~

**Значение по умолчанию:** false

**Доступные представления:** [Месячное представление](views/month.md)

### Related samples
- [Изменяемые события в Месячном представлении](https://docs.dhtmlx.com/scheduler/samples/02_customization/32_resizable_month_events.html)

### Details

![resize_month_events](/img/resize_month_events.png)

### Related API
- [resize_month_timed](api/config/resize_month_timed.md)

### Related Guides
- [Месячное представление](views/month.md#resizing-events-by-drag-n-drop-ver-41)