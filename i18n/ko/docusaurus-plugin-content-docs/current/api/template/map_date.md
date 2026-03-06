---
sidebar_label: "map_date"
title: "map_date template"
description: "뷰 헤더에 표시되는 날짜를 설정합니다"
---

# map_date

### Description

@short: 뷰 헤더에 표시되는 날짜를 설정합니다

@signature: map_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - 뷰의 시작 날짜
- `end` - (required) *Date* - 뷰의 종료 날짜

### Returns
- ` text` - (string) - 스케줄러에 렌더링할 html 텍스트

### Example

~~~jsx
//기본 정의
scheduler.templates.map_date = function(start, end) {
     return '';
};
~~~

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 이 템플릿은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["Map View 템플릿"](views/map-view-templates.md)
