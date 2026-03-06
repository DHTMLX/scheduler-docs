---
sidebar_label: year_x
title: "year_x config"
description: "sets the number of rows in the Year view"
---

# year_x

### Description

@short: Sets the number of rows in the Year view

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
 The property requires the [year_view](guides/extensions-list.md#year) plugin to be activated. 
:::

:::note
 The property is ignored in the Material skin. In the Material skin, the number of rows in the Year view is controlled by CSS. 
:::

### Related API
- [year_y](api/config/year_y.md)
