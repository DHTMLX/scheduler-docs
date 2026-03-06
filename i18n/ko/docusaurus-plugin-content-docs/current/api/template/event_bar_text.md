---
sidebar_label: "event_bar_text"
title: "event_bar_text template"
description: "다일 이벤트에 표시되는 텍스트를 설정합니다."
---

# event_bar_text

### Description

@short: 다일 이벤트에 표시되는 텍스트를 설정합니다.

@signature: event_bar_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작하는 날짜  
- `end` - (required) *Date* - 이벤트가 끝나는 날짜
- `event` - (required) *object* - 이벤트 객체

### Returns
- ` text` - (string) - 스케줄러 내에 표시할 HTML 콘텐츠

### Example

~~~jsx
scheduler.templates.event_bar_text = function(start,end,event){
      return event.text;
};
~~~

**Applicable views:** [Month view](views/month.md), [Timeline view](views/timeline.md)

### Related Guides
- ["Month View Templates"](views/month-view-templates.md)
- ["타임라인 뷰 템플릿"](views/timeline-view-templates.md)
