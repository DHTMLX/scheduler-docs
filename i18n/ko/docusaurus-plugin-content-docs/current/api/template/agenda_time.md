---
sidebar_label: "agenda_time"
title: "agenda_time template"
description: "Agenda 뷰의 첫 번째 열에 표시되는 날짜를 정의합니다."
---

# agenda_time

### Description

@short: Agenda 뷰의 첫 번째 열에 표시되는 날짜를 정의합니다.

@signature: agenda_time: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트 시작 날짜
- `end` - (required) *Date* - 이벤트 종료 날짜
- `event` - (required) *object* - 이벤트 데이터

### Returns
- ` text` - (string) - 스케줄러에 표시되는 HTML 콘텐츠

### Example

~~~jsx
const templates = scheduler.templates;
scheduler.templates.agenda_time = function(start, end, event){
  if (scheduler.isOneDayEvent(event)) {
    return templates.day_date(event) + " " + templates.event_date(start);
  } else {
    return templates.day_date(start) + " &ndash; " + 
        templates.day_date(end);
  }
};
~~~

**Applicable views:** [Agenda view](views/agenda.md)

### Details

:::note
 이 템플릿은 [agenda_view](guides/extensions-list.md#agenda-view) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["Agenda View Templates"](views/agenda-view-templates.md)
