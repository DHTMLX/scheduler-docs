---
sidebar_label: "tooltip_offset_x"
title: "tooltip_offset_x config"
description: "passt den horizontalen Versatz der Tooltip-Position nach rechts an, wenn ein positiver Wert gesetzt wird"
---

# tooltip_offset_x

### Description

@short: Passt den horizontalen Versatz der Tooltip-Position nach rechts an, wenn ein positiver Wert gesetzt wird

@signature: tooltip_offset_x: number

### Example

~~~jsx
scheduler.config.tooltip_offset_x = 30;

scheduler.init('scheduler_here',new Date(2023,10,20),"week");
~~~

**Default value:** 10

### Details

:::note
 Diese Option ist Teil der **tooltip**-Erweiterung, daher sollte das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert sein. Weitere Informationen finden Sie im Artikel [Tooltips](guides/tooltips.md). 
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- [Tooltips](guides/tooltips.md)
