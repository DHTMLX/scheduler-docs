---
sidebar_label: "event_header"
title: "event_header template"
description: "이벤트의 헤더 내용을 정의합니다."
---

# event_header

### Description

@short: 이벤트의 헤더 내용을 정의합니다.

@signature: event_header: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작되는 날짜   
- `end` - (required) *Date* - 이벤트가 종료되는 날짜
- `event` - (required) *object* - 이벤트의 데이터 객체

### Returns
- ` text` - (string) - 스케줄러에 렌더링할 html 텍스트

### Example

~~~jsx
scheduler.templates.event_header = function(start,end,ev){
    return scheduler.templates.event_date(start)+" - "+
    scheduler.templates.event_date(end);
};
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- ["Day View Templates"](views/day-view-templates.md)
- ["주간 뷰 템플릿"](views/week-view-templates.md)
