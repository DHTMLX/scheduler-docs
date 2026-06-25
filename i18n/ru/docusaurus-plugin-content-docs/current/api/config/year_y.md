---
sidebar_label: year_y
title: "year_y конфигурация"
description: "задает количество столбцов в Year view"
---

# year_y

### Description

@short: Задает число столбцов в Year view

@signature: year_y: number

### Example

~~~jsx
scheduler.config.year_x = 5;
scheduler.config.year_y = 5;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"year");
~~~

**Значение по умолчанию:** 3

**Применимые виды:** [Year view](views/year.md)

### Details

:::note
 Свойство требует активации плагина [year_view](guides/extensions-list.md#year) для работы. 
:::

:::note
 Свойство игнорируется в Material skin. В Material skin количество столбцов в Year view контролируется CSS. 
:::

### Related API
- [year_x](api/config/year_x.md)