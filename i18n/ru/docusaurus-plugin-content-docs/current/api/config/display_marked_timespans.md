---
sidebar_label: display_marked_timespans
title: "конфигурация display_marked_timespans"
description: "определяет, следует ли выделять помеченные (заблокированные) диапазоны времени в планировщике"
---

# display_marked_timespans

### Description

@short: Определяет, следует ли выделять помеченные (заблокированные) диапазоны времени в планировщике

@signature: display_marked_timespans: boolean

### Example

~~~jsx
scheduler.config.display_marked_timespans = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** true

### Details

Свойство доступно начиная с версии 3.5.

:::note
Свойство требует активации плагина [limit](guides/extensions-list.md#limit).
:::

Если установить опцию в значение *false*, временные диапазоны останутся заблокированными, но будут отображаться как обычные ячейки планировщика.

### Related Guides
- [Блокировка и выделение дат](guides/limits.md)
