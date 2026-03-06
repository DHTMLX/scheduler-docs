---
sidebar_label: "limit_drag_out"
title: "limit_drag_out config"
description: "防止拖拽事件超出调度器的可见区域"
---

# limit_drag_out

### Description

@short: 防止拖拽事件超出调度器的可见区域

@signature: limit_drag_out: boolean

### Example

~~~jsx
//防止拖拽事件超出可见的时间线区域
scheduler.config.limit_drag_out = true;
~~~

**Default value:** false

**Applicable views:** [Timeline view](views/timeline.md)
