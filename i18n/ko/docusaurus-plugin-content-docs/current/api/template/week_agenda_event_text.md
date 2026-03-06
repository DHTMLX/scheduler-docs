---
sidebar_label: "week_agenda_event_text"
title: "week_agenda_event_text template"
description: "이벤트에 표시되는 텍스트를 정의합니다"
---

# week_agenda_event_text
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 이벤트에 표시되는 텍스트를 정의합니다

@signature: week_agenda_event_text: (start: Date, end: Date, event: any, cellDate: Date, pos: string) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작되는 날짜
- `end` - (required) *Date* - 이벤트가 종료되는 날짜
- `event` - (required) *object* - 이벤트 데이터 객체
- `cellDate` - (required) *Date* - 하루 이벤트 또는 반복 이벤트의 단일 인스턴스가 표시되는 날짜 셀의 날짜
- `pos` - (required) *string* - 반복 이벤트에서 이 발생의 위치: 첫 번째는 'start', 마지막은 'end', 나머지는 'middle'

### Returns
- ` text` - (string) - 스케줄러에서 이벤트를 렌더링하는 데 사용되는 html 콘텐츠

### Example

~~~jsx
scheduler.templates.week_agenda_event_text = function(start,end,event,cellDate,pos){
    return scheduler.templates.event_date(start_date) + " " + event.text;
};
~~~

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 이 템플릿은 [week_agenda](guides/extensions-list.md#week-agenda) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["WeekAgenda 뷰 템플릿"](views/weekagenda-view-templates.md)
