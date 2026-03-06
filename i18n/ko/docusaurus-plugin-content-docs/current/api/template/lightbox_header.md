---
sidebar_label: "lightbox_header"
title: "lightbox_header template"
description: "lightbox의 헤더 섹션을 정의합니다"
---

# lightbox_header

### Description

@short: Lightbox의 헤더 섹션을 정의합니다

@signature: lightbox_header: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트의 시작 날짜   
- `end` - (required) *Date* - 이벤트의 종료 날짜
- `event` - (required) *object* - 이벤트 객체 자체

### Returns
- ` text` - (string) - 스케줄러에 표시될 HTML 콘텐츠

### Example

~~~jsx
scheduler.templates.lightbox_header = function(start,end,ev){
    return scheduler.templates.event_header(ev.start_date,ev.end_date,ev) 
    + scheduler.templates.event_bar_text(ev.start_date,ev.end_date,ev);
};
~~~

### Details

[lightbox_header](api/template/lightbox_header.md) 템플릿이 정의되지 않은 경우, 헤더의 날짜 부분은 [event_header](api/template/event_header.md) 템플릿에 지정된 형식을 기본으로 사용합니다.

### Related Guides
- ["공통 템플릿"](guides/common-templates.md#lightbox)

