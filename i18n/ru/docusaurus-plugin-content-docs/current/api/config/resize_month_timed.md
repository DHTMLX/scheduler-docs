---
sidebar_label: resize_month_timed
title: "Настройки resize_month_timed"
description: "позволяет изменять размер однодневных событий во Месячном просмотре перетаскиванием мыши"
---

# resize_month_timed

### Description

@short: Позволяет изменять размер однодневных событий во Месячном просмотре перетаскиванием мыши

@signature: resize_month_timed: boolean

### Example

~~~jsx
scheduler.config.resize_month_events = true; /*!*/
scheduler.config.resize_month_timed = true; /*!*/

scheduler.init('scheduler_here',new Date(2027,0,10),"month");
~~~

**Значение по умолчанию:** false

**Доступные представления:** [Месячный просмотр](views/month.md)

### Details

**Обратите внимание:**

- Свойство имеет смысл только при включенном свойстве [resize_month_events](api/config/resize_month_events.md).
- При включении свойства однодневные события меняют внешний вид, как на рисунке:

![resizemonthtimed_config](/img/resizemonthtimed_config.png)

### Related API
- [resize_month_events](api/config/resize_month_events.md)

### Related Guides
- [Месячный просмотр](views/month.md#resizing-events-by-drag-n-drop-ver-41)