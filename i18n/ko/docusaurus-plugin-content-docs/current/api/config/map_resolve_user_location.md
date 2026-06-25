---
sidebar_label: "map_resolve_user_location"
title: "map_resolve_user_location config"
description: "사용자가 지도에 위치를 표시하기 위해 위치 공유를 요청받을지 여부를 제어합니다."
---

# map_resolve_user_location

### Description

@short: 사용자가 지도에 위치를 표시하기 위해 위치 공유를 요청받을지 여부를 제어합니다.

@signature: map_resolve_user_location: boolean

### Example

~~~jsx
scheduler.config.map_resolve_user_location = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 속성은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화되어 있어야 합니다. 
:::

**resolve_user_location** 설정은 [map_settings](api/config/map_settings.md) 구성 객체 내에서도 정의할 수 있습니다.

일부 브라우저는 사용자의 위치에 접근할 수 있는 옵션을 제공합니다. 이 옵션이 *true*로 설정되면, 지도가 로드될 때 사용자는 자신의 위치를 공유할지 여부를 묻는 프롬프트가 표시됩니다.
