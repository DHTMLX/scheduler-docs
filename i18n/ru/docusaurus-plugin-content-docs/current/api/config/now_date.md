---
sidebar_label: now_date
title: "конфигурация now_date"
description: "задает дату маркера текущего времени в расширении Limit (включено конфигурацией - mark_now)"
---

# now_date

### Description

@short: Задает дату для маркера текущего времени в расширении Limit (включено конфигурацией - mark_now)

@signature: now_date: Date

### Example

~~~jsx
scheduler.config.now_date = new Date(2027, 7, 5);
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

### Details

:::note
 Сво́йство требует включенного плагина [limit](guides/extensions-list.md#limit)
:::

Опция применяется только к [Limit extension](guides/limits.md).
 
### Related API
- [mark_now](api/config/mark_now.md)

### Related Guides
- [Блокировка и пометка дат](guides/limits.md)