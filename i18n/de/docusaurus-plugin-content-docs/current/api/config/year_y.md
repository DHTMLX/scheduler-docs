---
sidebar_label: "year_y"
title: "year_y config"
description: "Legt fest, wie viele Spalten in der Year-Ansicht angezeigt werden"
---

# year_y

### Description

@short: Legt fest, wie viele Spalten in der Year-Ansicht angezeigt werden

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
 Diese Eigenschaft erfordert das aktivierte [year_view](guides/extensions-list.md#year) Plugin. 
:::

:::note
 Im Material-Skin hat diese Eigenschaft keine Auswirkung. Stattdessen wird die Anzahl der Spalten in der Year-Ansicht über CSS gesteuert. 
:::

### Related API
- [year_x](api/config/year_x.md)
