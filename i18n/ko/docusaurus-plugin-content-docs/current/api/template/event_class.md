---
sidebar_label: "event_class"
title: "event_class template"
description: "이벤트 컨테이너에 추가될 CSS 클래스를 정의합니다."
---

# event_class

### Description

@short: 이벤트 컨테이너에 추가될 CSS 클래스를 정의합니다.

@signature: event_class: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작되는 날짜   
- `end` - (required) *Date* - 이벤트가 종료되는 날짜
- `ev` - (required) *object* - 이벤트 객체

### Returns
- ` css_class` - (string) - 해당 요소에 적용할 CSS 클래스

### Example

~~~jsx
scheduler.templates.event_class = function(start,end,ev){
    return "";
};
~~~

**Applicable views:** [Day view](views/day.md), [Month view](views/month.md), [Week view](views/week.md), [Year view](views/year.md), [Units view](views/units.md), [Timeline view](views/timeline.md)

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

Timeline 뷰에서는 이 템플릿이 'Bar' 및 'Tree' 모드에서만 사용됩니다.

이벤트 색상 커스터마이징에 대한 자세한 내용은 관련 문서 ["Custom Event's Color"](guides/custom-events-color.md)를 참고하세요.

### Related Guides
- ["Custom Event's Color"](guides/custom-events-color.md)
- ["Day View Templates"](views/day-view-templates.md)
- ["Month View Templates"](views/month-view-templates.md)
