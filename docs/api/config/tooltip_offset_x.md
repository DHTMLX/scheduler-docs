---
sidebar_label: tooltip_offset_x
title: "tooltip_offset_x config"
description: "sets the right (if positive) offset of the tooltip's position"
---

# tooltip_offset_x

### Description

@short: Sets the right (if positive) offset of the tooltip's position

@signature: tooltip_offset_x: number

### Example

~~~jsx
scheduler.config.tooltip_offset_x = 30;

scheduler.init('scheduler_here',new Date(2023,10,20),"week");
~~~

**Default value:** 10

### Details

:::note
 This option is defined in the **tooltip** extension, so you need to activate the [tooltip](guides/extensions-list.md#tooltip) plugin. Read the details in the [Tooltips](guides/tooltips.md) article. 
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- [Tooltips](guides/tooltips.md)
