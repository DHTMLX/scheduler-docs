--- 
sidebar_label: event_text
title: "event_text 템플릿"
description: "이벤트의 텍스트를 지정합니다"
---

# event_text

### Description

@short: 이벤트의 텍스트를 지정합니다

@signature: event_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작될 예정인 날짜
- `end` - (required) *Date* - 이벤트가 예정대로 종료될 날짜
- `event` - (required) *object* - 이벤트 객체

### Returns
- `text` - (string) - Scheduler에서 렌더링될 HTML 텍스트

### Example

~~~jsx
scheduler.templates.event_text = (start, end, event) => {
    return `<a href='http://some.com/details.php?for=${event.id}'>${event.text}</a>`;
};
~~~

**Applicable views:** [일별 보기](views/day.md), [주간 보기](views/week.md), [단위 보기](views/units.md)

### Related samples
- [템플릿으로 이벤트 스타일링](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

월(Month) 및 Timeline 뷰의 경우 이벤트의 텍스트를 지정하려면 [`event_bar_text`](api/template/event_bar_text.md) 템플릿을 사용해야 한다는 점에 유의하세요.

### Related Guides
- [일 보기 템플릿](views/day-view-templates.md)