---
sidebar_label: "resize_month_timed"
title: "resize_month_timed config"
description: "позволяет изменять размер событий, продолжающихся один день, в Month view с помощью drag-and-drop"
---

# resize_month_timed

### Description

@short: Позволяет изменять размер событий, продолжающихся один день, в Month view с помощью drag-and-drop

@signature: resize_month_timed: boolean

### Example

~~~jsx
scheduler.config.resize_month_events = true; /*!*/
scheduler.config.resize_month_timed = true; /*!*/

scheduler.init('scheduler_here',new Date(2010,0,10),"month");
~~~

**Default value:** false

**Applicable views:** [Month view](views/month.md)

### Details

**Обратите внимание:**

- Это свойство работает только при включенной опции [resize_month_events](api/config/resize_month_events.md).
- После включения события, продолжающиеся один день, будут иметь обновленный внешний вид, как показано на изображении:

![resizemonthtimed_config](/img/resizemonthtimed_config.png)

### Related API
- [resize_month_events](api/config/resize_month_events.md)

### Related Guides
- [Месячный вид](views/month.md)
