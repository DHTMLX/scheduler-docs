---
sidebar_label: "check_limits"
title: "check_limits config"
description: "включает или отключает проверку ограничений"
---

# check_limits

### Description

@short: Включает или отключает проверку ограничений

@signature: check_limits: boolean

### Example

~~~jsx
scheduler.config.check_limits = false;
...
scheduler.init('scheduler_here',new Date(2013,7,6),"week");
~~~

**Default value:** true

### Details

:::note
 Свойство требует активации плагина [limit](guides/extensions-list.md#limit). 
:::

Эта опция доступна с версии 3.5.

Отключение этой настройки может быть полезно, если ограничения не заданы и требуется только подсветка или отметка текущего времени, так как это может улучшить производительность. Однако если ограничения определены, отключение этой опции также выключит все функции «блокировки».

### Related Guides
- [Блокировка и выделение дат](guides/limits.md)
