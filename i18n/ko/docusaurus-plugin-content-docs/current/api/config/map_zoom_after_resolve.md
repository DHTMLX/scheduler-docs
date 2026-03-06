---
sidebar_label: "map_zoom_after_resolve"
title: "map_zoom_after_resolve config"
description: "브라우저가 위치 권한 요청 시 사용자 위치를 표시할 줌 레벨을 설정하며, 사용자가 동의할 경우 적용됩니다."
---

# map_zoom_after_resolve

### Description

@short: 브라우저가 위치 권한 요청 시 사용자 위치를 표시할 줌 레벨을 설정하며, 사용자가 동의할 경우 적용됩니다.

@signature: map_zoom_after_resolve: number

### Example

~~~jsx
scheduler.config.map_zoom_after_resolve = 10;
...
scheduler.init('scheduler_here', new Date(2013, 05, 11), "week");
~~~

**Default value:** 15

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 속성은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화되어 있어야 합니다. 
:::

**zoom_after_resolve** 설정은 [map_settings](api/config/map_settings.md) 구성 객체 내에서도 정의할 수 있습니다.
