---
sidebar_label: "limit_start"
title: "limit_start config"
description: "设置允许日期范围的起始边界"
---

# limit_start

### Description

@short: 设置允许日期范围的起始边界

@signature: limit_start: Date

### Example

~~~jsx
scheduler.config.limit_start = new Date(2018,5,15);
scheduler.config.limit_end = new Date(2018,6,15);
...
scheduler.init('scheduler_here', new Date(2018,5,30), "week");
~~~

**Default value:** null

### Related samples
- [Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)

### Details

:::note
 此属性需要启用 [limit](guides/extensions-list.md#limit) 插件。 
:::

**limit_start** 和 **limit_end** 设置限制了可以创建新事件的日期范围。此外，通过启用 `limit_view` 属性，可以防止查看该允许范围之外的事件:

~~~js
scheduler.config.limit_start = new Date(2018,5,15);
scheduler.config.limit_end = new Date(2018,6,15);
scheduler.config.limit_view  = true;
~~~

### Related API
- [limit_end](api/config/limit_end.md)
- [limit_view](api/config/limit_view.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
