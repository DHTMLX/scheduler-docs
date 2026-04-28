---
sidebar_label: "map_initial_zoom"
title: "map_initial_zoom config"
description: "Map 뷰에서 지도의 시작 줌 레벨을 설정합니다."
---

# map_initial_zoom

### Description

@short: Map 뷰에서 지도의 시작 줌 레벨을 설정합니다.

@signature: map_initial_zoom: number

### Example

~~~jsx
scheduler.config.map_initial_zoom = 7;
...
scheduler.init('scheduler_here', new Date(2027,05,11), "week");
~~~

**Default value:** 1

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 속성은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화된 경우에만 작동합니다. 
:::

**initial_zoom**은 [map_settings](api/config/map_settings.md) 구성 객체 내에서도 설정할 수 있습니다.

### Related API
- [map_initial_position](api/config/map_initial_position.md)
