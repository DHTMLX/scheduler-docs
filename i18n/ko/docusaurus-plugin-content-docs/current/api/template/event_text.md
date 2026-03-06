---
sidebar_label: "event_text"
title: "event_text template"
description: "이벤트에 표시되는 텍스트를 정의합니다."
---

# event_text

### Description

@short: 이벤트에 표시되는 텍스트를 정의합니다.

@signature: event_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트 시작 날짜   
- `end` - (required) *Date* - 이벤트 종료 날짜
- `event` - (required) *object* - 이벤트 데이터 객체

### Returns
- ` text` - (string) - 스케줄러에서 이벤트를 표시하는 데 사용되는 html 콘텐츠

### Example

~~~jsx
scheduler.templates.event_text=function(start, end, event){
    return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

Month 및 Timeline 뷰에서는 이벤트의 텍스트를 설정하기 위해 [event_bar_text](api/template/event_bar_text.md) 템플릿을 사용해야 한다는 점을 유의하세요.

### Related Guides
- ["Day View Templates"](views/day-view-templates.md)
