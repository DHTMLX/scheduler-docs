---
sidebar_label: "year_x"
title: "year_x config"
description: "определяет, сколько строк отображается в Year view"
---

# year_x

### Description

@short: Определяет, сколько строк отображается в Year view

@signature: year_x: number

### Example

~~~jsx
scheduler.config.year_x = 5;
scheduler.config.year_y = 5;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"year");
~~~

**Default value:** 4

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 Для использования этой настройки необходимо включить плагин [year_view](guides/extensions-list.md#year). 
:::

:::note
 Эта настройка не влияет на Material skin. В Material skin количество строк в Year view управляется через CSS. 
:::

### Related API
- [year_y](api/config/year_y.md)
