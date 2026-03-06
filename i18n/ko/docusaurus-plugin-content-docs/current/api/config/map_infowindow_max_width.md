---
sidebar_label: "map_infowindow_max_width"
title: "map_infowindow_max_width config"
description: "Map 뷰에서 팝업 마커의 최대 너비를 설정합니다."
---

# map_infowindow_max_width

### Description

@short: Map 뷰에서 팝업 마커의 최대 너비를 설정합니다.

@signature: map_infowindow_max_width: number

### Example

~~~jsx
scheduler.config.map_infowindow_max_width = 350;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** 300

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 속성은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화되어 있어야 사용 가능합니다. 
:::

**infowindow_max_width** 옵션은 [map_settings](api/config/map_settings.md) 구성 객체 내에서도 설정할 수 있습니다.
