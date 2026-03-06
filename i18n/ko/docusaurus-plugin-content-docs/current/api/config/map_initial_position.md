---
sidebar_label: "map_initial_position"
title: "map_initial_position config"
description: "지도의 시작 위치를 설정합니다"
---

# map_initial_position
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 지도의 시작 위치를 설정합니다

@signature: map_initial_position: any

### Example

~~~jsx
scheduler.config.map_initial_position = new google.maps.LatLng(51.477840, -0.001492);
...
scheduler.init('scheduler_here', new Date(2013,05,11), "map");
~~~

**Default value:** google.maps.LatLng(48.724, 8.215)

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 속성은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [map_initial_zoom](api/config/map_initial_zoom.md)

### Change log
- v7.1부터 deprecated 되었습니다
