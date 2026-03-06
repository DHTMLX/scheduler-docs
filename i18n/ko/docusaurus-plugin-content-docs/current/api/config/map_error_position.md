---
sidebar_label: "map_error_position"
title: "map_error_position config"
description: "이벤트의 위치를 확인할 수 없을 때 지도에 표시되는 위치를 정의합니다"
---

# map_error_position
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 이벤트의 위치를 확인할 수 없을 때 지도에 표시되는 위치를 정의합니다

@signature: map_error_position: any

### Example

~~~jsx
scheduler.config.map_error_position = new google.maps.LatLng(51.477840, -0.001492);
...
scheduler.init('scheduler_here',new Date(2013,05,11),"map");
~~~

**Default value:** google.maps.LatLng(15, 15)

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 속성은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화되어 있어야 합니다. 
:::

'error position'은 다음 상황에서 적용됩니다:

1. 이벤트에 하나 또는 두 개의 좌표가 없을 때(예: 좌표 값이 '0', 'null', 또는 'undefined'인 경우) 그리고 [map_resolve_event_location](api/config/map_resolve_event_location.md) 옵션이 비활성화된 경우.
2. 이벤트에 하나 또는 두 개의 좌표가 없고 [map_resolve_event_location](api/config/map_resolve_event_location.md) 옵션이 활성화되어 있지만, 스케줄러가 위치를 해결하지 못하는 경우.

### Related API
- [map_resolve_event_location](api/config/map_resolve_event_location.md)

### Change log
- v7.1부터 deprecated
