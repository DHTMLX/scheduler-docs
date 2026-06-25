---
sidebar_label: "map_type"
title: "map_type config"
description: "Google Maps의 타입을 정의합니다"
---

# map_type
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: Google Maps의 타입을 정의합니다

@signature: map_type: any

### Example

~~~jsx
scheduler.config.map_type = google.maps.MapTypeId.HYBRID;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"map");
~~~

**Default value:** ROADMAP

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 속성은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화되어 있어야 합니다. 
:::

### Change log
- v7.1부터 deprecated 되었습니다
