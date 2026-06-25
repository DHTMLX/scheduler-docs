---
sidebar_label: "map_settings"
title: "map_settings config"
description: "맵과 관련된 구성 옵션을 포함합니다"
---

# map_settings

### Description

@short: 맵과 관련된 구성 옵션을 포함합니다

@signature: map_settings: any

### Example

~~~jsx
// 이 예제는 기본 맵 설정을 보여줍니다
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    },
    error_position: {
       lat: 15,
       lng: 15
    },
    initial_zoom: 1,
    zoom_after_resolve: 15,
    info_window_max_width: 300,
    resolve_user_location: true,
    resolve_event_location: true,
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2027,05,11),"map");
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 속성은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화되어 있어야 합니다. 
:::

구성 객체는 다음과 같은 속성들을 포함합니다:

- **initial_position** - 맵의 시작 위치를 정의합니다
- **error_position** - 이벤트 위치를 확인할 수 없을 때 표시되는 대체 위치를 정의합니다
- **initial_zoom** - 맵 뷰가 처음 로드될 때의 줌 레벨을 설정합니다
- **zoom_after_resolve** - 사용자가 위치 공유를 허용했을 경우 사용자 위치를 표시할 때 사용할 줌 레벨을 결정합니다
- **info_window_max_width** - 맵의 팝업 마커의 최대 너비를 설정합니다
- **resolve_user_location** - 사용자에게 위치 공유를 요청하는 프롬프트 활성화 여부를 설정합니다
- **resolve_event_location** - 데이터베이스에 좌표가 저장되지 않은 이벤트 위치를 찾기 위한 시도를 활성화합니다
- **view_provider** - 맵 서비스 제공자를 선택합니다

토큰과 같은 사용자 정의 맵 설정은 **map_settings** 객체 내에 추가할 수 있습니다:

~~~js
scheduler.config.map_settings.accessToken = "pk.eyJ...";
~~~

### Change log
- v7.1에 추가됨
