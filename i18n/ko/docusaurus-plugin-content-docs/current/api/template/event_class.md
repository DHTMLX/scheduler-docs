---
sidebar_label: event_class
title: "event_class 템플릿"
description: "이벤트 컨테이너에 적용될 CSS 클래스를 지정합니다"
---

# event_class

### Description

@short: 이벤트의 컨테이너에 적용될 CSS 클래스를 지정합니다

@signature: event_class: (start: Date, end: Date, ev: any) => string

### Parameters

- `start` - (필수) *Date* - 이벤트가 시작될 예정인 날짜
- `end` - (필수) *Date* - 이벤트가 완료될 예정인 날짜
- `ev` - (필수) *객체* - 이벤트의 객체

### Returns
- `css_class` - (string) - 관련 요소의 CSS 클래스

### Example

~~~jsx
scheduler.templates.event_class = (start, end, ev) => {
    return "";
};
~~~


**Applicable views:** [Day view](views/day.md), [Month view](views/month.md), [Week view](views/week.md), [Year view](views/year.md), [Units view](views/units.md), [Timeline view](views/timeline.md)

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

Timeline 뷰에서 템플릿은 'Bar' 및 'Tree' 모드에 한해서 적용됩니다.

관련 기사 [Custom Event's Color](guides/custom-events-color.md)에서 이벤트 색상 커스터마이징에 대한 전체 정보를 확인하십시오.

### Related Guides
- [Custom Event's Color](guides/custom-events-color.md)
- [Day View Templates](views/day-view-templates.md)
- [Month View Templates](views/month-view-templates.md)