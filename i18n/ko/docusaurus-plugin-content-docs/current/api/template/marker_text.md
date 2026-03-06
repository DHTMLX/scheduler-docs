---
sidebar_label: "marker_text"
title: "marker_text template"
description: "이벤트에 대한 Google Maps 팝업 마커에 표시되는 텍스트를 제공합니다."
---

# marker_text
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 이벤트에 대한 Google Maps 팝업 마커에 표시되는 텍스트를 제공합니다.

### Parameters

- `start` - (required) *Date* - 이벤트가 시작되는 날짜  
- `end` - (required) *Date* - 이벤트가 종료되는 날짜
- `event` - (required) *object* - 이벤트 세부 정보

### Returns
- ` text` - (string) - scheduler에 표시될 html 콘텐츠

### Example

~~~jsx
scheduler.templates.marker_text = function(start,end,ev){
     return "<div><b>" + ev.text + "</b><br/><br/>" + (ev.event_location || '') + 
     "<br/><br/>" + scheduler.templates.marker_date(start) + " - " + 
     scheduler.templates.marker_date(end) + "</div>";
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 템플릿은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["Map View 템플릿"](views/map-view-templates.md)
