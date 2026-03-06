---
sidebar_label: "tooltip_offset_y"
title: "tooltip_offset_y config"
description: "регулирует вертикальное положение tooltip, задавая верхний отступ при положительном значении"
---

# tooltip_offset_y

### Description

@short: Регулирует вертикальное положение tooltip, задавая верхний отступ при положительном значении

@signature: tooltip_offset_y: number

### Example

~~~jsx
scheduler.config.tooltip_offset_y = 40;

scheduler.init('scheduler_here', new Date(2023,10,20), "week");
~~~

**Default value:** 20

### Details

:::note
 Этот параметр является частью расширения **tooltip**, поэтому убедитесь, что плагин [tooltip](guides/extensions-list.md#tooltip) включён. Для подробностей ознакомьтесь со статьёй [Тултипы](guides/tooltips.md). 
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- [Тултипы](guides/tooltips.md)
