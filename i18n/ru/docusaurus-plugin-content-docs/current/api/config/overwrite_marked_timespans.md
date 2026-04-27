---
sidebar_label: overwrite_marked_timespans
title: "overwrite_marked_timespans конфигурация"
description: "включает приоритет блокирования помеченных временных интервалов"
---

# overwrite_marked_timespans

### Description

@short: Включает приоритет блокирования помеченных временных интервалов

@signature: overwrite_marked_timespans: boolean

### Example

~~~jsx
scheduler.config.overwrite_marked_timespans = false;
~~~

**Значение по умолчанию:** true

### Details

Помеченные временные диапазоны имеют разный приоритет в зависимости от их настроек.
Когда несколько помеченных временных диапазонов разного приоритета находятся внутри одного раздела планировщика,
по умолчанию будут отображаться только маркеры с наивысшим приоритетом.

Отключите эту настройку, чтобы изменить поведение и отображать все заданные маркеры:

~~~js
scheduler.config.overwrite_marked_timespans = false;
~~~

### Related Guides
- [Блокирование и пометка дат](guides/limits.md#blocking-priority)

### Change log
- добавлено в v6.0