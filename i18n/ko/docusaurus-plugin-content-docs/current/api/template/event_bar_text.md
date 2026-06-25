---
sidebar_label: event_bar_text
title: "event_bar_text 템플릿"
description: "이벤트의 텍스트를 지정합니다. 다일 이벤트에만 적용됩니다"
---

# event_bar_text

### Description

@short: 이벤트의 텍스트를 지정합니다. 다일 이벤트에만 적용됩니다

@signature: event_bar_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작될 예정인 날짜
- `end` - (required) *Date* - 이벤트가 종료될 예정인 날짜
- `event` - (required) *object* - 이벤트의 객체

### Returns
- `text` - (string) - Scheduler에서 렌더링하기 위한 HTML 텍스트

### Example

~~~jsx
scheduler.templates.event_bar_text = (start, end, event) => {
    return event.text;
};
~~~

**Applicable views:** [월 뷰](views/month.md), [타임라인 뷰](views/timeline.md)

### Related Guides
- [월 뷰 템플릿](views/month-view-templates.md)
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)