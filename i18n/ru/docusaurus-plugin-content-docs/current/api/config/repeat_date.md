---
sidebar_label: "repeat_date"
title: "repeat_date config"
description: "задаёт формат даты, используемый в поле 'End by' внутри лайтбокса 'recurring'"
---

# repeat_date

### Description

@short: Задаёт формат даты, используемый в поле 'End by' внутри лайтбокса 'recurring'

@signature: repeat_date: string

### Example

~~~jsx
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here',new Date(2019,05,11),"month");
~~~

**Default value:** "%m.%d.%Y"

### Details

:::note
 Это свойство требует активации расширения [recurring](guides/extensions-list.md#recurring). 
:::

По умолчанию дата, введённая в поле 'End by', считается исключающей.

### Related API
- [include_end_by](api/config/include_end_by.md)

### Related Guides
- [Повторяющиеся события](guides/recurring-events.md)
