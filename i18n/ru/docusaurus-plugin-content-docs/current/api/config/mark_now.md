---
sidebar_label: "mark_now"
title: "mark_now config"
description: "включает или отключает маркер текущего времени"
---

# mark_now

### Description

@short: Включает или отключает маркер текущего времени

@signature: mark_now: boolean

### Example

~~~jsx
scheduler.config.mark_now = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Timeline view](views/timeline.md)

### Related samples
- [Current time marking](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)

### Details

:::note
 Эта функция зависит от включенного плагина [limit](guides/extensions-list.md#limit). 
:::

:::note
 Для Timeline view убедитесь, что расширение [limit](guides/extensions-list.md#limit) загружается перед расширением [Timeline](guides/extensions-list.md#timeline) на странице. 
:::

![weekView_properties](/img/weekView_properties.png)

### Related API
- [now_date](api/config/now_date.md)

### Related Guides
- [Блокировка и выделение дат](guides/limits.md)
