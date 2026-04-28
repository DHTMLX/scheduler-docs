---
sidebar_label: year_x
title: "year_x config"
description: "устанавливает количество строк в Year view"
---

# year_x

### Description

@short: Задает количество строк в Year view

@signature: year_x: number

### Example

~~~jsx
scheduler.config.year_x = 5;
scheduler.config.year_y = 5;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"year");
~~~

**Значение по умолчанию:** 4

**Применимые виды:** [Year view](views/year.md)

### Details

:::note
 Свойство требует активированного плагина [year_view](guides/extensions-list.md#year) для активации. 
:::

:::note
 Свойство игнорируется в скине Material. В скине Material количество строк в Year view управляется CSS. 
:::

### Related API
- [year_y](api/config/year_y.md)