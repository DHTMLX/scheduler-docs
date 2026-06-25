---
sidebar_label: "limit_end"
title: "limit_end config"
description: "定义允许日期范围的结束边界"
---

# limit_end

### Description

@short: 定义允许日期范围的结束边界

@signature: limit_end: Date

### Example

~~~jsx
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
...
scheduler.init('scheduler_here', new Date(2027,5,30), "week");
~~~

**Default value:** null

### Related samples
- [Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)

### Details

:::note
 该属性需要启用 [limit](guides/extensions-list.md#limit) 插件。 
:::

**limit_start/limit_end** 设置限制了可以创建新事件的日期范围。  
此外，您可以通过使用 [limit_view](api/config/limit_view.md) 中的属性来控制是否显示该范围之外的事件:

~~~js
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
scheduler.config.limit_view  = true;
~~~

### Related API
- [limit_start](api/config/limit_start.md)
- [limit_view](api/config/limit_view.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
