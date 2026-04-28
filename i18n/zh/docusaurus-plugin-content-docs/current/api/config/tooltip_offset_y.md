---
sidebar_label: "tooltip_offset_y"
title: "tooltip_offset_y config"
description: "通过设置正值的顶部偏移量来调整 tooltip 的垂直位置"
---

# tooltip_offset_y

### Description

@short: 通过设置正值的顶部偏移量来调整 tooltip 的垂直位置

@signature: tooltip_offset_y: number

### Example

~~~jsx
scheduler.config.tooltip_offset_y = 40;

scheduler.init('scheduler_here',new Date(2027,10,20),"week");
~~~

**Default value:** 20

### Details

:::note
 该选项属于 **tooltip** 扩展的一部分，因此请确保启用 [tooltip](guides/extensions-list.md#tooltip) 插件。更多详情请参考 [툴팁 (Tooltips)](guides/tooltips.md) 文章。 
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- [툴팁 (Tooltips)](guides/tooltips.md)
