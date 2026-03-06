---
sidebar_label: "map_end"
title: "map_end config"
description: "이벤트가 표시되는 날짜의 마지막을 정의합니다."
---

# map_end

### Description

@short: 이벤트가 표시되는 날짜의 마지막을 정의합니다.

@signature: map_end: Date

### Example

~~~jsx
scheduler.config.map_start = new Date(2012, 7, 1);
scheduler.config.map_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "map");
~~~

**Default value:** 'map_start' (값) + 1년

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 이 속성은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [map_start](api/config/map_start.md)
