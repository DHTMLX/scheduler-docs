---
sidebar_label: "map_resolve_event_location"
title: "map_resolve_event_location config"
description: "이벤트의 좌표가 데이터베이스에 저장되어 있지 않은 경우 자동으로 위치를 확인하려는 시도를 활성화합니다."
---

# map_resolve_event_location

### Description

@short: 이벤트의 좌표가 데이터베이스에 저장되어 있지 않은 경우 자동으로 위치를 확인하려는 시도를 활성화합니다.

@signature: map_resolve_event_location: boolean

### Example

~~~jsx
scheduler.config.map_resolve_event_location = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 기능을 사용하려면 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화되어 있어야 합니다. 
:::

**resolve_event_location** 옵션은 [map_settings](api/config/map_settings.md) 구성 객체 내에서도 설정할 수 있습니다.

- 활성화된 경우(*true*), 이벤트가 데이터베이스에 'lat' 및 'lng' 값이 없으면, 스케줄러는 이벤트를 불러올 때 'event_location' 필드를 기반으로 좌표를 확인하려 시도합니다. 위치가 성공적으로 확인되면 좌표가 데이터베이스에 저장됩니다. 실패하면 스케줄러는 [onLocationError](api/event/onlocationerror.md) 이벤트를 트리거합니다.
- 이 설정은 마이그레이션 시에 특히 유용하지만, 일반적으로 프로덕션 환경에서는 사용을 권장하지 않습니다.
