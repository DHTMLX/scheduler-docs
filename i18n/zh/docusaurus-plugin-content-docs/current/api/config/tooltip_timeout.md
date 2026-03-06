---
sidebar_label: "tooltip_timeout"
title: "tooltip_timeout config"
description: "定义任务的tooltip出现前的延迟时间，单位为毫秒"
---

# tooltip_timeout

### Description

@short: 定义任务的tooltip出现前的延迟时间，单位为毫秒

@signature: tooltip_timeout: number

### Example

~~~jsx
scheduler.plugins({
    tooltip: true
});

scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init('scheduler_here',new Date(2023,10,20),"week");
~~~

**Default value:** 30

### Details

:::note
 该设置属于**tooltip**扩展的一部分，因此请确保已启用[tooltip](guides/extensions-list.md#tooltip)插件。更多详情，请参阅[툴팁 (Tooltips)](guides/tooltips.md)文章。 
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- [툴팁 (Tooltips)](guides/tooltips.md)
