---
sidebar_label: "map_time"
title: "map_time template"
description: "뷰의 첫 번째 열에 표시되는 날짜를 설정합니다"
---

# map_time

### Description

@short: 뷰의 첫 번째 열에 표시되는 날짜를 설정합니다

@signature: map_time: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작되는 날짜   
- `end` - (required) *Date* - 이벤트가 종료되는 날짜
- `event` - (required) *object* - 이벤트 객체

### Returns
- ` text` - (string) - scheduler에 표시할 html 텍스트

### Example

~~~jsx
scheduler.templates.map_time = function(start,end,ev){
    if (ev._timed)
        return this.day_date(ev.start_date, ev.end_date, ev) + " " + 
        this.event_date(start);
    else
        return scheduler.templates.day_date(start) + " &ndash; " + 
        scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 이 템플릿은 [map_view](guides/extensions-list.md#map-view) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related Guides
- ["Map View 템플릿"](views/map-view-templates.md)
