---
sidebar_label: "display_marked_timespans"
title: "display_marked_timespans config"
description: "управляет подсветкой отмеченных (заблокированных) временных интервалов в scheduler"
---

# display_marked_timespans

### Description

@short: Управляет подсветкой отмеченных (заблокированных) временных интервалов в scheduler

@signature: display_marked_timespans: boolean

### Example

~~~jsx
scheduler.config.display_marked_timespans = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

### Details

Это свойство доступно начиная с версии 3.5.

:::note
 Для работы свойства требуется активированный плагин [limit](guides/extensions-list.md#limit). 
:::

Если значение установить в *false*, временные интервалы останутся заблокированными, но будут отображаться как обычные ячейки scheduler без какой-либо специальной подсветки.

### Related Guides
- [Блокировка и выделение дат](guides/limits.md)
