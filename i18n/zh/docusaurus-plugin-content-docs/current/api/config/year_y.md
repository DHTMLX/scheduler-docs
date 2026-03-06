---
sidebar_label: "year_y"
title: "year_y config"
description: "设置年视图中显示的列数"
---

# year_y

### Description

@short: 设置年视图中显示的列数

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
 此属性需要启用 [year_view](guides/extensions-list.md#year) 插件。 
:::

:::note
 在 Material 皮肤中，此属性无效。年视图中的列数通过 CSS 管理。 
:::

### Related API
- [year_x](api/config/year_x.md)
