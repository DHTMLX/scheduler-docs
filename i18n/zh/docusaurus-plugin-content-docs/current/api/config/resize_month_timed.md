---
sidebar_label: "resize_month_timed"
title: "resize_month_timed config"
description: "允许通过拖拽调整月视图中单日事件的大小"
---

# resize_month_timed

### Description

@short: 允许通过拖拽调整月视图中单日事件的大小

@signature: resize_month_timed: boolean

### Example

~~~jsx
scheduler.config.resize_month_events = true; /*!*/
scheduler.config.resize_month_timed = true; /*!*/

scheduler.init('scheduler_here',new Date(2027,0,10),"month");
~~~

**Default value:** false

**Applicable views:** [Month view](views/month.md)

### Details

**请注意:**

- 该属性仅在启用 [resize_month_events](api/config/resize_month_events.md) 选项时生效。
- 启用后，单日事件将呈现如下所示的更新外观:

![resizemonthtimed_config](/img/resizemonthtimed_config.png)

### Related API
- [resize_month_events](api/config/resize_month_events.md)

### Related Guides
- [Month View](views/month.md#resizingeventsbydragndropver41)
