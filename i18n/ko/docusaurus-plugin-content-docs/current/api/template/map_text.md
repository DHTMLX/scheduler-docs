---
sidebar_label: "map_text"
title: "map_text template"
description: "뷰의 두 번째 열에 표시되는 텍스트를 정의합니다."
---

# map_text

### Description

@short: 뷰의 두 번째 열에 표시되는 텍스트를 정의합니다.

@signature: map_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작되는 날짜  
- `end` - (required) *Date* - 이벤트가 종료될 것으로 예상되는 날짜
- `event` - (required) *object* - 이벤트 객체 자체

### Returns
- ` text` - (string) - 스케줄러에 표시할 HTML 콘텐츠

### Example

~~~jsx
scheduler.templates.map_text = function(start,end,ev){
    return ev.text;
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 템플릿은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화되어 있어야 합니다. 
:::

참고로, [map_text](api/template/map_text.md) 템플릿이 정의되지 않은 경우, Google Maps 팝업 마커에 표시되는 날짜 부분('d-m-y')은 [day_date](api/template/day_date.md) 템플릿의 형식을 따릅니다.

### Related Guides
- ["Map View 템플릿"](views/map-view-templates.md)

