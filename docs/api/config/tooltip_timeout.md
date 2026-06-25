---
sidebar_label: tooltip_timeout
title: "tooltip_timeout config"
description: "sets the timeout in milliseconds before the tooltip is displayed for a task"
---

# tooltip_timeout

### Description

@short: Sets the timeout in milliseconds before the tooltip is displayed for a task

@signature: tooltip_timeout: number

### Example

~~~jsx
scheduler.plugins({
    tooltip: true
});

scheduler.config.tooltip_timeout = 1000;
scheduler.init("scheduler_here", new Date(2027, 10, 20), "week");
~~~

**Default value:** 30

### Details

:::note
 This option is defined in the **tooltip** extension, so you need to activate the [tooltip](guides/extensions-list.md#tooltip) plugin. Read the details in the [Tooltips](guides/tooltips.md) article. 
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- [Tooltips](guides/tooltips.md)
