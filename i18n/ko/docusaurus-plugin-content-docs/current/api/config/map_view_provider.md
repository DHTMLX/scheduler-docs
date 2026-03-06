---
sidebar_label: "map_view_provider"
title: "map_view_provider config"
description: "사용할 지도 제공자를 정의합니다"
---

# map_view_provider

### Description

@short: 사용할 지도 제공자를 정의합니다

@signature: map_view_provider: string

### Example

~~~jsx
scheduler.config.map_view_provider = "googleMap";
...
scheduler.init('scheduler_here', new Date(2024, 05, 11), "map");
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 속성은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화된 경우에만 작동합니다. 
:::

지도 제공자는 [map_settings](api/config/map_settings.md) 구성 객체 내에서도 설정할 수 있습니다.

### Change log
- v7.1에서 추가됨
