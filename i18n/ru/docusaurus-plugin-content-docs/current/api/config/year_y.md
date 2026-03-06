---
sidebar_label: "year_y"
title: "year_y config"
description: "задаёт количество колонок, отображаемых в Year view"
---

# year_y

### Description

@short: Задаёт количество колонок, отображаемых в Year view

@signature: year_y: number

### Example

~~~jsx
scheduler.config.year_x = 5;
scheduler.config.year_y = 5;
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "year");
~~~

**Default value:** 3

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 Для работы этого свойства требуется включённый плагин [year_view](guides/extensions-list.md#year). 
:::

:::note
 В Material skin это свойство не влияет на отображение. Количество колонок в Year view управляется через CSS. 
:::

### Related API
- [year_x](api/config/year_x.md)
