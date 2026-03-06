---
sidebar_label: "tooltip_offset_x"
title: "tooltip_offset_x config"
description: "当设置为正值时，调整tooltip水平偏移量，使其位置向右移动。"
---

# tooltip_offset_x

### Description

@short: 当设置为正值时，调整tooltip水平偏移量，使其位置向右移动。

@signature: tooltip_offset_x: number

### Example

~~~jsx
scheduler.config.tooltip_offset_x = 30;

scheduler.init('scheduler_here',new Date(2023,10,20),"week");
~~~

**Default value:** 10

### Details

:::note
 此选项属于**tooltip**扩展的一部分，因此请确保启用[tooltip](guides/extensions-list.md#tooltip)插件。更多信息请参阅[툴팁 (Tooltips)](guides/tooltips.md)文章。 
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- [툴팁 (Tooltips)](guides/tooltips.md)
