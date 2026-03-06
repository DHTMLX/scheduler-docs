---
sidebar_label: "now_date"
title: "now_date config"
description: "устанавливает дату для маркера текущего времени в расширении Limit (активируется через конфигурацию - mark_now)"
---

# now_date

### Description

@short: Устанавливает дату для маркера текущего времени в расширении Limit (активируется через конфигурацию - mark_now)

@signature: now_date: Date

### Example

~~~jsx
scheduler.config.now_date = new Date(2010, 7, 5);
...
scheduler.init('scheduler_here', new Date(2010, 7, 5), "week");
~~~

### Details

:::note
 Это свойство работает только при включенном плагине [limit](guides/extensions-list.md#limit). 
:::

Этот параметр используется исключительно с расширением [Limit extension](guides/limits.md).

### Related API
- [mark_now](api/config/mark_now.md)

### Related Guides
- [Блокировка и выделение дат](guides/limits.md)
