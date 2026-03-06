---
sidebar_label: "onLocationError"
title: "onLocationError event"
description: "이벤트의 위치를 지도에서 찾을 수 없을 때 발생합니다 (맵 뷰에서만 적용)"
---

# onLocationError

### Description

@short: 이벤트의 위치를 지도에서 찾을 수 없을 때 발생합니다 (맵 뷰에서만 적용)

@signature: onLocationError: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 id

### Example

~~~jsx
// 위치를 확인할 수 없는 이벤트가 있을 때 
// 그리니치 로열 천문대 좌표를 설정하는 핸들러 예제

scheduler.attachEvent("onLocationError", function (id){
    alert("Location can't be found");
    return google.maps.LatLng(51.477840, -0.001492); 
    // 그리니치 로열 천문대 좌표
});
~~~

### Details

:::note

이 이벤트는 [map_resolve_event_location](api/config/map_resolve_event_location.md) 설정 속성이 활성화되어 있을 때만 발생합니다.
 
:::

<br>

**이벤트 동작 방식**

- 데이터베이스에 저장된 이벤트에 'lat'와 'lng' 값이 없으면, 스케줄러는 이벤트를 불러올 때 'event_location' 값을 기반으로 좌표를 해석하려 시도합니다. 위치가 확인되면 해당 좌표가 데이터베이스에 저장됩니다. 위치를 찾지 못하면 **onLocationError** 이벤트가 발생합니다.
- [map_resolve_event_location](api/config/map_resolve_event_location.md) 설정 속성은 주로 마이그레이션 목적으로 사용되며, 프로덕션 환경에서는 권장되지 않습니다.
- 이 이벤트는 데이터베이스에서 불러온 이벤트에만 적용됩니다.

이 이벤트는 스케줄러가 잘못되었거나 누락된 위치 정보를 가진 이벤트를 처리할 수 있도록 합니다. 예를 들어, 오류가 발생할 경우 이벤트에 할당할 대체 좌표가 포함된 **google.maps.LatLng** 객체를 반환할 수 있습니다.
