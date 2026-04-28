---
sidebar_label: "map_start"
title: "map_start config"
description: "이벤트가 표시되기 시작할 날짜를 지정합니다"
---

# map_start

### Description

@short: 이벤트가 표시되기 시작할 날짜를 지정합니다

@signature: map_start: Date

### Example

~~~jsx
scheduler.config.map_start = new Date(2025, 7, 1);
scheduler.config.map_end = new Date(2027, 7, 1);
...
scheduler.init('scheduler_here', new Date(2026, 0, 10), "map");
~~~

**Default value:** 현재 사용자의 날짜

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 이 속성은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화되어 있어야 사용 가능합니다. 
:::

### Related API
- [map_end](api/config/map_end.md)
