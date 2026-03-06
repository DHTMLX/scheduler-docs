---
sidebar_label: "map_end"
title: "map_end config"
description: "定义显示事件的截止日期"
---

# map_end

### Description

@short: 定义显示事件的截止日期

@signature: map_end: Date

### Example

~~~jsx
scheduler.config.map_start = new Date(2012, 7, 1);
scheduler.config.map_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "map");
~~~

**Default value:** 'map_start' (value) + 1 year

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 此属性需要启用 [map_view](guides/extensions-list.md#mapview) 插件。 
:::

### Related API
- [map_start](api/config/map_start.md)
