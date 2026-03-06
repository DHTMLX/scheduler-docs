---
sidebar_label: "marker_date"
title: "marker_date template"
description: "Google Maps 팝업 마커에 표시되는 이벤트 날짜를 설정합니다."
---

# marker_date
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: Google Maps 팝업 마커에 표시되는 이벤트 날짜를 설정합니다.

### Parameters

- `start` - (required) *Date* - 이벤트 시작 날짜  
- `end` - (required) *Date* - 이벤트 종료 날짜
- `event` - (required) *object* - 이벤트 객체 자체

### Returns
- ` text` - (string) - 스케줄러에 표시할 HTML 콘텐츠

### Example

~~~jsx
scheduler.templates.marker_date = function(date){
    return scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 템플릿은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["Map View 템플릿"](views/map-view-templates.md)
