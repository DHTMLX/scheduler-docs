---
sidebar_label: "year_x"
title: "year_x config"
description: "指定Year视图中显示的行数"
---

# year_x

### Description

@short: 指定Year视图中显示的行数

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
 该设置需要启用[year_view](guides/extensions-list.md#year)插件。 
:::

:::note
 该设置不会影响Material皮肤。在Material皮肤中，Year视图中的行数是通过CSS管理的。 
:::

### Related API
- [year_y](api/config/year_y.md)
