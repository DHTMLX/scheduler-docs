---
sidebar_label: mark_now
title: "Настройки mark_now"
description: "включает/выключает отображение маркера текущего времени"
---

# mark_now

### Description

@short: Включает/выключает маркер отображения текущего времени

@signature: mark_now: boolean

### Example

~~~jsx
scheduler.config.mark_now = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** true

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Timeline view](views/timeline.md)

### Related samples
- [Отмечание текущего времени](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)

### Details

:::note
 Свойство требует активации плагина [limit](guides/extensions-list.md#limit). 
:::

:::note
  Замечание: для Timeline view расширение [limit] должно быть включено на странице перед расширением [Timeline]. 
:::

![weekView_properties](/img/weekView_properties.png)

### Related API
- [now_date](api/config/now_date.md)

### Related Guides
- [Блокировка и пометка дат](guides/limits.md)