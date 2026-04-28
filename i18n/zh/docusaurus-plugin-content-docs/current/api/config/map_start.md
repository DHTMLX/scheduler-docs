---
sidebar_label: "map_start"
title: "map_start config"
description: "指定事件开始显示的日期"
---

# map_start

### Description

@short: 指定事件开始显示的日期

@signature: map_start: Date

### Example

~~~jsx
scheduler.config.map_start = new Date(2025, 7, 1);
scheduler.config.map_end = new Date(2027, 7, 1);
...
scheduler.init('scheduler_here', new Date(2026, 0, 10), "map");
~~~

**Default value:** 当前用户的日期

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 此属性需要启用 [map_view](guides/extensions-list.md#mapview) 插件。 
:::

### Related API
- [map_end](api/config/map_end.md)
