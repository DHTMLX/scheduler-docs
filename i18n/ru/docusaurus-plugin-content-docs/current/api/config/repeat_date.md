---
sidebar_label: repeat_date
title: "Конфигурация repeat_date"
description: "устанавливает формат даты поля 'End by' во всплывающем окне 'recurring'"
---

# repeat_date

### Description

@short: Устанавливает формат даты поля 'End by' во всплывающем окне 'recurring'

@signature: repeat_date: string

### Example

~~~jsx
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here',new Date(2027,05,11),"month");
~~~

**Значение по умолчанию:** "%m.%d.%Y"

### Details

:::note
Свойство требует включённого расширения [recurring](guides/extensions-list.md#recurring).
:::

По умолчанию дата в поле 'End by' является исключительной.

### Related API
- [include_end_by](api/config/include_end_by.md)

### Related Guides
- [Recurring Events](guides/recurring-events.md)