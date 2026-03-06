---
sidebar_label: "tooltip_offset_x"
title: "tooltip_offset_x config"
description: "регулирует горизонтальное смещение позиции tooltip вправо при установке положительного значения"
---

# tooltip_offset_x

### Description

@short: Регулирует горизонтальное смещение позиции tooltip вправо при установке положительного значения

@signature: tooltip_offset_x: number

### Example

~~~jsx
scheduler.config.tooltip_offset_x = 30;

scheduler.init('scheduler_here', new Date(2023,10,20), "week");
~~~

**Default value:** 10

### Details

:::note
 Эта опция является частью расширения **tooltip**, поэтому убедитесь, что плагин [tooltip](guides/extensions-list.md#tooltip) включен. Для получения дополнительной информации ознакомьтесь со статьёй [Тултипы](guides/tooltips.md). 
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- [Тултипы](guides/tooltips.md)
