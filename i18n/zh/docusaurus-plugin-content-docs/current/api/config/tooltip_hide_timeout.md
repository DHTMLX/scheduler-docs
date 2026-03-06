---
sidebar_label: "tooltip_hide_timeout"
title: "tooltip_hide_timeout config"
description: "设置tooltip在消失前保持可见的时间，单位为毫秒"
---

# tooltip_hide_timeout

### Description

@short: 设置tooltip在消失前保持可见的时间，单位为毫秒

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
scheduler.plugins({
    tooltip: true
});

scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init('scheduler_here',new Date(2023,10,20),"week");
~~~

### Details

:::note
 此选项属于**tooltip** 扩展，因此请确保启用了 [tooltip](guides/extensions-list.md#tooltip) 插件。更多详细信息请参见 [툴팁 (Tooltips)](guides/tooltips.md) 文章。 
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- [툴팁 (Tooltips)](guides/tooltips.md)
