---
sidebar_label: "overwrite_marked_timespans"
title: "overwrite_marked_timespans config"
description: "управляет приоритетом блокировки для отмеченных временных интервалов"
---

# overwrite_marked_timespans

### Description

@short: Управляет приоритетом блокировки для отмеченных временных интервалов

@signature: overwrite_marked_timespans: boolean

### Example

~~~jsx
scheduler.config.overwrite_marked_timespans = false;
~~~

**Default value:** true

### Details

Отмеченные временные интервалы имеют разные уровни приоритетов в зависимости от их настроек.
Когда несколько отмеченных временных интервалов с разными приоритетами перекрываются в одной области scheduler,
по умолчанию отображаются только маркеры с самым высоким приоритетом.

Отключение этой опции позволит видеть все установленные маркеры:

~~~js
scheduler.config.overwrite_marked_timespans = false;
~~~

### Related Guides
- [Блокировка и выделение дат](guides/limits.md#blockingpriority)

### Change log
- добавлено в версии v6.0
