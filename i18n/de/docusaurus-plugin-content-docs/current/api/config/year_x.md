---
sidebar_label: "year_x"
title: "year_x config"
description: "Gibt an, wie viele Reihen in der Year-Ansicht angezeigt werden"
---

# year_x

### Description

@short: Gibt an, wie viele Reihen in der Year-Ansicht angezeigt werden

@signature: year_x: number

### Example

~~~jsx
scheduler.config.year_x = 5;
scheduler.config.year_y = 5;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"year");
~~~

**Default value:** 4

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 Diese Einstellung erfordert, dass das [year_view](guides/extensions-list.md#year) Plugin aktiviert ist. 
:::

:::note
 Diese Einstellung wirkt sich nicht auf das Material-Skin aus. Im Material-Skin wird die Anzahl der Reihen in der Year-Ansicht über CSS gesteuert. 
:::

### Related API
- [year_y](api/config/year_y.md)
