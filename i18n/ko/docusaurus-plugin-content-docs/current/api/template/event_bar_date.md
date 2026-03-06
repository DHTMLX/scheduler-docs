---
sidebar_label: "event_bar_date"
title: "event_bar_date template"
description: "이벤트의 날짜를 설정하는 데 사용됩니다. 이 기능은 단일 날짜에만 해당하는 이벤트에 적용됩니다."
---

# event_bar_date

### Description

@short: 이벤트의 날짜를 설정하는 데 사용됩니다. 이 기능은 단일 날짜에만 해당하는 이벤트에 적용됩니다.

@signature: event_bar_date: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작하는 날짜  
- `end` - (required) *Date* - 이벤트가 끝나는 날짜
- `event` - (required) *object* - 이벤트 객체 자체

### Returns
- ` text` - (string) - 스케줄러에 표시할 html 콘텐츠

### Example

~~~jsx
scheduler.templates.event_bar_date = function(start,end,ev){
     return "• <b>"+scheduler.templates.event_date(start)+"</b> ";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- ["Month View Templates"](views/month-view-templates.md)
